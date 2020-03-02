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

export function postToSlack(payload: Payload): void {
  let xmlhttp = new XMLHttpRequest();
  let webHookUrl: string = SlackConfig.SLACK_WEBHOOCK;
  let myJSONStr = JSON.stringify(payload);
  xmlhttp.open("POST", webHookUrl, false);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(myJSONStr);
}

export function slacktest(payload: Payload): string {
  return JSON.stringify(payload);
}

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
