import { BaseModel } from "../../core/models/base.model";
import { Background } from "./background.model";
import { GeneratedPhoto } from "./generated-photo.model";
import { Match } from "./match.model";
import { Typography } from "./typography.model";

export interface MediaDTO{
    Date: string;
    data : {id : number , data : GeneratedPhoto[],user_id : number}[]
}