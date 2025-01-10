namespace moddedsprites {
    export class flags {
        private invisible:boolean //invisible
        Passthroughsprites:boolean //sprite ignores other sprites
        Ghost:boolean //sprite ignores collisions
        Static_:boolean //sprite stays constant
        Sprite:Sprite_ //the sprite 
        constructor(sprite:Sprite_,static_:boolean) {
            this.Sprite = sprite
            this.Static_ = static_
            if (static_) {
                this.Ghost = true
                this.Passthroughsprites = true
            }
        }
        set Invisible(v:boolean) {
          this.invisible = v
          this.Sprite.visible = !v
        }
        get Invisible() {
            return this.Invisible
        }
    }
}