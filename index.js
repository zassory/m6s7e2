const { response , request } = require('express');
const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

http.createServer( async(req = request, res=response) => {
    const { searchParams , pathname } = new URL(req.url,`http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);

    if(pathname === '/autos' && req.method === 'GET'){
        const leerArchivos = await fs.readFile('./datos/autos.txt');
    }
    if(pathname === '/autos' && req.method === 'POST'){
        
    }
    if(pathname === '/autos' && req.method === 'PUT'){
        
    }
    if(pathname === '/autos' && req.method === 'DELETE'){
        
    }
})
.listen(3000, ()=> {
    console.log('Conectado al puerto 3000 correctamente');
});

// http.createServer(async(req = response,res = response) => {
//     const { searchParams , pathname } = new URL(req.url,`http://${req.headers.host}`);
//     const params = new URLSearchParams(searchParams);
    
//     if(pathname === '/comics' && req.method == 'GET'){
//         const lecturaArchivos = await fs.readFile('./datos/comics.txt');
//         res.write(lecturaArchivos);
//         res.end();
//     }
//     if(pathname === '/comics' && req.method == 'POST'){
//         const archivoOriginal = await fs.readFile('./datos/comics.txt');
//         const datosOriginales = JSON.parse(archivoOriginal);
//         const id = uuidv4();
//         let datosComic;

//         req.on('data',(data)=> {
//             datosComic = JSON.parse(data);
//             console.log(datosComic);
//         });
//         req.on('end', async()=> {
//             datosOriginales[id] = datosComic;
//             await fs.writeFile('./datos/comics.txt',JSON.stringify(datosOriginales,null,2));
//             res.write("Comic agregado exitosamente");
//             res.end();
//         });
        
//     }
//     if(pathname === '/comics' && req.method == 'PUT'){
//         const id = params.get('id');
//         //first read the data
//         const datosArchivo = await fs.readFile('./datos/comics.txt');
//         //then stop what i bring
//         const objetoArchivoOriginal = JSON.parse(datosArchivo);

//         let datosParaModificar;

//         req.on('data', (datos) => {
//             datosParaModificar = JSON.parse(datos);
//         })
//         req.on('end', async()=> {
//             const comicOriginal = objetoArchivoOriginal[id];
//             const comicActualizado = {...comicOriginal, ...datosParaModificar}

//             objetoArchivoOriginal[id] = comicActualizado;

//             await fs.writeFile('./datos/comics.txt', JSON.stringify(objetoArchivoOriginal,null,2));

//             res.write(JSON.stringify(comicActualizado,null,2));
//             res.end();
//         });
//     }
//     if(pathname === '/comics' && req.method == 'DELETE'){
//         const comicsOriginales = await fs.readFile('./datos/comics.txt');
//         const objetoComicsOriginal = JSON.parse(comicsOriginales);

//         const id = params.get('id');

//         delete objetoComicsOriginal[id];

//         await fs.writeFile('./datos/comics.txt', JSON.stringify(objetoComicsOriginal, null, 2));

//         res.write(JSON.stringify(objetoComicsOriginal, null, 2));
//         res.end();
//     }

// })
// .listen(3000, ()=> {
//     console.log('Servidor iniciado en puerto 3000');
// });