/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.scout');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {

        if (creep.room.name === creep.memory.target) {
                creep.moveTo(Game.flags.Crusader);
        }else{
            let exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});
            creep.say('☩');
        }
        return creep.room;
    }
};