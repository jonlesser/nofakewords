goog.provide('nfw.CheckForm');

goog.require('goog.dom');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @export
 */
nfw.CheckForm = function(opt_domHelper) {
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * Event handler for this object.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eh_ = new goog.events.EventHandler(this);

  console.log('constructed!');
};
goog.inherits(nfw.CheckForm, goog.ui.Component);


nfw.CheckForm.prototype.enterDocument = function() {
  nfw.CheckForm.superClass_.enterDocument.call(this);

  var submit = goog.dom.getElement('submit', this.getElement());
  this.eh_.listen(
      this.getElement(),
      goog.events.EventType.SUBMIT,
      this.submitHandler_);
};


nfw.CheckForm.prototype.submitHandler_ = function(e) {
  e.preventDefault();
  console.log('submit happened');
};


goog.exportProperty(nfw.CheckForm.prototype, 'decorate',
    nfw.CheckForm.prototype.decorate);
