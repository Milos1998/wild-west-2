import { Assets, Container, Sprite, Text } from "pixi.js";
import { ContainerNode, LayoutConfigNode, LayoutNode, SpriteNode, TextNode } from "../../config/LayoutConfig";
import { Orientation } from "../../config/SceneConfig";

/**
 * Concerned with where everything is on the screen
 */
class LayoutController {
    private layoutMaps: { orientation: Orientation, map: Map<string, LayoutNode> }[] = [];

    public makeLayoutMaps(layoutConfigTrees: { orientation: Orientation; tree: LayoutConfigNode;}[]) {
        for (let i = 0; i < layoutConfigTrees.length; i++) {
            this.layoutMaps.push({
                orientation: layoutConfigTrees[i].orientation,
                map: this.makeLayoutMap(layoutConfigTrees[i].tree),
            });
        }
    }

    private makeLayoutMap(tree: LayoutConfigNode): Map<string, LayoutNode> {
        const map: Map<string, LayoutNode> = new Map();

        const configNodes: LayoutConfigNode[] = [];
        configNodes.push(tree);

        while(configNodes.length > 0) {
            const configNode = configNodes.pop();
            if (!configNode) break;

            const layoutNode = this.makeLayoutNode(configNode);
            map.set(layoutNode.name, layoutNode);

            if (!configNode.children) continue;
            for (let i = 0; i < configNode.children.length; i++) {
                configNodes.push(configNode.children[i]);
            }
        }

        return map;
    }

    private makeLayoutNode(configNode: LayoutConfigNode): LayoutNode {
        let layoutNode: LayoutNode;

        if (configNode.type === "container") layoutNode = new ContainerNode();
        else if (configNode.type === "sprite") layoutNode = new SpriteNode();
        else if (configNode.type === "text") layoutNode = new TextNode();
        else throw new Error(`Invalid config node type ${configNode.type}`);

        layoutNode.name = configNode.name;
        if (configNode.alpha) layoutNode.alpha = configNode.alpha;
        if (configNode.visible) layoutNode.visible = configNode.visible;
        if (configNode.position) layoutNode.position = { ...configNode.position };
        if (configNode.scale) layoutNode.scale = { ...configNode.scale };
        if (layoutNode instanceof SpriteNode) {
            if (configNode.anchor) layoutNode.anchor = { ...configNode.anchor };
            if (configNode.texture) layoutNode.texture = Assets.get(configNode.texture);
        }
        if (layoutNode instanceof TextNode) {
            if (configNode.anchor) layoutNode.anchor = { ...configNode.anchor };
            if (configNode.text) layoutNode.text = configNode.text;
            if (configNode.fontSize) layoutNode.fontSize = configNode.fontSize;
        }

        return layoutNode;
    }

    public orientationUpdate(root: Container, orientation: Orientation) {
        const layoutMap = this.layoutMaps.find((layoutMap) => layoutMap.orientation === orientation);
        if (layoutMap === undefined) return;

        const displayNodes: Container[] = [];
        displayNodes.push(root);
        while (displayNodes.length > 0) {
            const displayNode = displayNodes.pop();
            if (!displayNode) break;
            if (!displayNode.name) continue;

            const layoutNode = layoutMap.map.get(displayNode.name);
            if (layoutNode) this.updateDisplayNode(displayNode, layoutNode);

            for (let i = 0; i < displayNode.children.length; i++) {
                displayNodes.push(displayNode.children[i] as Container);
            }
        }
    }

    public updateDisplayNode(node: Container, layoutNode: LayoutNode) {
        node.scale.x = layoutNode.scale.x;
        node.scale.y = layoutNode.scale.y;
        node.position.x = layoutNode.position.x;
        node.position.y = layoutNode.position.y;
        node.alpha = layoutNode.alpha;
        node.visible = layoutNode.visible;
        //important! order is important because text extends sprite
        if (node instanceof Text && layoutNode instanceof TextNode) {
            (node as Text).anchor.x = layoutNode.anchor.x;
            (node as Text).anchor.y = layoutNode.anchor.y;
            (node as Text).text = layoutNode.text;
            (node as Text).style.fontSize = layoutNode.fontSize;
        } else if (node instanceof Sprite && layoutNode instanceof SpriteNode) {
            (node as Sprite).anchor.x = layoutNode.anchor.x;
            (node as Sprite).anchor.y = layoutNode.anchor.y;
            (node as Sprite).texture = layoutNode.texture;
        }
    }

    public makeInitialTree() {
        const layoutMap = this.layoutMaps[0];

        const displayNodes: Container[] = [];
        displayNodes.push(root);
        while (displayNodes.length > 0) {
            const displayNode = displayNodes.pop();
            if (!displayNode) break;
            if (!displayNode.name) continue;

            const layoutNode = layoutMap.map.get(displayNode.name);
            if (layoutNode) this.updateDisplayNode(displayNode, layoutNode);

            for (let i = 0; i < displayNode.children.length; i++) {
                displayNodes.push(displayNode.children[i] as Container);
            }
        }
    }

    private makeDisplayNode(layoutNode: LayoutNode): Container {
    }
}

export const layoutController = new LayoutController();
