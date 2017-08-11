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
var MaxUpgrader = 2;
var MaxFixer =2;
var MaxMule = 3;
var MaxTick = 2;
var MaxForager =0;
var MaxLDMule = 0;
var MaxLDTick = 0;
var MaxForager3 =2;
var MaxForager5 =4;

    //rip this into its own function so eventually I can just do a find towers in room and run them, not needed yet, quick and dirty fix for now
    var tower = Game.getObjectById('59845a1d1d893843684ddbe8');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else
        {
            
            var rampRepair = tower.room.find(FIND_STRUCTURES, {filter: s=> s.structureType == STRUCTURE_RAMPART});
            for (let ramps of rampRepair)
            {
                if(ramps.hits < 50000)
                {
                    tower.repair(ramps);
                }
            }
            
        }
    }
    var tower = Game.getObjectById('5986d1badb74933f00bf440d');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else
        {
            
            var rampRepair = tower.room.find(FIND_STRUCTURES, {filter: s=> s.structureType == STRUCTURE_RAMPART});
            for (let ramps of rampRepair)
            {
                if(ramps.hits < 50000)
                {
                    tower.repair(ramps);
                }
            }
            
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
                if(creep.memory.MyTravel == 5)
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
		if(MyCreeps[4]<MaxMule)
		{
			//spawn harvester
			var name = Game.spawns['Spawn.Prime'].createCreep( [CARRY, CARRY,CARRY, CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY, CARRY,CARRY, CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined,{role:'mule'} );
			console.log('Spawning: Mule '+ name);
		}
		else
		{
			if(MyCreeps[5]<MaxTick)
			{
				//spawn tick
				var name = Game.spawns['Spawn.Prime'].createCreep( [WORK,WORK,WORK,WORK, WORK,MOVE,MOVE,MOVE], undefined,{role:'tick'} );
				console.log('Spawning: Tick '+ name);
			}
			else
			{
				if(MyCreeps[0]<MaxHarvest)
				{
					spawnGeneral('Spawn.Prime', 'harvester',8);
				}
				else
				{
					if(MyCreeps[1]<MaxUpgrader)
					{
						spawnGeneral('Spawn.Prime', 'upgrader',6);
					}
					else
					{
						if(MyCreeps[2]<MaxBuilder)
						{
							spawnGeneral('Spawn.Prime', 'builder',6);
						}
						else
						{
							if(MyCreeps[3]<MaxFixer)
							{
								spawnGeneral('Spawn.Prime', 'fixer',3);
							}
							else
							{
            		    		if(MyCreeps[6]<MaxForager)
                        		{
                        			//spawn tick
                        			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, CARRY,  MOVE, MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 1} );
                        			console.log('Spawning: Forager '+ name);
                        		}
                        		else
                        		{
                		    		if(MyCreeps[8]<MaxLDMule)
                            		{
                            			//spawn harvester
                            			var name = Game.spawns['Spawn.Prime'].createCreep( [CARRY, CARRY,MOVE,MOVE], undefined,{role:'ldmule'} );
                            			console.log('Spawning: Mule '+ name);
                            		}
                            		else
                            		{
                    		    		if(MyCreeps[7]<MaxLDTick)
                                		{
                                			//spawn harvester
                                			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, WORK ,MOVE,MOVE], undefined,{role:'ldtick'} );
                                			console.log('Spawning: Mule '+ name);
                                		}
                                		else
                                		{
                        		    		if(MyCreeps[9]<MaxForager3)
                                    		{
                                    			//spawn tick
                                    			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, CARRY, CARRY,WORK, WORK, CARRY, CARRY,  MOVE,MOVE,  MOVE,MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 3} );
                                    			console.log('Spawning: Forager '+ name);
                                    		}
                                		    else
                                		    {
                            		    		if(MyCreeps[10]<MaxForager5)
                                        		{
                                        			//spawn tick
                                        			var name = Game.spawns['Spawn.Prime'].createCreep( [WORK, WORK, CARRY, CARRY,  MOVE,MOVE, MOVE, MOVE], undefined,{role:'forager', MyHome:Game.spawns['Spawn.Prime'].room.name, MyTravel: 5} );
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
function spawnGeneral(spawnPoint, typeOfSpawn, max = -1)
{
    var top = Game.spawns[spawnPoint].room.energyCapacityAvailable;
    var loop = top/250;
    var i=1;
    var body = [];
	if(max > 0)
	{
		if(max<loop)
		{
			loop=max;
		}
	}
    while(i<loop)
    {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        body.push(MOVE);
        i++;
    }
	var name = Game.spawns[spawnPoint].createCreep( body, undefined,{role:typeOfSpawn} );
	console.log('Spawning: '+typeOfSpawn+ ', ' + name);
}