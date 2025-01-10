/**
 * the makecode arcade physicsEngine Modified
 */
namespace Physics_ {
    

    class PhysicsEngine_ {
        constructor() {
        }

        /**
         * Adds sprite to the physics
         * @param sprite
         */
        addSprite(sprite: Sprite_) { }

        removeSprite(sprite: Sprite_) { }

        /** move a single sprite **/
        moveSprite(s: Sprite_, dx: Fx8, dy: Fx8) { }

        draw() { }

        /** Apply physics and collisions to all sprites **/
        move(dt: number) { }

        setMaxSpeed(speed: number) { }

        overlaps(sprite: Sprite_): Sprite_[] { return []; }

    }
    class MovingSprite_ {
        constructor(
            public sprite: Sprite_,
            // vx and vy when last updated
            public cachedVx: number,
            public cachedVy: number,
            // remaining x
            public dx: Fx8,
            public dy: Fx8,
            // how much to move per step
            public xStep: Fx8,
            public yStep: Fx8
        ) { }
    }

   
 /**
 * A physics engine that does simple AABB bounding box check
*/
 export class moddedPhysicsEngine extends PhysicsEngine_ {
     public sprites: Sprite_[];
     protected map: ModdedSpriteMap_
     protected maxNegativeVelocity: Fx8;
     protected scene:scene.Scene_
     maxVelocity: Fx8;
     minSingleStep: Fx8;
     maxSingleStep: Fx8;
    
    constructor(scene:scene.Scene_,lastsprites?:Sprite_[],maxVelocity?:number, minSingleStep?:number, maxSingleStep?:number) {
        super();
        this.sprites = lastsprites||[];
        this.map = new ModdedSpriteMap_
        this.maxSpeed = maxVelocity|500;
        this.maxStep = maxSingleStep|2;
        this.minStep = minSingleStep|4;
        this.scene = scene
    }

    get maxSpeed(): number {
        return Fx.toInt(this.maxVelocity);
    }

    set maxSpeed(v: number) {
        this.maxVelocity = Fx8(v);
        this.maxNegativeVelocity = Fx8(0-v);
    }

    get minStep(): number {
        return Fx.toInt(this.minSingleStep);
    }

    set minStep(v: number) {
        this.minSingleStep = Fx8(v);
    }

    get maxStep(): number {
        return Fx.toInt(this.maxSingleStep);
    }

    set maxStep(v: number) {
        this.maxSingleStep = Fx8(v);
    }

    setMaxSpeed(v: number) {
        this.maxSpeed = v;
    }

    addSprite(sprite: Sprite_) {
    this.sprites.push(sprite)
    this.map.buckets.push([sprite])
    }

    removeSprite(sprite: Sprite_) {
       this.sprites.removeElement(sprite)
    }

