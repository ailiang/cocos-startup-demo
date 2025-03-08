import Singleton from "../Base/Singleton";
import { ITile } from "../Levels";


export default class DataManager extends Singleton{
    mapInfo: Array<Array<ITile>>;
    mapRowCount: number;
    mapColCount: number;
    levelIndex:number = 1;

    static get Instance(): DataManager{
        return super.GetInstance<DataManager>();
    }

    reset() {
        this.mapInfo = [];
        this.mapRowCount = 0;
        this.mapColCount = 0;
    }
} 