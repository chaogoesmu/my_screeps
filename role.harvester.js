var roleUpgrader = require('role.upgrader');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.fatigue!=0){
			return;
		}
		if(creep.memory.MyTask != 0 && creep.carry.energy == 0)
		{
			creep.memory.MyTask = 0;
			creep.say('🔄 harvest');
		}
		if(creep.memory.MyTask !=1 && creep.carry.energy == creep.carryCapacity)
		{
			creep.memory.MyTask = 1;
			creep.say('⚡ Resupply');
		}

		
		switch(creep.memory.MyTask){
			case 0://get more energy
				forage(creep);
			break;
			case 1://go fill somethings energy
    			deposit(creep);
			break;
			default://uhoh
			creep.memory.MyTask = 1;
			break;
		}
	}
};
function forage(creep)
{
	var source = creep.pos.findClosestByPath(FIND_SOURCES);
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}
function deposit(creep)
{
				var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
						}
					});
				if(target!=undefined) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
				else
				{
				    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && (structure.store.energy < structure.storeCapacity );
                            }
                    });
                    if(target != undefined) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    }
                    else{
                        roleUpgrader.run(creep);
                    }
				}
}

module.exports = roleHarvester;