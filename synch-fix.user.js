// ==UserScript==
// @name        Фикс ссылок синча
// @description Производит денацификацию ссылок синча
// @version     1.1
// @include     *syn-ch.com/*
// @include     *syn-ch.ru/*
// @author      Твоя мамаша
// @run-at      document-end
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
setInterval(function() {fixContent()}, 5000);
