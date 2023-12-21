import { Container, Sprite, Text } from "pixi.js";
import { LayoutConfigNode, LayoutNode, SpriteNode, TextNode } from "../../config/LayoutConfig";
import { Orientation } from "../../config/SceneConfig";
import { LayoutItem } from "./LayoutMapNode";
import { sagaMiddleware, slotState } from "../../store/Store";
import { put, take } from "redux-saga/effects";
import { slotActions } from "../../store/SlotSlice";

/**
 * Concerned with where everything is on the screen
 */
class LayoutController {
    public layoutMap: Map<string, LayoutItem> = new Map();

    public fillLayoutMap(layoutConfigTrees: { orientation: Orientation; tree: LayoutConfigNode;}[]) {
        layoutConfigTrees.forEach((config) => {
            this.fillLayoutNodes(config.tree, config.orientation);
        });
    }

    private fillLayoutNodes(tree: LayoutConfigNode, orientation: Orientation) {
        const configNodes: LayoutConfigNode[] = [];
        configNodes.push(tree);

        while(configNodes.length > 0) {
            const configNode = configNodes.pop();
            if (!configNode) break;

            const layoutItem = this.layoutMap.get(configNode.name);
            if (layoutItem === undefined) {
                this.layoutMap.set(configNode.name, new LayoutItem(configNode, orientation));
            } else {
                layoutItem.addLayoutNode(configNode, orientation);
            }

            if (!configNode.children) continue;
            for (let i = 0; i < configNode.children.length; i++) {
                configNodes.push(configNode.children[i]);
            }
        }
    }

    public orientationUpdate() {
        const orientation: Orientation = slotState().systemState.orientation;
        this.layoutMap.forEach((layoutMapNode) => {
            const layoutNode = layoutMapNode.layoutNodes.find((node) => node.orientation === orientation);

            if (layoutNode === undefined) layoutMapNode.container.visible = false;
            else this.updateDisplayNode(layoutMapNode.container, layoutNode)
        });
        sagaMiddleware.run(function* () {
            yield put(slotActions.setOrientationChanged());
        });
    }

    private updateDisplayNode(node: Container, layoutNode: LayoutNode) {
        node.scale.x = layoutNode.scale.x;
        node.scale.y = layoutNode.scale.y;
        node.position.x = layoutNode.position.x;
        node.position.y = layoutNode.position.y;
        node.alpha = layoutNode.alpha;
        // node.visible = layoutNode.visible;
        //important! order is important because text extends sprite
        if (node instanceof Text && layoutNode instanceof TextNode) {
            (node as Text).anchor.x = layoutNode.anchor.x;
            (node as Text).anchor.y = layoutNode.anchor.y;
            (node as Text).style.fontSize = layoutNode.fontSize;
        } else if (node instanceof Sprite && layoutNode instanceof SpriteNode) {
            (node as Sprite).anchor.x = layoutNode.anchor.x;
            (node as Sprite).anchor.y = layoutNode.anchor.y;
            (node as Sprite).texture = layoutNode.texture;
        }

        layoutNode.children.forEach((child) => {
            const childLayoutMapNode = this.layoutMap.get(child);
            if (childLayoutMapNode === undefined) throw new Error(`Node ${child} not registered in layout map`);

            if (childLayoutMapNode.container.name === layoutNode.name) return;
            if (childLayoutMapNode.container.parent) childLayoutMapNode.container.parent.removeChild(childLayoutMapNode.container);
            node.addChild(childLayoutMapNode.container);
        });
    }

    * watchOrientationChange() {
        while (true) {
            yield take(slotActions.setOrientation);
            this.orientationUpdate();    
        }
    }
}

export const layoutController = new LayoutController();
