goog.provide('nfw.CheckForm');

goog.require('goog.dom');
goog.require('goog.net.XhrIo');
goog.require('goog.string');
goog.require('goog.ui.Component');



/**
 * Component to handle the word check form.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @export
 */
nfw.CheckForm = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);

  /**
   * @type {goog.net.XhrIo}
   * @private
   */
  this.xhr_ = new goog.net.XhrIo();

  /**
   * @type {Element}
   * @private
   */
  this.input_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.resultEl_ = null;

  /**
   * @type {Date}
   * @private
   */
  this.startTime_ = new Date();
};
goog.inherits(nfw.CheckForm, goog.ui.Component);


/**
 * Attaches listeners and fetches some elements.
 * @override
 */
nfw.CheckForm.prototype.enterDocument = function() {
  nfw.CheckForm.superClass_.enterDocument.call(this);

  this.eh_.listen(
      this.getElement(),
      goog.events.EventType.SUBMIT,
      this.submitHandler_);

  this.eh_.listen(
      this.xhr_,
      goog.net.EventType.COMPLETE,
      this.renderCheckResponse_);

  this.input_ = goog.dom.getElement('input', this.getElement());
  this.resultEl_ = goog.dom.getElement('result', this.getElement());

  this.input_.select();
};


/**
 * Handle check form submit.
 * @param {!goog.events.Event} e Form submit event.
 * @private
 */
nfw.CheckForm.prototype.submitHandler_ = function(e) {
  e.preventDefault();
  if (/^[a-zA-Z]+$/.test(this.input_.value)) {
    this.xhr_.send('/api/check/' + input.value.toLowerCase());
  } else {
    this.renderCheckResponse_(null);
  }
};


/**
 * Sets state for good and bad words from Xhr response. Can also be called
 * with a null param to simulate a bad word without Xhr.
 * @param {goog.events.Event} e Xhr complete event or null.
 * @private
 */
nfw.CheckForm.prototype.renderCheckResponse_ = function(e) {
  var valid = e ? !!e.target.getResponseJson() : false;
  var value = this.input_.value;

  // Sets the content of the result element.
  var text = goog.string.htmlEscape(value) + ' is not a word.';
  if (valid) {
    text = goog.string.htmlEscape(value) + ' is a word!';
  }
  this.resultEl_.innerHTML = text;

  // Selects input content to make it faster to enter another word.
  this.input_.select();

  // Tracks event in analytics.
  if (goog.global['_gaq']) {
    goog.global['_gaq'].push([
      '_trackEvent',
      'Word Lookup',
      escape(value),
      'method=remote&valid=' + valid,
      new Date() - this.startTime_
    ]);
  }
};


goog.exportProperty(nfw.CheckForm.prototype, 'decorate',
    nfw.CheckForm.prototype.decorate);
