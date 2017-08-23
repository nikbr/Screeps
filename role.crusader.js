let atRallyPoint = function(flag) {
    let nearCreeps = flag.room.find(FIND_MY_CREEPS, {
            filter: (c) => {
                return flag.pos.isNearTo(c);
            }
        });
    return nearCreeps.length;
};
let forceAttack = false;
let crusaderFlag = Game.flags.Crusader;
module.exports = {
    run: function(creep) {
        if (creep.room.name === creep.memory.target) {
            let towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_TOWER;
                }
            });
            let closestTower = creep.pos.findClosestByPath(towers);
            if(closestTower!==null&&closestTower!==undefined) {
                if (creep.attack(closestTower) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTower);
                }
            }

            creep.say('DEUS VULT');
        }else if(creep.room.name===crusaderFlag.memory.home){
            console.log(atRallyPoint(crusaderFlag));
            if(atRallyPoint(crusaderFlag)<creep.memory.squad&&!creep.memory.attacking&&!forceAttack) {
                creep.moveTo(crusaderFlag);
            }else{
                creep.memory.attacking = true;
                forceAttack = true;
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});
                creep.say('AVE MARIA');
            }
        }else{
            let exit = creep.room.findExitTo(crusaderFlag.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});
            creep.say('☩');
        }
    }
};
/*
let extensions = creep.pos.find(FIND_STRUCTURES,{
                   filter: (structure) =>{
                       structure.structureType=== STRUCTURE_EXTENSION;
                   }
                });
                let closestExtension = creep.pos.findClosestByPath(extensions);
                if (closestExtension!==null&&closestExtension!==undefined){
                    if (creep.attack(closestExtension) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestExtension);
                    }
                }

 let enemies = creep.pos.find(FIND_HOSTILE_CREEPS);
                let closestEnemy = creep.pos.findClosestByPath(enemies);
                if (closestEnemy!==null&&closestEnemy!==undefined){
                    if (creep.attack(closestEnemy) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestEnemy);
                    }
                }


 */
