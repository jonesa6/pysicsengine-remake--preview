// Add your code here
namespace images {
export function drawImage(img:Image,x:number,y:number,offsetX:number,offsetY:number) {
    let image_ = image.create(img.width, img.height)
    if (offsetX != 0||offsetY != 0) {
        for (let i = 0; i < 160; i++) {
            for (let k = 0; k < 120; k++) {
                const x = i - offsetX
                const y = k - offsetY
                if (x < 0 || y < 0) { continue; }
                image_.setPixel(x, y, img.getPixel(i, k))
            }
        }
        screen.drawImage(image_, x, y)
    } else {
        screen.drawImage(img,x,y)
    }
}
   
    
}