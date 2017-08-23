const roleLDRepairman = require('role.ldrepairman');
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
                let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (site!==undefined&&site!==null) {
                    if (creep.build(site) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(site);
                    }
                }else{
                    roleLDRepairman.run(creep);
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