<template>
    <div :class= "windowWidth < 760 ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
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
                <form class="form needs-validation" id="app" @submit.prevent="login" novalidate>    
                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                        <h3 class="fw-bolder">
                            Log In
                        </h3>
                    </div>
                    <div class="py-lg-4 py-md-0 py-sm-1">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <font-awesome-icon class="text-secondary" icon="fa-solid fa-envelope" />
                            </span>
                            <input 
                                name="email" type="email" :class="this.checkEmail == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                placeholder="Email" aria-label="Email" 
                                aria-describedby="basic-addon1"
                                v-model="form.email" required
                            />
                            <div :class="this.checkEmail == false ? 'text-start invalid-feedback' : 'd-none'">
                                Masukkan data email dengan benar!
                            </div>
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="password" :class="this.checkPassword == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                    v-model="form.password" placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                />
                                <button @click="showPassword" class="btn btn-outline-secondary" id="button-addon2">
                                    <font-awesome-icon icon="fa-solid fa-eye" />
                                </button>
                                <div :class="windowWidth < widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <small>Panjang password minimal 6 karakter!</small>
                                    </div>
                                </div>
                            </div>
                            <div :class="windowWidth >= widthComputer ? 'p-0 text-start':'d-none'">
                                <div :class ="checkPassword == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                    <small>Panjang password miniml 6 karakter!</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="!passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="text" :class="this.checkPassword == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                    v-model="form.password" placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                />
                                <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2">
                                    <font-awesome-icon icon="fa-solid fa-eye-slash"/>
                                </button>
                                <div :class="windowWidth < widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <small>Panjang password miniml 6 karakter!</small>
                                    </div>
                                </div>
                            </div>
                            <div :class="windowWidth >= widthComputer ? 'p-0 text-start':'d-none'">
                                <div :class ="checkPassword == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                    <small>Panjang password miniml 6 karakter!</small>
                                </div>
                            </div>
                        </div>
                        <button :disabled="!submitEnabled" type="submit" class="btn btn-primary" style="width:100%;">Masuk</button>
                    </div>
                </form>
                <div :class="windowWidth >= 760 ? 'row my-md-3 my-lg-0' : 'd-none'">
                    <div class="col-6 text-right">
                        <p>Belum memiliki akun?</p>
                    </div>
                    <div class="col-6">
                        <button @click="register" class="btn btn-success w-100">Daftar</button>
                    </div>
                </div>
                <div :class="windowWidth < 760 ? 'row my-3' : 'd-none'">
                    <div class="col-12">
                        <p>Atau</p>
                    </div>
                    <div class="col-12">
                        <button @click="register" class="btn btn-success w-100">Daftar</button>
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
    // import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        data (){
            return {
                passwordHidden: {
                    default: true,
                    type: Boolean
                },
                windowWidth: window.innerWidth,
                widthRotatePhone: 760,
                widthLandscapePhone: 992,
                widthComputer: 1200,

                submitEnabled: false,
                checkEmail: false,
                checkPassword: false,
                regexExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi,

                form : {
                    email: '',
                    password: '',   
                },
            }
        },

        methods: {
            hidePassword() {
                this.passwordHidden = true;
            },
            showPassword() {
                this.passwordHidden = false;
            },

            async login() {
                // console.log(this.fullname);
                const data = {
                    "email": this.form.email,
                    "password": this.form.password, 
                }
                await axios.post('/login', data)
                .then(response => {
                    console.log(response.data)
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(typeof error.response.data.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                })
            },

            register(){
                // console.log('test');
                this.$router.push({ name: "user.register" });
            },
            
            validateEmail(value){

                if (value.length < 3) {
                    this.checkEmail = false;
                    return false
                } else {
                    this.checkEmail = true;
                    return true;
                }
            },

            validatePassword(value){
                if (value.length < 5) {
                    this.checkPassword = false;
                    return false
                } else {
                    this.checkPassword = true;
                    return true;
                }
            },

        },
        watch: {
            form: {
                handler: function (val) {
                    let email = val.email;
                    let password = val.password;

                    // console.log(email);
                    let validateName = this.validateEmail(email);
                    let validatePassword = this.validatePassword(password);

                    if(validateName && validatePassword) {
                        this.submitEnabled = true;
                    }
                },
                deep: true,
            }
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
        }
    };
</script>
