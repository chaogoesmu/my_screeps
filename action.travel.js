var actTravel = {

    /** @param {Creep} creep **/
    run: function(creep, direct) {
    exitDir = Game.map.findExit(creep.room, Game.map.describeExits(creep.room.name)[direct]);
    exit = creep.pos.findClosestByRange(exitDir);
    creep.moveTo(exit);
    }
};


module.exports = actTravel;