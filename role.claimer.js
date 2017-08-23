module.exports = {
    run: function(creep) {
        if(creep.room.name === creep.memory.target) {
            let controller = creep.room.controller;
            let error = creep.reserveController(controller);
            if(error === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
            creep.say('☩');
        } else {
            creep.say(creep.memory.target);
            let currentRoom = creep.room;
            let exit = currentRoom.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});
        }

    }
};