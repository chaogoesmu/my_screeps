var actHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
    if(creep.memory.MySource == undefined)
    {
        console.log(creep.name + ' Does not have a source yet, re-acquiring');
	    creep.memory.MySource = creep.pos.findClosestByPath(FIND_SOURCES).id;
    }
    var source = Game.getObjectById(creep.memory.MySource)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        if(creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}})== ERR_NO_PATH){
                creep.memory.MySource == undefined;
                console.log(creep.name  + ' Unable to find path');
                creep.memory.MySource = creep.pos.findClosestByPath(FIND_SOURCES).id;
            }
        }
    }
};

module.exports = actHarvest;