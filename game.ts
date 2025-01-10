namespace game {
   
    export function gettm() {
        if (game.gameisover) {return undefined}
        return scene.currentscene_.tileMap
    }
}
namespace game {
    function init(forceNewScene?: boolean) {
        if (!scene.currentscene_ || forceNewScene) {
            scene.currentscene_ = new scene.Scene_(control.pushEventContext(), scene.currentscene_);
        }
        scene.currentscene_.init()
    }
    /**
      * Draw on screen after sprites
      * @param body code to execute
      */
    //% group="Gameplay"
    //% help=game/shade weight=10 afterOnStart=true
    //% block
    export function onShade_(a: () => void): void {
        init();
        if (!a) return;
        scene.createRenderable(scene.ON_SHADE_Z, a);
    }
}