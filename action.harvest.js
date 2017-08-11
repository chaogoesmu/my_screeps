var actHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(!target)
        {
            if(creep.memory.MySource == undefined)
            {
                console.log(creep.name + ' Does not have a source yet, re-acquiring');
        	    creep.memory.MySource = creep.pos.findClosestByPath(FIND_SOURCES);
        	    if (creep.memory.MySource != undefined)
        	    {
        	        creep.memory.MySource = creep.memory.MySource.id;
        	    }
            }
            else
            {
                var source = Game.getObjectById(creep.memory.MySource)
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})== ERR_NO_PATH){
                            creep.memory.MySource == undefined;
                            console.log(creep.name  + ' Unable to find path');
                            creep.memory.MySource = undefined;
                    }
                }
            }
        }
        else
        {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(target);
                creep.say('5secRule'); 
            }
        }
    }
};

module.exports = actHarvest;