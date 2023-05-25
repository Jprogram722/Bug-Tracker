<template>
    <div class="py-8 px-4 h-full w-full sm:px-10 sm:w-[450px] sm:my-[100px] mx-auto my-auto sm:rounded-lg sm:border-4 sm:border-solid sm:border-[#EC992A] text-[#EC992A]">
        <form action="#" class="text-[#EC992A]" @submit.prevent="handleSubmit">
            <slot name="form-title"></slot>
            <div class="mb-5 mt-10">
                <label for="email">Email:</label>
                <input class="w-full p-2 bg-bug-secondary rounded-md outline-none" type="email" name="email" v-model="email">
            </div>
            <slot name="username"></slot>
            <div class="mb-5">
                <label for="password">Password:</label>
                <input class="w-full p-2 bg-bug-secondary rounded-md outline-none" type="password" name="password" v-model="password">
            </div>
            <slot name="retype-password"></slot>
            <slot name="btn"></slot>
        </form>
        <slot name="registar"></slot>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'logSign',
    setup(props, context) {

        // Variables for the form data
        const email = ref('');
        const password = ref('');

        const handleSubmit = () => {
            context.emit('submitForm', {email: email.value, password: password.value});
        };

        return {email, password, handleSubmit};
    }
}
</script>