import React, { useReducer } from "react";

import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
} from "../../types";
import appContext from "./appContext";
import appReducer from "./appReducer";

const AppState = ({ children }) => {
    const initialState = {
        mensaje_archivo : ''
    }
    const [state, dispatch] = useReducer(appReducer, initialState);
    const mostrarAlerta = mensaje => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload:mensaje
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }
  return <appContext.Provider 
            value={{mensaje_archivo: state.mensaje_archivo, mostrarAlerta}}
        >
        {children}
        </appContext.Provider>
};

export default AppState;