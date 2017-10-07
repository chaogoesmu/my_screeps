var roleGeneric = require('role.generic');

var runRoom = {

    /** @param {Creep} creep **/
    run: function(RoomName) {
        myRoom = Game.rooms['RoomName'];
        //go through all the creeps and find the ones under control for this room
		var ThisRoomsCreeps = Game.creeps;
		
		ThisRoomsCreeps = _(ThisRoomsCreeps).filter({memory: {myRoom: RoomName}}).value();
		var generic =0;
		
		//not sure why I have to use this method
		for(var name in ThisRoomsCreeps)
		{
		    var creep = ThisRoomsCreeps[name];
			//run the code and tally the things
			if(creep.memory.role == 'generalist')
			{
			    generic ++;
			    roleGeneric.run(creep);
			}
		}
		//respawn code here
		if(generic == 0)
		{
		    Game.spawns['Spawn.Prime'].createCreep( [ WORK, CARRY,MOVE], undefined,{role:'generalist', myRoom:RoomName} );
		}
		
	}
}

function findBuildTarget(myRoom)
{
	
	var targets = myRoom.find(FIND_CONSTRUCTION_SITES);
    if(targets != undefined)
    {
		creep.memory.MyTarget = targets.id;
    }

}

module.exports = runRoom;
/*
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		switch(creep.memory.role){
		*/