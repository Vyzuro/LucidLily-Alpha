<Custom Apply Effect>
// Check if user is an actor.
if (user.isActor()) {
  // Archive the previous settings.
  user._prevCharName = user._prevCharName || user._characterName;
  user._prevCharIndex = user._prevCharIndex || user._characterIndex;
  user._prevFaceName = user._prevFaceName || user._faceName;
  user._prevFaceIndex = user._prevFaceIndex || user._faceIndex;
  user._prevBattlerName = user._prevBattlerName || user._battlerName;
  // Check if the actor ID is 2.
  if (user.actorId() === 2) {
    // The filename of the character graphic without the file extension.
    var charName = 'cherri_walk';
    // The index of the character graphic used.
    var charIndex = 0;
    // The filename of the face graphic without the file extension.
    var faceName = 'startingActorsKK_face';
    // The index of of the face graphic used.
    var faceIndex = 3;
    // The filename of the battler graphic without the file extension.
    var battlerName = 'cherri_battler';
  }
    // Changes the character image to the setting applied from above.
  user.setCharacterImage(charName, charIndex);
  // Changes the face image to the setting applied from above.
  user.setFaceImage(faceName, faceIndex);
  // Changes the battler image from the setting applied from above.
  user.setBattlerImage(battlerName);
  // Refreshes the user's appearance.
  user.refresh();
}
</Custom Apply Effect>

<Custom Remove Effect>
// Retrieve archived settings.
var charName = user._prevCharName;
var charIndex = user._prevCharIndex;
var faceName = user._prevFaceName;
var faceIndex = user._prevFaceIndex;
var battlerName = user._prevBattlerName;
// Changes the character image to the archived setting.
user.setCharacterImage(charName, charIndex);
// Changes the face image to the archived setting.
user.setFaceImage(faceName, faceIndex);
// Changes the battler image from the archived setting.
user.setBattlerImage(battlerName);
// Clear archived data.
user._priorityCharacterName = undefined;
user._priorityCharacterIndex = undefined;
user._prevFaceName = undefined;
user._prevFaceIndex = undefined;
user._priorityFaceName = undefined;
user._priorityFaceIndex = undefined;
user._prevFaceName = undefined;
user._prevFaceIndex = undefined;
user._priorityBattlerName = undefined;
user._prevBattlerName = undefined;
// Refreshes the user's appearance.
user.refresh();
</Custom Remove Effect>