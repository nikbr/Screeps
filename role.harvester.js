
module.exports = {
    run: function(creep) {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if (creep.memory.working  && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working && targets.length>0) {
            if (creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByPath(targets));
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};