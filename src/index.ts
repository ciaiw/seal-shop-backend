import { Server, Request, ResponseToolkit } from "hapi";
import { ProductPlugin } from "./product";
const server = new Server({
    port: "4200"
});

server.route([
    // {
    //     path: "/product/{productId}",
    //     method: "GET",
    //     handler: (request: Request, h: ResponseToolkit) =>{ 
    //         return request.params;
    //     }
    // },
    // {
    //     path: "/product",
    //     method: "GET",
    //     handler: (request: Request, h: ResponseToolkit) =>{ 
            
    //         return request.query;
    //     }
    // },
    // {
    //     path: "/test",
    //     method: "POST",
    //     handler: (request: Request, h: ResponseToolkit) =>{ 
            
    //         return request.payload;
    //     }
    // }
])



// server.register(new ProductPlugin(), {routes: {prefix: "/producttype"} }) .then(() => {
//     server.start().then(
//         () =>{ console.log('Server start'); },
//         (err) =>{ console.log('Server error' + err); }
//     );
// });
   
async function init(){
    await server.register(new ProductPlugin(), {routes: {prefix: "/product"}});
    await server.start();
    console.log('start server');
}

try {
    init();
}catch(err){
    console.log('server error : ', err);
}