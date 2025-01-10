// Add your code here
//% advanced = 1
//% color=#8854d0 weight=97 icon="\uf111"
let custommenu = true
namespace interface {
    //% block
    export function resetScene() {
        scene.currentscene_ = new scene.Scene_(control.eventContext(), scene.currentscene_)
    }
    //% block
    //% advanced = 1
    export function physicsEnginemaxvelocity(value:number) {
        scene.currentscene_.moddedpysicsengine.maxVelocity = Fx8(value)
    }
    //% block
    //% advanced = 1
    export function physicsEngineminsinglestep(value: number) {
        scene.currentscene_.moddedpysicsengine.minSingleStep = Fx8(value)
    }
    //% block
    //% advanced = 1
    export function physicsEnginemaxsinglestep(value: number) {
        scene.currentscene_.moddedpysicsengine.maxSingleStep = Fx8(value)
    }
    //%block 
    export function sprite_counsprite_count() {
        return scene.currentscene_.allsprites.length
    }
    //% block
    export function custom_or_normal_menu(v:boolean) {
    custommenu = v
    }
    //%block 
    export function checks() {
    
        for (let i = 0; i < sprite_counsprite_count()-1;) {
            const s = scene.currentscene_.allsprites[i]
            
            if (s.isclipping) {
                scene.currentscene_.moddedpysicsengine.canResolveClipping(s,game. gettm()) //try to resolve clipping         
            }
        }
    }
    
    }