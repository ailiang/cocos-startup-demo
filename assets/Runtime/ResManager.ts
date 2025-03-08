import { SpriteFrame, resources } from "cc";
import Singleton from "../Base/Singleton";

export default class ResManager extends Singleton {
    static get Instance() {
        return super.GetInstance<ResManager>();
    }


    loadDir(path: string, type: typeof SpriteFrame = SpriteFrame) {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir(path, SpriteFrame, function (err, assets) {
                if (err) {
                    reject(err);
                } else {
                    resolve(assets);
                }
            });
        })
    }
}