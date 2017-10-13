//var actBuilder = require('action.builder');
var actHarvest = require('action.harvest');
var actDeposit = require('action.deposit');
var actResupply = require('action.resupply');

var roleGeneric = {
    run: function(creep) {
        
        if(creep.carry.energy ==0){
            creep.memory.action = 'resupply';//change this later to be targetted, works for now.
        }
        
    
        switch(creep.memory.action){
            case 'harvest':
                amifull(creep);
                actHarvest.run(creep);
                break;
            case 'deposit':
                actDeposit.run(creep);
                break;
            case 'repair':
                target = Game.getObjectById(creep.memory.target);
                if(target.hits == target.hitsMax){
                    creep.memory.action = 'idle';
                    break;
                }
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
				}
                break;
            case 'resupply':
                amifull(creep);
                actResupply.run(creep);
                break;
            case 'build' :
                target = Game.getObjectById(creep.memory.target);
                if (target==undefined)
                {
                    creep.memory.action = 'idle';
                    break;
                }
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
				}
                break;
            case 'idle' :
                creep.say('idling');
                break;
            //ehhhh.... no idea brains starting to melt
            default:
                //console.log('no action taken');
                break;
        }
    }

};

function amifull(creep)
{
    if(creep.carry.energy == creep.carryCapacity)
    {
        creep.memory.action = 'idle';
    }
}

module.exports = roleGeneric;