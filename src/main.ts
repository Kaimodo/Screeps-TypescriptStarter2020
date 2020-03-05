import * as Config from "settings/config";
import { ErrorMapper } from "utils/ErrorMapper";
import * as utils from "utils/utils";

import { ConsoleCommands } from "utils/consolecommands";

// import * as Profiler from "screeps-profiler";

import * as Inscribe from "screeps-inscribe";

import * as Traveler from "utils/traveler/traveler";

import * as Harvester from "components/creeps/harvester";

import * as Upgrader from "components/creeps/upgrader";

import * as roomManager from "components/RoomManager";

// import * as Slack from "utils/slack/slack";
// import * as SlackConfig from "utils/slack/slack_config";

// import { basicAttach } from "utils/slack/slack";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

// global.Profiler = Profiler.enable();

console.log(`[${Inscribe.color("New Script loaded", "red")}]`);
export const loop = ErrorMapper.wrapLoop(() => {
  // console.log(`Current game tick is ${Game.time}`);
  global.cc = ConsoleCommands;
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log(`[${Inscribe.color("Clearing non-existing creep memory: " + name, "red")}]`);
    }
  }

  function clearStaleCreepMemory() {
    // Profiler.registerFN(clearStaleCreepMemory);

    if (Game.time % 100 === 0) {
      // log.info("Checking creep mem: " + Game.time);
      for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
          console.log("Clearing non-existing creep memory:", name);
          delete Memory.creeps[name];
        }
      }
    }
  }
  _.each(Game.rooms, (room: Room) => {
    roomManager.run(room);
  });
  clearStaleCreepMemory();
  utils.log_info();
});
