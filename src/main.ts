import * as Config from "settings/config";
import { ErrorMapper } from "utils/ErrorMapper";
import * as utils from "utils/utils";

import { ConsoleCommands } from "utils/consolecommands";

// import * as Profiler from "screeps-profiler";

import * as Inscribe from "screeps-inscribe";

import * as Slack from "utils/slack/slack";
import * as SlackConfig from "utils/slack/slack_config";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

import { basicAttach } from "utils/slack/slack";

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
    }
  }

  // Slack TEST
  let room: Room = Game.rooms[0];

  if (Game.time % 100 === 0 && Config.ENABLE_SLACK) {
    // let fieldHarvesters: Slack.FieldsEntity = new Slack.FieldsEntity("Harvesters", harvestersSize.toString(), true);
    // let fieldUpgraders: Slack.FieldsEntity = new Slack.FieldsEntity("Upgraders", upgradersSize.toString(), true);
    let fieldSpawnValue = (room.energyAvailable + " / " + room.energyCapacityAvailable).toString();
    let fieldSpawn: Slack.FieldsEntity = new Slack.FieldsEntity("Spawn Energy", fieldSpawnValue);
    basicAttach.text =
      "CPU: limit: " +
      Game.cpu.limit +
      ", tickLimit: " +
      Game.cpu.tickLimit +
      ", bucket: " +
      Game.cpu.bucket +
      ", used: " +
      Game.cpu.getUsed();
    basicAttach.fields = [fieldSpawn];

    let Testload: Slack.Payload = new Slack.Payload(SlackConfig.SLACK_USERNAME, [basicAttach]);

    Slack.postToSlack(Testload);
  }

  utils.log_info();
});
