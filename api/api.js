import axios from 'axios';
import Config from '../config';

const getPostBySlug = async ( slug = 'home', type = 'pages' ) => {
    try {
        let res = await axios
            .get(`${Config.apiUrl}/wp/v2/${type}?slug=${slug}`)
            .then(res=>{return res.data});
        return res;
    } catch (error) {
        console.error(error);
        return error;
    }
};


const getDataByEndPoint = async ( endPoint ) => {
    try {
        let res = await axios
            .get(`${Config.apiUrl}/${endPoint}`)
            .then(res=>{return res.data});
        return res;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export { getPostBySlug, getDataByEndPoint };