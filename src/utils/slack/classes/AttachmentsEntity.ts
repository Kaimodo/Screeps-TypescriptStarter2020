import { ActionsEntity } from "./ActionsEntity";
import { FieldsEntity } from "./FieldsEntity";

export interface AttachmentsEntity {
  attachment_type?: string;
  callback_id?: string;
  fallback?: string;
  title: string;
  title_link?: string;
  color: string;
  pretext?: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  actions?: (ActionsEntity)[] | null;
  fields?: (FieldsEntity)[] | null;
  text?: string;
  image_url?: string;
  thumb_url?: string;
  footer?: string;
  footer_icon?: string;
  ts?: number;
}