    draw() {
        this.map.draw();
    }
    collides(a:Sprite_,b:Sprite_) {
        a.setHitbox(); b.setHitbox() //make sure hitbox is updated
        return a.overlapswith(b) //use the sprite collision function
    }
    move(dt: number) {
        // Sprite movement logic is done in milliseconds to avoid rounding errors with Fx8 numbers
        const dtMs = Math.min(MAX_TIME_STEP, dt * 1000);
        const dt2 = Math.idiv(dtMs, 2);

        const scene = game.currentScene();

        const tileMap = scene.tileMap;
        const movingSprites = this.sprites
            .map(sprite => this.createMovingSprite_(sprite, dtMs, dt2));

        // clear obstacles if moving on that axis
        this.sprites.forEach(s => {
            if (s._vx || s._vy) s.clearObstacles();
        });

        this.map.clear();
        this.map.resizeBuckets(this.sprites);

        const MAX_STEP_COUNT = Fx.toInt(
            Fx.idiv(
                Fx.imul(
                    Fx.div(
                        this.maxVelocity,
                        this.minSingleStep
                    ),
                    dtMs
                ),
                1000
            )
        );
        const overlapHandlers = scene.overlapHandlers.slice();

        // buffers store the moving sprites on each step; switch back and forth between the two
        let selected = 0;
        let buffers = [movingSprites, []];
        for (let count = 0; count < MAX_STEP_COUNT && buffers[selected].length !== 0; ++count) {
            const currMovers = buffers[selected];
            selected ^= 1;
            const remainingMovers = buffers[selected];

            for (let ms of currMovers) {
                const s = ms.sprite;
                // if still moving and speed has changed from a collision or overlap;
                // reverse direction if speed has reversed
                const cashedvx = Fx8(ms.cachedVx)
                const cashedvy = Fx8(ms.cachedVy)
                if (ms.cachedVx !== s._vx) {
                    const vx = Fx8(s._vx)
                    if (vx == Fx.zeroFx8) {
                        ms.dx = Fx.zeroFx8;
                    } else if (vx < Fx.zeroFx8 && cashedvx > Fx.zeroFx8
                        || vx > Fx.zeroFx8 &&   cashedvx < Fx.zeroFx8) {
                        ms.dx = Fx.neg(ms.dx);
                        ms.xStep = Fx.neg(ms.xStep);
                    }

                    ms.cachedVx = s._vx;
                }
                if (ms.cachedVy !== s._vy) {
                    const vy =  Fx8(s._vx)
                    if (vy == Fx.zeroFx8) {
                        ms.dy = Fx.zeroFx8;
                    } else if (vy < Fx.zeroFx8 && cashedvy > Fx.zeroFx8
                        || vy > Fx.zeroFx8 &&  cashedvy < Fx.zeroFx8) {
                        ms.dy = Fx.neg(ms.dy);
                        ms.yStep = Fx.neg(ms.yStep);
                    }

                    ms.cachedVy = s._vy;
                }

                // identify how much to move in this step
                const stepX = Fx.abs(ms.xStep) > Fx.abs(ms.dx) ? ms.dx : ms.xStep;
                const stepY = Fx.abs(ms.yStep) > Fx.abs(ms.dy) ? ms.dy : ms.yStep;
                ms.dx = Fx.sub(ms.dx, stepX);
                ms.dy = Fx.sub(ms.dy, stepY);

                s.lastx = s._x;
                s.lasty = s._y;
                s._x = Fx.toFloat(Fx.add(Fx8(s._x), stepX));
                s._y = Fx.toFloat(Fx.add(Fx8(s._y), stepY));
                if (tileMap && tileMap.enabled) {
                    this.tilemapCollisions(ms, tileMap);
                }
                // if sprite still needs to move, add it to the next step of movements
                if (Fx.abs(ms.dx) > MIN_MOVE_GAP || Fx.abs(ms.dy) > MIN_MOVE_GAP) {
                    remainingMovers.push(ms);
                }
            }

            // this step is done; check collisions between sprites
            this.spriteCollisions(currMovers, overlapHandlers);
            // clear moving sprites buffer for next step
            while (currMovers.length) currMovers.pop();
        }
    }
    protected createMovingSprite_(sprite: Sprite_, dtMs: number, dt2: number): MovingSprite_ {

        const ovx = sprite._vx
        const ovy = sprite._vy
        const dx = sprite._vx+ ovx * dt2 / 1000;
        const dy = sprite._vy+ ovy * dt2 / 1000;

        let xStep = dx;
        let yStep = dy;
        
        // make step increments smaller until under max step size
        while (Math.abs(xStep) > Fx.toFloat(this.maxSingleStep)|| Math.abs(yStep) > Fx.toFloat(this.maxSingleStep) ) {
            const maxstep = Fx.toFloat(this.maxSingleStep)
            if (Math.abs(xStep) > maxstep) {
                xStep = xStep / 2
            }
            if (Math.abs(yStep) > maxstep) {
                yStep = yStep / 2
            }
        }
MovingSprite
        return new MovingSprite_(
            sprite,
            sprite._vx,
            sprite._vy,
            Fx8(dx),
            Fx8(dy),
            Fx8(xStep),
            Fx8(yStep)
        );
    }
    
    protected spriteCollisions(movedSprites: MovingSprite_[], handlers: scene.OverlapHandler[]) {
        control.enablePerfCounter("phys_collisions");
        if (!handlers.length) return;

        // sprites that have moved this step
        for (const ms of movedSprites) {
            const sprite = ms.sprite;
           
            const overSprites = this.map.overlaps(ms.sprite);

            for (const overlapper of overSprites) {
                const thisKind = 0
                const otherKind = 0

               

                // Maintaining invariant that the sprite with the higher ID has the other sprite as an overlapper
                const higher =  sprite
                const lower = overlapper
                // if the two sprites are not currently engaged in an overlap event,
                // apply all matching overlap events
                
            }
        }
    }


