// Add your code here
namespace scene {
    export class Scene_ {
        
        protected tileMap_:tiles.Tilemap_
        eventContext: control.EventContext;
        background: Background;
        private spriteNextId: number;
        spritesByKind: SparseArray<sprites.SpriteSet>;
        //physicsEngine: PhysicsEngine; //this is replaced by the moddedPhysicsEngine
        camera: scene.Camera;
        flags: number;
        destroyedHandlers: SpriteHandler[];
        createdHandlers: SpriteHandler[];
        overlapHandlers: OverlapHandler[];
        overlapMap: SparseArray<number[]>;
        tileOverlapHandlers: TileOverlapHandler[];
        collisionHandlers: SpriteHandler[][];
        wallCollisionHandlers: TileWallHandler[];
        gameForeverHandlers: GameForeverHandler[];
        particleSources: particles.ParticleSource[];
        controlledSprites: controller.ControlledSprite[][];
        controllerConnectionState: boolean[]
        followingSprites: sprites.FollowingSprite[];
        buttonEventHandlers: controller.ButtonEventHandlerState[];
        moddedpysicsengine:Physics_.moddedPhysicsEngine
        allsprites:Sprite_[]
        nextid:number
        allSprites:Sprite_[]
        previousScene:Scene_
        // a set of functions that need to be called when a scene is being initialized
        static initializers: ((scene: Scene_) => void)[] = [];

        constructor(eventContext: control.EventContext, previousScene?: Scene_ ) {
            this.eventContext = eventContext;
            this.flags = 0;
            //this.physicsEngine = new ArcadePhysicsEngine();
            this.camera = new scene.Camera();
            this.background = new Background(this.camera);
            this.destroyedHandlers = [];
            this.createdHandlers = [];
            this.overlapHandlers = [];
            this.overlapMap = {};
            this.tileOverlapHandlers = [];
            this.collisionHandlers = [];
            this.wallCollisionHandlers = [];
            this.gameForeverHandlers = [];
            this.spritesByKind = {};
            this.controlledSprites = [];
            this.buttonEventHandlers = [];
            this.nextid = 0
            this.moddedpysicsengine = new Physics_.moddedPhysicsEngine(this) 
            if (previousScene!= undefined) {
             this.moddedpysicsengine.sprites = previousScene.moddedpysicsengine.sprites
             this.allsprites = previousScene.moddedpysicsengine.sprites
            }
        }
        destroy() {
            this.eventContext = undefined;
            this.background = undefined;
            this.tileMap = undefined;
            this.allSprites = undefined;
            this.spriteNextId = undefined;
            this.spritesByKind = undefined;
            this.moddedpysicsengine = undefined;
            this.camera = undefined;
            this.flags = undefined;
            this.destroyedHandlers = undefined;
            this.createdHandlers = undefined;
            this.overlapHandlers = undefined;
            this.tileOverlapHandlers = undefined;
            this.collisionHandlers = undefined;
            this.wallCollisionHandlers = undefined;
            this.gameForeverHandlers = undefined;
        }
        set tileMap(map:tiles.Tilemap_) {
        this.tileMap_ = map
        }
        get tileMap() {
            return this.tileMap
        }
        addSprite(sprite: Sprite_) {
            this.allsprites.push(sprite);
            sprite.id = this.nextid++;
        }
        init() {
            if (this.allSprites) return;

            power.poke(); // keep game alive a little more
            this.allSprites = [];
            this.spriteNextId = 0;
            // update controller state
            this.eventContext.registerFrameHandler(CONTROLLER_PRIORITY, () => {
                control.enablePerfCounter("controller_update")
                controller.__update(this.eventContext.deltaTime);
            })
            // controller update 13
            this.eventContext.registerFrameHandler(CONTROLLER_SPRITES_PRIORITY, controller._moveSprites);
            // sprite following 14
            // apply physics and collisions 15
            this.eventContext.registerFrameHandler(PHYSICS_PRIORITY, () => {
                control.enablePerfCounter("physics and collisions")
                this.moddedpysicsengine.move(this.eventContext.deltaTime);
            });
            // user update interval 19s

            // user update 20

            // prerender update 55
            this.eventContext.registerFrameHandler(PRE_RENDER_UPDATE_PRIORITY, () => {
                const dt = this.eventContext.deltaTime;
                this.camera.update();

                for (const s of this.allSprites)
                    s.__update(this.camera, dt);
            })

            // render background 60

            // render 90
            this.eventContext.registerFrameHandler(RENDER_SPRITES_PRIORITY, () => {
                control.enablePerfCounter("scene_draw");
                this.render();
            });
            // render diagnostics
            this.eventContext.registerFrameHandler(RENDER_DIAGNOSTICS_PRIORITY, () => {
                if (game.stats && control.EventContext.onStats) {
                    control.EventContext.onStats(
                        control.EventContext.lastStats +
                        ` sprites:${this.allSprites.length}`
                    )
                }
                if (game.debug)
                    this.moddedpysicsengine.draw();
                game.consoleOverlay.draw();
                // check for power deep sleep
                power.checkDeepSleep();
            });
            // update screen
            this.eventContext.registerFrameHandler(UPDATE_SCREEN_PRIORITY, control.__screen.update);
            multiplayer.initServer();
            multiplayer.initPlayerConnectionListeners();
            // register additional components
            Scene_.initializers.forEach(f => f(this));
        }
        /**
                 * Renders the current frame as an image
                 */
        render() {
            // bail out from recursive or parallel call.
            if (this.flags & scene.Flag.IsRendering) return;
            this.flags |= scene.Flag.IsRendering;

            control.enablePerfCounter("render background")
            if ((this.flags & scene.Flag.SeeThrough) && this.previousScene) {
                this.previousScene.render();
            } else {
                this.background.draw();
            }

            control.enablePerfCounter("sprite sort")
            if (this.flags & Flag.NeedsSorting) {
                this.allSprites.sort(function (a, b) { return a.id - b.id; })
                this.flags &= ~scene.Flag.NeedsSorting;
            }

            control.enablePerfCounter("sprite draw")
            for (const s of this.allSprites) {
                s.__draw(this.camera);
            }

            this.flags &= ~scene.Flag.IsRendering;
        }
    }
    export let currentscene_:Scene_
    currentscene_ = new Scene_(control.eventContext(), currentscene_)
    /**
     * Set the map for placing tiles in the scene (use this one)
     * @param map
     * @param scale
     */
    //%block
    export function setTileMapLevel_(map: tiles.TileMapData) {
        scene.currentscene_.tileMap.setData(map)
    }
}