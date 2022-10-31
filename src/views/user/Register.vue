<script setup>
    import { reactive } from 'vue';

    const widthRotatePhone = 760;
    const widthLandscapePhone = 992;
    const widthComputer = 1200;

    let form = reactive({
        name: '',
        email: '',
        password: '',
        phone: '',
    })
    
    const register = async()=>{
        // var array = string.split(",").map(form.phone);
        // var arrPhone = form.phone.split('');
        console.log(form.phone.value);
        await axios.post('/register', form)
        .then(response => {
            console.log(response)
        })
    }

</script>
<template>
    <div :class= "windowWidth <= widthRotatePhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
        <div :class="windowWidth >= widthRotatePhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
            <div :class="windowWidth >= widthRotatePhone && windowWidth < widthComputer? 'd-block' : 'd-none'">
                <center>
                    <picture class="mx-5">
                        <source srcset="src/assets/img/logo-01.png" type="image/svg+xml">
                        <img src="src/assets/img/logo-01.png" class="img-fluid w-50" alt="...">
                    </picture>
                </center>
            </div>
            <div :class="windowWidth >= widthComputer ? 'd-block' : 'd-none'">
                <picture class="mx-5">
                    <source srcset="src/assets/img/logo-01.png" type="image/svg+xml">
                    <img src="src/assets/img/logo-01.png" class="img-fluid w-25" alt="...">
                </picture>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 d-sm-block d-md-none text-center">
                <picture class="mx-3">
                    <source srcset="src/assets/img/logoPhone.png" type="image/svg+xml">
                    <img src="src/assets/img/logoPhone.png" class="img-fluid w-50" alt="...">
                </picture>
            </div>
            <div class="col-md-6 col-sm-12 text-center">
                <img src="src/assets/img/Data_security_28.jpg" class="img-fluid" alt="...">
            </div>
            <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                <form class="form" id="app" @submit.prevent="register" novalidate>    
                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                        <h3 class="fw-bolder">
                            REGISTER
                        </h3>
                    </div>
                    <div class="py-lg-4 py-md-0 py-sm-1">
                        <div :class="windowWidth >= widthComputer ? 'row' : 'd-none'">
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-user" />
                                    </span>
                                    <input 
                                        name="firstname" type="text" class="form-control"
                                        placeholder="Nama Depan" aria-label="name" 
                                        aria-describedby="basic-addon1"
                                        v-model="form.fistname" required
                                    />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <input 
                                        name="lastname" type="text" class="form-control w-100"
                                        placeholder="Nama Belakang" aria-label="name" 
                                        aria-describedby="basic-addon1"
                                        v-model="form.lastname"
                                    />
                                </div>
                            </div>
                        </div>
                        <div :class="windowWidth <= widthLandscapePhone ? 'input-group mb-3' : 'd-none'">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <font-awesome-icon class="text-secondary" icon="fa-solid fa-user" />
                            </span>
                            <input 
                                name="fistname" type="text" class="form-control"
                                placeholder="Nama Lengkap" aria-label="Email" 
                                aria-describedby="basic-addon1"
                                v-model="form.firstname" required
                            />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <font-awesome-icon class="text-secondary" icon="fa-solid fa-envelope" />
                            </span>
                            <input 
                                name="email" type="email" class="form-control"
                                placeholder="Email" aria-label="Email" 
                                aria-describedby="basic-addon1"
                                v-model="form.email" required
                            />
                        </div>
                        <div class="input-group mb-3" tabindex="-1" id="inner">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <i class="text-secondary fa fa-whatsapp" aria-hidden="true"></i>
                            </span>
                            <div class="form-floating">

                                <input 
                                name="phone" type="number" class="form-control"
                                placeholder="Contoh: 6289 XXX atau 895 XXX" aria-label="Email" 
                                aria-describedby="basic-addon1"
                                v-model="form.phone" onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                required
                                />
                                <label v-if="windowWidth >= widthComputer" for="floatingInputValue">What's App. Ex: 6289XXX atau 8965XXX</label>
                                <label v-else-if="windowWidth < widthComputer" for="floatingInputValue">What's App. Ex: 6289XXX</label>
                            </div>
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="password" class="form-control"
                                    v-model="form.password" placeholder="Password" aria-label="Password"
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
                                    v-model="form.password" placeholder="Password"
                                    aria-label="Password" aria-describedby="basic-addon2"
                                    required minlength="6"
                                />
                                <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button>
                            </div>
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="confirmPassword" type="password" class="form-control"
                                    v-model="form.confirmPassword" placeholder="Konfirmasi Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                    />
                            </div>
                        </div>
                        <div v-if="!passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="confirmPassword" type="text" class="form-control"
                                    v-model="form.confirmPassword" placeholder="Konfirmasi Password"
                                    aria-label="Password" aria-describedby="basic-addon2"
                                    required minlength="6"
                                />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success" style="width:100%;">Daftar</button>
                    </div>
                </form>
                <div :class="windowWidth >= 760 ? 'row my-md-3 my-lg-0' : 'd-none'">
                    <div class="col-6 text-right">
                        <p>Sudah punya akun?</p>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary w-100">Masuk</button>
                    </div>
                </div>
                <div :class="windowWidth < 760 ? 'row my-3' : 'd-none'">
                    <div class="col-12">
                        <p>Atau</p>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary w-100">Masuk</button>
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
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength, sameAs } from '@vuelidate/validators'

    export default {
        data (){
            return {
                passwordHidden: {
                    default: true,
                    type: Boolean
                },
                windowWidth: window.innerWidth,
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
