namespace moddedsprites {
export class tilehit {
    private _self:moddedsprites.sprite_
    private _hittingwall:boolean //last updated wallCollision state
    private _a:boolean
    set hittingwall(v:boolean) {
        this._hittingwall=v
        this._a = v
    }
    get hittingwall() {
        
        return this._hittingwall
    }
}

}