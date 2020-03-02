import { AttachmentsEntity } from "./AttachmentsEntity";

import * as SlackConfig from "../slack_config";

export class Payload {
  private username: string = SlackConfig.SLACK_USERNAME;
  public attachments?: (AttachmentsEntity)[] | null;

  constructor(Username: string, Attachments?: (AttachmentsEntity)[] | null) {
    this.username = Username;
    this.attachments = Attachments;
  }
  public getUsername(): string {
    return this.username;
  }
  // public setAttachment(Attachment: AttachmentsEntity) {
  //   this.attachments.push(Attachment);
  //   return this.attachments;
}
