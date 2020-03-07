// This is only a Test
// https://www.hongkiat.com/blog/send-messages-to-slack/
// http://cloudmark.github.io/Json-Mapping/
// http://jvilk.com/MakeTypes
// https://weblogs.asp.net/dwahlin/extending-classes-and-interfaces-using-typescript
// https://www.sitepen.com/blog/2013/12/31/typescript-cheat-sheet/

// https://screeps.com/a/#!/room/shard1/E55S44
// https://screeps.com/a/#!/sim/survival

import * as SlackConfig from "./slack_config";

import { ActionsEntity } from "./classes/ActionsEntity";
import { AttachmentsEntity } from "./classes/AttachmentsEntity";
import { Confirm } from "./classes/Confirm";
import { FieldsEntity } from "./classes/FieldsEntity";
import { Payload } from "./classes/Payload";

export { ActionsEntity } from "./classes/ActionsEntity";
export { AttachmentsEntity } from "./classes/AttachmentsEntity";
export { Confirm } from "./classes/Confirm";
export { FieldsEntity } from "./classes/FieldsEntity";
export { Payload } from "./classes/Payload";

import * as Slack from "typed-slack";

export function stest(payload: Payload): void {
  let webHookUrl: string = SlackConfig.SLACK_WEBHOOCK;
  let myJSONStr: any = JSON.stringify(payload);
  let slack = new Slack.IncomingWebhook(webHookUrl);
  slack
    .send(myJSONStr)
    .then((e: Error) => {
      console.log("success");
    })
    .catch((e: Error) => {
      console.error(e);
    });
}

/*
export function postToSlack(payload: Payload): void {
  let webHookUrl: string = SlackConfig.SLACK_WEBHOOCK;
  let myJSONStr: any = JSON.stringify(payload);
  let xmlhttp = XMLHttpRequest(webHookUrl, myJSONStr);

  xmlhttp.open("POST", webHookUrl, false);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(myJSONStr);
}

export function slacktest(payload: Payload): string {
  return JSON.stringify(payload);
}
*/

export enum slackColors {
  Red = "#ff0000",
  Green = "#00ff00",
  Blue = "#0000ff",
  Yellow = "#ffff00",
  Cyan = "#00ffff",
  Violett = "#764FA5",
  Info = "#0000ff",
  Warning = "#00ffff",
  Error = "#ff0000"
}

export let basicAttach: AttachmentsEntity = {
  author_link: "https://screeps.com/a/#!/sim/survival",
  author_name: "Screeps-kAI",
  color: slackColors.Violett,
  fallback: "Attachment is not supported",
  footer: "http://screeps.com",
  footer_icon: "https://screeps.com/a/components/top/logo.png",
  pretext: "Screeps Info's:",
  title: "Screeps Logging"
};
/*
  if (Game.time % 100 === 0 && Config.ENABLE_SLACK) {
    let room: Room = Game.rooms[0];
    let fieldHarvesters: Slack.FieldsEntity = new Slack.FieldsEntity("Harvesters", "3", true);
    let fieldUpgraders: Slack.FieldsEntity = new Slack.FieldsEntity("Upgraders", "2", true);
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
    basicAttach.fields = [fieldHarvesters, fieldUpgraders, fieldSpawn];

    let Testload: Slack.Payload = new Slack.Payload(SlackConfig.SLACK_USERNAME, [basicAttach]);

    Slack.stest(Testload);
  }
  */
