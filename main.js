var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleMule = require('role.mule');
var roleTick = require('role.tick');
var roleForager = require('role.forager');
var roleLDTick = require('role.LDTick');
var roleLDMule = require('role.LDMule');

module.exports.loop = function () {
var MaxHarvest = 0;
var MaxBuilder = 1;
var MaxUpgrader = 1;
var MaxFixer =1;
var MaxMule = 3;
var MaxTick = 2;
var MaxForager =0;
var MaxLDMule = 0;
var MaxLDTick = 0;
var MaxForager3 =0;
var MaxForager7 =0;


    var tower = Game.getObjectById('59845a1d1d893843684ddbe8');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

	for(let name in Memory.creeps)
	{
		if(Game.creeps[name]==undefined)
		{
			delete Memory.creeps[name];
		}
	}


	var MyCreeps = [0,0,0,0,0,0,0,0,0,0,0];
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		switch(creep.memory.role){
            case 'harvester':
                roleHarvester.run(creep);
    			MyCreeps[0]+=1;
    			break;
            case 'upgrader':
                roleUpgrader.run(creep);
    			MyCreeps[1]+=1;
    			break;
            case 'builder':
                roleBuilder.run(creep);
    			MyCreeps[2]+=1;
                break;
            case 'fixer':
                roleFixer.run(creep);
    			MyCreeps[3]+=1;
                break;
            case 'mule':
                roleMule.run(creep);
    			MyCreeps[4]+=1;
                break;
            case 'tick':
                roleTick.run(creep);
    			MyCreeps[5]+=1;
                break;
            case 'forager':
                if(creep.memory.MyTravel == 1)
                {
                    MyCreeps[6]+=1;
                    roleForager.run(creep);
                    
                }
                if(creep.memory.MyTravel == 7)
                {
                    MyCreeps[10]+=1;
                    roleForager.run(creep);
                }
                if(creep.memory.MyTravel == 3)
                {
                    MyCreeps[9]+=1;
                    roleForager.run(creep);
                }
                break;
            case 'ldtick':
                roleLDTick.run(creep);
                MyCreeps[7]+=1
                break;
            case 'ldmule':
                roleLDMule.run(creep);
                MyCreeps[8]+=1
                break;
    		default:
    		break;
		}
    }
	if (Game.spawns['Spawn.Prime'].room.energyAvailable == Game.spawns['Spawn.Prime'].room.energyCapacityAvailable && !Game.spawns['Spawn.Prime'].spawning)
	{
	    //console.log(MyCreeps.toString());
		if(MyCreeps[0]<MaxHarvest)
		{
		    spawnGeneral('Spawn.Prime', 'harvester');
		}
		else
		{
    		if(MyCreeps[1]<MaxUpgrader)
    		{
    			spawnGeneral('Spawn.Prime', 'upgrader');
    		}
    		else
    		{
        		if(MyCreeps[2]<MaxBuilder)
        		{
        			spawnGeneral('Spawn.Prime', 'builder');
        		}
        		else
        		{
    				if(MyCreeps[3]<MaxFixer)
            		{
            		    spawnGeneral('Spawn.Prime', 'fixer');
            		}
            		else
            		{
    		    		if(MyCreeps[4]<MaxMule)
                		{
                		    Memory.isbusy=true;
                			//spawn harvester
                			var name = Game.spawns['Spawn.Prime'].createCreep( [CARRY, CARRY,CARRY, CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,{role:'mule'} );
                			console.log('Spawning: Mule '+ name);
                		}
                		else
                		{
        		    		if(MyCreeps[5]<MaxTick)
                    		{
                    		    Memory.isbusy=true;
                    			//spawn tick
                    			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK,WORK,WORK,WORK, WORK,MOVE], undefined,{role:'tick'} );
                    			console.log('Spawning: Tick '+ name);
                    		}
                    		
                    		else
                    		{
            		    		if(MyCreeps[6]<MaxForager)
                        		{
                        		    Memory.isbusy=true;
                        			//spawn tick
                        			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, CARRY,  MOVE, MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 1} );
                        			console.log('Spawning: Forager '+ name);
                        		}
                        		else
                        		{
                		    		if(MyCreeps[8]<MaxLDMule)
                            		{
                            		    Memory.isbusy=true;
                            			//spawn harvester
                            			var name = Game.spawns['Spawn.Prime'].createCreep( [CARRY, CARRY,MOVE,MOVE], undefined,{role:'ldmule'} );
                            			console.log('Spawning: Mule '+ name);
                            		}
                            		else
                            		{
                    		    		if(MyCreeps[7]<MaxLDTick)
                                		{
                                		    Memory.isbusy=true;
                                			//spawn harvester
                                			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, WORK ,MOVE,MOVE], undefined,{role:'ldtick'} );
                                			console.log('Spawning: Mule '+ name);
                                		}
                                		else
                                		{
                        		    		if(MyCreeps[9]<MaxForager3)
                                    		{
                                    		    Memory.isbusy=true;
                                    			//spawn tick
                                    			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, CARRY, CARRY,  MOVE,MOVE, MOVE, MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 3} );
                                    			console.log('Spawning: Forager '+ name);
                                    		}
                                		    else
                                		    {
                            		    		if(MyCreeps[10]<MaxForager7)
                                        		{
                                        		    Memory.isbusy=true;
                                        			//spawn tick
                                        			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, CARRY, CARRY,  MOVE,MOVE, MOVE, MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 7} );
                                        			console.log('Spawning: Forager '+ name);
                                        		}
                                		    }
                                		}
                            		}
                        		}
                    		}
                		}
            		}
        		}
    		}
    	}
	}
	else
	{
	    if(MyCreeps[4]<1 && MyCreeps[5]<1 && MyCreeps[0]<1)//just in case, if there are no ticks, harvesters or mules, spawn a harvester
	    {
	        Game.spawns['Spawn.Prime'].createCreep( [WORK, CARRY,MOVE,MOVE], undefined,{role:'harvester'} );
	    }
	}

	if(Memory.report == true)
	{
	    console.log('harvester/upgrader/builder/' + MyCreeps.toString());
	    Memory.report = false;
	}
    
}
function spawnGeneral(spawnPoint, typeOfSpawn)
{
    var top = Game.spawns[spawnPoint].room.energyCapacityAvailable;
    var loop = top/250;
    var i=1;
    var body = [];
    while(i<loop)
    {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        body.push(MOVE);
        i++;
    }
    Memory.isbusy=true;
	var name = Game.spawns[spawnPoint].createCreep( body, undefined,{role:typeOfSpawn} );
	console.log('Spawning: '+typeOfSpawn+ ', ' + name);
}