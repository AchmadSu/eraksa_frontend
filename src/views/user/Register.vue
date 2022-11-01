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
                <form class="form needs-validation" id="app" @submit.prevent="register" novalidate>    
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
                                        name="firstname" type="text" :class="this.checkName == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                        placeholder="Nama depan" aria-label="name" 
                                        aria-describedby="basic-addon1"
                                        v-model="form.firstname"
                                    />
                                    <div :class="this.checkName == false ? 'text-start invalid-feedback' : 'd-none'">
                                        Panjang minimal nama adalah 3 karakter
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="input-group mb-3">
                                    <input 
                                        name="lastname" type="text" class="form-control w-100"
                                        placeholder="Nama belakang" aria-label="name" 
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
                                name="firstname" type="text" :class="this.checkName == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                placeholder="Nama Lengkap" aria-label="name" 
                                aria-describedby="basic-addon1"
                                v-model="form.firstname"
                            />
                            <div :class="this.checkName == false ? 'text-start invalid-feedback' : 'd-none'">
                                Panjang minimal nama adalah 3 karakter
                            </div>
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
                            <div :class="this.checkEmail == false ? 'text-start invalid-feedback' : 'd-none'">
                                Masukkan data email dengan benar!
                            </div>
                        </div>
                        <div class="input-group mb-3" tabindex="-1" id="inner">
                            <span class="input-group-text bg-transparent" id="basic-addon1">
                                <i class="text-secondary fa fa-whatsapp" aria-hidden="true"></i>
                            </span>
                            <div class="form-floating">
                                <input 
                                    name="phone" type="number" :class="this.checkPhone == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                    placeholder="Contoh: 6289 XXX atau 895 XXX" aria-label="Phone" 
                                    aria-describedby="basic-addon1"
                                    v-model="form.phone"
                                    required
                                />
                                <label v-if="windowWidth >= widthComputer" for="floatingInputValue">
                                    <p v-if="this.floatingTextPhone == true">
                                        What'sApp. Contoh: 6289 XXX
                                    </p>
                                    <p v-else-if="this.checkPhone == false">
                                        Masukkan antara 9 s/d 14 karakter
                                    </p>
                                    <p v-else>
                                        Data sesuai
                                    </p>
                                </label>
                                <label v-else-if="windowWidth < widthComputer" for="floatingInputValue">
                                    <p v-if="this.floatingTextPhone == true">
                                        What'sApp. Contoh: 6289 XXX
                                    </p>
                                    <p v-else-if="this.checkPhone == false">
                                        Masukkan antara 9 s/d 14 karakter
                                    </p>
                                    <p v-else>
                                        Data sesuai
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="password" :class="this.finalCheckPassword == false ? 'form-control is-invalid' : 'form-control'"
                                    v-model="form.password" placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                />
                                <button @click="showPassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                                <div :class="windowWidth < widthComputer ? 'p-0 text-start':'d-none'">
                                    <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                    </ul>
                                </div>
                            </div>
                            <div :class="windowWidth >= widthComputer ? 'p-0 text-start':'d-none'">
                                <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                    <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                </ul>
                            </div>
                        </div>
                        <div v-if="!passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <input 
                                    name="password" type="text" :class="this.finalCheckPassword == false ? 'form-control is-invalid' : 'form-control'"
                                    v-model="form.password" placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon2" required minlength="6" 
                                />
                                <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button>
                                <div :class="windowWidth < widthComputer ? 'p-0 text-start':'d-none'">
                                    <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                    </ul>
                                </div>
                            </div>
                            <div :class="windowWidth >= widthComputer ? 'p-0 text-start':'d-none'">
                                <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                    <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                </ul>
                            </div>
                        </div>
                        <div v-if="passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <div class="form-floating">
                                    <input 
                                        name="confirmPassword" type="password" 
                                        :class="this.checkConfirmPassword == false ? 'form-control is-invalid' 
                                            : 'form-control is-valid'"
                                        v-model="form.confirmPassword" placeholder="Konfirmasi Password" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" 
                                    />
                                    <label v-if="windowWidth >= widthComputer" for="floatingInputValue">
                                        <p v-if="this.floatingTextConfirmation == true">
                                            Ketik ulang password
                                        </p>
                                        <p v-if="this.checkConfirmPassword == false">
                                            Password tidak sesuai
                                        </p>
                                        <p v-else>
                                            Password sesuai
                                        </p>
                                    </label>
                                    <label v-else-if="windowWidth < widthComputer" for="floatingInputValue">
                                        <p v-if="this.floatingTextConfirmation == true">
                                            Ketik ulang password
                                        </p>
                                        <p v-else-if="this.checkConfirmPassword == false">
                                            Password tidak sesuai
                                        </p>
                                        <p v-else>
                                            Password sesuai
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div v-if="!passwordHidden">
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                </span>
                                <div class="form-floating">
                                    <input 
                                        name="confirmPassword" type="text" 
                                        :class="this.checkConfirmPassword == false ? 'form-control is-invalid' 
                                            : 'form-control is-valid'"
                                        v-model="form.confirmPassword" placeholder="Konfirmasi Password" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" 
                                    />
                                    <label v-if="windowWidth >= widthComputer" for="floatingInputValue">
                                        <p v-if="this.floatingTextConfirmation == true">
                                            Ketik ulang password
                                        </p>
                                        <p v-else-if="this.checkConfirmPassword == false">
                                            Masukkan antara 9 s/d 14 karakter
                                        </p>
                                        <p v-else>
                                            Data sesuai
                                        </p>
                                    </label>
                                    <label v-else-if="windowWidth < widthComputer" for="floatingInputValue">
                                        <p v-if="this.floatingTextConfirmation == true">
                                            Ketik ulang password
                                        </p>
                                        <p v-else-if="this.checkConfirmPassword == false">
                                            Password tidak sesuai
                                        </p>
                                        <p v-else>
                                            Password sesuai
                                        </p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success" style="width:100%;" :disabled="!submitEnabled">Daftar</button>
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
            <p class="text-secondary">{{ this.dataResponse }}</p>
        </div>
        <div class="row text-center py-3">
            <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> 2023</p>
        </div>
    </div>
