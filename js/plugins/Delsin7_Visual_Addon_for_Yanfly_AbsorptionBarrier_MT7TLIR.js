/*:
Delsin7's Visual Addon for Yanfly's Absorption Barrier Plugin.

@help 
Adds the ability to change gauge height and position, custom animations, 
color bar, and color text set to Actor, Class, Enemy, Equipment, and States 
and more!

Also allows the barrier gauge to be displayed from left to right, current
amount of barrier points displayed on the hp bar before the hp numbers, the 
barrier number color can be set, randomized gauge colors, shorter height for
the barrier gauge so the hp gauge will be easily visible, and the ability to 
set the parameter that will dictate the maximum amount of barrier points for 
the gauge instead of being based off maximum hp.

Requirements:
Yanfly Core Engine
Yanfly Absorption Barrier

Optional:
Yanfly Battle Engine Core-
Yanfly X Visual Hp Gauge- Allows visual gauge changes and visual
						- barrier point values for enemies.

To install just add this plug below Yanfly's Absorption Barrier Plugin.

Note:
Color Numbers refer to the Text Color Numbers, they range from 0-31 and are 
found on the Window.png image in the img/system/ folder. The individual colors
are the squares in the bottom right section of the image. Alternately you can
use a 6 digit Hex color code.

--Plugin Options--

Display Barrier Gauge Seperately?- Displays a new barrier gauge underneath
the hp gauge. If Yanfly X Visual Hp Gauge is installed it will add it to
enemies as well. This will bypass the Display Gauge Left to Right, gauge
height and several other settings. 

Display Gauge Left to Right?- Changes the gauge to display from
left to right, instead of right to left.

Gauge is Random Colors?- Everytime the gauge is updated it
will randomize the colors while on. On Always will bypass
notetag custom barrier colors.

Gauge is Shorter?- Reduces the height to the given fraction.

Display Barrier Numbers?- Displays the number of barrier points
the actor has on their HP Bar.

Display Barrier Number Colors- Changes the color of the Barrier
Number. Helps to differentiate from HP numbers.

Param for Maximum Barrier Value- Use a specific parameter for 
maximum barrier value for left side gauge display. Enter a 
parameter abbreviation, such as mhp, or mmp, or atk, or a 
custom parameter if using a custom parameter plugin.


--Notetags--
Can be added to Actor, Class, Enemy, Equipment, and States.
Priority will be given to state notetags if multiple are found.

To change the Barrier Color 1-
Use the below notetag and replace x with a number.
<Barrier Color 1: x>
Alternately can use a Hex color code.
<Barrier Color 1: #xxxxxx>

To change the Barrier Color 2-
Use the below notetag and replace x with a number.
<Barrier Color 2: x>
Alternately can use a Hex color code.
<Barrier Color 2: #xxxxxx>

To change the Barrier Number Color on HP Gauge-
Use the below notetag and replace x with a number.
<Barrier Number Color: x>
Alternately can use a Hex color code.
<Barrier Number Color: #xxxxxx>

To change the Barrier Popup Color on Damage-
-Requires Yanfly Battle Engine Core-
Use the below notetag and replace x with a number.
<Barrier Popup Color: x, x, x, x>

To change the Barrier Animation on Damage-
Use the below notetag and replace x with a number.
<Barrier Animation: x>

To change the Barrier Break Animation-
Use the below notetag and replace x with a number.
<Barrier Break Animation: x>

--Versions--

1.2- Added Hex color code capability and improved some checks.
1.1- Fixed missing check for actor. Should fix an equips() error.
1.0- First Release.



@plugindesc v1.00 Adds the ability to have custom animations, color bar, and color text set to Actor, Class, Equipment, and States, and more!
@author Delsin7

@param Display Barrier Gauge Seperately?
@type boolean
@desc Display Absorption gauge as a seperate gauge underneath the HP gauge?
@default false

@param Display Gauge Left to Right?
@type boolean
@desc Display Absorption gauge starting from left to right instead?
@default false

@param Gauge is Random Colors?
@type combo
@option Off
@option On
@option On Always
@desc Gauge will be randomized colors when it updates, if custom color notetags not used. On Always overrides notetags.
@default Off

@param Gauge is Shorter?
@type combo
@option full
@option 3/4
@option 2/3
@option 1/2
@option 1/3
@option 1/4
@desc Gauge will be shorter than the HP gauge.
@default full

@param Short Gauge Height Alignment
@type combo
@option bottom
@option center
@option top
@desc Aligns the gauge to the bottom, center, or top of HP Bar.
@default bottom

@param Display Barrier Numbers?
@type boolean
@desc Display Barrier number next to HP number gauge if 1 or higher?
@default false

@param Display Barrier Number Colors
@type number
@desc The color number that the Barrier Points will be on the HP gauge.
@default 0

@param Param for Maximum Barrier Value
@type string
@desc Use a specific parameter for maximum barrier value for left side gauge. Enter a parameter abbreviation. Default: mhp.
@default mhp

@param Barrier Point Abbreviation
@type string
@desc Use a custom abbreviation for displayed barrier point. Default: BP.
@default BP

*/

