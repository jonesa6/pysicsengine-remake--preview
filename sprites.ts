
namespace moddedsprites {
function sprite_sayrenderer() {return }
let sprites:sprite_[]
export const blank = img`
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
................................................................................................................................................................
`   
class baseprite_ {
img:Image
_x:number
_y:number
public _vx:number
public _vy:number
ax:number
ay:number
width:number
height:number
halfwidth:number
halfheight:number
hitbox: hitbox.hitbox
lastx:number
lasty:number
isclipping:boolean

id:number
visible:Boolean
flags:flags
constructor(img:Image) {
    this.img=img
    this.recalcsize()
    this.isclipping = false
    
    this._x = 80
    this._y = 60
    this._vx = 0
    this._vy = 0
    this.visible = true
}
recalcsize() {
this.width = this.img.width
this.height = this.img.height
this.halfwidth = this.width / 2 
this.halfheight = this.height / 2
}
public set image(img:Image) {
    this.img = img
    this.recalcsize()
}
public get image() {return this.img}
public get left() {
return this._x - this.halfwidth
}
public set left(left:number) {
    this._x = left + this.halfwidth
}
public get right() {
    return this._x + this.halfwidth
}
public set right(right:number) {
this._x = right - this.halfwidth 
}
public get top() {
    return this._y - this.halfheight
}
public set top(top:number) {
    this._y = top - this.halfheight
}
public get bottom() {
return this._y + this.halfheight
}
public set bottom(bottom:number) {
    this._y = bottom - this.halfheight
}
    isStatic() {
        return this.image.isStatic();
    }
    init() {

        game.onUpdate(function () {
            this.update()
        })
        game.onShade_(function () {
            this.draw()
        })

    }
}
export class sprite_ extends baseprite_  {
    _obstacles: sprites.Obstacle[]
    _hithandling:tilehit
    sayRenderer:sprites_.SpriteSayRenderer
    constructor(img:Image) {
        super(img)
        this.hitbox = hitbox.createhitbox(this)
        scene.currentscene_.moddedpysicsengine.addSprite(this) //tell the physicsEngine that this sprite exists
        this.flags = new flags(this, false)
        this.init()
    }
    __draw(camera: scene.Camera) {
        if (this.visible != (!this.flags.Invisible)) {this.visible = (!this.flags.Invisible)}
        if (this.visible||(!this.flags.Invisible)) {
            this.__drawCore(camera);
        }
    }
    clearObstacles() {
        this._obstacles = [];
    }

    registerObstacle(direction: CollisionDirection, other: sprites.Obstacle, tm?: tiles.TileMap) {
        this._obstacles[direction] = other;
        const collisionHandlers = game.currentScene().collisionHandlers[other.tileIndex];
        const wallCollisionHandlers = game.currentScene().wallCollisionHandlers;
        tm = tm || game.currentScene().tileMap;
        forever(function() {
        const wall = tiles.spritewallcollison(this,tm.data) //check if inside wall
        if (wall) { //inside wall
        
        }
        })
    }
    overlapswith(b: Sprite_) {
        if (this.flags.Passthroughsprites || this.flags.Ghost) {
            return false; //cannot collide
        }
        if (b.flags.Passthroughsprites || b.flags.Ghost) {
            return false; //cannot collide
        }
        const minWidth = Math.min(this.width, b.width) // choose smallest width
        const minHeight = Math.min(this.height, b.height) //choose smallest height
        const Xdist = Math.abs(this._x - b._x)
        const Ydist = Math.abs(this._y - b._y)
        const hitbox1 = this.hitbox
        const hitbox2 = b.hitbox
        if (Xdist <= minWidth && Ydist <= minHeight) { //collision 
            for (let j = 0; j < b.width; j++) {
                for (let l = 0; l < b.height; l++) {
                    for (let i = 0; i < this.width; i++) {
                        for (let k = 0; i < this.height; i++) {
                            if (hitbox1.box.getPixel(i, k) == 1 && hitbox2.box.getPixel(j, l)) {
                                return true
                            } else {
                                continue; //no collisions
                            }
                        }
                    }
                }
            }

        }
        return false
        }
    destroy() {
        this.hitbox = undefined
        this._x = undefined
        this._y = undefined 
        this.img = undefined
        this._vx = undefined
        this._vy = undefined
        this.ax = undefined
        this.ay = undefined

    }
    setHitbox() {
        this.hitbox = hitbox.createhitbox(this)
    }
    /**
         * Indicates if the sprite is outside the screen
         */
    //%
    isOutOfScreen(camera: scene.Camera): boolean {
        const ox =   camera.drawOffsetX;
        const oy =   camera.drawOffsetY;
        return this.right - ox < 0 || this.bottom - oy < 0 || this.left - ox > screen.width || this.top - oy > screen.height;
    }

    __drawCore(camera: scene.Camera) {
        this.drawSay(camera);

        if (this.isOutOfScreen(camera)) return;

        const ox =  camera.drawOffsetX;
        const oy =  camera.drawOffsetY;

        const l = Math.floor(this.left - ox);
        const t = Math.floor(this.top - oy);

        this.drawSprite(l, t);
        this.drawDebug(l, t, ox, oy);
    }

    __update(camera: scene.Camera, dt: number) {
        if (this.sayRenderer) this.sayRenderer.update(dt, camera, this);
    }
    private sayEndTime: number;
    /*
    * the sayText function
    *
    */
    sayText(text: any, timeOnScreen?: number, animated = false, textColor = 15, textBoxColor = 1) {
        if (text === null || text === undefined || text === "") {
            if (this.sayRenderer) this.sayRenderer.destroy();
            this.sayRenderer = undefined;
            return;
        }

        if (this.sayRenderer) this.sayRenderer.destroy();
        this.sayRenderer = undefined;

        if (timeOnScreen >= 0) this.sayEndTime = control.millis() + timeOnScreen;

        text = console.inspect(text);

        this.sayRenderer = new sprites_.SpriteSayRenderer(text, textColor, textBoxColor, animated, timeOnScreen);
    }
    protected drawSay(camera: scene.Camera) {
        if (this.sayRenderer) {
            if (this.sayEndTime !== undefined) {
                if (control.millis() < this.sayEndTime) {
                    this.sayRenderer.draw(screen, camera, this);
                }
                else {
                    this.sayRenderer.destroy();
                    this.sayRenderer = undefined;
                    this.sayEndTime = undefined;
                }
            }
            else {
                this.sayRenderer.draw(screen, camera, this)
            }
        }
    }

    protected drawDebug(left: number, top: number, offsetX: number, offsetY: number) {
        // debug info
        if (game.debug) {
            screen.drawRect(
               this.hitbox.left - offsetX,
                this.hitbox.top - offsetY,
                this.hitbox.width,
                this.hitbox.height,
                1
            );
        }
    }

    protected drawSprite(drawLeft: number, drawTop: number) {
        
            screen.blit(
                // dst rect in screen
                drawLeft, drawTop,
                this.width,
                this.height,
                // src rect in sprite image
                this.image,
                0, 0,
                this.image.width, this.image.height,
                true, false);
    }

    draw() {
        screen.drawImage(this.img, this._x, this._y)
    }

    update() { //update x ,y ,vx ,vy
       this.lastx = this._x
        this.lasty = this._y
        this._x = + this._vx
        this._y = + this._vy
        this._vx = + this.ax
        this._vy = + this.ay
    }
}
}
class Sprite_ extends moddedsprites.sprite_ { } // make it easily avible