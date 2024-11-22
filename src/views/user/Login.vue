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
        <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
            <div :class="windowWidth >= $widthPotraitPhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
                <div :class="windowWidth >= $widthLandscapePhone && windowWidth <= $widthComputer? 'd-block' : 'd-none'">
                    <H5>LEARNING MANAGEMENT SYSTEM</H5>
                </div>
                <div :class="windowWidth >= $widthComputer ? 'd-block' : 'd-none'">
                    <H5>LEARNING MANAGEMENT SYSTEM</H5>
                </div>
            </div>
            <div class="row">
                <div v-if="isLoadingImage == true" class="col-md-6 col-sm-12 text-center my-5">
                    <div>
                        <div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <div v-else class="col-md-6 col-sm-12 text-center">
                    <img :src="$baseUrl+'/src/assets/img/otp-01.png'" class="img-fluid" alt="...">
                </div>
                <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                    <form class="form needs-validation" id="app" @submit.prevent="login" novalidate>    
                        <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                            <h3 class="fw-bolder text-secondary">
                                LOG IN
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
                                <div class="input-group">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <input 
                                        name="password" type="password" :class="this.checkPassword == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                        v-model="form.password" placeholder="Password" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                    />
                                    <button @click="showPassword" class="btn btn-outline-secondary" id="button-addon2">
                                        <font-awesome-icon icon="fa-solid fa-eye" />
                                    </button>
                                </div>
                                <div :class="windowWidth < $widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'text-danger' : 'd-none'">
                                        <small>Panjang password minimal 6 karakter!</small>
                                    </div>
                                </div>
                                <div :class="windowWidth >= $widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'text-danger' : 'd-none'">
                                        <small>Panjang password minimal 6 karakter!</small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="!passwordHidden">
                                <div class="input-group">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <input 
                                        name="password" type="text" :class="this.checkPassword == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                        v-model="form.password" placeholder="Password" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                    />
                                    <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2">
                                        <font-awesome-icon icon="fa-solid fa-eye-slash"/>
                                    </button>
                                </div>
                                <div :class="windowWidth < $widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'text-danger' : 'd-none'">
                                        <small>Panjang password minimal 6 karakter!</small>
                                    </div>
                                </div>
                                <div :class="windowWidth >= $widthComputer ? 'p-0 text-start':'d-none'">
                                    <div :class ="checkPassword == false ? 'text-danger' : 'd-none'">
                                        <small>Panjang password minimal 6 karakter!</small>
                                    </div>
                                </div>
                            </div>
                            <div v-if="isLoadingResponse == false" class="pt-4">
                                <button :disabled="!submitEnabled" type="submit" class="btn btn-primary" style="width:100%;">Masuk</button>
                            </div>
                            <div v-if="isLoadingResponse == true" class="pt-4">
                                <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="true">
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
                    <div :class="windowWidth >= $widthLandscapePhone ? 'row py-3 my-md-3 my-lg-0' : 'd-none'">
                        <div class="col-6 text-right">
                            <button class="btn btn-light w-100" disabled>Member baru?</button>
                        </div>
                        <div class="col-6" v-if="isLoadingRouter == false">
                            <button @click="register" class="btn btn-success w-100" :disabled="secondaryButtonDisabled">
                                <font-awesome-icon icon="fa-solid fa-user-plus" />
                                Daftar
                            </button>
                        </div>
                        <div class="col-6" v-if="isLoadingRouter == true">
                            <button type="submit" class="btn btn-success" style="width:100%;" :disabled="true">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memuat ...
                            </button>
                        </div>
                    </div>
                    <div :class="windowWidth < $widthLandscapePhone ? 'row my-3' : 'd-none'">
                        <div v-if="isLoadingRouter == false">
                            <div class="col-12">
                                <p>Atau</p>
                            </div>
                            <div class="col-12">
                                <button @click="register" class="btn btn-success w-100" :disabled="secondaryButtonDisabled">
                                    <font-awesome-icon icon="fa-solid fa-user-plus" />
                                    Daftar
                                </button>
                            </div>
                        </div>
                        <div v-if="isLoadingRouter">
                            <div class="col-12">
                                <p>Atau</p>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-success" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
                            </div>
                        </div>
                    </div>
                    <div :class="windowWidth >= $widthLandscapePhone ? 'row my-4' : 'd-none'">
                        <div class="col-12" v-if="isLoadingRouterResetPassword == false">
                            <button @click="resetPassword" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                                <font-awesome-icon icon="fa-solid fa-lock" />
                                Reset Password
                            </button>
                        </div>
                        <div class="col-12" v-if="isLoadingRouterResetPassword == true">
                            <button type="submit" class="btn btn-secondary" style="width:100%;" :disabled="true">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memuat ...
                            </button>
                        </div>
                    </div>
                    <div :class="windowWidth < $widthLandscapePhone ? 'row mt-4' : 'd-none'">
                        <div v-if="isLoadingRouterResetPassword == false">
                            <div class="col-12">
                                <button @click="resetPassword" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                                    <font-awesome-icon icon="fa-solid fa-lock" />
                                    Reset Password
                                </button>
                            </div>
                        </div>
                        <div v-if="isLoadingRouterResetPassword">
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
                <p class="text-secondary">Ecep Achmad Sutisna <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}} </p>
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

                isLoadingRouterResetPassword: false,
                loginButtonCount: 0,

                secondaryButtonDisabled: false,
                submitEnabled: false,
                checkEmail: false,
                checkPassword: false,
                isLoading: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                lastPath: null,

                regexExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                form: {
                    email: '',
                    password: '',   
                },

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

            async login() {
                this.setAlert();
                this.isLoadingResponse = true;
                this.secondaryButtonDisabled = true;
                const data = {
                    "email": this.form.email,
                    "password": this.form.password, 
                }
                await axios.post('/auth', data)
                .then(response => {
                    // console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    this.sessionData = {
                        "id": response.data.user.id,
                        "name": response.data.user.name,
                        "email": response.data.user.email
                    };
                    localStorage.setItem('sessionObject', JSON.stringify(this.sessionData));
                    localStorage.setItem('loggedIn', true);
                    this.setProgress = true;
                    if(this.setProgress == true) {
                        this.intervalProgressbar = setInterval(() => {
                            this.widthProgressBar += 35;
                            this.widhtStyle = "width: "+ this.widthProgressBar.toString() +"%;";
                            // console.log(this.widhtStyle);
                        }, 1000);
                        if(this.widthProgressBar == 100) {
                            clearInterval(this.intervalProgressbar);
                            this.widthProgressBar = 0;
                            // this.setProgress == false;
                            // this.setProgress = false;
                        }
                    }
                    setTimeout(() => {
                        this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });                        
                    }, 4000);
                })
                .catch(error => {
                    if(!error.response){
                        this.secondaryButtonDisabled = false;
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        this.errorResponse = [
                            {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Anda terputus dengan jaringan kami!',
                            }
                        ];
                        // console.log(!error.response);
                    } else if (error.response) {
                        console.log(error.response)
                        this.secondaryButtonDisabled = false;
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        if(error.response.data.message == 'Unauthorised!') {
                            this.loginButtonCount++;
                            if (this.loginButtonCount < 4) {
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
                                        'message': error.response.data.message, 
                                        'detail': `Mungkin anda lupa dengan kata sandi 
                                            anda. Silakan hubungi admin untuk mengatur ulang sandi anda.`,
                                    }
                                ]
                            }
                        } else if (error.response.data.message == 'Error!'){
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
                                    'detail': error.response.message
                                }
                            ]
                        }
                    }
                })
            },

            register(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                try{
                    if(this.setProgress == true) {
                        this.intervalProgressbar = setInterval(() => {
                            this.widthProgressBar += 35;
                            this.widhtStyle = "width: "+ this.widthProgressBar.toString() +"%;";
                            // console.log(this.widhtStyle);
                        }, 1000);
                        if(this.widthProgressBar == 100) {
                            clearInterval(this.intervalProgressbar);
                            this.widthProgressBar = 0;
                            this.setProgress == false;
                            // this.setProgress = false;
                        }
                    }
                    setTimeout(() => this.$router.push({ name: "user.register" }), 4000);
                } catch(e) {
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': 'Error!', 
                            'detail': e,
                        }
                    ];
                }
            },

            resetPassword(){
                this.setProgress = true;
                this.isLoadingRouterResetPassword = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                try{
                    if(this.setProgress == true) {
                        this.intervalProgressbar = setInterval(() => {
                            this.widthProgressBar += 35;
                            this.widhtStyle = "width: "+ this.widthProgressBar.toString() +"%;";
                        }, 1000);
                        if(this.widthProgressBar == 100) {
                            clearInterval(this.intervalProgressbar);
                            this.widthProgressBar = 0;
                            this.setProgress == false;
                            // this.setProgress = false;
                        }
                        // console.log(this.widhtStyle);
                    }
                    setTimeout(() => this.$router.push({ name: "user.requestResetPassword" }), 4000);
                } catch(e) {
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': 'Error!', 
                            'detail': e,
                        }
                    ];
                }
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

            validatePassword(value){
                if (value.length <= 5) {
                    this.checkPassword = false;
                    return false
                } else {
                    this.checkPassword = true;
                    return true;
                }
            },

            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.errorResponse = [];
            }

        },
        watch: {
            form: {
                handler: function (val) {
                    let email = val.email;
                    let password = val.password;

                    let validateName = this.validateEmail(email);
                    let validatePassword = this.validatePassword(password);

                    if(validateName && validatePassword) {
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            },
        },
        beforeCreate(){
            // console.table(this.$session != null, this.$loggedIn != 'null');
            if(this.$session != null || this.$loggedIn != 'null') {
                    this.lastPath = this.$router.options.history.state.back
                    if(this.lastPath != null) {
                        this.$router.push({ path: this.lastPath }).then(() => { this.$router.go() });
                    }
                    else {
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
            
            setTimeout(() => this.isLoadingImage = false, 5000);
            setTimeout(() => this.isLoading = false, 5000);
            
        }
    };
</script>
