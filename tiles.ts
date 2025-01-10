// Add your code here
namespace tiles {
    export class Tilemap_ extends TileMap {
    overlaps(s:Sprite_) {
        return this.isObstacle(s._x/16,s._y/16)
    }
    
    }
}