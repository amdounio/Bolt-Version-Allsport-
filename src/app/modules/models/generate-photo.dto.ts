import { BaseModel } from "../../core/models/base.model";
import { Background } from "./background.model";
import { Match } from "./match.model";
import { Typography } from "./typography.model";

export interface GeneratedPhotoDTO{
    match : Match;
    typography : Typography;
    background : Background;
}