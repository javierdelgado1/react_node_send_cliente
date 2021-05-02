import React, { useReducer } from "react";

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  SUBIR_ARCHIVO
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";
import clienteAxios from "../../config/axios";
const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: "",
    nombre:'',
    nombre_original: '',
    cargando: false,
    descargas:1,
    password:'',
    autor:null,
    url:''
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const mostrarAlerta = (mensaje) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: mensaje,
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 3000);
  };

  const subirArchivo = async (formData, nombreArchivo) =>{
    console.info("subiendo archivo");
    dispatch({
        type: SUBIR_ARCHIVO
    })

    try {
        const resultado = await clienteAxios.post('/api/archivos', formData);
        console.log(resultado.data);            

        dispatch({
            type: SUBIR_ARCHIVO_EXITO,
            payload: {
                nombre: resultado.data.archivo,
                nombre_original: nombreArchivo
            }
        })

    } catch (error) {
        // console.log(error);
        dispatch({
            type: SUBIR_ARCHIVO_ERROR,
            payload: error.response.data.msg
        })
    }
  };
  const crearEnlace = async () =>{
    const data = {
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor
    }
    // console.log(data);

    try {
        const resultado = await clienteAxios.post('/api/enlaces', data);
        dispatch({
            type: CREAR_ENLACE_EXITO,
            payload: resultado.data.msg
        });
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas:state.descargas,
        password:state.password,
        autor:state.autor,
        url:state.url,
        subirArchivo,
        mostrarAlerta,
        crearEnlace
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
