namespace hitbox {
    export class hitbox {
        hash: number;
        parent: moddedsprites.sprite_;
        width:number
        height:number
        box:Image
        ox:Fx8
        oy:Fx8
        constructor(parent:moddedsprites.sprite_) {
            this.parent = parent
            this.box = createbox(parent)
            this.width = parent.image.width //don't use width or height objects before they are defined
            this.height = parent.image.height
            this.ox = Fx8(parent.image.width)
            this.oy = Fx8(parent.image.height)
        }
        get left() {
            return this.parent.left
        }
        set left(v:number) {
            this.parent.left = v
        }
        get right() {
            return this.parent.right
        }
        set right(v:number) {
            this.parent.right = v
        }
        get top() {
            return this.parent.top
        }
        set top(v:number) {
            this.parent.top = v
        }
        get bottom() {
            return this.parent.bottom
        }
        set bottom(v:number) {
            this.parent.bottom = v 
        }
        contains(x:number,y:number) {
            return (this.box.getPixel(x,y) == 1)
        }
    }
    function createbox(sprite:moddedsprites.sprite_) {
        let img = image.create(sprite.width, sprite.height)
        const im = sprite.img
        for (let i = 0; i < sprite.width; i++) { 
            for (let k = 0; k < sprite.height; k++) {
                if (im.getPixel(i, k)==0||16) {
                    img.setPixel(i, k, 1)
                } else {
                    continue
                }
            }
        }
        return img;
    }
    export function createhitbox(sprite:moddedsprites.sprite_) {
        return new hitbox(sprite)
    }
}