const fs = require('fs');

const crearArchivoTarea = async(listado)=>{
  try {
    fs.writeFileSync('tareas.txt',listado.toString());
    return "guardado";
  } catch (error) {
    throw error;
  }
}


module.exports = {
  crearArchivoTarea
}