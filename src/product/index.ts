import { PluginBase, Server, PluginNameVersion,Request,ResponseToolkit } from "hapi";
import { Product } from "./product";
import { ProductManage } from "./product_manage";
import * as joi from "joi";

export class ProductPlugin implements PluginBase<Object>, PluginNameVersion{
    name = "product";
    version?: "1";
    server: Server;
    register (server: Server, options: Object) {
        const productManage = new ProductManage([
            new Product("1","shirt",299, "https://5.imimg.com/data5/CP/FO/MY-38660000/ladies-shoe-500x500.jpg","shoe"),
            new Product("2","shoe",399,"https://3.imimg.com/data3/SO/SJ/MY-1164718/ladies-formal-shirts-250x250.jpg","shirt"),
            new Product("3","bag",499,"https://res.weloveshopping.com/918710/w_450,h_450,c_thumb/1e25d8903d875035b13d93dbc3b2fa2b/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%99%E0%B8%B2%E0%B8%A226.jpg","bag"),
        ]);
        this.registerRoute(server, productManage);
    }   
   
    registerRoute(server:Server, productManage: ProductManage){
        server.route([
            {
                path: "/",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) =>{ 
                    
                    return productManage.getAll();
                }
            },
            {
                path: "/{productId}",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) =>{ 
                    const product =  productManage.get(request.params[("productId")]);
                    return product || "product not found"
                },
                options:{
                    validate: {
                        params:{
                          productId: joi.number().min(0)
                        },
                    }
                }
            },
        ]);
    }
  

}