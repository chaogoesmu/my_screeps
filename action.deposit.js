var actDeposit = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(_.sum(creep.carry) != creep.carry.energy)
        {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) ;
                    }
                });
                //TODO: figure out what the command for deposit all is
                if(target != undefined) {
                    creep.moveTo(target);
                   for(const resourceType in creep.carry) {
                        creep.transfer(target, resourceType);
                    }  
                }
        }
        else
        {
        	var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        		filter: (structure) => {
        			return (structure.structureType == STRUCTURE_EXTENSION ||
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
    					(structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
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
    					//roleUpgrader.run(creep);
    					console.log(creep.memory.role + ' ' + creep.name + ' couldn\'t find a dropoff in room ' + creep.room.name);
    				}
    			}
        	}
        }
	}
};


module.exports = actDeposit;