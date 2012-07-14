goog.provide('wordcheck.Lookup');

goog.require('goog.dom');
goog.require('goog.events');

wordcheck.Lookup = function () {
  // Get the form and attach an event to the submit
  var form = goog.dom.getElement('lookup-form');
  goog.events.listen(form, goog.events.EventType.SUBMIT, this.submitHandler,
      false, this);
};

wordcheck.Lookup.prototype.submitHandler = function (e) {
  // Look up the word
  var wordEl = goog.dom.getElement('lookup-word'),
      word = wordEl.value.toUpperCase(),
      result = false,
      def = '';
  e.preventDefault();

  if (!word) {
    return;
  }

  if (wordList[word]){
    result = true;
    def = wordList[word];
  }
  this.renderResult(word, result, def);

  wordEl.focus();
  wordEl.select();
  window.KeyBoard.showKeyBoard();
};

wordcheck.Lookup.prototype.renderResult = function (word, result, def) {
  var defEl = goog.dom.getElement('definition'),
      paneEl= goog.dom.getElement('result-pane'),
      resultText = result ? 'GOOD' : 'NOT A WORD',
      resultEl = goog.dom.getElement('result'),
      wordEl = goog.dom.getElement('word');

  goog.dom.setTextContent(wordEl, word);
  goog.dom.setTextContent(resultEl, resultText);
  goog.dom.setTextContent(defEl, def);
  paneEl.style.display = 'block';
};
