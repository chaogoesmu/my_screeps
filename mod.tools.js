var actTravel = require('action.travel');
var actDeposit = require('action.deposit');
var actHarvest = require('action.harvest');

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('mod.tools');
 * mod.thing == 'a thing'; // true
 */
var harv={
    /** @param {Creep} creep **/
    run: function(creep){
	    if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.say('🔄 harvest');
            }
        }

    }
    /** @param {Creep} creep **/
    beep: function(creep){
        creep.say('beep');
    }
}

var depositEToContainer={
    run: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.energy < structure.storeCapacity );
                }
        });
        if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        }
    }
}
var withdrawEFromContainer={
    run: function(creep){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.energy > creep.CARRY_CAPACITY-creep.carry.energy);
                    }
            });
            if(targets.length > 0) {
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            }
        }
    }

module.exports = harv;