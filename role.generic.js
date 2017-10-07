//var actBuilder = require('action.builder');
var actHarvest = require('action.harvest');
var actDeposit = require('action.deposit');
var actResupply = require('action.resupply');

var roleGeneric = {
    run: function(creep) {
    
        switch(creep.memory.action){
            case 'harvest':
                actHarvest.run(creep);
                break;
            case 'deposit':
                actDeposit.run(creep);
                break;
            default:
                //console.log('no action taken');
                break;
        }
    }

};

module.exports = roleGeneric;