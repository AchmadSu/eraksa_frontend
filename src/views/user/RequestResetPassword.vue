<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="progress-bar bg-primary" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="modal fade" id="successModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success">
                        <h5 class="text-light modal-title" id="eraseModalLabel"><font-awesome-icon icon="fa-solid fa-circle-check" /> &ensp;Permintaan berhasil!</h5>
                        <button @click="login" :disabled="buttonDisabled" type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div v-for="item, index in successResponse" :key="item.id" class="text-start mt-3 alert alert-success alert-dismissible" role="alert">
                            <strong>{{ item.message }}</strong><br/>{{ item.detail }} 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="login" type="button" class="mr-4 mr-lg-3 btn btn-success">Tutup</button>
                    </div>
                </div>
            </div>
        </div>    
        <div :class= "windowWidth < $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
            <div :class="windowWidth >= $widthPotraitPhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
                <div :class="windowWidth >= $widthLandscapePhone && windowWidth < $widthComputer? 'd-block' : 'd-none'">
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
                    <picture v-if="windowWidth <= $widthPotraitPhone" class="mx-3">
                        <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                        <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" class="img-fluid w-50" alt="...">
                    </picture>
                    <picture v-else-if="windowWidth > $widthPotraitPhone && windowWidth < $widthComputer" class="mx-3">
                        <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                        <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" class="img-fluid w-25" alt="...">
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
                    <img :src="$baseUrl+'/src/assets/img/resetPassword-01.png'" class="img-fluid" alt="...">
                </div>
                <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                    <form class="form needs-validation" id="app" @submit.prevent="resetPassword" novalidate>    
                        <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                            <h3 class="fw-bolder text-secondary">
                                Reset Password
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
                                <button :disabled="!submitEnabled" type="submit" class="btn btn-primary my-3" style="width:100%;">
                                    <font-awesome-icon icon="fa-solid fa-paper-plane" />
                                    Kirim Link Reset Password
                                </button>
                            </div>
                            <div v-if="isLoadingResponse == true">
                                <button type="submit" class="btn btn-primary my-3" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
                            </div>
                            <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start mt-3 alert alert-warning alert-dismissible' : 'd-none'" role="alert">
                                <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </div>
                    </form>
                    <div :class="windowWidth >= $widthPotraitPhone ? 'row my-md-3 my-lg-0' : 'd-none'">
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
                    <div :class="windowWidth <= $widthPotraitPhone ? 'row my-3 mt-4' : 'd-none'">
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
                <p class="text-secondary">Eraksa - Politeknik TEDC Bandung <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}} </p>
            </div>
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
                floatingTextConfirmation: true,
                isLoading: true, 
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',

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
            openModal () {
                // console.log("test")
                $('#successModal').modal('show')
            },
            closeModal () {
                // console.log("test")
                $('#successModal').modal('hide')
            },
            login(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.submitEnabled = false;
                this.closeModal();
                try {
                    if(this.setProgress == true) {
                        this.intervalProgressbar = setInterval(() => {
                            this.widthProgressBar += 35;
                            this.widhtStyle = "width: "+ this.widthProgressBar.toString() +"%;";
                            if(this.widthProgressBar == 100) {
                                clearInterval(this.intervalProgressbar);
                                this.widthProgressBar = 0;
                                this.setProgress == false;
                                // this.setProgress = false;
                            }
                            // console.log(this.widhtStyle);
                        }, 1000);
                    }
                    setTimeout(() => this.$router.push({ name: "user.login" }), 4000);
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
                    this.openModal();
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
                                'detail': 'Network Error. Anda terputus dengan jaringan kami!',
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
        beforeCreate(){
            // console.table(this.$session != null, this.$loggedIn != 'null', this.$token != null);
            if(this.$session != null || this.$loggedIn != 'null') {
                if (this.$session['status'] == "0") {
                    this.$router.push({ name: "user.otpPage" }).then(() => { this.$router.go() });
                } else {
                    this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
                }
            }
        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
            
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 5000);
            
        }
    };
</script>
