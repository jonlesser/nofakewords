goog.provide("wordcheck.Start");

goog.require("wordcheck.Lookup");

wordcheck.Start = function() {
  var lookup = new wordcheck.Lookup,
      wordEl = goog.dom.getElement('lookup-word');
  wordEl.focus();
  wordEl.select();
};

goog.exportSymbol('wordcheck.Start', wordcheck.Start);
