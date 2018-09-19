import { Server, Request, ResponseToolkit } from "hapi";
import { ProductPlugin } from "./product";
// import * as HapiAuthBasic from "hapi-auth-basic";
import { plugin } from "hapi-auth-basic";

const server = new Server({
    port: "5000",
    routes:{
        cors: {
            origin:["*"] //set การเข้าถึง ใครสามารถยิงได้
        }
    }
});

async function initServer(){
    await server.register(plugin);
    await server.auth.strategy('simple', 'basic', { validate });
   
}

initServer().then(() => {
    server.route([
        {
           path: "/",
           method: "GET",
           handler: (request: Request, h: ResponseToolkit) =>{ 
               return "hello 1";
           },
           options:{
               auth: 'simple'
           }
       },
    ]);
});

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

const validate = async (request, username, password) => {
let isValid = false;
let credentials = {};

    if (username == "admin" && password == "1234") {
       isValid = true;
       credentials = {userId:"1", name: "pinkaew"}
    }

    return { isValid, credentials };
};



// server.route([
//      {
//         path: "/",
//         method: "GET",
//         handler: (request: Request, h: ResponseToolkit) =>{ 
//             return "hello 1";
//         },
//         options:{
//             auth: 'simple'
//         }
//     },

    // {
    //     path: "/",
    //     method: "POST",
    //     handler: (request: Request, h: ResponseToolkit) =>{ 
    //         return "hello 2";
    //     },
    //     options:{
    //         auth: 'simple'
    //     }
    // },
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
// ])



// server.register(new ProductPlugin(), {routes: {prefix: "/producttype"} }) .then(() => {
//     server.start().then(
//         () =>{ console.log('Server start'); },
//         (err) =>{ console.log('Server error' + err); }
//     );
// });