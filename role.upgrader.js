var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.fatigue==0){
            if(!creep.memory.upgrading) {
                getEnergy(creep);
                }
            }
    	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.upgrading = true;
    	        creep.say('⚡ upgrade');
    	    }
    	    if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(creep.memory.upgrading && creep.carry.energy == 0)
            {
                creep.say('🔄 harvest');
                creep.memory.upgrading = false;
            }
        }
    };

function getEnergy(creep)
{
    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE) && (structure.store.energy > creep.carryCapacity-creep.carry.energy);
                }
        });
        if(target!= undefined) {
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else
        {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔄 harvest');
            }
        }
}
module.exports = roleUpgrader;