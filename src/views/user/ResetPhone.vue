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
                        <h5 class="text-light modal-title" id="eraseModalLabel">Permintaan berhasil!</h5>
                        <button @click="check" :disabled="buttonDisabled" type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-success">
                        <div v-for="item, index in successResponse" :key="item.id" class="text-start mt-3 alert alert-success alert-dismissible" role="alert">
                            <strong> <font-awesome-icon icon="fa-solid fa-circle-check" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="check" type="button" class="mr-4 mr-lg-3 btn btn-success">Tutup</button>
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
                    <img :src="$baseUrl+'/src/assets/img/Data_security_28.jpg'" class="img-fluid" alt="...">
                </div>
                <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                    <form class="form needs-validation" id="app" @submit.prevent="resetPhone" novalidate>    
                        <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                            <h3 class="fw-bolder text-secondary">
                                Reset No. WhatsApp
                            </h3>
                        </div>
                        <div class="py-lg-4 py-md-0 py-sm-1">
                            <div class="input-group mb-3">
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
                                    <label v-if="windowWidth >= $widthComputer" for="floatingInputValue">
                                        <p v-if="this.floatingTextPhone == true">
                                            WhatsApp. Contoh: 6289 XXX
                                        </p>
                                        <p v-else-if="this.checkPhone == false">
                                            Masukkan antara 9 s/d 14 karakter
                                        </p>
                                        <p v-else>
                                            Data sesuai
                                        </p>
                                    </label>
                                    <label v-else-if="windowWidth <= $widthComputer && windowWidth >= $widthLandscapePhone" for="floatingInputValue">
                                        <p v-if="this.floatingTextPhone == true">
                                            <small>WhatsApp. Contoh: 6289 XXX</small>
                                        </p>
                                        <p v-else-if="this.checkPhone == false">
                                            <small>Masukkan antara 9 s/d 14 karakter</small>
                                        </p>
                                        <p v-else>
                                            Data sesuai
                                        </p>
                                    </label>
                                    <label v-else-if="windowWidth <= $widthLandscapePhone" for="floatingInputValue">
                                        <p v-if="this.floatingTextPhone == true">
                                            <small>Contoh: 6289 XXX</small>
                                        </p>
                                        <p v-else-if="this.checkPhone == false">
                                            <small>Masukkan antara 9 s/d 14 karakter</small>
                                        </p>
                                        <p v-else>
                                            Data sesuai
                                        </p>
                                    </label>
                                </div>
                            </div>
                            <div v-if="isLoadingResponse == false">
                                <button :disabled="!submitEnabled" type="submit" class="btn btn-primary my-3" style="width:100%;">                                
                                    Ubah Nomor WhatsApp
                                </button>
                            </div>
                            <div v-if="isLoadingResponse == true">
                                <button type="submit" class="btn btn-primary my-3" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
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
                            <button @click="check" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                                <font-awesome-icon icon="fa-solid fa-arrow-left" />
                                Kembali ke laman Verification WhatsApp
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
                                <button @click="check" class="btn btn-light text-secondary w-100" :disabled="secondaryButtonDisabled">
                                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                                    Kembali ke laman Verification WhatsApp
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
                countRegenerate: 0,
                submitEnabled: false,
                secondaryButtonDisabled: false,
                checkPhone: false,
                isLoading: true,
                isLoadingResponse: false,
                floatingTextConfirmation: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                floatingTextPhone: true,
                widthProgressBar: 0,
                intervalProgressbar: null,
                intervalResend: null,
                widhtStyle: '',
                form: {
                    phone: '',   
                },
                successResponse: [],
                errorResponse: [],
                sessionData: [],
                showAlert: false,
            }
        },

        methods: {
            check(){
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
                            }
                        }, 1000);
                    }
                    this.closeModal();
                    setTimeout(() => this.$router.push({ name: "user.otpPage" }).then(() => { this.$router.go() }), 4000);
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
            openModal () {
                // console.log("test")
                $('#successModal').modal('show')
            },
            closeModal () {
                // console.log("test")
                $('#successModal').modal('hide')
            },
            async resetPhone() {
                this.setAlert();
                // console.log(this.form.phone);
                this.isLoadingResponse = true;
                this.secondaryButtonDisabled = true;
                const data = {
                    "phone": this.form.phone,
                }
                await axios.post('/resetPhone/'+ this.$session['id'], data)
                .then(response => {
                    // console.log(response.data.data.new_phone);
                    // this.showAlert = true;
                    this.isLoadingResponse = false;
                    this.submitEnabled = false;
                    this.secondaryButtonDisabled = false;

                    this.sessionData = {
                        "id": this.$session.id,
                        "name": this.$session.name,
                        "email": this.$session.email,
                        "status": this.$session.status,
                        "phone": response.data.data.new_phone,
                        "study_program_id": this.$session.study_program_id
                    };
                    localStorage.setItem('sessionObject', JSON.stringify(this.sessionData));
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

            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.successResponse = [];
                this.errorResponse = [];
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

        },
        watch: {
            form: {
                handler: function (val) {
                    let phone = val.phone.toString();
                    let validatePhone = this.validatePhone(phone);

                    if(validatePhone) {
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            },
        },
        beforeCreate(){
            if(this.$session == null || this.$loggedIn == 'null') {
                this.$router.push({ name: "user.login" }).then(() => { this.$router.go() });
            } else if(this.$session.status === '1') {
                this.$router.push({ name: 'dashboard' }).then(() => { this.$router.go() });
            }
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
