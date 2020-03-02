import {Confirm} from "./Confirm";

export interface ActionsEntity {
  name: string;
  text: string;
  type: string;
  value: string;
  style?: string | null;
  confirm?: Confirm | null;
}
