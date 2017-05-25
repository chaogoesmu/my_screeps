var harv = require('mod.tools');
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
        harv.beep(creep);
    }
};

module.exports = roleTesting;