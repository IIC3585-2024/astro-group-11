// server.js

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Endpoint para manejar la carga de series con imagen
app.post('/api/add-serie', (req, res) => {
  const { name, services, description, seasons } = req.body;
  const categories = req.body.categories ? req.body.categories.split(',') : [];
  
  // Manejo de la imagen
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No se ha subido ninguna imagen.');
  }

  const image = req.files.image;
  const imageName = `${Date.now()}-${image.name}`;
  
  // Guardar la imagen en un directorio público (por ejemplo, 'public/images')
  image.mv(path.join(__dirname, 'public', 'images', imageName), (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    // Aquí deberías guardar los datos en tu base de datos
    // Por simplicidad, asumamos que guardamos solo el nombre de la imagen
    const serieData = {
      name,
      services,
      description,
      seasons,
      image: imageName,
      categories,
    };
    
    // Aquí deberías guardar serieData en tu base de datos utilizando 'db'
    // Ejemplo: db('series').insert(serieData);
    
    // Respuesta exitosa
    res.send('Serie añadida correctamente.');
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
