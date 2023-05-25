<template>
  <body>
    <section class="bg-bug-primary p-10 text-[#EC992A] text-center">
      <article>
        <h1 class="text-[40px] font-bold">
          Keep track of all your bugs <i class="fa-solid fa-bug"></i>. 
        </h1>
        <h1 class="text-[40px] font-bold">
          Stay Organized
        </h1>
        <p class="mt-10 font-bold text-lg">
          Using this bug tracker you and you team can keep up to date on all the bugs that are present in your code
        </p>
      </article>
      <div class="pt-10 text-center" v-if="isLogedIn">
        <p class="font-bold text-2xl mb-5">Welcome {{ username }}</p>
        <RouterLink :to="{name: 'profile'}"><button class="btn btn-secondary">Profile</button></RouterLink>
      </div>
      <div class="pt-10 text-center" v-else>
        <p class="font-bold text-2xl mb-5">New Here? Get Started!</p>
        <RouterLink :to="{name: 'signup'}"><button class="btn btn-secondary">Sign Up</button></RouterLink>
      </div>
    </section>
  </body>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { loggedInUser } from '../connector';
import { useRouter } from 'vue-router';


export default {

  name: "home",
  setup() {

    const router = useRouter();

    const username = ref('');
    const isLogedIn = ref(false);

    onMounted(async () => {
      const user = await loggedInUser();
      console.log(user);
      if(user){
        isLogedIn.value = true;
        username.value = user.name;
      }
      
    });

    onUnmounted(() => {
      console.log("Hello");
    });


    return {isLogedIn, username};
  }


}

</script>