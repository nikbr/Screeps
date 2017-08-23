module.exports = {
    run: function(creep) {
        if (creep.memory.working  && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            if (creep.room.name === creep.memory.target) {
                let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
                });
                if (structure!==undefined&&structure!==null) {
                    if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }else{
                creep.moveTo(Game.rooms[creep.memory.target].controller);
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        } else {
            if(creep.room.name === creep.memory.target) {
                let source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }

    }
};