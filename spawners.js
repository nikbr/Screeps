module.exports = {

    spawnWorker: function(totalEnergyCap, workerType){
        let base = [MOVE, MOVE, CARRY, WORK];
        let energyLeft = totalEnergyCap-250;
        while (energyLeft>=400){
            base.push(MOVE);
            base.push(MOVE);
            base.push(MOVE);
            base.push(CARRY);
            base.push(WORK);
            base.push(WORK);
            energyLeft-=400;
        }
        while (energyLeft>=150){
            base.push(WORK);
            base.push(MOVE);
            energyLeft-=150;
        }
        while(energyLeft>=100){
            base.push(CARRY);
            base.push(MOVE);
            energyLeft-=100;
        }
        return Game.spawns.Spawn1.createCreep(base, undefined, {
            role: workerType,
            working: false
        });
    },
    spawnLDWorker: function(totalEnergyCap, workerType, home, target, sourceId){
        let base = [MOVE, MOVE, CARRY, WORK];
        let energyLeft = totalEnergyCap-250;
        while (energyLeft>=350){
            base.push(MOVE);
            base.push(MOVE);
            base.push(MOVE);
            base.push(CARRY);
            base.push(CARRY);
            base.push(WORK);
            energyLeft-=350;
        }
        while(energyLeft>=100){
            base.push(CARRY);
            base.push(MOVE);
            energyLeft-=100;
        }
        return Game.spawns.Spawn1.createCreep(base, undefined, {
            role: workerType,
            working: false,
            home: home,
            target: target,
            sourceId: sourceId
        });

    },
    spawnClaimer : function(totalEnergyCap, target){
        if(totalEnergyCap>=700) {
            return Game.spawns.Spawn1.createCreep([CLAIM, MOVE, MOVE], undefined, {
                role: 'claimer',
                target: target
            });
        }
    },
    spawnCrusader : function(totalEnergyCap, target, squad){
       let base = [MOVE, MOVE, ATTACK, TOUGH];
       let energyLeft = totalEnergyCap-190;
       while(energyLeft>=190){
           base.push(MOVE);
           base.push(MOVE);
           base.push(TOUGH);
           base.push(ATTACK);
           energyLeft-=190;
       }
       while(energyLeft>=130){
           base.push(ATTACK);
           base.push(MOVE);
           energyLeft-=130;
       }
       while(energyLeft>=60){
           base.push(MOVE);
           base.push(TOUGH);
           energyLeft-=60;
       }
        return Game.spawns.Spawn1.createCreep(base, undefined, {
            role: 'soldier',
            type: 'crusader',
            target: target,
            squad: squad,
            attacking: false
        });

    },
    spawnMilitia : function(totalEnergyCap, target) {
        let base = [RANGED_ATTACK, TOUGH, MOVE, MOVE];
        let energyLeft = totalEnergyCap-260;
        while(energyLeft>=260){
            base.push(MOVE);
            base.push(MOVE);
            base.push(TOUGH);
            base.push(RANGED_ATTACK);
            energyLeft-=260;
        }
        return Game.spawns.Spawn1.createCreep(base, undefined, {
            role: 'soldier',
            type: 'militia',
            target: target
        });
    },
    spawnScout : function(target) {
        return Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE], undefined, {
            role: 'scout',
            target: target
        });
    }
};