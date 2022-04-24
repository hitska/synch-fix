// ==UserScript==
// @name        Фикс ссылок синча
// @description Производит денацификацию ссылок синча
// @version     1
// @include     *syn-ch.com/*
// @include     *syn-ch.ru/*
// @author      Твоя мамаша
// @run-at 			document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

// ----------------------------------------------------------------------------

var brokenAddresses = ["cdn.syn-ch.com.ua", "cdn.syn-ch.org"]
var validAddress    = "cdn.syn-ch.ru"

function denazifyBrokenAddresses(text) {
  for(var i = 0; i < brokenAddresses.length; i++)
  {
    brokenAddress = brokenAddresses[i]
    
    text = text.replaceAll(brokenAddress, validAddress);
  }
  
  return text
}

function fixImages() {
  var imgs = document.getElementsByTagName("img");

  for(var i = 0; i < imgs.length; i++)
  {
    imgs[i].outerHTML = denazifyBrokenAddresses(imgs[i].outerHTML)
  }
}

function fixRefs() {
  var refs = document.getElementsByTagName("a");

  for(var i = 0; i < refs.length; i++)
  {
    refs[i].href = denazifyBrokenAddresses(refs[i].href)
  }
}

function fixContent() {
  fixImages()
  fixRefs()
}

fixContent()

// Просто чиним всё по таймеру
//setInterval(function() {fixContent()}, 5000);


// ----------------------------------------------------------------------------
// Всратый способ фильтровать всё что мы получаем по ajax, вроде работает, но...
// "USE OF UNSAFEWINDOW IS INSECURE, AND IT SHOULD BE AVOIDED WHENEVER POSSIBLE" (ц)
// ----------------------------------------------------------------------------
if (!unsafeWindow.XMLHttpRequest.prototype.getResponseText) {
	unsafeWindow.XMLHttpRequest.prototype.getResponseText = Object.getOwnPropertyDescriptor(unsafeWindow.XMLHttpRequest.prototype, 'responseText').get;
}

Object.defineProperty(unsafeWindow.XMLHttpRequest.prototype, 'responseText', {
	get: exportFunction(function() {
		var responseText = unsafeWindow.XMLHttpRequest.prototype.getResponseText.call(this);
		return denazifyBrokenAddresses(responseText);
	}, unsafeWindow),
	enumerable: true,
	configurable: true
});
