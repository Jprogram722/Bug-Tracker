<template>
    <LogSign @submitForm="login">
        <template v-slot:form-title>
            <h1 class="text-[25px] font-bold mb-5">Log in</h1>
            <div class="alert alert-warning shadow-lg transition ease-in-out" v-if="loginErr">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning: {{ msg }}</span>
                </div>
            </div>
        </template>
        <template v-slot:registar>
            <p>No account? <RouterLink :to="{name: 'signup'}" class="hover:underline">Registar</RouterLink></p>
        </template>
        <template v-slot:btn>
            <button class="btn mb-5">Login</button>
        </template>
    </LogSign>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import LogSign from '../components/LogSign.vue'

export default {
    name: 'Login',
    components: {LogSign},
    setup () {
        
        // Sets the router
        const router = useRouter();

        // Sets the error Message
        const msg = ref("Invalid Email/Password");
        const loginErr = ref(false);

        const login = async (formInfo) => {
            try{
                await axios.post('http://localhost:3000/api/users/login', formInfo, 
                { withCredentials: true, credentials: 'include' }
                );
                
                await router.push({name: 'home'});
            }
            catch(err){
                loginErr.value = true;
                setTimeout(() => {
                    loginErr.value = false;
                }, 5000);
            }
        };



        return {login, msg, loginErr};
    }
}
</script>