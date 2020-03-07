import * as Config from "settings/config";

import * as Harvester from "components/creeps/harvester";
import * as Upgrader from "components/creeps/upgrader";

import * as Inscribe from "screeps-inscribe";

// import * as Profiler from "screeps-profiler";

import * as M from "settings/memory";
// import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from "constants";

export let creeps: Creep[];
export let creepCount: number = 0;

export let harvesters: Creep[] = [];
export let upgraders: Creep[] = [];

export function run(room: Room): void {
  _loadCreeps(room);
  _buildMissingCreeps(room);

  _.each(creeps, (creep: Creep) => {
    if (creep.memory.role == "harvester") {
      Harvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      Upgrader.run(creep);
    }
  });
}
function _loadCreeps(room: Room) {
  creeps = room.find(FIND_MY_CREEPS);
  creepCount = _.size(creeps);

  harvesters = _.filter(creeps, (Creep: Creep) => Creep.memory.role === "harvester");
  let harvestersSize = _.size(harvesters);
  upgraders = _.filter(creeps, (Creep: Creep) => Creep.memory.role === "upgrader");
  let upgradersSize = _.size(upgraders);

  console.log(`[${Inscribe.color("Creeps found: " + creepCount, "blue")}]`);
}

function _buildMissingCreeps(room: Room) {
  let bodyParts: BodyPartConstant[];

  let spawns: StructureSpawn[] = room.find(FIND_MY_SPAWNS, {
    filter: (spawn: StructureSpawn) => {
      return spawn.spawning === null;
    }
  });

  if (Config.DEBUG_MODE) {
    if (spawns[0]) {
      console.log(`[${Inscribe.color("Spawn: " + spawns[0].name, "Blue")}]`);
    }
  }

  if (_.size(harvesters) < Config.MANAGER_MAX_HARVESTERS) {
    if (Config.DEBUG_MODE) {
      console.log("Harvesters: " + harvesters.length + " c.MAX_Harvesters: " + Config.MANAGER_MAX_HARVESTERS);
    }
    if (_.size(harvesters) < 1 || room.energyCapacityAvailable <= 800) {
      bodyParts = [WORK, WORK, CARRY, MOVE];
    } else if (room.energyCapacityAvailable > 800) {
      bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
    }

    _.each(spawns, (spawn: StructureSpawn) => {
      _spawnCreep(spawn, bodyParts, "harvester");
    });
  }

  if (_.size(harvesters) >= Config.MANAGER_MAX_HARVESTERS) {
    if (_.size(upgraders) < Config.MANAGER_MAX_UPGRADERS) {
      if (Config.DEBUG_MODE) {
        // console.log(`[${Inscribe.color("sizeHarvesters " + _.size(harvesters), "darkblue")}]`);
        // console.log(`[${Inscribe.color("sizeUpgraders " + _.size(upgraders), "darkblue")}]`);
      }
      if (_.size(upgraders) < 1 || room.energyCapacityAvailable <= 800) {
        bodyParts = [WORK, WORK, CARRY, MOVE];
      } else if (room.energyCapacityAvailable > 800) {
        bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
      }
      _.each(spawns, (spawn: StructureSpawn) => {
        _spawnCreep(spawn, bodyParts, "upgrader");
      });
    }
  }
}

function _spawnCreep(spawn: StructureSpawn, bodyParts: BodyPartConstant[], role: string) {
  let uuid: number = Memory.uuid;
  let status: number | string = spawn.canCreateCreep(bodyParts, undefined);

  let properties: any /*{ [key: string]: any }*/ = {
    role,
    room: spawn.room.name
  };

  status = _.isString(status) ? OK : status;
  if (status === OK) {
    Memory.uuid = uuid + 1;
    let creepName: string = spawn.room.name + " - " + role + uuid;

    console.log("Started creating new creep: " + creepName);
    if (Config.DEBUG_MODE) {
      console.log(`[${Inscribe.color("Name: " + creepName, "Green")}]`);
      console.log(`[${Inscribe.color("Body: " + bodyParts, "Green")}]`);
    }

    status = spawn.createCreep(bodyParts, creepName, properties);
    console.log(`[${Inscribe.color("Status: " + status, "#66ffcc")}]`);

    return _.isString(status) ? OK : status;
  } else {
    if (Config.DEBUG_MODE) {
      console.log(`[${Inscribe.color("Failed creating new creep: " + status, "Red")}]`);
    }

    return status;
  }
}
