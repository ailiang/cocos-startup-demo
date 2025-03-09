
import { _decorator, AnimationClip, Component, Animation, SpriteFrame, AnimationState, tweenUtil } from 'cc';
import { FSM_PARAMS_TYPE_ENUM, PARAM_NAME_ENUM } from '../../Enums';
import State from '../../Base/State';
const { ccclass, property } = _decorator;

type PARAM_VALUE_TYPE = boolean | number;
export interface IParamValue {
    type: FSM_PARAMS_TYPE_ENUM
    value: PARAM_VALUE_TYPE
}
export const getInitParamsTrigger = () => {
    return {
        type: FSM_PARAMS_TYPE_ENUM.TRIGGER,
        value: false
    }
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {

    private _curState: State = null;
    params: Map<string, IParamValue> = new Map();
    stateMachine: Map<string, State> = new Map();
    animationComponent: Animation = null;

    waitPromiseList: Array<Promise<SpriteFrame[]>> = [];

    get curState() {
        return this._curState
    }

    set curState(state: State) {
        this._curState = state;
        this._curState.run();
    }
    async init() {
        this.animationComponent = this.addComponent(Animation);
        this.initParams();
        this.initMachine();
        await Promise.all(this.waitPromiseList);
        this.animationComponent.on(Animation.EventType.FINISHED, this.onAnimationFinished, this)
    }

    initMachine() {
        this.stateMachine.set(PARAM_NAME_ENUM.IDLE, new State(this, 'texture/player/idle/top', AnimationClip.WrapMode.Loop));
        this.stateMachine.set(PARAM_NAME_ENUM.TURN_LEFT, new State(this, 'texture/player/turnleft/top'));
    }


    initParams() {
        this.params.set(PARAM_NAME_ENUM.IDLE, getInitParamsTrigger());
        this.params.set(PARAM_NAME_ENUM.TURN_LEFT, getInitParamsTrigger());
    }
    getParam(paramName: string) {
        if (this.params.has(paramName))
            return this.params.get(paramName).value;
    }

    setParam(paramName: string, value: PARAM_VALUE_TYPE) {
        if (this.params.has(paramName)) {
            this.params.get(paramName).value = value;
            this.run();
            this.resetTrigger();
        }
    }
    resetTrigger() {
        for (const [_, value] of this.params) {
            console.log(value);
            if (value.type === FSM_PARAMS_TYPE_ENUM.TRIGGER) {
                value.value = false;
            }
        }
    }

    onAnimationFinished(et: Animation.EventType, st: AnimationState) {
        const name = this.animationComponent.defaultClip.name;
        const matchList = ['turn']
        if( matchList.some( (item) => name.includes(item))) {
            this.setParam(PARAM_NAME_ENUM.IDLE, true)
        }
    }

    run() {
        switch (this.curState) {
            case this.stateMachine.get(PARAM_NAME_ENUM.IDLE):
            case this.stateMachine.get(PARAM_NAME_ENUM.TURN_LEFT):
                if (this.params.get(PARAM_NAME_ENUM.TURN_LEFT).value) {
                    this.curState = this.stateMachine.get(PARAM_NAME_ENUM.TURN_LEFT);
                } else if (this.params.get(PARAM_NAME_ENUM.IDLE).value) {
                    this.curState = this.stateMachine.get(PARAM_NAME_ENUM.IDLE);
                }
                break;
            default:
                this.curState = this.stateMachine.get(PARAM_NAME_ENUM.IDLE);
                break;
        }
    }
}

