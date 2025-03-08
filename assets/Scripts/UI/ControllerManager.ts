
import { _decorator, Component, Event, Node } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { EVENT_ENUM, MOVE_DIRECTIRON_ENUM } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    
    handleCtrl( e: Event, customData: string) {
        EventManager.Instance.emit(EVENT_ENUM.PLAYER_MOVE, customData as MOVE_DIRECTIRON_ENUM );
    }
}

