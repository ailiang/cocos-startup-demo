
import { _decorator, Component, AnimationClip, Node, Sprite, Animation, UITransform, animation, SpriteFrame } from 'cc';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import ResManager from '../../Runtime/ResManager';
import { EVENT_ENUM, MOVE_DIRECTIRON_ENUM, PARAM_NAME_ENUM } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';
import DataManager from '../../Runtime/DataManager';
const { ccclass, property } = _decorator;


const ANIMATION_SPEED = 1/8;
 
@ccclass('PlayerManger')
export class PlayerManger extends Component {
    private targetX : number = 0;
    private targetY : number = 0;
    private maxX : number = 0;
    private maxY : number = 0;
    private x : number = 0;
    private y : number = 0;
    private speed : number = 1/10;
    private fsm : PlayerStateMachine;
    async init() {
        this.maxX = DataManager.Instance.mapInfo.length
        this.maxY = DataManager.Instance.mapInfo[0].length
        console.log('mapsize',this.maxX, this.maxY)
        const sprite = this.addComponent(Sprite)
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        const transform = this.getComponent(UITransform)
        transform.setContentSize(TILE_WIDTH*4,TILE_HEIGHT*4)
        this.fsm = this.addComponent(PlayerStateMachine)
        await this.fsm.init();
        this.fsm.setParam(PARAM_NAME_ENUM.IDLE, true)
        EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE, this.move, this)
    }
    protected update(dt: number): void {
        this.updatePos();
        this.node.setPosition(this.x * TILE_WIDTH + TILE_WIDTH, -this.y*TILE_HEIGHT);
    }
    move (dir : MOVE_DIRECTIRON_ENUM) {
        if (dir === MOVE_DIRECTIRON_ENUM.UP) {
            this.targetY -= 1 
            if(this.targetY < 0) this.targetY  = 0
            console.log("targetY", this.targetY)
        } else if (dir === MOVE_DIRECTIRON_ENUM.DOWN) {
            this.targetY += 1
            if( this.targetY > this.maxY)  this.targetY =  this.maxY 
            console.log("targetY", this.targetY)
        } else if (dir === MOVE_DIRECTIRON_ENUM.LEFT) {
            if( this.targetX < 0 ) 
                this.targetX = 0
            else 
                this.targetX -= 1
        } else if (dir === MOVE_DIRECTIRON_ENUM.RIGHT) {
            if (this.targetX > this.maxX)
                this.targetX = this.maxX
            else 
                this.targetX += 1
            console.log("targetx", this.targetX)
        } else if (dir === MOVE_DIRECTIRON_ENUM.TURN_LEFT) {
            this.fsm.setParam(PARAM_NAME_ENUM.TURN_LEFT, true)
        }
    }
    
    updatePos() {
        if (this.x < this.targetX) {
            this.x += this.speed;
        } else if (this.x > this.targetX) {
            this.x -= this.speed;
        }

        if (this.y < this.targetY) {
            this.y += this.speed;
        } else if (this.y > this.targetY) {
            this.y -= this.speed;
        }

        if( Math.abs(this.x - this.targetX) < 0.1)  {
            this.x = this.targetX;
        }
        if (Math.abs(this.y - this.targetY) < 0.1 ) {
            this.y = this.targetY;
        }
    }



}

