// this file will get the current user logged in to the account

import axios from 'axios';

const base_url = "http://localhost:3000/api/";

async function refresh(){
    try{
        await axios.get(`${base_url}users/refresh`, { withCredentials: true });
        const re_user = await axios.get(`${base_url}users/user`, { withCredentials: true });
        if(re_user.data){
            return re_user.data;
        }
    }
    catch(err){
        return null;
    }
}



const loggedInUser = async () => {
    try{
        const {data} = await axios.get(`${base_url}users/user`, { withCredentials: true });
        if(data){
            return data;
        }
    }
    catch(err){
        return refresh();
    }
    
}

export{
    loggedInUser,
}