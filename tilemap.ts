namespace tiles {
    export function spritewallcollison(sprite:moddedsprites.sprite_,tm:TileMapData) {
        const w = tm.width
        const h = tm.height
        const x = sprite._x /16
        const y = sprite._y /16
        if (Math.constrain(x, 0, w) !=x) {return true} //outside of tilemap
        if (Math.constrain(y, 0, h) !=y) {return true} 
        return tiles.tileAtLocationIsWall(tiles.getTileLocation(x, y))
    }
    
}