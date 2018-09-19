import { Product } from "./product";

export class ProductManage{

    constructor(private products: Product[]){
       
    }
    
    getAll(): Product[]{
        return this.products;
    }

    get(id:string): Product {
        return this.products.find((product) =>{
            return product.id == id;
        })
    }
}