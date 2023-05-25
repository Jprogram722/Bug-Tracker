<template>
    <div>
        <nav>
            <div class="navbar bg-bug-primary text-[#EC992A]">
                <div class="flex-none">
                    <button class="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
                <div class="flex-1">
                    <RouterLink :to="{name: 'home'}" class="normal-case text-xl font-bold">
                        <i class="fa-solid fa-bug"></i>
                        Bug Tracker
                    </RouterLink>
                </div>
                <div class="flex-none" v-if="isLoggedIn">
                    <button class="btn btn-sm btn-secondary" @click.left="logout">Log Out</button>
                </div>
                <div class="flex-none" v-else>
                    <RouterLink :to="{name: 'login'}">
                        <button class="btn btn-sm btn-secondary">Login</button>
                    </RouterLink>
                </div>
                </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default{
    name: 'sitenav',
    setup(){

        const isLoggedIn = ref(false);

        const router = useRouter();

        onMounted(async () => {
            const {data} = await axios.get('http://localhost:3000/api/users/user', {withCredentials: true});
            if(data){
                isLoggedIn.value = true;
            }
        })

        const logout = async () => {
            await axios.get('http://localhost:3000/api/users/logout', {withCredentials: true});
            await router.push({name: 'home'});
            location.reload();
        }

        return{isLoggedIn, logout}
    }
}
</script>