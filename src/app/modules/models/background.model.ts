import { Category } from "./category.model";

export interface Background {

    name: string;
    premium: boolean;
    image: string;
    category?: Category;

}