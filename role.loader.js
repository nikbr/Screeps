const roleWaller = require('role.waller');

module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.energy < s.energyCapacity && s.structureType === STRUCTURE_TOWER
            });
            if (structure !== undefined&&structure!==null){
                if(creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                roleWaller.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.energy>0&&(s.structureType===STRUCTURE_EXTENSION||s.structureType===STRUCTURE_SPAWN)
            });
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};