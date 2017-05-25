var roleLDTick = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.fatigue!=0){
			return;
		}
        if(creep.memory.MyContainer == undefined)
        {
            creep.memory.MyTask = -1;
        }
        if(creep.ticksToLive==30){
            Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK,WORK,MOVE, MOVE, MOVE], undefined,{role:'ldtick'} );
        }
		
		switch(creep.memory.MyTask){
			case 0://get more energy
				FindMoveContainer(creep);
			    break;
			case 1://go fill somethings energy
                creep.harvest(Game.getObjectById(creep.memory.MySource));
			    break;
		   case 2://leave home
		        if(creep.memory.MyHome != creep.room.name) {
		            //weird way of doing it, but every tick if standing on the arrows you flip flop back and forth
		            //this way, you move before it has a chance to send you back.
		            FindMoveContainer(creep);
		            creep.memory.MyTask =0;
		        }
		        else
		        {
		            rambleon(creep, 7);
		        }
                break;
		    default://uhoh
    			console.log('initializing LDtick');
    			creep.memory.MyContainer = 0;
    			creep.memory.MySource = 0;
    			creep.memory.MyTask = 2;
    			creep.memory.MyHome=creep.room.name;
    			break;
		}
	}
};

function rambleon(creep, direct)//change rooms, direct 1 north 3 is east, clockwise
{
exitDir = Game.map.findExit(creep.room, Game.map.describeExits(creep.room.name)[direct]);
exit = creep.pos.findClosestByRange(exitDir);
creep.moveTo(exit);

}

function FindMoveContainer(creep)
{
    if(creep.memory.MyContainer == 0)
    {
        var creepsInRoom = creep.room.find(FIND_MY_CREEPS);
        let sources = creep.room.find(FIND_SOURCES);
        // iterate over all sources
        for (let source of sources) {
        	// if the source has no miner
        	if (!_.some(creepsInRoom, c => c.memory.role == 'ldtick' && c.memory.MySource == source.id)) 
        	{
        		// check whether or not the source has a container
        		let containers = source.pos.findInRange(FIND_STRUCTURES, 1, 
        		{
        			filter: s => s.structureType == STRUCTURE_CONTAINER
        		});
        		
        		// if there is a container next to the source
        		if (containers!= undefined) {
        			creep.memory.MyContainer = containers[0].id;
        			creep.memory.MySource = source.id;
        			break;
        		}
        		else
        		{
        		    console.log('not finding containers');
        		}
        	}
        }
    }
    if(creep.memory.MyContainer == 0)
    {
        console.log('no container found');
    }
    creep.moveTo(Game.getObjectById(creep.memory.MyContainer));
    if (creep.pos.isEqualTo(Game.getObjectById(creep.memory.MyContainer))) 
    {
        creep.memory.MyTask = 1;
    }
}

module.exports = roleLDTick;