    protected tilemapCollisions(movingSprite_: MovingSprite_, tm: tiles.TileMap) {
        const s = movingSprite_.sprite;
        // if the sprite is already clipping into a wall,
        // allow free movement rather than randomly 'fixing' it
        if (true) s.setHitbox();
        const hbox = s.hitbox;
        const tileScale = tm.scale;
        const tileSize = 1 << tileScale;

        const xDiff = 
            s._x -
            s.lastx
        

        const yDiff = 
            s._y -
            s.lasty
        

        if (true) {
            if (xDiff !== 0) {
                const z = Fx.toFloat(Fx.zeroFx8)
                const j = Fx.toFloat(Fx.oneFx8)
                const half = Fx.toFloat(Fx.oneHalfFx8)
                const right = xDiff > z;
               
                const x0 = Fx.toIntShifted(
                    Fx.add(
                        right ?
                            Fx.add(Fx8(hbox.right), Fx.oneFx8)
                            :
                            Fx.sub(Fx8(hbox.left), Fx.oneFx8),
                        Fx.oneHalfFx8
                    ),
                    tileScale
                );
                  
                const collidedTiles: sprites.StaticObstacle[] = [];

                // check collisions with tiles sprite is moving towards horizontally
                for (
                    let y = Fx8(hbox.top - yDiff);
                    y < Fx.iadd(tileSize, Fx8 (hbox.bottom - yDiff));
                    y = Fx.iadd(tileSize, y)
                ) {
                    const y0 = Fx.toIntShifted(
                        Fx.add(
                            Fx.min(
                                y,
                                Fx8(hbox.bottom -yDiff)
                                
                            ),
                            Fx.oneHalfFx8
                        ),
                        tileScale
                    );

                    if (tm.isObstacle(x0, y0)) {
                        const obstacle = tm.getObstacle(x0, y0);
                        if (!collidedTiles.some(o => o.tileIndex === obstacle.tileIndex)) {
                            collidedTiles.push(obstacle);
                        }
                    }
                }

                if (collidedTiles.length) {
                    const collisionDirection = right ? CollisionDirection.Right : CollisionDirection.Left;
                    s._x = Fx.toFloat(Fx.sub(
                        right ?
                            Fx.sub(
                                Fx8(x0 << tileScale),
                                Fx8(hbox.width)
                            )
                            :
                            Fx8((x0 + 1) << tileScale),
                        hbox.ox
                    ));

                    for (const tile of collidedTiles) {
                       
                            s.registerObstacle(collisionDirection, tile, tm);
                        
                    }
                }
            }

            if (Fx8(yDiff) !== Fx.zeroFx8) {
                const down = Fx8(yDiff) > Fx.zeroFx8;
                const y0 = Fx.toIntShifted(
                    Fx.add(
                        down ?
                            Fx.add(Fx8(hbox.bottom), Fx.oneFx8)
                            :
                            Fx.sub(Fx8(hbox.top), Fx.oneFx8),
                        Fx.oneHalfFx8
                    ),
                    tileScale
                );
                const collidedTiles: sprites.StaticObstacle[] = [];

                // check collisions with tiles sprite is moving towards vertically
                for (
                    let x = hbox.left;
                    Fx8(x) < Fx.iadd(tileSize, Fx8(hbox.right));
                    x = Fx.toFloat(Fx.iadd(tileSize, Fx8(x)))
                ) {
                    const x0 = Fx.toIntShifted(
                        Fx.add(
                            Fx.min(
                                Fx8(x),
                                Fx8(hbox.right)
                            ),
                            Fx.oneHalfFx8
                        ),
                        tileScale
                    );

                    if (tm.isObstacle(x0, y0)) {
                        const obstacle = tm.getObstacle(x0, y0);
                        if (!collidedTiles.some(o => o.tileIndex === obstacle.tileIndex)) {
                            collidedTiles.push(obstacle);
                        }
                    }
                }

                if (collidedTiles.length) {
                    const collisionDirection = down ? CollisionDirection.Bottom : CollisionDirection.Top;
                    s._y = Fx.toFloat(Fx.sub(
                        down ?
                            Fx.sub(
                                Fx8(y0 << tileScale),
                                Fx8(hbox.height)
                            )
                            :
                            Fx8((y0 + 1) << tileScale),
                        hbox.oy
                    ));
                    }
                }
            }
        }


        
    /**
        * Given a sprite and a list of overlapped tiles, checks the overlap handlers and calls
        * the ones appropriate to the sprite and tile kind.
        * @param sprite the sprite
        * @param overlappedTiles the list of tiles the sprite is overlapping
        */
    protected tilemapOverlaps(sprite: Sprite, overlappedTiles: tiles.Location[]) {
        const alreadyHandled: tiles.Location[] = [];

        for (const tile of overlappedTiles) {
            if (alreadyHandled.some(l => l.column === tile.column && l.row === tile.row)) {
                continue;
            }
            alreadyHandled.push(tile);

            const tileOverlapHandlers = game.currentScene().tileOverlapHandlers;
            if (tileOverlapHandlers) {
                tileOverlapHandlers
                    .filter(h => h.spriteKind == sprite.kind() && h.tileKind.equals(tiles.getTileImage(tile)))
                    .forEach(h => h.handler(sprite, tile));
            }
        }
    }

