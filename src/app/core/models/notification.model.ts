import { BaseModel } from "./base.model";

export interface Notification extends BaseModel {
  message: string;
  type: number;
}
