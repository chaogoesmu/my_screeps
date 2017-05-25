var roleLDMule = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var MyCost = 200;
        var profit = creep.memory.deliveries*creep.carryCapacity-MyCost;
        if(creep.ticksToLive<2){
            creep.say('Dying ' + creep.ticksToLive);
            console.log('forager '+creep.name+ ' made ' + creep.memory.deliveries + ' deposits total profit: ' + profit );
        }
        //AI states are 0 get energy, 1 deposit energy, 2 leave home, 3 return home, 4 builder, 5 repairer
        if(creep.fatigue!=0){//save cpu cycles
			return;
		}
		
		switch(creep.memory.MyTask){
			case 0://get more energy
                
                if(creep.carry.energy == creep.carryCapacity || creep.memory.MyHome == creep.room.name) {//if we're full and already paid for ourselves, lets improve infrastructure
                    creep.memory.MyTask = 3;
                    break;
                }
                getEnergy(creep);
			    break;
			case 1://go fill somethings energy
				depositEnergy(creep);
				if(creep.carry.energy == 0) {
				    creep.memory.deliveries+=1;//keep track of how much we are making/losing with this expedition
				    creep.memory.MyTask =2;
				    //console.log('forager '+creep.name +' trip took ' + (Game.time-creep.memory.MyTrip));
				    //creep.memory.MyTrip = Game.time;
				}
			    break;
		   case 2://leave home
		        if(creep.memory.MyHome != creep.room.name) {
		            //weird way of doing it, but every tick if standing on the arrows you flip flop back and forth
		            //this way, you move before it has a chance to send you back.
		            getEnergy(creep);
		            creep.memory.MyTask =0;
		        }
		        else
		        {
		            rambleon(creep, 7);
		        }
                break;
            case 3://go home
                if(creep.memory.MyHome == creep.room.name) {
                    depositEnergy(creep);
                    creep.memory.MyTask =1;
                }
                else
                {
                    rambleon(creep, 3);
                }
                break;

                break;
            case 5://repair infrastructure

                break;
			default://uhoh
			creep.memory.MyHome = creep.room.name;
		    creep.memory.deliveries = 0;
		    creep.memory.MyTask = 2;
		    //creep.memory.MyTrip = Game.time;
			console.log('initializing LDMule AI');
			break;
		}
	}
};

function rambleon(creep, direct)//change rooms, direct 1 north 3 is east, clockwise
{
exitDir = Game.map.findExit(creep.room, Game.map.describeExits(creep.room.name)[direct]);
exit = creep.pos.findClosestByRange(exitDir);
creep.moveTo(exit);

}

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
}




function depositEnergy(creep)//stripped down from the harvester as I only want containers
{

    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.energy < structure.storeCapacity );
            }
    });
    if(target != undefined) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        else
        {
            for(const resourceType in creep.carry) {
                creep.transfer(target, resourceType);
            }
        }
    }
    else{
    	//fixed the results of this. console.log('somethings gone wrong in forager');
    }
    
}


module.exports = roleLDMule;