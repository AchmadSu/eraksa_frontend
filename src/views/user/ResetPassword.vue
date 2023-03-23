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
        <div v-if="pageExpired == true" :class= "windowWidth < 720 ? 'position-absolute top-50 start-50 translate-middle container p-5' : 'position-absolute top-50 start-50 translate-middle container p-5 shadow-lg bg-body rounded'">
            <div class="container">
                <div class="row alert alert-warning">
                    <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> The page is expired </strong> <br>
                    <p>Mohon maaf halaman yang anda akses telah mencapai waktu kedaluarsa. Silakan kembali ke halaman login atau reset password!</p>
                </div>
                <div class="row" v-if="isLoadingRouter == false">
                    <button @click="login" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" />
                        Kembali ke laman Masuk
                    </button>
                </div>
                <div class="row" v-if="isLoadingRouter == true">
                    <button type="submit" class="btn btn-secondary" style="width:100%;" :disabled="true">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Memuat ...
                    </button>
                </div>
                <div :class="windowWidth >= $widthComputer ? 'row text-center mt-lg-1 py-3': 'row text-center mt-lg-1 pt-3'">
                    <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}} </p>
                </div>
            </div>
        </div>    
        <div v-if="pageExpired == false" :class= "windowWidth < $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
            <div class="modal fade" id="successModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="successModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-success">
                            <h5 class="text-light modal-title" id="eraseModalLabel">Permintaan berhasil!</h5>
                            <button @click="login" :disabled="buttonDisabled" type="button" class="btn-close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-success">
                            <div v-for="item, index in successResponse" :key="item.id" class="text-start mt-3 alert alert-success alert-dismissible" role="alert">
                                <strong> <font-awesome-icon icon="fa-solid fa-circle-check" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click="login" type="button" class="mr-4 mr-lg-3 btn btn-success">Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="windowWidth >= $widthPotraitPhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
                <div :class="windowWidth >= $widthPotraitPhone && windowWidth < $widthComputer? 'd-block' : 'd-none'">
                    <center>
                        <picture v-if="windowWidth <= $widthPotraitPhone" class="mx-3">
                            <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                            <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" class="img-fluid w-50" alt="...">
                        </picture>
                        <picture v-else-if="windowWidth > $widthPotraitPhone && windowWidth < $widthComputer" class="mx-3">
                            <source :srcset="$baseUrl+'/src/assets/img/logoPhone.png'" type="image/svg+xml">
                            <img :src="$baseUrl+'/src/assets/img/logoPhone.png'" class="img-fluid w-25" alt="...">
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
                    <div v-if="windowWidth < 720">
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
                            <div v-if="passwordHidden">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <input 
                                        name="password" type="password" :class="this.finalCheckPassword == false ? 'form-control is-invalid' : 'form-control'"
                                        v-model="form.password" placeholder="Password Baru" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                    />
                                    <button @click="showPassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                                </div>
                                <div :class="windowWidth < $widthComputer ? 'p-0 text-start':'d-none'">
                                    <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                    </ul>
                                </div>
                                <div :class="windowWidth >= $widthComputer ? 'p-0 text-start':'d-none'">
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
                                        v-model="form.password" placeholder="Password Baru" aria-label="Password"
                                        aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                    />
                                    <button @click="hidePassword" class="btn btn-outline-secondary" id="button-addon2"><font-awesome-icon icon="fa-solid fa-eye-slash" /></button>
                                </div>
                                <div :class="windowWidth < $widthComputer ? 'p-0 text-start':'d-none'">
                                    <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                    </ul>
                                </div>
                                <div :class="windowWidth >= $widthComputer ? 'p-0 text-start':'d-none'">
                                    <ul v-for="item in checkPasswords" :key="item.id" :class ="item.status == false ? 'mt-2 py-0 text-danger' : 'd-none'">
                                        <li><small v-if="item.status == false">{{ item.msg }}</small></li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="passwordHidden">
                                <div class="input-group">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <div class="form-floating">
                                        <input 
                                            name="confirmPassword" type="password" 
                                            :class="this.checkConfirmPassword == false ? 'form-control is-invalid' 
                                                : 'form-control is-valid'"
                                            v-model="form.confirmPassword" placeholder="Konfirmasi Password" aria-label="Password"
                                            aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                        />
                                        <label v-if="windowWidth >= $widthComputer" for="floatingInputValue">
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
                                        <label v-else-if="windowWidth < $widthComputer" for="floatingInputValue">
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
                                <div class="input-group">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <div class="form-floating">
                                        <input 
                                            name="confirmPassword" type="text" 
                                            :class="this.checkConfirmPassword == false ? 'form-control is-invalid' 
                                                : 'form-control is-valid'"
                                            v-model="form.confirmPassword" placeholder="Konfirmasi Password" aria-label="Password"
                                            aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                        />
                                        <label v-if="windowWidth >= $widthComputer" for="floatingInputValue">
                                            <p v-if="this.floatingTextConfirmation == true">
                                                Ketik ulang password
                                            </p>
                                            <p v-else-if="this.checkConfirmPassword == false">
                                                Password tidak sesuai
                                            </p>
                                            <p v-else>
                                                Data sesuai
                                            </p>
                                        </label>
                                        <label v-else-if="windowWidth < $widthComputer" for="floatingInputValue">
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
                            <div v-if="isLoadingResponse == false">
                                <button :disabled="!submitEnabled" type="submit" class="btn btn-success my-3" style="width:100%;">Reset Password</button>
                            </div>
                            <div v-if="isLoadingResponse == true">
                                <button type="submit" class="btn btn-success my-3" style="width:100%;" :disabled="true">
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
                    <div :class="windowWidth >= $widthPotraitPhone ? 'row my-3' : 'd-none'">
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
                isLoading: true,
                isLoadingResponse: false,
                floatingTextConfirmation: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                etProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                pageExpired: false,

                regexExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi,

                upper: /[A-Z]/,
                lower: /[a-z]/,
                textnumber: /[0-9]/,
                
                form: {
                    password: '',
                    confirmPassword: '',   
                },

                email: this.$route.query.email,
                token: this.$route.query.token,
                now: new Date (Date.now()),
                expiredAt: new Date (this.$route.query.expired_at.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5')),

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
                    "email": this.email,
                    "token": this.token,
                    "password": this.form.password,
                    "confirm_pass": this.form.confirmPassword, 
                }
                await axios.post('/resetPassword', data)
                .then(response => {
                    // console.log(response.data);

                    // this.showAlert = true;
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
                    if(!error.response){
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        this.secondaryButtonDisabled = false;
                        this.errorResponse = [
                            {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Anda terputus dengan jaringan kami!',
                            }
                        ];
                        // console.log(!error.response);
                    } else if (error.response) {
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        this.secondaryButtonDisabled = false;
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
                    setTimeout(() => window.location.reload(), 5000);
                })
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
                        if (value.length < 6) {
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
                    let password = val.password;
                    let confirmPassword = val.confirmPassword;

                    let validatePassword = this.validatePassword(password);
                    let validateConfirmPassword = this.validateConfirmPassword(password, confirmPassword);

                    if(validateConfirmPassword && validatePassword) {
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            },
        },
        beforeCreate(){
            if(this.$session != null || this.$loggedIn != 'null') {
                if (this.$session['status'] == "0") {
                    this.$router.push({ name: "user.otpPage" }).then(() => { this.$router.go() });
                } else {
                    this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
                }
            }
        },
        beforeMount(){
            if(this.email === null || this.token === null || this.token.length !== 60 || JSON.stringify(this.expiredAt) == 'null') {
                this.$router.push({ name: "user.login" });
            }
        },
        mounted(){
            if (this.now > this.expiredAt) {
                this.pageExpired = true;
            }
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
            // console.log(localStorage.getItem('token'));
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 5000);
            // console.log(document.cookie);
        }
    };
</script>
