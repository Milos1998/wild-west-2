import { Assets, Container, Sprite, Text } from "pixi.js";
import { ContainerNode, LayoutConfigNode, LayoutNode, SpriteNode, TextNode } from "../../config/LayoutConfig";
import { Orientation } from "../../config/SceneConfig";

export class LayoutItem {
    public container: Container;

    public layoutNodes: LayoutNode[];

    constructor(configNode: LayoutConfigNode, orientation: Orientation) {
        const layoutNode = this.makeLayoutNode(configNode, orientation);
        this.container = this.makePixiObject(layoutNode);
        this.layoutNodes = [layoutNode];
    }

    private makePixiObject(layoutNode: LayoutNode): Container {
        let object;
        if (layoutNode instanceof SpriteNode) {
            object = new Sprite();
            object.anchor.set(layoutNode.anchor.x, layoutNode.anchor.y);
            object.texture = layoutNode.texture;
        } else if (layoutNode instanceof TextNode) {
            object = new Text();
            object.anchor.set(layoutNode.anchor.x, layoutNode.anchor.y);
            object.text = layoutNode.text;
            object.style.fontSize = layoutNode.fontSize;
        } else {
            object = new Container();
        }

        object.name = layoutNode.name;
        object.alpha = layoutNode.alpha;
        object.visible = layoutNode.visible;
        object.position.set(layoutNode.position.x, layoutNode.position.y);
        object.scale.set(layoutNode.scale.x, layoutNode.scale.y);
        return object;
    }

    public addLayoutNode(configNode: LayoutConfigNode, orientation: Orientation) {
        this.layoutNodes.push(this.makeLayoutNode(configNode, orientation));
    }

    public makeLayoutNode(configNode: LayoutConfigNode, orientation: Orientation): LayoutNode {
        let layoutNode: LayoutNode;

        if (configNode.type === "container") layoutNode = new ContainerNode();
        else if (configNode.type === "sprite") layoutNode = new SpriteNode();
        else if (configNode.type === "text") layoutNode = new TextNode();
        else throw new Error(`Invalid config node type ${configNode.type}`);

        layoutNode.orientation = orientation;
        layoutNode.name = configNode.name;
        if (configNode.alpha) layoutNode.alpha = configNode.alpha;
        if (configNode.visible) layoutNode.visible = configNode.visible;
        if (configNode.position) layoutNode.position = { ...configNode.position };
        if (configNode.scale) layoutNode.scale = { ...configNode.scale };
        if (layoutNode instanceof SpriteNode) {
            if (configNode.anchor) layoutNode.anchor = { ...configNode.anchor };
            if (configNode.texture) layoutNode.texture = Assets.get(configNode.texture);
            else layoutNode.texture = Assets.get(configNode.name);
        }
        if (layoutNode instanceof TextNode) {
            if (configNode.anchor) layoutNode.anchor = { ...configNode.anchor };
            if (configNode.text) layoutNode.text = configNode.text;
            if (configNode.fontSize) layoutNode.fontSize = configNode.fontSize;
        }
        if (configNode.children) {
            for (let i = 0; i < configNode.children.length; i++) {
                layoutNode.children.push(configNode.children[i].name);
            }
        }

        return layoutNode;
    }
}
