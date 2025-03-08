
import { _decorator, Component, Layers, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

export const CreateUINode = (name: string = '') => {
    const node = new Node(name );
    const transform = node.addComponent(UITransform);
    transform.setAnchorPoint(0, 1);
    node.layer = 1 << Layers.nameToLayer("UI_2D")
    return node;
};
