import { BaseModel } from "../../core/models/base.model";
import { Championship } from "./championship.model";

export interface Team extends BaseModel {
    name: string;
    logo: string;
    championship? : Championship;
}