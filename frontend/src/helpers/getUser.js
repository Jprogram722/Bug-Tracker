// this file will get the current user

import axios from 'axios';

export default async function getUser() {
    try{
        const currentUser = await axios.get('http://localhost:3000/api/users/user', {withCredentials: true});
        if(currentUser.data){
          return {info: currentUser.data, isLoggedIn: true};
        }
    }
    catch(err){
        return err.response.status
    }
}