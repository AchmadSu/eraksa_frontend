<template>    
    <div :class= "windowWidth < 760 ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
        <div :class="windowWidth >= $widthRotatePhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
            <div :class="windowWidth >= $widthRotatePhone && windowWidth < $widthComputer? 'd-block' : 'd-none'">
                <center>
                    <picture class="mx-5">
                        <source :srcset="$baseUrl+'/src/assets/img/logo-01.png'" type="image/svg+xml">
                        <img :src="$baseUrl+'/src/assets/img/logo-01.png'" class="img-fluid w-50" alt="...">
                    </picture>
                </center>
            </div>
            <div :class="windowWidth >= $widthComputer ? 'd-block' : 'd-none'">
                <picture class="mx-5">
                    <source :srcset="$baseUrl+'/src/assets/img/logo-01.png'" type="image/svg+xml">
                    <img :src="$baseUrl+'/src/assets/img/logo-01.png'" class="img-fluid w-25" alt="...">
                </picture>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 d-sm-block d-md-none text-center">
                <picture class="mx-3">
                    <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                    <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" class="img-fluid w-50" alt="...">
                </picture>
            </div>
            <div v-if="isLoadingImage == true" class="col-md-6 col-sm-12 text-center my-5">
                <div v-if="windowWidth < 760">
                    <div class="m-3 spinner-grow spinner-grow-sm text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="m-3 spinner-grow spinner-grow-sm text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="m-3 spinner-grow spinner-grow-sm text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else-if="windowWidth < $widthComputer">
                    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div v-else class="col-md-6 col-sm-12 text-center">
                <img :src="$baseUrl+'/src/assets/img/Data_security_28.jpg'" class="img-fluid" alt="...">
            </div>
            <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                <form class="form needs-validation" id="app" @submit.prevent="resetPassword" novalidate>    
                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                        <h3 class="fw-bolder text-secondary">
                            RESET PASSWORD
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
                        <div v-if="isLoadingResponse == false">
                            <button :disabled="!submitEnabled" type="submit" class="btn btn-primary mt-2" style="width:100%;">
                                <font-awesome-icon icon="fa-solid fa-paper-plane" />
                                Kirim Link Reset Password
                            </button>
                        </div>
                        <div v-if="isLoadingResponse == true">
                            <button type="submit" class="btn btn-primary mt-2" style="width:100%;" :disabled="true">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memuat ...
                            </button>
                        </div>
                        <div v-for="item in successResponse" :key="item.id" :class="showAlert == true ? 'text-start mt-3 alert alert-primary alert-dismissible' : 'd-none'" role="alert">
                            <strong> <font-awesome-icon icon="fa-solid fa-circle" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                            <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start mt-3 alert alert-warning alert-dismissible' : 'd-none'" role="alert">
                            <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                            <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>
                </form>
                <div :class="windowWidth >= $widthRotatePhone ? 'row my-md-3 my-lg-0' : 'd-none'">
                    <div class="col-12" v-if="isLoadingRouter == false">
                        <button @click="login" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                            <font-awesome-icon icon="fa-solid fa-arrow-left" />
                            Kembali ke laman Masuk
                        </button>
                    </div>
                    <div class="col-12" v-if="isLoadingRouter == true">
                        <button type="submit" class="btn btn-secondary" style="width:100%;" :disabled="true">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Memuat ...
                        </button>
                    </div>
                </div>
                <div :class="windowWidth < $widthRotatePhone ? 'row mt-4' : 'd-none'">
                    <div v-if="isLoadingRouter == false">
                        <div class="col-12">
                            <button @click="login" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                                <font-awesome-icon icon="fa-solid fa-arrow-left" />
                                Kembali ke laman Masuk
                            </button>
                        </div>
                    </div>
                    <div v-if="isLoadingRouter">
                        <div class="col-12">
                            <button type="submit" class="btn btn-light" style="width:100%;" :disabled="true">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memuat ...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="windowWidth >= $widthComputer ? 'row text-center mt-lg-5 py-3': 'row text-center mt-lg-5 pt-5'">
            <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}} </p>
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
                windowWidth: window.innerWidth,

                passwordHidden: {
                    default: true,
                    type: Boolean
                },

                resetPasswordButtonCount: 0,

                submitEnabled: false,
                secondaryButtonDisabled: false,
                checkEmail: false,
                checkPassword: false,
                isLoadingResponse: false,
                floatingTextConfirmation: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),

                regexExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                // upper: /[A-Z]/,
                // lower: /[a-z]/,
                // textnumber: /[0-9]/,
                
                form: {
                    password: '',
                    confirmPassword: '',   
                },

                email: this.$route.query.email,
                token: this.$route.query.token,

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

                successResponse: [],
                errorResponse: [],
                sessionData: [],

                // alertMsg: null,
                // detailMessage: null,
                showAlert: false,
            }
        },

        methods: {
            hidePassword() {
                this.passwordHidden = true;
            },
            showPassword() {
                this.passwordHidden = false;
            },

            login(){
                this.isLoadingRouter = true;
                this.submitEnabled = false;
                try {
                    setTimeout(() => this.$router.push({ name: "user.login" }), 5000);
                } catch (e) {
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': 'Error!', 
                            'detail': e,
                        }
                    ];
                }
            },

            async resetPassword() {
                this.setAlert();
                this.isLoadingResponse = true;
                this.secondaryButtonDisabled = true;
                const data = {
                    "email": this.form.email,
                }
                await axios.post('/requestResetPassword', data)
                .then(response => {
                    // console.log(response.data);
                    this.showAlert = true;
                    this.isLoadingResponse = false;
                    this.submitEnabled = false;
                    this.secondaryButtonDisabled = false;
                    this.successResponse = [
                        {
                            'id': 1,
                            'message': response.data.message, 
                            'detail': response.data.data.message,
                        }
                    ];
                })
                .catch(error => {
                    this.showAlert = true;
                    this.isLoadingResponse = false;
                    this.secondaryButtonDisabled = false;
                    if(!error.response){
                        this.errorResponse = [
                            {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Silakan cek koneksi anda!',
                            }
                        ];
                        // console.log(!error.response);
                    } else if (error.response) {
                        // console.log(error.response);
                        if (error.response.data.message == 'Error!'){
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': error.response.data.message, 
                                    'detail': error.response.data.data.error,
                                }
                            ]
                        } else {
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': error.response.status +' '+ error.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                }
                            ]
                        }
                    }
                })
            },
            
            validateEmail(value){
                // console.log(this.checkPasswords);
                if (this.regexExp.test(value)) {
                    this.checkEmail = true;
                    return true;
                } else {
                    this.checkEmail = false;
                    return false;
                }
            },

            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.successResponse = [];
                this.errorResponse = [];
            }

        },
        watch: {
            form: {
                handler: function (val) {
                    // console.log(val);
                    let email = val.email;
                    // let confirmPassword = val.confirmPassword;

                    let validateEmail = this.validateEmail(email);
                    // let validateConfirmPassword = this.validateConfirmPassword(password, confirmPassword);

                    if(validateEmail) {
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            },
        },
        mounted(){
            // console.log(localStorage.getItem('loggedIn'));
            // if(localStorage.getItem('loggedIn') === true) {
            //     this.$router.push({ name: "user.register" });
            // }
            // const email = URLSearchParams.get()
            // console.log(this.email);
            // console.log(this.token);
            // let retrieveSessionObject = localStorage.getItem('sessionObject');
            // console.log(JSON.parse(retrieveSessionObject));
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
            // console.log(localStorage.getItem('token'));
            setTimeout(() => this.isLoadingImage = false, 5000);
            // console.log(document.cookie);
        }
    };
</script>
