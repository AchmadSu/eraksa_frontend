<template>
    <div :class= "windowWidth < 760 ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
        <div :class="windowWidth >= 760 ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
            <picture class="mx-5">
                <source srcset="src/assets/img/logo-01.png" type="image/svg+xml">
                <img src="src/assets/img/logo-01.png" class="img-fluid w-25" alt="...">
            </picture>
        </div>
        <div class="row">
            <div class="col-sm-12 d-sm-block d-md-none text-center">
                <picture class="mx-3">
                    <source srcset="src/assets/img/logo.png" type="image/svg+xml">
                    <img src="src/assets/img/logo.png" class="img-fluid w-25" alt="...">
                </picture>
                <h3 class="mt-2">ERAKSA</h3>
            </div>
            <div class="col-md-6 col-sm-12 text-center">
                <img src="src/assets/img/Data_security_28.jpg" class="img-fluid" alt="...">
            </div>
            <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                <form class="form" action="#" id="app" @submit.prevent="onSubmit" method="POST" novalidate="true">
                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                        <h3 class="fw-bolder">
                            Log In
                        </h3>
                    </div>
                    <div class="py-lg-4 py-md-0 py-sm-1">
                        <div class="input-group mb-3" :class="{ error: v$.form.email.$errors.length }">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <font-awesome-icon class="text-secondary" icon="fa-solid fa-envelope" />
                            </span>
                            <input 
                                name="email" type="email" class="form-control"
                                placeholder="Email" aria-label="Email" 
                                aria-describedby="basic-addon1"
                                v-model="email" required
                            />
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3" :class="{ error: v$.form.email.$errors.length }">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="password" class="form-control"
                                    v-model="passwordText" placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                    />
                                <button @click="showPassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                            </div>
                        </div>
                        <div v-if="!passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="text" class="form-control"
                                    v-model="passwordText" placeholder="Password"
                                    aria-label="Password" aria-describedby="basic-addon2"
                                    required minlength="6"
                                />
                                <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Masuk</button>
                    </div>
                </form>
                <div :class="windowWidth >= 760 ? 'row my-md-3 my-lg-0' : 'd-none'">
                    <div class="col-6 text-right">
                        <p>Belum memiliki akun?</p>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-success w-100">Daftar</button>
                    </div>
                </div>
                <div :class="windowWidth < 760 ? 'row my-3' : 'd-none'">
                    <div class="col-12">
                        <p>Atau</p>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-success w-100">Daftar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row text-center py-3">
            <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> 2023</p>
        </div>
    </div>
</template>

<script>
    
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    export default {
        setup(){
            return { v$: useVuelidate() }
        },
        data (){
            return {
                passwordHidden: {
                    default: true,
                    type: Boolean
                },
                windowWidth: window.innerWidth,
                form : {
                    email : '',
                    passwordText : '',
                },
            }
        },

        validations(){
            return {
                form : {
                    email : {
                        required, email
                    },
                    passwordText : {
                        required,
                        min: minLength(6)
                    }
                }
            }
        },

        methods: {
            hidePassword() {
                this.passwordHidden = true;
            },
            showPassword() {
                this.passwordHidden = false;
            },
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
    };
</script>
