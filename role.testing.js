/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fixer');
 * mod.thing == 'a thing'; // true
 */
var roleTesting = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
	    if(creep.memory.birth == undefined)
	    {
	        creep.memory.birth =Game.time;
	        creep.memory.home = creep.room.name;
	    }
	    if(creep.memory.home == creep.room.name)
	    {
	        creep.memory.lookieme = Game.map.describeExits(creep.room);
            exitDir = Game.map.findExit(creep.room, creep.memory.lookieme[7]);
            exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit);
	    }
	    else
	    {
	        //do stuff in the other room.
	       fetch(creep); 
	    }
	    
    }
};
function fetch(creep)
{
    var source = creep.pos.findClosestByPath(FIND_SOURCES);
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    
}
module.exports = roleTesting;