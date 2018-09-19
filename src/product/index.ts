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
            new Product("1","shirt",299),
            new Product("2","shoe",399),
            new Product("3","bag",499),
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