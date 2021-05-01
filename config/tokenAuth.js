import clienteAxios from './axios';

const tokenAuth = token=>{
    if(token){
        clienteAxios.defaults.headers.common['authorization']=`Bearer ${token}`;
    }
    else{
        delete clienteAxios.defaults.common['authorization'];
    }
}

export default tokenAuth;