    /**
     * Returns sprites that overlap with the given sprite. If type is non-zero, also filter by type.
     * @param sprite
     * @param layer
     */
    overlaps(sprite: Sprite_): Sprite_[] {
        return this.map.overlaps(sprite);
    }

    /** moves a sprite explicitly outside of the normal velocity changes **/
    public moveSprite(s: Sprite_, dx: Fx8, dy: Fx8) {
        s.lastx = s._x;
        s.lasty = s._y;
        s._x = Fx.toFloat(Fx.add(Fx8(s._x), dx));
        s._y = Fx.toFloat(Fx.add(Fx8(s._y), dy));

        // if the sprite can collide with things, check tile map
        const tm = game.gettm()
        if (tm && tm.enabled) {
            const maxDist = Fx.toInt(this.maxSingleStep);
            // only check tile map if moving within a single step
            if (Math.abs(Fx.toInt(dx)) <= maxDist && Math.abs(Fx.toInt(dy)) <= maxDist) {
                const ms = new MovingSprite_(
                    s,
                    s._vx,
                    s._vy,
                    dx,
                    dy,
                    dx,
                    dy
                );
                this.tilemapCollisions(ms, tm);
                // otherwise, accept movement...
            } else if (tm.overlaps(s) && !this.canResolveClipping(s, tm)) {
                // if no luck, flag as clipping into a wall
                s.isclipping = true
            } else {
                // or clear clipping if no longer clipping
                s.isclipping = false
            }
        }
    }

    // Attempt to resolve clipping by moving the sprite slightly up / down / left / right
    canResolveClipping(s: Sprite_, tm: tiles.Tilemap_) {
        s.setHitbox();
        const hbox = s.hitbox;
        const sz = 1 << tm.scale;
        const maxMove = this.maxStep;
        const origY = s._y;
        const origX = s._x;
        const l = hbox.left;
        const r = hbox.right;
        const t = hbox.top;
        const b = hbox.bottom;

        {   // bump up and test;
            const offset = (b + 1) % sz;
            if (offset <= maxMove) {
                s._y = 
                    s._y-
                    offset
                
                if (!tm.overlaps(s)) {
                    return true;
                } else {
                    s._y = origY;
                }
            }
        }
        {   // bump down and test;
            const offset = (Math.floor(t / sz) + 1) * sz - t;
            if (offset <= maxMove) {
                s._y = Fx.toFloat(Fx.add(
                    Fx8(s._y),
                    Fx8(offset)
                ));
                if (!tm.overlaps(s)) {
                    return true;
                } else {
                    s._y = origY;
                }
            }
        }
        {   // bump left and test;
            const offset = (r + 1) % sz;
            if (offset <= maxMove) {
                s._x = 
                   s._x - 
                   offset
               
                if (!tm.overlaps(s)) {
                    return true;
                } else {
                    s._x = origX;
                }
            }
        }
        {   // bump right and test;
            const offset = (Math.floor(l / sz) + 1) * sz - l;
            if (offset <= maxMove) {
                s._x = s._x+offset
                if (!tm.overlaps(s)) {
                    return true;
                } else {
                    s._x = origX;
                }
            }
        }

        // no trivial adjustment worked; it's going to clip for now
        return false;
    }

    protected constrain(v: Fx8) {
        return Fx.max(
            Fx.min(
                this.maxVelocity,
                v
            ),
            this.maxNegativeVelocity
        );
    }
}
}