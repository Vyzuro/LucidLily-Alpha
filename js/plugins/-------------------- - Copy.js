//=============================================================================
 /*:
 * @plugindesc Help Window Extender 3 Line
 * @author Yanfly Engine Plugins
 */
//=============================================================================
Window_Help.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
    //var height = this.fittingHeight(numLines || 2);
    var height = this.fittingHeight(3);//six lines
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};
Window_Help.prototype.setText = function(text) {
    if (this._text !== text) {
        this._text = text.replace(/\\n/g,"\n");
        this.refresh();
    }
};