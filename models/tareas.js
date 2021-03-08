const Tarea = require("./tarea");

class Tareas{
  _listado = {};

  get listadoArr(){
    const listado = [];

    Object.keys(this._listado).forEach(key=>{
      const tarea = this._listado[key];
      listado.push(tarea);
    })

    return listado;
  }


  constructor() {
    this._listado = {};
  }


  borrarTarea(id=''){
    console.log(id);
    if (this._listado[id]){
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []){
    tareas.forEach(tarea => {
      this._listado[tarea.id]=tarea;
    })
  }

  crearTarea (desc = ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id ] = tarea;
  }

  mostrarTareas(){
    /*const listArr = this.listadoArr;
    for (var i = 0;i<listArr.length;i++){
      if(listArr[i].completadoEn){
        console.log(`${i.toString().green}`+".".green+` ${listArr[i].desc}`+"::COMPLETADA".green)
      }else{
        console.log(`${i.toString().red}`+".".red+` ${listArr[i].desc}`+"::PENDIENTE".red)
      }
    }
*/
    this.listadoArr.forEach((tarea,idx)=>{
      
      const {desc,completadoEn} = tarea;
      if(completadoEn){
        console.log(`${(idx+1).toString().green}`+".".green+` ${desc}`+"::COMPLETADA".green)
      }else{
        console.log(`${(idx+1).toString().red}`+".".red+` ${desc}`+"::PENDIENTE".red)
      }
    })
  }


  listarPendientesCompletadas(completadas = true){
    let contador = 0;
    this.listadoArr.forEach((tarea,idx)=>{
      const {desc,completadoEn} = tarea;
      
      if (completadas){
        if (completadoEn){
          contador +=1;
          console.log(`${(contador).toString().green}`+".".green+` ${desc}`+`::${completadoEn}`.green)
        }
      }else{
        if (!completadoEn){
          contador +=1;
          console.log(`${(contador).toString().red}`+".".red+` ${desc}`+"::PENDIENTE".red)
        }
      }
      
    })
  }


  completarTareas(ids = []) {
    ids.forEach(id => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArr.forEach(tarea=>{
      if (!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }

}

module.exports = Tareas;