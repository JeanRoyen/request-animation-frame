import {Monster} from "./Monster";
import {settings} from "./settings";
import {Hsl} from "./framework25/colors/Hsl";
import {Rectangle} from "./framework25/shapes/Rectangle";
import {randomInt} from "./framework25/helpers/random";
import {Obstacle} from "./Obstacle";

const app = {
    init() {
        this.canvas = document.getElementById("my-canvas");
        this.ctx = this.canvas.getContext('2d');
        this.sprite = new Image();
        this.sprite.src = 'src/img/sprite.png';
        this.obstacles = [];
        this.addEventListeners();
        this.addObstacles()
        this.monster = new Monster(
            this.sprite,
            this.ctx, {
                y: this.canvas.height - settings.monster.height / 2,
                x: settings.monster.x,
            },
            new Hsl(0, 0, 0),
            settings.monster.width,
            settings.monster.height
        );
    },
    addObstacles() {
        const height = randomInt(settings.rectangle.minHeight, settings.rectangle.maxHeight);
        const width = randomInt(settings.rectangle.minWidth, settings.rectangle.maxWidth);
        this.obstacles.push(
            new Obstacle(
                this.ctx,
                {
                    y: this.canvas.height - height / 2,
                    x: this.canvas.width + width / 2
                },
               new Hsl(240, 80, 70),
                width,
                height,
                randomInt(settings.rectangle.minSpeed, settings.rectangle.maxSpeed)
            )
        )
    },
    addEventListeners() {
        this.sprite.addEventListener('load', () => {
            this.update();
            this.monster.draw();
        });
    },
    update() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // Clear canvas
        this.monster.update();
        this.obstacles.forEach((obstacle: Obstacle) => {
            obstacle.update();
        })
        requestAnimationFrame(this.update.bind(this));
    }
}
app.init()