const roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(constructionSite !== undefined&&constructionSite!==null) {
                if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }else{
                roleUpgrader.run(creep);
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