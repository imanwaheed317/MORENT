
export interface cars 
{
    _id: string;
    name :string
    _type: "cars"
    image? :{
        asset : {
            _ref:string
            _type : "image"
        }
    }
    brand? :string
    type? : string
    fuelCapacity? : string
    transmission? : string
    seatingCapacity : string
    pricePerDay? : string
    originalPrice : string
    slug:{
        _type: "slug"
        current : string
    }
}