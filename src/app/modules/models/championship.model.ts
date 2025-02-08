import { BaseModel } from "../../core/models/base.model";
import { Sport } from "./sports.model";

export interface Championship extends BaseModel {
    image: string;
    title: string;
    subtitle?: string;
    sport?: Sport;
}