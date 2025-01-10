
namespace timers {
    /**
     * Run the attached code seperately from other code.
     * This creates a seperate context for "pause" so that pauses
     * within or without this code are seperated.
     */
    //% handlerStatement=1
    export function background(then: () => void) {
        control.runInBackground(then)
    }
    
}