var Imported = Imported || {};
Imported.Delsin7_Visual_Addon_for_Yanfly_AbsorptionBarrier = true;

var Delsin7 = Delsin7 || {};
Delsin7.VAB = Delsin7.VAB || {};
Delsin7.VAB.version = 1.00;



Delsin7.parameters = PluginManager.parameters('Delsin7_Visual_Addon_for_Yanfly_AbsorptionBarrier');
Delsin7.VAB.displayBarrierGauge = eval(Delsin7.parameters["Display Barrier Gauge Seperately?"]);
Delsin7.VAB.gaugeLeft = eval(Delsin7.parameters["Display Gauge Left to Right?"]);
Delsin7.VAB.gaugeRandomColor = String(Delsin7.parameters["Gauge is Random Colors?"]);
Delsin7.VAB.gaugeShort = String(Delsin7.parameters["Gauge is Shorter?"]);
Delsin7.VAB.gaugeShortAlignment = String(Delsin7.parameters["Short Gauge Height Alignment"]);
Delsin7.VAB.displayBarrierNumber = eval(Delsin7.parameters["Display Barrier Numbers?"]);
Delsin7.VAB.displayBarrierNumberColor = Number(Delsin7.parameters["Display Barrier Number Colors"]);
Delsin7.VAB.maxBarrierParam = String(Delsin7.parameters["Param for Maximum Barrier Value"]);
Delsin7.VAB.barrierParamAbbreviation = String(Delsin7.parameters["Barrier Point Abbreviation"]);



Delsin7.VAB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Delsin7.VAB.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Delsin7._loaded_Delsin7_Visual_Addon_for_Yanfly_AbsorptionBarrier) {
    this.processVABNotetags1($dataActors);
	this.processVABNotetags1($dataClasses);
	this.processVABNotetags1($dataEnemies);
    this.processVABNotetags1($dataWeapons);
    this.processVABNotetags1($dataArmors);
	this.processVABNotetags1($dataStates);
    Delsin7._loaded_Delsin7_Visual_Addon_for_Yanfly_AbsorptionBarrier = true;
  }
  return true;
};



