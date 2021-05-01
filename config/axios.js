import axios from 'axios'

const clienteAxios = axios.create({
    baseURL:  process.env.backedURL
})

export default clienteAxios