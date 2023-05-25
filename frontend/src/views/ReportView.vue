<template>
    <div class="py-8 px-4 h-full w-full sm:rounded-lg sm:px-10 sm:w-[600px] mx-auto my-auto sm:border-4 sm:border-solid sm:border-[#EC992A] text-[#EC992A]">
        <form action="#" class="text-[#EC992A]" @submit.prevent="report">
            <h1 class="text-[25px] font-bold">Make A Report</h1>
            <div class="mb-5 mt-10">
                <label for="bug">Bug:</label>
                <input class="input w-full p-2 bg-bug-secondary rounded-md outline-none" type="text" name="bug" v-model="bug">
            </div>
            <div class="mb-5 mt-10">
                <label for="desc">Decription:</label>
                <textarea name="desc" id="desc-input" class="textarea w-full h-[250px] bg-bug-secondary rounded-lg resize-none" v-model="desc"></textarea>
            </div>
            <button class="btn">Submit Report</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { loggedInUser } from '../connector'

export default {
    name: 'report',
    setup () {
        
        // Sets up the router
        const router = useRouter();

        // inputs to send to the database
        const bug = ref('');
        const desc = ref('');
        const id = ref('');

        onMounted(async () => {
            const user = await loggedInUser();
            if(user){
                id.value = user._id;
            }
            else{
                await router.push({name: 'login'});
            }
        });

        const report = async () => {
            const formInfo = {bug: bug.value, desc: desc.value, postedBy: id.value};
            try{
                await axios.post('http://localhost:3000/api/posts', formInfo);
                console.log("bug reported")
                router.push({name: 'profile'});
            }
            catch(err){
                console.log(err.message);
            }
        }

        return {report, bug, desc}
    }
}
</script>