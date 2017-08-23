module.exports = {
    run: function(creep) {
        if (creep.memory.working  && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            if (creep.room.name === creep.memory.home) {
                let spawner = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                if (creep.transfer(creep.pos.findClosestByPath(spawner), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.pos.findClosestByPath(spawner));
                }
            }else if(creep.room.name!==creep.memory.home&&creep.memory.target!==creep.room.name){

                let containerDropOff = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER&&structure.store[RESOURCE_ENERGY]<structure.storeCapacity;
                    }
                });
                let closestContainerDropOff = creep.pos.findClosestByPath(containerDropOff);
                if(closestContainerDropOff!==null&&closestContainerDropOff!==undefined) {
                    if (creep.transfer(closestContainerDropOff, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestContainerDropOff);
                    }
                }else{
                    creep.moveTo(Game.rooms[creep.memory.home].controller);
                    let exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
            }else{
                creep.moveTo(Game.rooms[creep.memory.home].controller);
                let exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        } else {
            if(creep.room.name === creep.memory.target) {
                let containerSource = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER&&structure.store[RESOURCE_ENERGY]>0;
                    }
                });

                let closestContainerSource = creep.pos.findClosestByPath(containerSource);
                if(closestContainerSource!==null&&closestContainerSource!==undefined) {
                    if (creep.withdraw(closestContainerSource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestContainerSource);
                    }
                }else {
                    let source = creep.room.find(FIND_SOURCES)[creep.memory.sourceId];
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            } else {
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }

    }
};