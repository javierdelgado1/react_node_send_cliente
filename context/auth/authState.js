import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION
} from "../../types";

import tokenAuth from '../../config/tokenAuth';
import clienteAxios from "../../config/axios";
const AuthState = ({ children }) => {
  //definir state inicial con
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  //definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    console.info("Desde registrar usuario", datos);
    try {
      const respuesta = await clienteAxios.post("/api/usuario", datos);
      console.info(respuesta.data);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      console.error(error.response.data.msg);
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };
  //usuario autenticado
  const usuarioAutenticado = async (nombre) => {
    const token = localStorage.getItem('token');
    if(token){
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get('/api/auth')
      console.info(respuesta.data)

      dispatch({
        type: USUARIO_AUTENTICADO,
        payload:  respuesta.data
      });

    } catch (error) {
      console.error(error)
    }

  };
  //usuario autenticado

  const iniciarSesion = async (datos) => {
    console.info(datos);
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      console.info(respuesta.data);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      console.error(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  const cerrarSesion  = async ()=>{
    console.info("cerrando sesion");
    dispatch({
      type:CERRAR_SESION
    })
  }
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        usuarioAutenticado,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion 
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
