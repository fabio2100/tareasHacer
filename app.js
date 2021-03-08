require('colors');
const { guardarDB, leerDB } = require('./db/guardarArchivo');
const { crearArchivoTarea } = require('./helpers/guardaTareas');
//const {mostrarMenu, pausa} = require('./helpers/mensajes')
const {inquirerMenu,pausa,leerInput,listadoTareasBorrar,confirmar,mostrarListadoChechlist} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');



const main = async () =>{
  console.clear();

  const tareas = new Tareas();

  const  tareasDB = leerDB();
  if (tareasDB){
    tareas.cargarTareasFromArray(tareasDB);
    
  };

  let opt = '';
  do {
    opt = await inquirerMenu();
    switch (opt){
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc)
        break;
      case '2':
        tareas.mostrarTareas();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;

      case '5':
        const ids = await mostrarListadoChechlist(tareas.listadoArr);
        console.log(ids);
        tareas.completarTareas(ids);
        break
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        const ok = await confirmar('Está seguro de borrar la tarea?')
        console.log(ok)
        if (ok ){
          tareas.borrarTarea(id)
          console.log('Tarea borrado correctamente')
        }
        break;
    }  
    guardarDB(tareas.listadoArr)
    if (opt !== '0') await pausa();
  } while (opt != 0);

}


main();