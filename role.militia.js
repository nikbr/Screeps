module.exports = {
    run: function(creep) {
        if (creep.room.name === creep.memory.target){
            let hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            let closestHostile = creep.pos.findClosestByRange(hostiles);
            console.log(hostiles);
            if(closestHostile!=null&&closestHostile!==undefined) {
                creep.moveTo(closestHostile);
                creep.say('DEUS VULT');
            }else{
                    creep.moveTo(Game.flags.Flag1);
            }
        }else{
            creep.say('to target');
            let exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#990424'}});
        }
    }
};