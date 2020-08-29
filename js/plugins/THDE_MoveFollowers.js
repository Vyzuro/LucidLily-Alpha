/*:
 * @plugindesc v0.1 Allows to move the followers
 * @author uncle tom - http://www.tomshut.de 
 *
 * @help
 * ============================================================================
 * Purpose
 * ============================================================================
 *
 * Allows to move and transfer the player's followers
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following plugin command transfers a follower on a specific location
 * on the current map.
 *
 *   TransferFollower i x y direction
 *   - Replace 'i' with the index of the follower to be transfered, with  1 
 *     being  the  first  follower.  Replace 'x' and 'y'  with  the x and y 
 *     coordinates  on  the map  where the  follower should  be placed, and 
 *     'direction' with either 'down', 'left', 'right' or 'up' to determine
 *     the facing of the follower. The direction may be omitted.
 *
 * The following plugin command turns the follower into a given direction.
 *
 *   TurnFollower i direction
 *   - Replace 'i' with the index of the follower, with 1 being the  first 
 *     one. Replace  'direction'  with  either  'down', 'left', 'right' or  
 *     'up' to determine the facing of the follower.
 *
 * The following plugin command moves the follower one step.
 *
 *   MoveFollower i direction
 *   - Replace 'i' with the index of the follower, with 1 being the  first 
 *     one. Replace  'direction'  with  either  'down', 'left', 'right' or  
 *     'up' to determine in which direction the follower should move.
 */

var THDE = THDE || {};
THDE.MFL = THDE.MFL || {};	
	

THDE.MFL.pluginCommand = Game_Interpreter.prototype.pluginCommand;

	
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    THDE.MFL.pluginCommand.call(this, command, args);     
    if (command === 'TransferFollower') {	
        var index = Number(args[0]) - 1;	
	if ($gamePlayer.followers()._data.length > index) {
	    var follower = $gamePlayer._followers._data[index];
	    var x = Number(args[1]);
	    var y = Number(args[2]);
	    var direction = follower.direction();
	    if (args.length > 3) {
	        if (args[3] === 'down') {
		    direction = 2;
	        }
	        if (args[3] === 'left') {
		    direction = 4;
	        }
	        if (args[3] === 'right') {
		    direction = 6;
	        }
	        if (args[3] === 'up') {
		    direction = 8;
	        }
	    }	    
	    follower.locate(x, y);
	    follower.setDirection(direction);
	    follower.refresh();
	    
	}
    } else if (command === 'TurnFollower') {	
        var index = Number(args[0]) - 1;	
	if ($gamePlayer.followers()._data.length > index) {
	    var follower = $gamePlayer._followers._data[index];	    
	    var direction = follower.direction();	    
	    if (args[1] === 'down') {
	        direction = 2;
	    }
	    if (args[1] === 'left') {
	        direction = 4;
	    }
	    if (args[1] === 'right') {
	        direction = 6;
	    }
	    if (args[1] === 'up') {
	        direction = 8;
	    }	    
	    follower.setDirection(direction);
	    follower.refresh();	    
	}
    } else if (command === 'MoveFollower') {	
        var index = Number(args[0]) - 1;	
	if ($gamePlayer.followers()._data.length > index) {
	    var follower = $gamePlayer._followers._data[index];	    
	    var direction = follower.direction();	    
	    if (args[1] === 'down') {
	        direction = 2;
	    }
	    if (args[1] === 'left') {
	        direction = 4;
	    }
	    if (args[1] === 'right') {
	        direction = 6;
	    }
	    if (args[1] === 'up') {
	        direction = 8;
	    }	    
	    follower.moveStraight(direction);
	    follower.refresh();	    
	}
    }   
};