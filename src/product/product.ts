
export class Product{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;

    constructor(id, name:string, price: number, imageUrl:string, category: string){
        this.id = id;
        this.title = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
    }
}

