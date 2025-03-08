
import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { CreateUINode } from '../Utils';
import { TileManager } from './TileManager';
import DataManager from '../../Runtime/DataManager';
import ResManager from '../../Runtime/ResManager';
 
@ccclass('TileMapManager')
export class TileMapManager extends Component {
    start () {

    }
    async init() {
        const {mapInfo} = DataManager.Instance 
        const spriteFrames = await ResManager.Instance.loadDir("texture/tile/tile", SpriteFrame) 
        for(let i = 0; i < mapInfo.length; i++) {
            const colume = mapInfo[i]
            for (let j = 0; j < colume.length; j++) {
                const item = colume[j]
                if( item.src === null || item.type === null) 
                    continue
                const node = CreateUINode()
                const imgSrc =`tile (${item.src})`
                const spriteFrame = spriteFrames.find(v => v.name === imgSrc) || spriteFrames[0] 
                const tileMgr = node.addComponent(TileManager)
                tileMgr.init(spriteFrame,i,j)
                node.setParent(this.node)
            }
        }

    }


}