DataManager.processVABNotetags1 = function(group){

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		obj.barrierColor1 = undefined;
		obj.barrierColor2 = undefined;
		obj.barrierNumberColor = undefined;
	
		for (var i = 0; i < notedata.length; i++) {
			  var line = notedata[i];
			  if(line.match(/<Barrier Color 1:\s?(\d+)>/i)){
				  obj.barrierColor1 = parseInt(RegExp.$1);
			  }else if(line.match(/<Barrier Color 1:\s?(#\w+)>/i)){
				  obj.barrierColor1 = String(RegExp.$1);
			  }else if(line.match(/<Barrier Color 2:\s?(\d+)>/i)){
				  obj.barrierColor2 = parseInt(RegExp.$1);
			  }else if(line.match(/<Barrier Color 2:\s?(#\w+)>/i)){
				  obj.barrierColor2 = String(RegExp.$1);
			  } else if (line.match(/<Barrier Number Color:\s?(\d+)>/i)){
				  obj.barrierNumberColor = parseInt(RegExp.$1);
			  } else if (line.match(/<Barrier Number Color:\s?(#\w+)>/i)){
				  obj.barrierNumberColor = String(RegExp.$1);
			  } else if (line.match(/<barrier popup color:\s?(\d+,\s?\d+,\s?\d+,\s?\d+)/i)){
				  regexString = '['+RegExp.$1+']';
				  obj.barrierPopupColor = eval(regexString);
			  } else if (line.match(/<Barrier Animation:\s?(\d+)>/i)){
				  obj.barrierAnimation = parseInt(RegExp.$1);
			  } else if (line.match(/<Barrier Break Animation:\s?(\d+)>/i)){
				  obj.barrierBreakAnimation = parseInt(RegExp.$1);
			  }
		}
	}
};


//barrier popup color
if (Imported.YEP_BattleEngineCore) {	
	Sprite_Damage.prototype.setup = function(target) {
		var result = target._damagePopup[0];
		Yanfly.ABR.Sprite_Damage_setup.call(this, target);
		if (result._barrierAffected) this.setupBarrierEffect(target);
	};
};	
	
Sprite_Damage.prototype.setupBarrierEffect = function(target) {
	this._flashColor = Delsin7.VAB.getBarrierPopupColor(target).slice();
	this._flashDuration = 180;
};

Delsin7.VAB.getBarrierPopupColor = function(target){
	barrierPopupColor = Yanfly.Param.ABRPop;
	if(target.isActor()){
		barrierPopupColor = (target.actor().barrierPopupColor !== undefined) ? target.actor().barrierPopupColor : barrierPopupColor;
		barrierPopupColor = (target.currentClass().barrierPopupColor !== undefined) ? target.currentClass().barrierPopupColor : barrierPopupColor;
	} else if (target.isEnemy()){
		barrierPopupColor = (target.enemy().barrierPopupColor !== undefined) ? target.enemy().barrierPopupColor : barrierPopupColor;
	}
	
	if(target.isActor()){
		var length = target.equips().length;
		for(i = 0; i < length; ++i){
			equip = target.equips()[i];
			if (equip && equip.barrierPopupColor !== undefined) {
				barrierPopupColor = equip.barrierPopupColor;
			}
		}
	}

	var length = target.states().length;
	for(i = 0; i < length; ++i){
		state = target.states()[i];
		if (state && state.barrierPopupColor !== undefined) {
			barrierPopupColor = state.barrierPopupColor;
		}
	}

	return barrierPopupColor;
	
	
};

//barier animation, damage and break

Game_Battler.prototype.startBarrierAnimation = function() {
    if (this.barrierPoints() > 0) {
		anim1 = Delsin7.VAB.getBarrierAnimation(this, 1);
      if (anim1 > 0) this.startAnimation(anim1);
    } else {
		anim2 = Delsin7.VAB.getBarrierAnimation(this, 2);
      if (anim2 > 0) this.startAnimation(anim2);
    }
};

Delsin7.VAB.getBarrierAnimation = function(target, type){
	if(type === 1){
		barrierAnimation = Yanfly.Param.ABRAni1;

		if(target.isActor()){
			barrierAnimation = (target.actor().barrierAnimation >= 0) ? target.actor().barrierAnimation : barrierAnimation;
			barrierAnimation = (target.currentClass().barrierAnimation >= 0) ? target.currentClass().barrierAnimation : barrierAnimation;
		} else if (target.isEnemy()){
			barrierAnimation = (target.enemy().barrierAnimation >= 0) ? target.enemy().barrierAnimation : barrierAnimation;
		}
		if(target.isActor()){
			var length = target.equips().length;
			for(i = 0; i < length; ++i){
				equip = target.equips()[i];
				if (equip && equip.barrierAnimation !== undefined) {
					barrierAnimation = equip.barrierAnimation;
				}
			}
		}
		// if(target.isActor()){
		var length = target.states().length;
		for(i = 0; i < length; ++i){
			state = target.states()[i];
			if (state && state.barrierAnimation !== undefined) {
				barrierAnimation = state.barrierAnimation;
			}
		}
		return barrierAnimation;
	} else if(type === 2){
		barrierBreakAnimation = Yanfly.Param.ABRAni2;

		if(target.isActor()){
			barrierBreakAnimation = (target.actor().barrierBreakAnimation >= 0) ? target.actor().barrierBreakAnimation : barrierBreakAnimation;
			barrierBreakAnimation = (target.currentClass().barrierBreakAnimation >= 0) ? target.currentClass().barrierBreakAnimation : barrierBreakAnimation;
		} else if (target.isEnemy()){
			barrierBreakAnimation = (target.enemy().barrierBreakAnimation >= 0) ? target.enemy().barrierBreakAnimation : barrierBreakAnimation;
		}
		if(target.isActor()){
			var length = target.equips().length;
			for(i = 0; i < length; ++i){
				equip = target.equips()[i];
				if (equip && equip.barrierBreakAnimation !== undefined) {
					barrierBreakAnimation = equip.barrierBreakAnimation;
				}
			}
		}

		var length = target.states().length;
		for(i = 0; i < length; ++i){
			state = target.states()[i];
			if (state && state.barrierBreakAnimation !== undefined) {
				barrierBreakAnimation = state.barrierBreakAnimation;
			}
		}
		return barrierBreakAnimation;
	}
	
	
};

//barrier gauge color 1

Window_Base.prototype.barrierColor1 = function(actor) {
	
	var newColor1 = -1;
	
	if(Delsin7.VAB.gaugeRandomColor.toLowerCase() == 'off'){
		newColor1 = Window_Base.prototype.barrierColor1Eval(actor);
	} else if (Delsin7.VAB.gaugeRandomColor.toLowerCase() != 'on always'){
		newColor1 = Window_Base.prototype.barrierColor1Eval(actor);
		if(newColor1 == -1){
			newColor1 = Math.randomInt(32);
		}
	} else {
		newColor1 = Math.randomInt(32);
	}
	
	if(newColor1 !== -1){
		return this.textColor(newColor1);
	}else{
		return this.textColor(Yanfly.Param.ABRColor1);
	}

};

Window_Base.prototype.barrierColor1Eval = function(actor) {
	newColorA = -1;


	if(actor.isActor()){
		newColorA = (actor.actor().barrierColor1 !== undefined) ? actor.actor().barrierColor1 : newColorA;
		newColorA = (actor.currentClass().barrierColor1 !== undefined) ? actor.currentClass().barrierColor1 : newColorA;
	} else if (actor.isEnemy()){
		newColorA = (actor.enemy().barrierColor1 !== undefined) ? actor.enemy().barrierColor1 : newColorA;
	}

	if(actor.isActor()){
		var length = actor.equips().length;
		for(i = 0; i < length; ++i){
			equip = actor.equips()[i];
			if (equip && equip.barrierColor1 !== undefined) {
				newColorA = equip.barrierColor1;
			}
		}
	}

	var length = actor.states().length;
	for(i = 0; i < length; ++i){
		state = actor.states()[i];
		if (state && state.barrierColor1 !== undefined) {
			newColorA = state.barrierColor1;
		}
	}

	return newColorA;
};

//barrier gauge color 2

Window_Base.prototype.barrierColor2 = function(actor) {
		
	var newColor2 = -1;
	
	if(Delsin7.VAB.gaugeRandomColor.toLowerCase() == 'off'){
		newColor2 = this.barrierColor2Eval(actor);
	} else if (Delsin7.VAB.gaugeRandomColor.toLowerCase() != 'on always'){
		newColor2 = this.barrierColor2Eval(actor);
		if(newColor2 == -1){
			newColor2 = Math.randomInt(32);
		}
	} else {
		newColor2 = Math.randomInt(32);
	}
	
	if(newColor2 !== -1){
		return this.textColor(newColor2);
	}else{
		return this.textColor(Yanfly.Param.ABRColor2);
	}

};

Window_Base.prototype.barrierColor2Eval = function(actor) {
	newColorB = -1;
	

	if(actor.isActor()){
		newColorB = (actor.actor().barrierColor2 !== undefined) ? actor.actor().barrierColor2 : newColorB;
	
		newColorB = (actor.currentClass().barrierColor2 !== undefined) ? actor.currentClass().barrierColor2 : newColorB;
	} else if (actor.isEnemy()){
		newColorA = (actor.enemy().barrierColor1 !== undefined) ? actor.enemy().barrierColor1 : newColorA;
	}
	
	if(actor.isActor()){
		var length = actor.equips().length;
		for(i = 0; i < length; ++i){
			equip = actor.equips()[i];
			if (equip && equip.barrierColor2 !== undefined) {
				newColorB = equip.barrierColor2;
			}
		}
	}

	var length = actor.states().length;
	for(i = 0; i < length; ++i){
		state = actor.states()[i];
		if (state && state.barrierColor2 !== undefined) {
			newColorB = state.barrierColor2;
		}
	}
	return newColorB;
};

//barrier number color eval function

Window_Base.prototype.barrierNumberColorEval = function(actor) {
	barrierNumberColor = -1;
	
	if(actor.isActor()){
		barrierNumberColor = (actor.actor().barrierNumberColor !== undefined) ? actor.actor().barrierNumberColor : barrierNumberColor;
		barrierNumberColor = (actor.currentClass().barrierNumberColor !== undefined) ? actor.currentClass().barrierNumberColor : barrierNumberColor;
	} else if(actor.isEnemy()){
		barrierNumberColor = (actor.enemy().barrierNumberColor !== undefined) ? actor.enemy().barrierNumberColor : barrierNumberColor;
	}
	
	if(actor.isActor()){
	var length = actor.equips().length;
		for(i = 0; i < length; ++i){
			equip = actor.equips()[i];
			if (equip && equip.barrierNumberColor !== undefined) {
				barrierNumberColor = equip.barrierNumberColor;
			}
		}
	}
	var length = actor.states().length;
	for(i = 0; i < length; ++i){
		state = actor.states()[i];
		if (state && state.barrierNumberColor !== undefined) {
			barrierNumberColor = state.barrierNumberColor;
		}
	}

	return barrierNumberColor;
};

//barrier gauge height modifier

Window_Base.prototype.drawGaugeShort = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  
  if(Delsin7.VAB.gaugeShort != 'Full' && Delsin7.VAB.displayBarrierGauge != true){
	switch (Delsin7.VAB.gaugeShort){
		case '3/4':
			gaugeH = Math.round(gaugeH * 0.75);
			break;
		case '2/3':
			gaugeH = Math.round(gaugeH * 0.66);
			break;
		case '1/2':
			gaugeH = Math.round(gaugeH * 0.5);
			break;
		case '1/3':
			gaugeH = Math.round(gaugeH * 0.33);
			break;
		case '1/4':
			gaugeH = Math.round(gaugeH * 0.25);
			break;
	}
  }
  
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  
  if(Delsin7.VAB.gaugeShort != 'Full' && Delsin7.VAB.gaugeShortAlignment != 'Bottom' && Delsin7.VAB.displayBarrierGauge != true){
	switch (Delsin7.VAB.gaugeShortAlignment){
		case 'center':
			var gaugeY = dy + this.lineHeight() - gaugeH - Math.round((this.gaugeHeight() - gaugeH) / 2) - 2;
			break;
		case 'top':
			var gaugeY = dy + this.lineHeight() - gaugeH - (this.gaugeHeight() - gaugeH) - 2;
			break;
	}
  }
  
  if (Yanfly.Param.GaugeOutline) {
    color3.paintOpacity = this.translucentOpacity();
	this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    var fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
		this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }

  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);//fillW
};


//draw normal barrier gauge either default right or new left

Window_Base.prototype.drawBarrierGauge = function(actor, wx, wy, ww) {
	
	if(Delsin7.VAB.displayBarrierGauge == true){
		var max = actor[Delsin7.VAB.maxBarrierParam];
		var rate1 = actor.hpRate();
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		var ww2 = ww * rate1;
		this.drawGauge(wx, wy, ww2, 1, color1, color2);
	} else if(Delsin7.VAB.gaugeLeft == true){
		var max = actor[Delsin7.VAB.maxBarrierParam];
		var rate1 = actor.hpRate();
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		var ww2 = ww * rate1;
		this.drawGauge(wx, wy, ww2, 1, color1, color2);
		var rate2 = Math.min(actor.barrierPoints() / max,1);
		var ww3 = ww * rate2;
		var color1 = this.barrierColor1(actor);
		var color2 = this.barrierColor2(actor);
		this.drawGaugeShort(wx, wy, ww3, 1, color1, color2);
	} else {
		if (actor.hp + actor.barrierPoints() > actor.mhp) {
		  var max = actor.mhp + actor.barrierPoints();
		  var rate1 = actor.hp / max;
		} else {
		  var max = actor.mhp;
		  var rate1 = actor.hpRate();
		}
		var rate2 = (actor.barrierPoints() + actor.hp) / max;
		var color1 = this.barrierColor1(actor);
		var color2 = this.barrierColor2(actor);
		this.drawGauge(wx, wy, ww, rate2, color1, color2);
		var color1 = this.hpGaugeColor1();
		var color2 = this.hpGaugeColor2();
		var ww2 = ww * rate1;
		this.drawGauge(wx, wy, ww2, 1, color1, color2);
	}

    return ww;
};

Window_Base.prototype.drawBarrierGauge2 = function(actor, wx, wy, ww) {
	
	var max = actor[Delsin7.VAB.maxBarrierParam] || 0;

	if(max != 0){
		var rate2 = Math.min(actor.barrierPoints() / max,1);
	} else {
		var rate2 = 0;
	}
	var color1 = this.barrierColor1(actor);
	var color2 = this.barrierColor2(actor);
	this.drawGaugeShort(wx, wy, ww, rate2, color1, color2);

    return ww;
};



//barrier number color info added to draw HP override for normal gauge
alias201DrawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width){
	alias201DrawActorHp.call(this, actor, x, y, width);
	if(Delsin7.VAB.displayBarrierNumber == true && Delsin7.VAB.displayBarrierGauge == false && actor.barrierPoints() > 0){
		barrierNumberColor = (this.barrierNumberColorEval(actor) !== undefined) ? this.barrierNumberColorEval(actor) : Delsin7.VAB.displayBarrierNumberColor;

		this.changeTextColor(this.textColor(barrierNumberColor));
		var labelWidth = this.textWidth('HP');
		var valueWidth = this.textWidth('0000');
		var slashWidth = this.textWidth('/');
		var x1 = x + width - valueWidth;
		var x2 = x1 - slashWidth;
		var x3 = x2 - valueWidth;
		if (x3 >= x + labelWidth) {
			this.drawText(String(actor.barrierPoints()), x3-valueWidth, y, 44, 'right');
		} else {
			this.drawText(String(actor.barrierPoints()), x2-(Math.floor(valueWidth*0.75)), y, 44, 'right');
		}
	}
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, width2);
	if(Delsin7.VAB.displayBarrierGauge == true){
		this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
		this.drawActorBp(actor, x2, y + lineHeight * 2, width2);
		this.drawActorMp(actor, x2, y + lineHeight * 3, width2);
		if (Yanfly.Param.MenuTpGauge) {
		  this.drawActorTp(actor, x2, y + lineHeight * 4, width2);
		}
	} else {
		this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
		this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
		if (Yanfly.Param.MenuTpGauge) {
		  this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
		}

	}
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
	if(Delsin7.VAB.displayBarrierGauge == true){
		this.drawActorHp(this._actor, x, y + lineHeight * 2);
		this.drawActorBp(this._actor, x, y + lineHeight * 3);
		this.drawActorMp(this._actor, x, y + lineHeight * 4);
	} else {
		this.drawActorHp(this._actor, x, y + lineHeight * 2);
		this.drawActorMp(this._actor, x, y + lineHeight * 3);
	}
};



if(Imported.YEP_BattleStatusWindow == true){
	Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
		this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
		this._enableYBuffer = true;
		var wy = rect.y + rect.height - this.lineHeight();
		var wymod = (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6;
		var wymod = Math.max(16, wymod);
		if(Delsin7.VAB.displayBarrierGauge == true){
			this.drawActorHp(actor, rect.x, wy - wymod * 2, rect.width);
			this.drawActorBp(actor, rect.x, wy - wymod, rect.width);
		} else {
			this.drawActorHp(actor, rect.x, wy - wymod, rect.width);
		}
		if (this.getGaugesDrawn(actor) <= 2) {
		  this.drawActorMp(actor, rect.x, wy, rect.width);
		} else {
		  var ww = rect.width / 2;
		  this.drawActorMp(actor, rect.x, wy, ww);
		  this.drawActorTp(actor, rect.x + ww, wy, ww);
		}
		this._enableYBuffer = false;
	};
};


Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = Math.floor(parseInt(totalArea * 108 / 300));
    var otW = Math.floor(parseInt(totalArea * 96 / 300));
	if(Delsin7.VAB.displayBarrierGauge == true){
		this.drawActorHp(actor, rect.x + 0, rect.y-50, hpW);
		this.drawActorBp(actor, rect.x + 0, rect.y, hpW);
		this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
		this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
	} else {
		this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
		this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
		this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
	}
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 15;
    var hpW = Math.floor(parseInt(totalArea * 201 / 315));
    var otW = Math.floor(parseInt(totalArea * 114 / 315));
	if(Delsin7.VAB.displayBarrierGauge == true){
		this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
		this.drawActorBp(actor, rect.x + 0, rect.y, hpW);
		this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
	} else {
		this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
		this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
	}
};



