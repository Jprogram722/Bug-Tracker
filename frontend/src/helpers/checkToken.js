// This function will contain helper functions

import axios from 'axios';

export default async function checkToken() {
    if(localStorage.getItem('jwt')){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
        axios.defaults.headers.common['Refresh'] = localStorage.getItem('refresh');
    }
}