<template>
    <div class="p-4 text-[#EC992A]">
        <h1 class="text-[25px] mb-10 font-bold">Welcome {{ name }}</h1>
        <div class="flex items-center justify-between">
            <p class="font-bold underline sm:text-lg">Things To Do For Today: </p>
            <RouterLink :to="{name: 'report-bug'}"><button class="btn btn-secondary">Make Report</button></RouterLink>
        </div>
        <Bug/>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { loggedInUser } from '../connector';
import {useRouter} from 'vue-router';
import Bug from '../components/Bug.vue';

export default {
    name: 'profile',
    components: {Bug},
    setup () {
        const name = ref('');
        const router = useRouter();

        /*axios.interceptors.response.use(res => res, async error => {
            if(error.response.status === 401){
                
                try{
                const {status} = await axios.get ('http://localhost:3000/api/users/refresh', {withCredentials: true});
                if(status === 200){
                    const re_user = await axios.get('http://localhost:3000/api/users/user', {withCredentials: true});
                    user.value = re_user.data.name;
                    console.log("refreshed");
                    return error.config;
                    }
                }
                catch(err){
                    await router.push({name: 'login'});
                }

                
            return error
        }});*/

        onMounted(async () => {
            const user = await loggedInUser();
            if(user){
                name.value = user.name;
            }
            else{
                router.push({name: 'login'});
            }
        });

        return {name}
    }
}
</script>