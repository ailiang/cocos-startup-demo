import { AnimationClip, Sprite, SpriteFrame, animation } from "cc";
import { PlayerStateMachine } from "../Scripts/Player/PlayerStateMachine";
import { TILE_HEIGHT, TILE_WIDTH } from "../Scripts/Tile/TileManager";
import ResManager from "../Runtime/ResManager";

const ANIMATION_SPEED = 1/8;
export default class State {
    animationClip : AnimationClip = null;
    constructor( private fsm: PlayerStateMachine, private path :string, private wrapMode : AnimationClip.WrapMode = AnimationClip.WrapMode.Normal ) {
        this.init()
    }
    async init() {
        const promise  = ResManager.Instance.loadDir(this.path)
        this.fsm.waitPromiseList.push(promise)
        const spriteFrames = await promise 
        this.animationClip = new AnimationClip();
        const track  = new animation.ObjectTrack(); 
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame');
        const frams: Array<[number, SpriteFrame]> = spriteFrames.map((frame, index) => [index* ANIMATION_SPEED, frame])
        track.channel.curve.assignSorted(frams);
        this.animationClip.duration = frams.length * ANIMATION_SPEED; 
        this.animationClip.wrapMode = this.wrapMode
        this.animationClip.addTrack(track);
    }

    run() {
        this.fsm.animationComponent.defaultClip = this.animationClip;
        this.fsm.animationComponent.play();
    }
}