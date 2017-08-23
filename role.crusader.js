module.exports = {
    run: function(creep) {
        console.log("hello");
        if (creep.room.name === creep.memory.target){
            let towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_TOWER;
                }
            });
            let closestTower = creep.pos.findClosestByPath(towers);
            if(creep.attack(closestTower)===ERR_NOT_IN_RANGE){
                creep.moveTo(closestTower);
            }
            creep.say('DEUS VULT');

        }else{
            let exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});

            creep.say('☩');
        }
    }
};