export function RadiansToVector2(radians:number):Vector2{
    return new Vector2(Math.sin(radians),Math.cos(radians))
}

export class Vector2{
    constructor(public x:number,public y:number){

    }
    public radians():number{
        let rad = Math.acos(this.x)
        if(this.y<0){
            return rad * -1
        }
        return rad
    }

    public add(vector:Vector2):Vector2{
        return new Vector2(this.x+vector.x,this.y+vector.y);
    }

    public sub(vector:Vector2):Vector2{
        return new Vector2(this.x-vector.x,this.y-vector.y);

    }

    public mul(mul:number):Vector2{
        return new Vector2(this.x * mul,this.y * mul);
    }


}