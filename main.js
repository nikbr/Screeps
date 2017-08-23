const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairman = require('role.repairman');
const roleGatekeeper = require('role.gatekeeper');
const roleWaller = require('role.waller');
const roleLDHarvester = require('role.ldharvester');
const roleLDBuilder = require('role.ldbuilder');
const roleLDRepairman = require('role.ldrepairman');
const roleClaimer = require('role.claimer');
const spawners = require('spawners');
const profiler = require('screeps-profiler');

const HOME = 'E21N23';

profiler.enable();

module.exports.loop = function () {

    profiler.wrap(function() {
        for (let name in Memory.creeps) {
            if (Game.creeps[name] === undefined) {
                delete Memory.creeps[name];
            }
        }

        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.role === 'harvester') {
                roleHarvester.run(creep);
            }
            else if (creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role === 'builder') {
                roleBuilder.run(creep);
            }
            else if (creep.memory.role === 'repairman') {
                roleRepairman.run(creep);
            }
            else if (creep.memory.role === 'gatekeeper') {
                roleGatekeeper.run(creep);
            }
            else if (creep.memory.role === 'waller') {
                roleWaller.run(creep);
            }
            else if (creep.memory.role === 'ldharvester') {
                roleLDHarvester.run(creep);
            }
            else if (creep.memory.role === 'ldbuilder') {
                roleLDBuilder.run(creep);
            }
            else if (creep.memory.role === 'ldrepairman') {
                roleLDRepairman.run(creep);
            }
            else if (creep.memory.role === 'claimer') {
                roleClaimer.run(creep);
            }
        }
        let totalEnergyCap = Game.spawns.Spawn1.room.energyCapacityAvailable;
        let minimumNumberOfHarvesters = 2;
        let minimumNumberOfUpgraders = 1;
        let minimumNumberOfBuilders = 0;
        let minimumNumberOfRepairmen = 1;
        let minimumNumberOfGatekeepers = 2;
        let minimumNumberOfLDHarvestersE21N24 = 1;
        let minimumNumberOfLDHarvestersE22N24 = 1;
        let minimumNumberOfLDHarvestersE22N23 = 1;
        let minimumNumberOfLDBuildersE21N24 = 1;
        let minimumNumberOfLDBuildersE22N24 = 1;
        let minimumNumberOfLDBuildersE22N23 = 1;
        //let minimumNumberOfLDRepairmenE22N24 = 1;
        let minimumNumberOfClaimers = 0;
        //console.log(totalEnergyCap);
        let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester');
        let numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader');
        let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === 'builder');
        let numberOfRepairmen = _.sum(Game.creeps, (c) => c.memory.role === 'repairman');
        let numberOfGatekeepers = _.sum(Game.creeps, (c) => c.memory.role === 'gatekeeper');

        let numberOfLDHarvestersE21N24 = _.sum(Game.creeps, (c) => c.memory.role === 'ldharvester' && c.memory.target === 'E21N24');
        let numberOfLDHarvestersE22N24 = _.sum(Game.creeps, (c) => c.memory.role === 'ldharvester' && c.memory.target === 'E22N24');
        let numberOfLDHarvestersE22N23 = _.sum(Game.creeps, (c) => c.memory.role === 'ldharvester' && c.memory.target === 'E22N23');
        let numberOfLDBuildersE21N24 = _.sum(Game.creeps, (c) => c.memory.role === 'ldbuilder' && c.memory.target === 'E21N24');
        let numberOfLDBuildersE22N24 = _.sum(Game.creeps, (c) => c.memory.role === 'ldbuilder' && c.memory.target === 'E22N24');
        let numberOfLDBuildersE22N23 = _.sum(Game.creeps, (c) => c.memory.role === 'ldbuilder' && c.memory.target === 'E22N23');
        //let numberOfLDRepairmenE22N24 = _.sum(Game.creeps, (c) => c.memory.role === 'ldrepairman' && c.memory.target === 'E22N24');

        let numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role === 'claimer');

        let name = undefined;
        if (numberOfHarvesters < minimumNumberOfHarvesters) {
            name = spawners.spawnWorker(totalEnergyCap, 'harvester');
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            name = spawners.spawnWorker(totalEnergyCap, 'upgrader');
        }
        else if (numberOfClaimers < minimumNumberOfClaimers) {
            name = spawners.spawnClaimer(totalEnergyCap, 'E21N24');
        }
        else if (numberOfRepairmen < minimumNumberOfRepairmen) {
            name = spawners.spawnWorker(600, 'repairman');
        }
        else if (numberOfGatekeepers < minimumNumberOfGatekeepers) {
            name = spawners.spawnWorker(650, 'gatekeeper');
        }
        else if (numberOfBuilders < minimumNumberOfBuilders) {
            name = spawners.spawnWorker(totalEnergyCap, 'builder');
        }
        else if (numberOfLDBuildersE21N24 < minimumNumberOfLDBuildersE21N24) {
            name = spawners.spawnLDWorker(500, 'ldbuilder', HOME, 'E21N24', 0);
        }
        else if (numberOfLDHarvestersE21N24 < minimumNumberOfLDHarvestersE21N24) {
            name = spawners.spawnLDWorker(800, 'ldharvester', HOME, 'E21N24', 0);
        }
        /*else if (numberOfLDRepairmenE22N24 < minimumNumberOfLDRepairmenE22N24) {
            name = spawners.spawnLDWorker(500, 'ldrepairman', HOME, 'E22N24', 0);
        }*/
        else if (numberOfLDBuildersE22N24 < minimumNumberOfLDBuildersE22N24) {
            name = spawners.spawnLDWorker(500, 'ldbuilder', HOME, 'E22N24', 0);
        }
        else if (numberOfLDHarvestersE22N24 < minimumNumberOfLDHarvestersE22N24) {
            name = spawners.spawnLDWorker(800, 'ldharvester', HOME, 'E22N24', 0);
        }
        else if (numberOfLDBuildersE22N23 < minimumNumberOfLDBuildersE22N23) {
            name = spawners.spawnLDWorker(500, 'ldbuilder', HOME, 'E22N23', 0);
        }
        else if (numberOfLDHarvestersE22N23 < minimumNumberOfLDHarvestersE22N23) {
            name = spawners.spawnLDWorker(800, 'ldharvester', HOME, 'E22N23', 0);
        }
        else {
            name = spawners.spawnWorker(totalEnergyCap, 'builder');
        }

        let towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });

        for (let tower of towers) {
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target !== undefined && target !== null) {
                tower.attack(target);
            }
        }
    });

};