enum MyEnum {
    //% block="x"
    X,
    //% block="y"
    Y,
    //%block ="vx"
    Vx,
    //%block="vy"
    Vy
}

/**
 * Sprites on screen
 */
//% weight=99 color="#4B7BEC" icon="\uf1d8"
//% groups='["Create", "Physics", "Effects", "Projectiles", "Overlaps", "Lifecycle"]'
namespace Sprites_ {
    //% block
    //% group = "create"
    //% weight = 1
    //% blockGap = 8
    //% blockSetVariable = "mySprite"
    export function create(img:Image) {
     const physicsEngine = scene.currentscene_.moddedpysicsengine
     const currentScene = scene.currentscene_
     let sprite = new Sprite_(img)
     physicsEngine.addSprite(sprite)
     //currentScene.addSprite(sprite)
     return sprite
    }
    //% block
    //% group = "create"
    //% weight = 2
    export function create_(img: Image) {
        return new Sprite_(img)
    }
    //% block
    //% group = "Physics"
    //% weight = 2
    export function setPosition(sprite:Sprite_,x:number,y:number) {
        sprite._x = x
        sprite._y = y
    }
    //% block
    export function setVelocity(sprite:Sprite_,vx:number,vy:number) {
        sprite._vx = vx
        sprite._vy = vy
    }
    //% block
    export function overlaps(a:Sprite_,b:Sprite_) {
        if (!a&&b) {return null}  // one or both doesn exist
        return scene.currentscene_.moddedpysicsengine.collides(a,b) //ask the physicsEngine if they are colliding
    }
    //%block
    export function get(sprite:Sprite_,prop:MyEnum) {
        if (prop=MyEnum.X) {return sprite._x}
        if (prop=MyEnum.Y) {return sprite._y}
        if (prop=MyEnum.Vx) {return sprite._vx}
        if (prop=MyEnum.Vy) {return sprite._vy}
        return undefined
    }
    //%block 
    export function set(sprite:Sprite_,value:number,prop:MyEnum) {
        if (prop = MyEnum.X) { sprite._x = value}
        if (prop = MyEnum.Y) {  sprite._y = value }
        if (prop = MyEnum.Vx) {  sprite._vx = value }
        if (prop = MyEnum.Vy) {  sprite._vy = value }
    }
}