</template>

<script>
    // import { ref } from 'vue'
    // import { useRouter } from 'vue-router'
    import axios from 'axios'
    // import { response } from 'express';
    // import useVuelidate from '@vuelidate/core'
    // import { useField } from 'vee-validate'
    // import { required, email, minLength, sameAs } from '@vuelidate/validators'

    // import useValidate from '@vuelidate/core'
    // import { required } from '@vuelidate/validators'

    export default {
        el: '#app',
        data (){
            return {
                widthRotatePhone: 760,
                widthLandscapePhone: 992,
                widthComputer: 1200,
                 
                regexExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi,
                upper: /[A-Z]/,
                lower: /[a-z]/,
                textnumber: /[0-9]/,

                submitEnabled: false,
                checkName: false,
                checkEmail: false,
                checkPhone: false,
                floatingTextEmail: true,
                floatingTextPhone: true,
                floatingTextConfirmation: true,

                checkPasswords: [
                    {
                        id: 1,
                        status: false,
                        msg: 'Password harus mengandung huruf kapital!',
                    },
                    {
                        id: 2,
                        status: false,
                        msg: 'Password harus mengandung huruf kecil!',
                    },
                    {
                        id: 3,
                        status: false,
                        msg: 'Password harus mengandung angka!',
                    },
                    {
                        id: 4,
                        status: false,
                        msg: 'Panjang password minimal 6 karakter!',
                    },
                ],

                checkConfirmPassword: false,
                passwordHidden: {
                    default: true,
                    type: Boolean
                },
                windowWidth: window.innerWidth,
                form : {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',   
                },
                fullname: '',
                dataResponse: '',
            }
        },

        methods: {
            async register() {
                // console.log(this.fullname);
                // if()
                const data = {
                    "name": this.fullname,
                    "email": this.form.email,
                    "phone": this.form.phone.toString(),
                    "password": this.form.password,
                    "confirm_pass": this.form.confirmPassword, 
                }
                await axios.post('/register', data)
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

            hidePassword() {
                this.passwordHidden = true;
            },
            showPassword() {
                this.passwordHidden = false;
            },

            validateName(value1, value2){
                // console.log(value1);
                if(value1.length >= 3) {
                    this.checkName = true;
                    if (value2 != '') {
                        this.fullname = value1+' '+value2;
                    }
                    else {
                        this.fullname = value1;
                    }
                    // console.log(this.fullname);
                    return true;
                } else {
                    this.checkName = false;
                    return false;
                }
            },
            validatePhone(value){
                if(value.length == 0){
                    this.checkPhone = false;
                    this.floatingTextPhone = true;
                    return false;
                } else if(value.length >= 9 && value.length <= 14) {
                    // console.log('ini method phone');
                    this.checkPhone = true;
                    this.floatingTextPhone = false;
                    return true;
                } else {
                    this.checkPhone = false;
                    this.floatingTextPhone = false;
                    return false;
                }
            },
            validatePassword(value){
                // console.log(this.checkPasswords);
                if (this.upper.test(value) || this.lower.test(value) || this.textnumber.test(value) || value.length >= 6) {
                    
                    if (this.upper.test(value)) {
                        this.checkPasswords[0].status = true;
                    }
                    if (this.lower.test(value)) {
                        this.checkPasswords[1].status = true;
                    }
                    if (this.textnumber.test(value)) {
                        this.checkPasswords[2].status = true;
                    }
                    if (value.length >= 6) {
                        this.checkPasswords[3].status = true;
                    }

                    if (this.upper.test(value) && this.lower.test(value) && this.textnumber.test(value) && value.length >= 6) {
                        // console.log('Bener semua');
                        return true;
                    } else {
                        if (!this.upper.test(value)) {
                            this.checkPasswords[0].status = false;
                        }
                        if (!this.lower.test(value)) {
                            this.checkPasswords[1].status = false;
                        }
                        if (!this.textnumber.test(value)) {
                            this.checkPasswords[2].status = false;
                        }
                        if (!value.length >= 6) {
                            this.checkPasswords[3].status = false;
                        }
                        return false;
                    }

                } else {
                    for (let index = 0; index < this.checkPasswords.length; index++) {
                        this.checkPasswords[index].status = false;
                    }
                    return false;
                }
            },
            validateConfirmPassword(value1, value2){
                if (value2.length == 0) {
                    this.checkConfirmPassword = false;
                    this.floatingTextConfirmation = true;
                    return false;
                } else if (value2 === value1) {
                    this.floatingTextConfirmation = false;
                    this.checkConfirmPassword = true;
                    return true;
                } else {
                    this.floatingTextConfirmation = false;
                    this.checkConfirmPassword = false;
                    return false;
                }
            }
        },
        watch: {
            form: {
                handler: function (val) {
                    let firstname = val.firstname;
                    let lastname = val.lastname;
                    let email = val.email;
                    let phone = val.phone.toString();
                    let password = val.password;
                    let confirmPassword = val.confirmPassword;
                    
                    let validateName = this.validateName(firstname, lastname);
                    let validatePhone = this.validatePhone(phone);
                    let validatePassword = this.validatePassword(password);
                    let validateConfirmPassword = this.validateConfirmPassword(password, confirmPassword);

                    if(email.length >= 6 && validateName && validatePhone && validatePassword && validateConfirmPassword) {
                        // console.log('Test');    
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
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
