game.pushScene()
  
  //let g = false
  
  //let f = false
  
  //let d = 0
  
  //let b = 0
  
  let sprite_ = Sprites_.create(sprites.food.smallCherries)
  
  let sprite_2 = Sprites_.create(sprites.food.smallIceCream)
  
forever(function() {
    sprite_._vx = controller.dx(1000)
    sprite_._vy = controller.dy(1000)
})
  /*
  let mySprite = sprites.create(img`
  
  . . . . . . . . . . . 6 6 6 6 6
  
  . . . . . . . . . 6 6 7 7 7 7 8
  
  . . . . . . 8 8 8 7 7 8 8 6 8 8
  
  . . e e e e c 6 6 8 8 . 8 7 8 .
  
  . e 2 5 4 2 e c 8 . . . 6 7 8 .
  
  e 2 4 2 2 2 2 2 c . . . 6 7 8 .
  
  e 2 2 2 2 2 2 2 c . . . 8 6 8 .
  
  e 2 e e 2 2 2 2 e e e e c 6 8 .
  
  c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
  
  . c 2 e e e 2 e 2 4 2 2 2 2 c .
  
  . . c 2 2 2 e e 2 2 2 2 2 2 2 e
  
  . . . e c c e c 2 2 2 2 2 2 2 e
  
  . . . . . . . c 2 e e 2 2 e 2 c
  
  . . . . . . . c e e e e e e 2 c
  
  . . . . . . . . c e 2 2 2 2 c .
  
  . . . . . . . . . c c c c c . .
  
  `, SpriteKind.Player)
  
  let mySprite2 = sprites.create(img`
  
  . . . . . 3 3 b 3 3 d d 3 3 . .
  
  . . . . 3 1 1 d 3 d 1 1 1 1 3 .
  
  . . . 3 d 1 1 1 d 1 1 1 d 3 1 3
  
  . . 3 d d 1 1 1 d d 1 1 1 3 3 3
  
  . 3 1 1 d 1 1 1 1 d d 1 1 b . .
  
  . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 .
  
  . b d 1 1 1 d 1 1 1 1 1 1 1 3 .
  
  . 4 b 1 1 1 1 d d 1 1 1 1 d 3 .
  
  . 4 4 d 1 1 1 1 1 1 d d d b b .
  
  . 4 d b d 1 1 1 1 1 1 1 1 3 . .
  
  4 d d 5 b d 1 1 1 1 1 1 1 3 . .
  
  4 5 d 5 5 b b d 1 1 1 1 d 3 . .
  
  4 5 5 d 5 5 d b b b d d 3 . . .
  
  4 5 5 5 d d d d 4 4 b 3 . . . .
  
  . 4 5 5 5 4 4 4 . . . . . . . .
  
  . . 4 4 4 . . . . . . . . . . .
  
  `, SpriteKind.Player)
  
  game.onUpdateInterval(1000, function () {
  
  console.log("Sprite_:" + b)
  
  console.log("Sprite:" + d)
  
  console.log("f" + f)
  
  console.log("Hello" + g)
  
  b = 0
  
  d = 0
  
  })
  
  forever(function () {
  
  for (let index = 0; index <= 40; index++) {
  
  g = mySprite.overlapsWith(mySprite2)
  
  d += 1
  
  }
  
  })
  
  forever(function () {
  
  for (let index2 = 0; index2 <= 40; index2++) {
  
  f = Sprites_.overlaps(sprite_, sprite_2)
  
  b += 1
  
  }
  
  })
  */
 

