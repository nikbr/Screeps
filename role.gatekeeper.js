const roleLoader = require('role.loader');

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
                filter: (s) => s.hits < 1000000 && s.structureType === STRUCTURE_RAMPART
            });
            let tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.energy < s.energyCapacity && s.structureType === STRUCTURE_TOWER
            });
            if(tower!==null&&tower!==undefined){
                roleLoader.run(creep);
            }
            else if (structure !== undefined&&structure!==null){
                if(creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
                roleLoader.run(creep);
            }
        } else {
            let droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,{
                filter: (s) => {
                    return s.amount>25;
                }
            });
            if (droppedResources !== undefined&&droppedResources!==null) {
                if (creep.pickup(droppedResources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResources, {visualizePathStyle: {stroke: '#990424'}});
                }
            }else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};