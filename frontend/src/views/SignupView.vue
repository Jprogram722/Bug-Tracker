<template>
    <LogSign @submitForm="registar">
        <template v-slot:form-title>
            <h1 class="text-[25px] font-bold mb-5">Create An Account</h1>
            <div class="alert alert-warning shadow-lg" v-if="error">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning: {{ msg }}</span>
                </div>
            </div>
        </template>
        <template v-slot:username>
            <div class="mb-5">
                <label for="username">Username:</label>
                <input class="w-full p-2 bg-bug-secondary rounded-md outline-none" type="text" name="username" v-model="name">
            </div>
        </template>
        <template v-slot:retype-password>
            <div class="mb-5">
                <label for="retype-password">Retype Password:</label>
                <input class="w-full p-2 bg-bug-secondary rounded-md outline-none" type="password" name="retype-password" v-model="rePassword">
            </div>
        </template>
        <template v-slot:btn>
            <button class="btn mb-5">Sign Up</button>
        </template>
    </LogSign>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios';
import LogSign from '../components/LogSign.vue';


export default {
    name: 'signup',
    components: {LogSign},
    setup () {

        const router = useRouter();

        // axios variables
        const error = ref(false);
        const msg = ref('');

        // variables for the form
        const rePassword = ref('');
        const name = ref('');

        const registar = async (formInfo) => {
            formInfo.name = name.value;
            formInfo.rePassword = rePassword.value;
            try{
                await axios.post('http://localhost:3000/api/users/', formInfo);
                await router.push({name: 'login'});
            }
            catch(err){
                error.value = true;
                Object.values(err.response.data.errors).forEach(error => {
                    if(error && msg.value === ''){
                        msg.value = error;
                    }
                });
                setTimeout(() => {
                    error.value = false;
                    msg.value = "";
                }, 5000);
            }
        }




        return {name, rePassword, error, registar, msg}
    }
}
</script>