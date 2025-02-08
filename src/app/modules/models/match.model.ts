import { BaseModel } from "../../core/models/base.model";
import { Championship } from "./championship.model";
import { Team } from "./team.model";

export interface Match extends BaseModel {
    firstTeam: Team;
    secondTeam: Team;
    startDate: string;
    endDate: string;
    userId? : any;
    championship?: Championship;
    periods?: {
        first: number;
        second: number;
    },
    background? : string;
    typography? : string;
    adress: string;
    status: {
        long: string,
        short: string,
        elapsed: number,
        extra: number
    }
}


