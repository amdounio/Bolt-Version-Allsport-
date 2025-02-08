import { BaseModel } from "../../core/models/base.model";
import { Match } from "./match.model";

export interface GeneratedPhoto extends BaseModel{
    match : Match;
    date: Date;
    square : string;
    story : string;
    view : string;
    userId? : any
}