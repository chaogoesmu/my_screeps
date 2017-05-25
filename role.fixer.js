var roleUpgrader = require('role.upgrader');
//var harv = require('mod.tools');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.fixer');
 * mod.thing == 'a thing'; // true
 */
var roleFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {
		//harv.beep(creep);
		//let people know if we're dying, it's just polite
        if(creep.ticksToLive<10){
            creep.say('Dying ' + creep.ticksToLive);
        }
		
		//if fatigue is run out, dont do anything
        if(creep.fatigue!=0){
		return;
		}
		//AI state
		
		if(creep.memory.MyTask == 1 && creep.carry.energy == 0){
    		creep.memory.MyTask = 0;
    		creep.memory.repairTarget = undefined;
    		creep.say('🔄 harvest ');
		}
		if(creep.memory.MyTask == 0 && creep.carry.energy == creep.carryCapacity)
		{
			creep.memory.MyTask = 1;
		}
		switch(creep.memory.MyTask){
		case 0:
			//hungry, go eat
            getEnergy(creep);
			break;
		case 1:
			//do I already have something to fix? If not find something to fix and say fixit
			var target = Game.getObjectById(creep.memory.repairTarget);
			if(creep.memory.repairTarget == undefined)
			{
                findTarget(creep);
				creep.say('🚧 FIXIT');
			}
			else
			{
				if(target.hits == target.hitsMax)
				{
				    //findTarget(creep);
				    findTarget(creep);
				    var target = Game.getObjectById(creep.memory.repairTarget);
				}
				else
				{
    				if(creep.repair(target) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    				}
				}
				//if theres nothing to fix
				if(target==undefined){
					roleUpgrader.run(creep);
				}
			}
			//go fix something
			break;
		default:
			console.log('agent: ' + creep.name + " the fixer did not have an action.");
			creep.memory.MyTask = 0;
			break;
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




function findTarget(creep)
{
    var repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {    
        filter: (s) => 	(s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)&& s.hits < s.hitsMax});
        
    if(repairTarget!= undefined)
    {
        //console.log(repairTarget);
        creep.memory.repairTarget = repairTarget.id;
    }
    else
    {
        var repairTarget = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
            		return ((s.structureType == STRUCTURE_RAMPART) && (s.hits < s.hitsMax));
            	}
            	
            });
        
        if(repairTarget.length>0){
            repairTarget = repairTarget[0].id;
            console.log('Repairing Defenses :' + repairTarget);
            creep.memory.repairTarget = repairTarget;
        }else{
            var repairTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => {
            		return ((s.structureType == STRUCTURE_WALL) && (s.hits < s.hitsMax));
            	}
            });
            if(repairTarget.length>0){
            repairTarget = repairTarget[0].id;
            	creep.memory.repairTarget = repairTarget;
            	console.log('Repairing Walls :' + repairTarget);
            }
            else
            {
                console.log('couldn\'t find a wall?');
            }
        }
        
    }

}

module.exports = roleFixer;
