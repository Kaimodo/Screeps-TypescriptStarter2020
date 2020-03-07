import * as Slack from "typed-slack";

import * as SlackConfig from "./slack_config";

import * as asyncHooks from "async_hooks";

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

export function stest(payload: Payload): void {
  let webHookUrl: string = SlackConfig.SLACK_WEBHOOCK;
  let myJSONStr: any = JSON.stringify(payload);
  let slack = new Slack.IncomingWebhook(webHookUrl);
  slack
    .send({ text: "text" })
    .then((e: Error) => {
      console.log("success");
    })
    .catch((e: Error) => {
      console.error(e);
    });
}
