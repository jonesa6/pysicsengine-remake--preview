// add your code here
namespace power {
    export const DeepSleeptimeout = 450
    export let indeepSleep = false
    function deepsleep() {
    const lastscene = scene.currentscene_
    let time = control.millis()
    //reset scene
    const sc = scene.currentscene_
    sc.destroy()
    let apreesed = false
    //turn off screen

    screen.setBrightness(0)
    screen.drawImage(image.create(160, 120),0,0)
    game.popScene() //stop all stuff
   
    // draw "a-wake up"
    scene.backgroundImage().print("a--wake up",30,40,1,image.font12)
    
    //add functionnality
    controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
        apreesed = true
    })
    function resleep() {
        if (!apreesed) {
            time = control.millis()
            pauseUntil(() => (control.millis() - time > DeepSleeptimeout * 1000) || apreesed)
            resleep()
        } else {
            control.reset()
        }
    }
    indeepSleep = true
    //450s of deep sleep
    pauseUntil(() => (control.millis()-time>DeepSleeptimeout*1000)||apreesed,DeepSleeptimeout*1500)
    resleep() //check if timer was out if so restart it
    control.reset()
    }

   
}