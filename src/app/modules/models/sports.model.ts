import { BaseModel } from "../../core/models/base.model";

export interface Sport extends BaseModel{
    image: string;
    title : string;
    subTitle? :string;
    description? : string;
    firstColorGradientOverlay? : string;
    secondColorGradientOverlay? : string;
    disabled? : boolean;
  }