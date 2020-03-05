import * as Config from "settings/config";

import * as Utils from "utils/utils";

import * as M from "settings/memory";

export function run(creep: Creep) {
  let spawn = creep.room.find(FIND_MY_SPAWNS)[0];
  let energySource = creep.room.find(FIND_SOURCES_ACTIVE)[0];
  let roomController = creep.room.find<StructureController>(FIND_STRUCTURES)[0];

  if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.upgrading = false;
    creep.say("🔄 harvest");
  }
  if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
    creep.memory.upgrading = true;
    creep.say("⚡ upgrade");
  }

  if (creep.memory.upgrading) {
    if (creep.upgradeController(roomController) === ERR_NOT_IN_RANGE) {
      creep.moveTo(roomController, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  } else {
    let sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
}
