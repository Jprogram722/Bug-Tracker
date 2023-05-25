<template>
    <div tabindex="0" class="p-5 w-full border-2 border-base-300 rounded-box mt-5 bg-bug-secondary" v-for="(bug, index) in bugs">
        <div class="text-xl font-medium sm:flex sm:justify-between sm:gap-[0] mb-5">
            <div class="text-sm sm:w-max sm:text-base">{{ bug.bug }}</div>
            <div class="badge badge-primary text-[12px] sm:text-[15px]" v-if="bug.prog === 'New'">{{ bug.prog }}</div>
            <div class="badge badge-secondary text-[12px] sm:text-[15px]" v-if="bug.prog === 'In Progress'">{{ bug.prog }}</div>
            <div class="badge badge-accent text-[12px] sm:text-[15px]" v-if="bug.prog === 'Done'">{{ bug.prog }}</div>
        </div>
        <div class="">
            <p class="text-sm sm:text-base">Posted by: {{ bug.postedBy.name }}</p>
            <p class="mb-5">Created On: {{ bug.createdAt.split("T")[0] }}</p>
            <p class="mb-5">{{ bug.desc }}</p>
            <button class="btn"  v-if="bug.prog === 'New'" @click.left="start(index)">Start</button>
            <button class="btn" v-if="bug.prog === 'In Progress'" @click.left="finish(index)">Done</button>
            <button class="btn btn-secondary" v-if="bug.prog === 'Done'" @click.left="del(index)">Delete</button>
        </div>
    </div>
    <!--
    <div tabindex="0" class="collapse border-2 border-base-300 rounded-box mt-5 bg-bug-secondary">
            <div class="collapse-title text-xl font-medium flex items-center justify-between">
                {{ bug }}
                <div class="badge badge-primary text-[15px] w-[150px] sm:w-[100px]">{{ prog }}</div>
            </div>
            <div class="collapse-content">
                <p class="mb-5">Get the UI finished for the profile page and the report bug page</p>
                <button class="btn">Done</button>
            </div>
        </div>
    <div tabindex="0" class="collapse border-2 border-base-300 rounded-box mt-5 bg-bug-secondary">
        <div class="collapse-title text-xl font-medium flex items-center justify-between">
            Implement The backend of the project
            <div class="badge badge-primary text-[15px] w-[150px] sm:w-[100px]">{{ prog }}</div>
        </div>
        <div class="collapse-content">
            <p class="mb-5">Hook up express.js with vue so that I can store user infor and bug info to Mongo DB</p>
            <button class="btn">Done</button>
        </div>
    </div>-->
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
    name: 'Bug',
    props: ['user_id'],
    setup (props, context) {

        const bugs = ref({});
        
        onMounted(async () => {
            try{
                console.log(props);
                const {data} = await axios.get(`http://localhost:3000/api/posts/${props.user_id}`);
                bugs.value = data;
            }
            catch(err){
                console.log(err.message);
            }
        });

        const start = async (index) => {
            const id = bugs.value[index]._id;
            await axios.patch(`http://localhost:3000/api/posts/${id}`, {prog: 'In Progress'});
            bugs.value[index].prog = "In Progress";
        }

        const finish = async (index) => {
            const id = bugs.value[index]._id;
            await axios.patch(`http://localhost:3000/api/posts/${id}`, {prog: 'Done'});
            bugs.value[index].prog = "Done";
        }

        const del = async (index) => {
            const id = bugs.value[index]._id; // needed to fix a bug were bug was slpiced on front end so id couldn't be obtained for the back end
            bugs.value.splice(index, 1);
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
        }
        

        return {bugs, finish, start, del};
    }
}
</script>