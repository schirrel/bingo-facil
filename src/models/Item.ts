import { BaseModel } from "./BaseModel";

export interface ItemModel extends BaseModel {
    value: string;
    called: boolean;
    group?: string
}

