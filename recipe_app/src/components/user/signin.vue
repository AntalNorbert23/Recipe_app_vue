<template>
    <div class="flex justify-center pt-10">
        <div class="loader" v-show="userStore.loading"></div>
        <Form  @submit="onSubmit" :validation-schema="formSchema" class="border-2 w-96 h-auto border-amber-500 flex  items-center flex-col" v-show="!userStore.loading">
            <h1 
                v-text="!regOrLog ? 'Sign in' : 'Register'"
                class="text-3xl py-3"
            >
            </h1>
            <div class="relative">
                <Field
                    name="email"
                    v-slot="{field,errors,errorMessage}"
                >
                    <input type="text"
                           placeholder="Enter your email"
                           v-bind="field"
                           class="border-[1px] w-80 p-2  mt-3"
                           :class="errors.length !==0 ? 'border-red-500 mb-1' : 'border-black mb-5'"
                    >
                    <div  v-if="errors.length !==0" class="text-red-500 mb-4">
                        {{ errorMessage }}
                    </div>
                    <i v-if="errors.length !== 0" class="fa fa-exclamation-circle absolute right-2 top-6 text-red-500"></i>
                </Field>
            </div>
            <div class="relative">
                <Field
                    name="password"
                    v-slot="{field,errors,errorMessage}"
                >
                    <input type="password"
                           placeholder="Enter your password"
                           v-bind="field"
                           class="border-[1px] border-black w-80 p-2"
                           :class="errors.length !==0 ? 'border-red-500 mb-1' : 'border-black mb-5'"
                    >
                    <div  v-if="errors.length !==0" class="text-red-500 mb-4">
                        {{ errorMessage }}
                    </div>
                    <i v-if="errors.length !== 0" class="fa fa-exclamation-circle absolute right-2 top-3 text-red-500"></i>
                </Field>
            </div>
            <button
                type="submit"
                v-text="!regOrLog? 'Sign in' : 'Register'"
                class="w-80 border-[1px] border-amber-500 bg-yellow-100 hover:bg-yellow-300 py-3 mb-2"
            >
            </button>
            <hr/>
            <div @click="regOrLog = !regOrLog" class="mb-3 hover:text-yellow-600 hover:cursor-pointer">
                <p v-if="regOrLog">
                    I want to <span>Sign in</span>
                </p>
                <p v-else>
                    I want to <span>Register</span>
                </p>
            </div>
        </Form>
    </div>
</template>

<script setup>
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { ref, computed } from 'vue';

    //import the auth store 
    import { useUserStore } from '@/stores/userStore';
    const userStore=useUserStore()

    const regOrLog=ref(false);

    const formSchema = computed(() => {
        const baseSchema = {
            email: yup.string().required('The email is required!').email('Not a valid email'),
            password: yup.string().required('The password is required')
        };

        if (regOrLog.value) {
            baseSchema.password = baseSchema.password
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character');
        }

        return yup.object(baseSchema);
    });


    const onSubmit=(values,{resetForm})=>{
        if(regOrLog.value){
            userStore.register(values);
        }else{
            userStore.signIn(values);
        }
    }
</script>

<style scoped>
    .loader {
        width: 60px;
        aspect-ratio: 1;
        border-radius: 50%;
        -webkit-mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
        mask:linear-gradient(0deg,#000 55%,#0000 0) bottom/100% 18.18%;
        background:linear-gradient(#f03355 0 0) bottom/100% 0% no-repeat #ddd;
        animation: l8 2s infinite steps(7);
    }
    @keyframes l8 {
        100% {background-size:100% 115%}
    }
</style>