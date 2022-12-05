<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
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
                    <picture class="mx-3">
                        <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                        <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" :class="windowWidth <= $widthPotraitPhone ? 'img-fluid w-50':'img-fluid w-25'" alt="...">
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
                    <img :src="$baseUrl+'/src/assets/img/otp-01.png'" class="img-fluid" alt="...">
                </div>
                <div class="col-md-6 col-sm-12 px-lg-5">
                    <form class="form needs-validation" id="app" @submit.prevent="check" novalidate>    
                        <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                            <h3 class="fw-bolder text-secondary">
                                Verification WhatsApp
                            </h3>
                        </div>
                        <div class="py-lg-4 py-md-0 py-sm-1">
                            <p style="text-align: justify;" class="text-start">Kami mengirimkan kode OTP melalui WhatsApp ke nomor <b>{{ this.$session['phone'] }}</b>. Silakan masukkan melalui form berikut!</p>
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-mobile-screen" />
                                </span>
                                <input 
                                    name="otp" type="number" :class="this.checkOtp == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                    placeholder="Nomor OTP" aria-label="otp" 
                                    aria-describedby="basic-addon1"
                                    v-model="form.otp" required
                                />
                                <div :class="this.checkOtp == false ? 'text-start invalid-feedback' : 'd-none'">
                                    OTP hanya mengandung 6 karakter!
                                </div>
                            </div>
                            <div v-if="isLoadingResponse == false">
                                <button :disabled="!submitEnabled" type="submit" class="btn btn-primary my-3" style="width:100%;">
                                    Check OTP
                                    <font-awesome-icon v-if="(windowWidth >= $widthLandscapePhone)" icon="fa-solid fa-magnifying-glass" />
                                </button>
                            </div>
                            <div v-if="isLoadingResponse == true">
                                <button type="submit" class="btn btn-primary my-3" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
                            </div>
                            <div>
                                <p v-if="resendTap == false">
                                    Belum mendapatkan kode? 
                                    <a style="text-align: justify; text-decoration: none;" class="text-start" @click="regenerate" href="#">Kirim ulang kode OTP</a>
                                </p>
                                <p v-else class="text-secondary">
                                    <div v-if="this.loadingResend == false">
                                        <font-awesome-icon icon="fa-solid fa-stopwatch" />
                                        Mohon tunggu...
                                    </div>
                                     <div v-else>
                                        <font-awesome-icon icon="fa-solid fa-stopwatch" />
                                        Sisa waktu kirim ulang otp adalah: {{ this.localCountRegenerate }} detik.
                                    </div>
                                </p>
                            </div>
                            <div>
                                <p v-if="resetPhone == false">
                                    Nomor Salah?
                                    <a style="text-align: justify; text-decoration: none;" class="text-end" @click="resetPhoneFunction" href="#">
                                        Atur ulang Nomor
                                    </a>
                                </p>
                                <p v-else class="text-secondary">
                                    <font-awesome-icon icon="fa-solid fa-stopwatch" />
                                    Mohon tunggu...
                                </p>
                            </div>
                            <div v-for="item in successResponse" :key="item.id" :class="showAlert == true ? 'text-start mt-3 alert alert-primary alert-dismissible' : 'd-none'" role="alert">
                                <strong> <font-awesome-icon icon="fa-solid fa-circle-check" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    // import { ref } from 'vue'
    // import { useRouter } from 'vue-router'
    import axios from 'axios'
    // import { unwatchFile } from 'fs';

    export default {
        data (){
            return {
                windowWidth: window.innerWidth,
                countRegenerate: 0,
                localCountRegenerate: parseInt(`${localStorage.getItem('countRegenerate')}`),

                submitEnabled: false,
                secondaryButtonDisabled: false,
                checkOtp: false,
                checkPassword: false,
                isLoading: true,
                isLoadingResponse: false,
                floatingTextConfirmation: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                resendTap: false,
                loadingResend: false,
                resetPhone: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                intervalResend: null,
                widhtStyle: '',


                // regexExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                // upper: /[A-Z]/,
                // lower: /[a-z]/,
                // textnumber: /[0-9]/,
                
                form: {
                    otp: '',   
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
            async login(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.submitEnabled = false;
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
                    await axios.post('/logout')
                    localStorage.clear();
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

            resetPhoneFunction(){
                this.setProgress = true;
                // this.isLoadingRouter = true;
                this.submitEnabled = false;
                this.resetPhone = true;
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
                    setTimeout(() => this.$router.push({ name: "user.resetPhone" }), 4000);
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

            async check() {
                this.setAlert();
                // console.log(this.form.otp);
                this.isLoadingResponse = true;
                this.secondaryButtonDisabled = true;
                const data = {
                    "otp": this.form.otp,
                }
                await axios.post('/verification/check/'+ this.$session['id'], data)
                .then(response => {
                    // console.log(response.data);
                    this.showAlert = true;
                    this.isLoadingResponse = false;
                    this.submitEnabled = false;
                    this.secondaryButtonDisabled = false;
                    localStorage.removeItem('countRegenerate');
                    this.sessionData = {
                        "id": this.$session.id,
                        "name": this.$session.name,
                        "email": this.$session.email,
                        "status": "1",
                        "phone": response.data.data.new_phone,
                        "study_program_id": this.$session.study_program_id
                    };
                    
                    localStorage.setItem('sessionObject', JSON.stringify(this.sessionData));
                    
                    this.successResponse = [
                        {
                            'id': 1,
                            'message': response.data.message, 
                            'detail': response.data.data.status,
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

            async regenerate() {
                this.setAlert();
                this.resendTap = true;
                // this.resendTap = true;
                this.secondaryButtonDisabled = true;
                await axios.post('/verification/regenerate/'+ this.$session['id'])
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
                    this.countRegenerate = 181;
                    localStorage.setItem('countRegenerate', this.countRegenerate);
                    if(this.countRegenerate > 0){
                        this.intervalResend = setInterval(()=>{
                            this.loadingResend = true;
                            this.countRegenerate -= 1;
                            localStorage.setItem('countRegenerate', this.countRegenerate);
                            this.localCountRegenerate =  `${localStorage.getItem('countRegenerate')}`
                            if(this.countRegenerate === 0) {
                                clearInterval(this.intervalResend)
                                localStorage.setItem('countRegenerate', 0);
                                this.loadingResend = false;
                                this.resendTap = false;
                            }
                        }, 1000);
                    }
                })
                .catch(error => {
                    this.resendTap = false;
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

            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.successResponse = [];
                this.errorResponse = [];
            },

            setReload(){
                this.isReload = setTimeout(() => window.location.reload(), 2000);
            }

        },
        watch: {
            form: {
                handler: function (val) {
                    let otp = val.otp.toString();
                    console.log(otp.length);
                    // let confirmPassword = val.confirmPassword;
                    // let validateConfirmPassword = this.validateConfirmPassword(password, confirmPassword);

                    if(otp.length == 6) {
                        console.log(true);
                        this.checkOtp = true;
                        this.submitEnabled = true;
                    } else {
                        this.checkOtp = false;
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            },
        },
        beforeCreate(){
            // console.log(this.$session['status'] == '1');
            if(this.$session == null || this.$loggedIn == 'null') {
                this.$router.push({ name: "user.login" }).then(() => { this.$router.go() });
            }
            // } else if(this.$session['status'] == '1') {
            //     this.lastPath = this.$router.options.history.state.back
            //     if(this.lastPath != null) {
            //         this.$router.push({ path: this.lastPath }).then(() => { this.$router.go() });
            //     }
            // }
        },
        mounted(){
            // setTimeout(() => window.location.reload(), 2000);
            // console.log(this.isReload);
            this.sessionData = {
                "id": this.$session.id,
                "name": this.$session.name,
                "email": this.$session.email,
                "status": this.$session.status,
                "phone": this.$session.phone,
                "study_program_id": this.$session.study_program_id
            };
 
            console.log(this.sessionData);
            
            if(this.localCountRegenerate > 0){
                this.resendTap = true;
                console.log("test");
                this.intervalResend = setInterval(()=>{
                    this.loadingResend = true;
                    this.resendTap = true;
                    this.localCountRegenerate -= 1;
                    localStorage.setItem('countRegenerate', this.localCountRegenerate);
                    this.localCountRegenerate = `${localStorage.getItem('countRegenerate')}`;
                    if(this.localCountRegenerate === 0) {
                        this.loadingResend = false;
                        this.resendTap = false;
                        clearInterval(this.intervalResend)
                        localStorage.setItem('countRegenerate', 0);
                    }
                }, 1000);
            }

            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
            // console.log(localStorage.getItem('token'));
            setTimeout(() => this.isLoadingImage = false, 5000);
            setTimeout(() => this.isLoading = false, 3000);
        }
    };
</script>
