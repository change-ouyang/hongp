import axios from 'axios'

axios.defaults.adapter = function (url,params) {
    return new Promise((resolve,resjact)=>{
        axios.get(url,{params:params})
        .then((res)=>{
            resolve(res.data);
        })
        .catch((err)=>{
            resjact(err)
        })
    })
}

export default axios;