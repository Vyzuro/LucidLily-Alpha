//=============================================================================
// PD_QueueTweenAnimation.js
//=============================================================================

/*:
 * @plugindesc Add Tween Animation.
 * @author Shio_inu
 *
 * @help
 * last update : 25th Jan, 2016 v1.01
 */

/*:ja
 * @plugindesc SpriteおよびWindowにTweenアニメーション機能を追加します。
 * @author しおいぬ
 *
 * @help
 * last update : 2016/01/25 v1.01
 */

var CURVE_EASE_IN_OUT = 0;
var CURVE_EASE_IN = 1;
var CURVE_EASE_OUT = 2;
var UNIFORM = 3;

var DST_ABSOLUTE = 0;
var DST_RELATIVE = 1;

function QueueTweenAnimation() {
    this.initialize.apply(this, arguments);
}
QueueTweenAnimation.prototype = Object.create(Object.prototype);
QueueTweenAnimation.prototype.constructor = QueueTweenAnimation;

QueueTweenAnimation.prototype.initialize = function(translate, scale, rotation, frame, curveType, coordinateType) {
    this._dstTranslate = translate;
    this._dstScale = scale;
    this._dstRotation = rotation;
    this._frameMax = frame;
    this._frame = 0;
    this._curveType = curveType;
    this._coordinateType = coordinateType;
};

QueueTweenAnimation.prototype.start = function(parent){
    this._srcTranslate = new Point(parent.x, parent.y);
    if(this._coordinateType === DST_RELATIVE){
        this._dstTranslate = new Point(parent.x + this._dstTranslate.x, parent.y + this._dstTranslate.y);
    }
    this._srcScale = parent.scale;
    this._srcRotation = parent.rotation;
};

QueueTweenAnimation.prototype.update = function(parent){
    this._frame ++;

    // Calculate frame max
    var framePer = this._frame / parseFloat(this._frameMax);

    var per = 0;

    // Calculate the coordinates percentages and location
    switch(this._curveType){
    case CURVE_EASE_IN_OUT :
       if(framePer > 0.5){
           per = 0.5 + (Math.sin(Math.PI * (framePer - 0.5)) * 0.5);
       } else {
           per = (Math.sin(Math.PI * (-0.5 + framePer)) + 1) * 0.5;
       }
       break;
    case CURVE_EASE_IN :
       per = Math.sin(Math.PI * (-0.5 + (framePer / 2))) + 1;
       break;
    case CURVE_EASE_OUT :
       per = Math.sin(Math.PI / 2 * framePer);
       break;
    case UNIFORM :
       per = framePer;
       break;
    default :
       per = framePer;
       break;
    }
    //Movement

    parent.x = this._srcTranslate.x + ((this._dstTranslate.x - this._srcTranslate.x) * per);
    parent.y = this._srcTranslate.y + ((this._dstTranslate.y - this._srcTranslate.y) * per);
    console.log("move : " + this._frame);
    if(parent.scale){
        parent.scale = new Point(this._srcScale.x + ((this._dstScale.x - this._srcScale.x) * per),
                                 this._srcScale.y + ((this._dstScale.y - this._srcScale.y) * per));
        parent.rotation = this._srcRotation + ((this._dstRotation - this._srcRotation) * per);
    }
};

QueueTweenAnimation.prototype.isStarted = function(){
    return (this._frame != 0)? true : false;
}

QueueTweenAnimation.prototype.isEnd = function(){
    return (this._frame == this._frameMax)? true : false;
}

//-----------------------------------------------------------------------------
// Sprite
//

Sprite.prototype.addAnimation = function(animation) {
    if(!this._animationStack){
        this._animationStack = [];
    }
    this._animationStack.push(animation)
};

Sprite.prototype.deleteAllAnimations= function() {
    this._animationStack = [];
};

var updateSprite = Sprite.prototype.update;
Sprite.prototype.update = function() {
    if(this._animationStack){
        if(this._animationStack.length != 0){
            if(!this._animationStack[0].isStarted()){
                this._animationStack[0].start(this);
            }
            this._animationStack[0].update(this);
            if(this._animationStack[0].isEnd()){
                this._animationStack.shift();
            }
        }
    }
    updateSprite.call(this);
};

//-----------------------------------------------------------------------------
// Window
//

Window.prototype.addAnimation = function(animation) {
    if(!this._animationStack){
        this._animationStack = [];
    }
    this._animationStack.push(animation)
};

Window.prototype.deleteAllAnimations = function() {
    this._animationStack = [];
};

var updateWindow = Window.prototype.update;
Window.prototype.update = function() {
    if(this._animationStack){
        if(this._animationStack.length != 0){
            if(!this._animationStack[0].isStarted()){
                this._animationStack[0].start(this);
            }
            this._animationStack[0].update(this);
            if(this._animationStack[0].isEnd()){
                this._animationStack.shift();
            }
        }
    }
    updateWindow.call(this);
};
