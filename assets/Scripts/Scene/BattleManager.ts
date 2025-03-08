
import { _decorator, Component, Node } from 'cc';
import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../Utils';
import Levels, { ILevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EVENT_ENUM } from '../../Enums';
import { PlayerManger } from '../Player/PlayerManger';
const { ccclass, property } = _decorator;

 
@ccclass('BattleManager')
export class BattleManager extends Component {
    level: ILevel;
    stage : Node;
    start () {
        this.generateStage();
        this.initLevel();
    }
    initLevel() {
        const level = Levels[`level${DataManager.Instance.levelIndex}`]
        if (level) {
            this.clearLevel();
            this.level = level;
            DataManager.Instance.mapInfo = level.mapInfo;
            DataManager.Instance.mapRowCount = level.mapInfo.length | 0
            DataManager.Instance.mapColCount = level.mapInfo[0].length | 0;
            this.generateTileMap()
            this.generatePlayer();
        }
    }
    onLoad(): void {
        EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this);
    }

    protected onDestroy(): void {
        EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel);
    }

    generateStage() {
        this.stage = CreateUINode();
        this.stage.setParent(this.node);
    }
    nextLevel() {
        DataManager.Instance.levelIndex++;
        this.initLevel();
    }

    clearLevel() {
        DataManager.Instance.reset()
        this.stage.destroyAllChildren();
    }
    generateTileMap() {
        const tileMap = CreateUINode();
        tileMap.setParent(this.stage);
        const tileMapManager = tileMap.addComponent(TileMapManager);
        tileMapManager.init();
        this.adaptPosition();
    }

    generatePlayer() {
        const player = CreateUINode();
        player.setParent(this.stage);
        const com = player.addComponent(PlayerManger)
        com.init();
    }

    adaptPosition() {
        const { mapRowCount, mapColCount } = DataManager.Instance;
        const disX = TILE_WIDTH* mapColCount /2;
        const disY = TILE_HEIGHT * mapRowCount /2 + 80;
        this.stage.setPosition(-disX, disY);
        console.log("stage pos", this.stage.getWorldPosition());
    }
}
