var actResupply = require('action.resupply');


var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.fatigue==0){
            if(!creep.memory.upgrading) {
                actResupply.run(creep);
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
                creep.say('🔄 Resupply');
                creep.memory.upgrading = false;
            }
        }
    };

module.exports = roleUpgrader;