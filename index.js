const { response , request } = require('express');
const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

http.createServer( async(req = request, res=response) => {
    const { searchParams , pathname } = new URL(req.url,`http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);

    if(pathname === '/autos' && req.method === 'GET'){
        const lecturaArchivos = await fs.readFile('./datos/autos.txt');
        res.write(lecturaArchivos);
        res.end();
    }
    if(pathname === '/autos' && req.method === 'POST'){
        const archivoOriginal = await fs.readFile('./datos/autos.txt');
        const datosOriginales = JSON.parse(archivoOriginal);
        const id = uuidv4();

        let datosAutos;

        req.on('data', (data) => {
            datosAutos = JSON.parse(data);
            console.log(datosAutos);
        });
        req.on('end', async() => {
            datosOriginales[id] = datosAutos;
            await fs.writeFile('./datos/autos.txt', JSON.stringify(datosOriginales,null,2));
            res.write("Auto agregado satisfactoriamente");
            res.end();
        })

    }
    if(pathname === '/autos' && req.method === 'PUT'){
        const id = params.get('id');

        const datosArchivo = await fs.readFile('./datos/autos.txt');
        const objetoArchivoOriginal = JSON.parse(datosArchivo);

        let datosParaModificar;

        //Por cada dato en el callback (param)
        req.on('data',(datos) => {
            datosParaModificar = JSON.parse(datos);
        })
        req.on('end', async() => {
            const autoOriginal = objetoArchivoOriginal[id];
            const autoActualizado = {...autoOriginal, ...datosParaModificar};//Estudiar esto

            objetoArchivoOriginal[id] = autoActualizado;

            await fs.writeFile('./datos/autos.txt', JSON.stringify(objetoArchivoOriginal,null,2));
            res.write(JSON.stringify(autoActualizado,null,2));
            res.end();
        })
    }
    if(pathname === '/autos' && req.method === 'DELETE'){
        const autosOriginales = await fs.readFile('./datos/autos.txt');
        const objetoAutoOriginal = JSON.parse(autosOriginales);

        const id = params.get('id');

        delete objetoAutoOriginal[id];

        await fs.writeFile('./datos/autos.txt',JSON.stringify(objetoAutoOriginal, null , 2));

        res.write(JSON.stringify(objetoAutoOriginal, null , 2));
        res.end();
    }   
})
.listen(3000, ()=> {
    console.log('Conectado al puerto 3000 correctamente');
});