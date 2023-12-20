import { Assets, Container, Sprite, Text } from "pixi.js";
import { layoutController } from "../controllers/layoutController/LayoutController";
import { LayoutItem } from "../controllers/layoutController/LayoutMapNode";

class LayoutUtils {
    public makeSprite(textureName: string): Sprite {
        const texture = Assets.get(textureName);
        if (texture === undefined) throw new Error(`Texture ${textureName} does not exist`);

        return new Sprite(texture);
    }

    public getLayoutItem(itemName: string): LayoutItem {
        const layoutItem = layoutController.layoutMap.get(itemName);
        if (layoutItem === undefined) throw new Error(`Layout item with id ${itemName} is not registered`);

        return layoutItem;
    }

    public copyPixiObject(layoutId: string): Container {
        const original = this.getLayoutItem(layoutId).container;
        let copy: Container;
        if (original instanceof Text) copy = new Text();
        else if (original instanceof Sprite) copy = new Sprite(original.texture);
        else copy = new Container();

        return copy;
    }

    public centerContainers(parent: Container, child: Container) {
        const x = (parent.width - child.width) / 2;
        const y = (parent.height - child.height) / 2;
        child.position.set(x, y);
    }
}

export const layoutUtils = new LayoutUtils();
