const roleRepairman = require('role.repairman');

let wallMax = 400000;

module.exports = {
    symbol: '🏰',
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
        } else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working === true) {
            if(creep.memory.wall === null || creep.memory.wall === undefined || Game.getObjectById(creep.memory.wall).hits >= wallMax) {
                creep.say('FCW');
                let walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_WALL) && structure.hits < wallMax;
                    }
                });
                //console.log("Found " + walls.length + " walls below " + wallMax + " hits");
                let lowestWall;
                let minHits = 300000000;
                for(let k = 0; k < walls.length; k++) {
                    let wall = walls[k];
                    let hits = wall.hits;
                    if(hits < minHits){
                        minHits = hits;
                        lowestWall = wall;
                    }
                }
                if(walls[0]!==undefined&&walls[0]!==null) {
                    creep.memory.wall = lowestWall.id;
                }
            }

            if (creep.memory.wall !== null && creep.memory.wall !== undefined){
                let wall = Game.getObjectById(creep.memory.wall);
                if(creep.repair(wall) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(wall, {visualizePathStyle: {stroke: '#990424'}});
                }
            } else {
                roleRepairman.run(creep);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};