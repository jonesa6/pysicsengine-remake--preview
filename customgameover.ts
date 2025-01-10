namespace game {
    export let gameisover: boolean
    gameisover = false
    function padStr(str: string) {
        for (let i = 0; i < 2; i++) {
            str = str + " "
        }
        return str
    }

    const img_trophy_sm = img`
    . . . . . . . 
    . 4 5 5 5 1 . 
    . 4 5 5 5 1 . 
    . 4 5 5 5 1 . 
    . . 4 5 1 . . 
    . . . 5 . . . 
    . . 4 5 1 . . 
    . . . . . . . 
    `;
    const img_trophy_lg = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 5 5 5 5 5 5 . . . . .
        . . . . 5 4 4 4 4 4 4 5 . . . .
        . . . . 5 5 5 5 5 5 5 5 . . . .
        . . . . 4 5 5 5 5 5 5 1 . . . .
        . . . 5 4 4 5 5 5 5 1 1 5 . . .
        . . 5 . 4 4 5 5 5 5 1 1 . 5 . .
        . . 5 . 4 4 5 5 5 5 1 1 . 5 . .
        . . . 5 4 4 5 5 5 5 1 1 5 . . .
        . . . . 4 4 5 5 5 5 1 1 . . . .
        . . . . . 4 5 5 5 1 1 . . . . .
        . . . . . . 4 5 1 1 . . . . . .
        . . . . . . . 4 1 . . . . . . .
        . . . . . 4 4 5 5 1 1 . . . . .
        . . . . . . . . . . . . . . . .
    `;

    const img_sleepy_sim = img`
        . . . . . . . . . . . . . . . .
        . . . 6 6 6 6 6 6 6 6 6 6 . . .
        . . 6 f f f f f f f f f f 6 . .
        . . 6 f f f f f f f f f f 6 . .
        . . 6 f f 1 1 f f 1 1 f f 6 . .
        . . 6 f f f f f f f f f f 6 . .
        . . 6 f f f f 1 1 f f f f 6 . .
        . . 6 f f f f f f f f f f 6 . .
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . .
        . . 6 6 f 6 6 6 6 6 6 6 f 6 . .
        . . 6 f f f 6 6 6 6 6 6 6 6 . .
        . . 6 6 f 6 6 6 6 6 f 6 6 6 . .
        . . 6 6 6 6 6 6 6 6 6 6 6 6 . .
        . . . 6 6 6 6 6 6 6 6 6 6 . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;
    export const img_a_button = img`
        . . . . . . . . . . . . . . . .
        . . . . 6 6 6 6 6 6 6 . . . . .
        . . . 6 7 7 1 1 1 7 7 6 . . . .
        . . 6 7 7 1 7 7 7 1 7 7 6 . . .
        . . 6 7 7 1 7 7 7 1 7 7 6 . . .
        . . 6 7 7 1 1 1 1 1 7 7 6 . . .
        . . 6 6 7 1 7 7 7 1 7 7 6 . . .
        . . 6 6 7 1 7 7 7 1 7 6 6 . . .
        . . 8 6 6 7 6 6 6 7 6 6 6 . . .
        . . . 8 6 6 6 6 6 6 6 8 . . . .
        . . . . 8 8 8 8 8 8 8 . . . . .
        . . . . . . . . . . . . . . . .
    `
    const blankimg = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    export class singleplayergameover {
        gameovertext: string
        winorlose: boolean
        score: number
        sayhighscore: boolean
        winSound: music.Playable
        loseSound: music.Playable
        color: number
        constructor(score: number, sayhighscore: boolean, color?: number) {
            this.score = score
            this.sayhighscore = sayhighscore
            this.winSound = music.melodyPlayable(music.powerUp);
            this.loseSound = music.melodyPlayable(music.wawawawaa);
            this.color = color || 1
            if (this.color == 16) { this.color = 1 }
        }
        end() {
            gameisover = true
            game.currentScene().allSprites = [] //reset all normal sprites
            tiles.setCurrentTilemap(tilemap` `) //reset normal tilemap
            scene.currentscene_.tileMap = null //reset custom tilemap
            scene.currentscene_.allSprites = []
            scene.currentscene_.moddedpysicsengine.sprites = []
            pause(35) //short visual pause 
            scene.backgroundImage()
            scene.backgroundImage().drawLine(0, 34, 160, 34, this.color)
            scene.backgroundImage().drawLine(0, 100, 160, 100, this.color)
            scene.backgroundImage().drawImage(img_a_button, 135, 80)
            if (this.winorlose) {
                scene.backgroundImage().print("YOU WON!", 55, 65, this.color)
                let win = img_trophy_lg
                if (this.color != 1) {
                    win.replace(5, this.color)
                }
                scene.backgroundImage().drawImage(win, 70, 45)
                music.play(this.winSound, music.PlaybackMode.InBackground)
            } else {
                let lose = img_sleepy_sim
                if (this.color != 1) {
                    lose.replace(6, this.color)
                }
                scene.backgroundImage().print("you lose", 55, 65, this.color)
                scene.backgroundImage().drawImage(lose, 70, 45)

                music.play(this.loseSound, music.PlaybackMode.InBackground)
            }
            if (this.sayhighscore && this.winorlose) {
                if (!settings.exists("#highscore_")) { settings.writeNumber("#highscore_", 0) }
                if (this.score > settings.readNumber("#highscore_")) {
                    settings.writeNumber("#highscore_", this.score)
                    scene.backgroundImage().print("New Best Score!", 39, 76, this.color)
                }
            }
            scene.backgroundImage().print(this.gameovertext, 60, 90, this.color)

            pauseUntil(() => controller.A.isPressed())
            pause(150)
            control.reset()
        }
    }
    export class multiplayergameover {
        winorlose: boolean
        sayhighscore: boolean
        winSound: music.Playable
        loseSound: music.Playable
        color: number
        scores: number[]
        constructor(scores: number[], sayhighscore: boolean, color?: number) {
            this.scores = scores
            this.sayhighscore = sayhighscore
            this.winSound = music.melodyPlayable(music.powerUp);
            this.loseSound = music.melodyPlayable(music.wawawawaa);
            this.color = color || 1
            if (this.color == 16) { this.color = 1 }
        }
        end() {
            gameisover = true
            game.currentScene().allSprites = []
            tiles.setCurrentTilemap(tilemap` `)
            scene.backgroundImage().drawLine(0, 34, 160, 34, this.color)
            scene.backgroundImage().drawLine(0, 100, 160, 100, this.color)
            scene.backgroundImage().drawImage(img_a_button, 135, 70)
            if (this.winorlose) {
                let win = img_trophy_lg
                if (this.color != 1) {
                    win.replace(5, this.color)
                }
                scene.backgroundImage().drawImage(win, 70, 45)
                music.play(this.winSound, music.PlaybackMode.InBackground)
            } else {
                let lose = img_sleepy_sim
                if (this.color != 1) {
                    lose.replace(6, this.color)
                }

                scene.backgroundImage().print("you lose", 55, 65, this.color)
                scene.backgroundImage().drawImage(lose, 70, 45)

                music.play(this.loseSound, music.PlaybackMode.InBackground)
            }
            // make sure highscores exist
            if (!settings.exists("#highscore_")) { settings.writeNumber("#highscore_", 0) }
            // figure out which players connected
            let p2 = false
            let p3 = false
            let p4 = false

            if (controller.player2.connected == true) { p2 = true }
            if (controller.player3.connected == true) { p3 = true }
            if (controller.player4.connected == true) { p4 = true }
            // just make sure no players are skipped (like from p1 to p4)

            if (p4) {
                p2 = true
                p3 = true
            }
            if (p3) {
                p2 = true
            }

            //now say scores
            let scores = ""
            scores = scores + " p1:" + this.scores[0]
            scores = padStr(scores) + "p2:" + this.scores[1]
            let scores2 = ""
            if (p3) {
                scores2 = padStr(scores2) + "p3:" + this.scores[2]
            }
            if (p4) {
                scores2 = padStr(scores2) + "p4:" + this.scores[3]
            }


            scene.backgroundImage().print("YOU WON!", 55, 65, this.color)
            scene.backgroundImage().print(scores, 39, 76, this.color)
            scene.backgroundImage().print(scores2, 39, 86, this.color)
            pauseUntil(() => controller.A.isPressed())
            pause(150)
            control.reset()
        }
    }
    //controller.player2.isPressed(ControllerButton.A)
    //settings.writeNumber("#highscore_", 0)
    //const b = new multiplayergameover([0,2,4,5],true)
    //b.winorlose = true   
    //pause(1500)
    //b.end()
    /*
     const f = new singleplayergameover(63,true)
     f.gameovertext = "doo!"
     f.winorlose = true
     f.end()
     */
    //% block
    //% group = "Game Over"
    //% win.defl = true
    //% expandableArgumentMode 
    export function gameOver2(win: boolean, color?: number, extratext?: string) {
        const f = new singleplayergameover(info.score(), true, color)
        f.winorlose = win
        f.gameovertext = extratext || ""
        f.end()
    }
}