Window_Base.prototype.drawActorBp = function(actor, x, y, width){

		width = width || 186;
		this.drawBarrierGauge2(actor, x, y, width);
		this.changeTextColor(this.systemColor());
		var labelWidth = this.textWidth('BP');
		var valueWidth = this.textWidth('0000');
		var slashWidth = this.textWidth('/');
		var x1 = x + width - valueWidth;
		var x2 = x1 - slashWidth;
		var x3 = x2 - valueWidth;

		this.drawText(Delsin7.VAB.barrierParamAbbreviation, x, y, 44);
		this.drawCurrentAndMax(actor.barrierPoints(), actor[Delsin7.VAB.maxBarrierParam], x, y, width, this.normalColor(), this.normalColor());
};


if(Imported.YEP_X_VisualHpGauge == true && Delsin7.VAB.displayBarrierGauge == true){
	
	aliasVabWS1 = Window_VisualHPGauge.prototype.updateWindowSize;
	Window_VisualHPGauge.prototype.updateWindowSize = function() {
		if(Delsin7.VAB.displayBarrierGauge == true) {
			var spriteWidth = this._battler.hpGaugeWidth();
			var width = spriteWidth + this.standardPadding() * 2;
			width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
			var height = Math.max(this.lineHeight(), this.gaugeHeight()*3 + 4);
			height += this.standardPadding() * 2;
			if (Yanfly.Param.VHGShowHP) {
				height += this.gaugeHeight();
			};
			if (width === this.width && height === this.height) return;
			this.width = width;
			this.height = height;
			this.createContents();
			this._requestRefresh = true;
			this.makeWindowBoundaries();
		} else {
			aliasVabWS1.call(this);
		}
	};
	
	aliasVabWHPG1 = Window_VisualHPGauge.prototype.refresh;
	Window_VisualHPGauge.prototype.refresh = function() {
		if(Delsin7.VAB.displayBarrierGauge == true){
			this.contents.clear();
			if (!this._battler) return;
			this._requestRefresh = false;
			var wy = Math.floor((this.contents.height - this.lineHeight()*2)/4);
			var ww = this.contents.width;
			this.drawActorHp(this._battler, 0, wy, ww);
			
			wy += this.gaugeHeight();
			this.drawActorBp(this._battler, 0, wy, ww);
		} else {
			aliasVabWHPG1.call(this);
		}
	};
	
	Window_VisualHPGauge.prototype.drawActorBp = function(actor, x, y, width) {
		width = width || 186;
		var rate = this._displayedValue / actor.mhp;
		width = width || 186;
		if(Yanfly.Param.GaugeOutline == true){//eval(

			var max = actor[Delsin7.VAB.maxBarrierParam];
			if(max != 0){
				var rate = Math.min(actor.barrierPoints() / max,1);
			} else {
				var rate = 0;
			}
			var color1 = this.barrierColor1(actor);
			var color2 = this.barrierColor2(actor);
			this.drawGauge(x, y, width, rate, color1, color2);
		} else {
			this.drawBarrierGauge2(actor, x, y, width);
		}
		this.changeTextColor(this.systemColor());
		y+= this.gaugeHeight() /2;
		if (Yanfly.Param.VHGShowHP) {
			this.changeTextColor(this.systemColor());
			this.drawText(Delsin7.VAB.barrierParamAbbreviation, x, y, 44);
		}
		if (Yanfly.Param.VHGShowValue) {
		    var val = this._displayedValue;
		    var max = actor.mhp;
		    var w = width;
		    var color = this.hpColor(actor);
		    this.drawCurrentAndMax(val, max, x, y, w, color, this.normalColor());
		}

	};
	
	
};

