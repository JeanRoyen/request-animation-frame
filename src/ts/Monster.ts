import {Rectangle} from "./framework25/shapes/Rectangle";
import {iPosition} from "./framework25/types/iPosition";
import {iColor} from "./framework25/types/iColor";
import {settings} from "./settings";

export class Monster extends Rectangle {
    sprite: CanvasImageSource;
    public currentFrame: number;


    constructor(sprite: CanvasImageSource, ctx: CanvasRenderingContext2D, position: iPosition, color: iColor, width: number, height: number, rotation: number = 0) {
        super(ctx, position, color, width, height, rotation);
        this.sprite = sprite;
        this.currentFrame = 0;
    }


    draw() {
        this.ctx.drawImage(
            this.sprite,
            settings.monster.frames[this.currentFrame].sx,
            settings.monster.frames[this.currentFrame].sy,
            this.width,
            this.height,
            this.position.x - this.width / 2,
            this.position.y - this.height / 2,
            this.width,
            this.height,
        )
    };
    update() {
        this.currentFrame++;
        if (this.currentFrame >= settings.monster.frames.length) {
            this.currentFrame = 0;
        }
        this.draw();
    }
}