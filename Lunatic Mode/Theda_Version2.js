// Display cost
<Custom Cost Display>
\fs[20]\c[23]All MP\c[0]\fr
</Custom Cost Display>

// Requires user to have at least 1 MP
<Custom Requirement>
value = user.mp > 0;
</Custom Requirement>

<Pre-Damage Eval>
var chance = user.mpRate();
var deathStateId = target.deathStateId();
chance *= target.stateRate(deathStateId);

if(Math.random() < chance){
value = 0;
}
</Pre-Damage Eval>

<Post-Damage Eval>
// Check if the target isn't a boss
if (!target.isStateCategoryAffected('boss')) {
  // Get the target's death state ID
  var deathStateId = target.deathStateId();
  // Calculate the chance based on the user's current MP%
  var chance = user.mpRate();
  // Alter that based on the target's death resistance
  chance *= target.stateRate(deathStateId);
  // Check RNG if it passed
  if (value == 0) {
    // Check if the target is temporarily immortal from action sequences
    if (target.isImmortal()) {
      // If it is, remove the temporary immortal status
      target.removeImmortal();
    }
	// Set the damage to 0
	value = 0;
	// Remove the HP popups
	target.result().hpAffected = false;
    // Add the death state
    target.addState(deathStateId);
  }
}
</Post-Damage Eval>

<After Eval>
// Set user's MP to 0
user.setMp(0);
<After Eval>