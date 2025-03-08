
import { TILE_TYPE_ENUM } from "../Enums";
import level1 from "./Level1";
import level2 from "./Level2";

export interface ITile {
    src: number|null,
    type: TILE_TYPE_ENUM | null,
}

export interface ILevel {
    mapInfo : Array<Array<ITile>>,
}


const Levels: Record<string, ILevel> = {
    level1,
    level2,
}

export default Levels;