    var result = this._result;

    // Since we dont know which child is used for, we use this.getCild(...)to get the correct
    // sprite of the current effect.

    // Damage Numbers expect blocked damage
    if ((result.hpDamage > 0 || result.mpDamage > 0 || result.tpDamage > 0) && (Imported.YEP_AbsorptionBarrier || !result._barrierAffected)) {
    	var sprite = this.getChild("number");
    	var d = this._duration;
		var durationNumber = 

    	sprite.scale.x = Math.min(1, sprite.scale.x + 0.05);
    	sprite.scale.y = Math.min(1, sprite.scale.y + 0.05);    	

    	if (this._target.isEnemy()) {
			if(this._duration/2 > this._duration){
				sprite.y -= 1;
			}
			
    	} else if (this._target.isActor()) {
			if(this._duration/2 > this._duration){
				sprite.y -= 1;
			}
    	}
    }


    // Critical Effect on numbers
    if (result.critical) {
        var sprite = this.getChild("number");
        var d = this._critDuration;
        sprite.scale.x = Math.min(2, Math.max(1, (this.getFullCritDuration() / 100 * d)));
        sprite.scale.y = sprite.scale.x;   
    }

    
    // Healing Numbers
    if ((result.hpDamage < 0 || result.mpDamage < 0 || result.tpDamage < 0) || (Imported.YEP_AbsorptionBarrier && result._barrierAffected)) {
        if (!this._critDuration > 0){
            var sprite = this.getChild("number");

            sprite.scale.x = 1;
            sprite.scale.y = 1;

            var d = this._duration;
            sprite.y -= 0.4;
	        if (d < 10) sprite.opacity = 255 * d / 10
        }
    }

    // Missing animation
    if (result.missed || result.evaded) {
        var sprite = this.getChild("miss");
     	if (this._target.isEnemy()) {
			sprite.x -= 0.5;
			sprite.y = (0.1 * Math.pow(sprite.x, 2) + (5 * sprite.x));
    	} else if (this._target.isActor()) {
			sprite.x += 0.5;
			sprite.y = -(-0.1 * Math.pow(sprite.x, 2) + (5 * sprite.x));
    	}
    }

    // State effect
    if (result.addedStates.length > 0 || result.removedStates.length > 0) {
        var sprite = this.getChild("state");
       	sprite.y -= 0.5;
    }

    // Buff effect
    if (result.addedBuffs.length > 0 || result.removedBuffs.length > 0) {
        var sprite = this.getChild("buff");
       	sprite.y -= 0.5;
    }

    // Global Opacity
    if (this._duration < 10) {
    	this.opacity = 255 * this._duration / 10;
    }