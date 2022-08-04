// Store the size of each row before anyone fucking moves
var row1 = $gameParty.rowSize(1);
var row2 = $gameParty.rowSize(2);
var row3 = $gameParty.rowSize(3);
var row4 = $gameParty.rowSize(4);
var user = target.actorId(); 

//Store members
var members = target.friendsUnit().aliveMembers();
// Loop through each member.
for (var i = 0; i < members.length; ++i) {

  //Get current looped member
  var member = members[i];
  
  if(member.actorId() == user){
  continue;
  }
  
  if(member.row() == 1){
  continue;
  }
  
  if(member.row() == 2 && row1 == 0){
  member.setRow(1)
  continue;
  }
  
  if(member.row() == 3 && row2 == 0){
  member.setRow(2)
  continue;
  }
  
  if(member.row() == 4 && row3 == 0){
  member.setRow(3)
  }
}