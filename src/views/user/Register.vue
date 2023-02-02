<template>    
    <!-- Body -->
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
                    <div class="modal-body text-success">
                        <div v-for="item, index in successResponse" :key="item.id" class="text-start mt-3 alert alert-dismissible" role="alert">
                            <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="login" type="button" class="mr-4 mr-lg-3 btn btn-success">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
        <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
            <div :class="windowWidth >= $widthLandscapePhone ? 'row d-md-block d-sm-none mx-5' : 'd-none'">
                <div :class="windowWidth >= $widthPotraitPhone && windowWidth < $widthComputer? 'd-block' : 'd-none'">
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
                    <div v-else-if="windowWidth <= $widthComputer">
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
                    <img :src="$baseUrl+'/src/assets/img/Data_security_28.png'" class="img-fluid" alt="...">
                </div>
                <div class="col-md-6 col-sm-12 px-lg-5 text-center">
                    <form class="form needs-validation" id="app" @submit.prevent="register" novalidate>    
                        <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                            <h3 class="fw-bolder text-secondary">
                                REGISTER
                            </h3>
                        </div>
                        <div class="py-lg-4 py-md-0 py-sm-1">
                            <div :class="windowWidth >= $widthLandscapePhone ? 'row' : 'd-none'">
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
                            <div :class="windowWidth <= $widthLandscapePhone ? 'input-group mb-3' : 'd-none'">
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
                            <div class="row ml-1 input-group mb-3 btn-group rounded-0" role="group">
                                <input 
                                    type="radio" 
                                    class="btn-check" 
                                    name="code_type"
                                    value="0"
                                    id="code_type0"
                                    v-model="form.radio"
                                    :disabled="!this.radioEnabled">
                                <label :class="windowWidth <= $widthLandscapePhone ? 
                                    'my-2 p-2 col-12 btn btn-outline-success rounded-0':
                                    'p-3 w-100 col-6 btn btn-outline-success rounded-start'" 
                                    for="code_type0"
                                >
                                Saya <b>MAHASISWA</b>
                                </label>
                                <input 
                                    type="radio" 
                                    class="btn-check" 
                                    name="code_type"
                                    value="1"
                                    id="code_type1"
                                    v-model="form.radio"
                                    :disabled="!this.radioEnabled"
                                    >
                                <label :class="windowWidth <= $widthLandscapePhone ? 
                                    'my-2 p-2 col-12 btn btn-outline-success rounded-0':
                                    'p-3 col-6 btn btn-outline-success rounded-end'" 
                                    for="code_type1"
                                >
                                Saya <b>DOSEN</b>
                                </label>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                    <font-awesome-icon class="text-secondary" icon="fa-solid fa-key" />
                                </span>
                                <input 
                                    name="code" type="text" class="form-control"
                                    :placeholder="this.codeString" aria-label="Code" 
                                    aria-describedby="basic-addon1"
                                    v-model="form.code" required
                                    :disabled="!this.codeEnabled"
                                />
                                <div :class="this.checkCode == false ? 'text-start invalid-feedback' : 'd-none'">
                                    Masukkan data dengan benar!
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
                            <div v-if="passwordHidden">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-transparent" id="basic-addon1">
                                        <font-awesome-icon class="text-secondary" icon="fa-solid fa-lock" />
                                    </span>
                                    <input 
                                        name="password" type="password" :class="this.finalCheckPassword == false ? 'form-control is-invalid' : 'form-control'"
                                        v-model="form.password" placeholder="Password" aria-label="Password"
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
                                        v-model="form.password" placeholder="Password" aria-label="Password"
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
                                                <small>Re-type password</small>
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
                                            aria-describedby="basic-addon2" required minlength="6" @copy.prevent @paste.prevent
                                        />
                                        <label v-if="windowWidth >= $widthComputer" for="floatingInputValue">
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
                                <button type="submit" class="btn btn-success" style="width:100%;" :disabled="!submitEnabled">Daftar</button>
                            </div>
                            <div v-if="isLoadingResponse == true">
                                <button type="submit" class="btn btn-success" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
                            </div>
                            <div v-for="item in successResponse" :key="item.id" :class="showAlert == true ? 'text-start mt-3 alert alert-primary alert-dismissible' : 'd-none'" role="alert">
                                <strong> <font-awesome-icon icon="fa-solid fa-circle-check" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3' : 'd-none'" role="alert">
                                <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#errorModal">
                            Launch demo modal
                            </button> -->
                        </div>
                    </form>
                    <div :class="windowWidth >= $widthLandscapePhone ? 'row py-3 my-md-3 my-lg-0' : 'd-none'">
                        <div class="col-6 text-right">
                            <button class="btn btn-light w-100" disabled>Punya akun?</button>
                        </div>
                        <div class="col-6" v-if="isLoadingRouter == false">
                            <button @click="login" class="btn btn-primary w-100" :disabled="secondaryButtonDisabled">
                                <font-awesome-icon icon="fa-solid fa-right-to-bracket"/>
                                Masuk
                            </button>
                        </div>
                        <div class="col-6" v-if="isLoadingRouter == true">
                            <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="true">
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
                                <button @click="login" class="btn btn-primary w-100" :disabled="secondaryButtonDisabled">
                                    Masuk
                                </button>
                            </div>
                        </div>
                        <div v-if="isLoadingRouter">
                            <div class="col-12">
                                <p>Atau</p>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="true">
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Memuat ...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="windowWidth >= $widthComputer ? 'row text-center mt-lg-5 py-3': 'row text-center mt-lg-5 pt-5'">
                <p class="text-secondary">Eraksa <font-awesome-icon icon="fa-solid fa-copyright" /> {{currentYear}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    // import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    // import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
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
                windowWidth: window.innerWidth,
                 
                regexExp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi,
                upper: /[A-Z]/,
                lower: /[a-z]/,
                textnumber: /[0-9]/,

                submitEnabled: false,
                secondaryButtonDisabled: false,
                checkName: false,
                checkEmail: false,
                checkCode: false,
                checkPhone: false,
                floatingTextEmail: true,
                floatingTextPhone: true,
                floatingTextConfirmation: true,
                isLoading: true,
                isLoadingResponse: false,
                isLoadingImage: true,
                radioEnabled: true,
                codeEnabled: false,

                successResponse: [],
                errorResponse: [],
                showAlert: false,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                codeType: '',
                codeString: '',

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
                form : {
                    firstname: '',
                    lastname: '',
                    email: '',
                    radio:'',
                    code:'',
                    radio:'',
                    password: '',
                    confirmPassword: '',
                    phone: '',   
                },
                fullname: '',
                modalShow: false,
                isLoadingRouter: false,
                // errorModal: ref(null),
            }
        },

        methods: {
            openModal () {
                // console.log("test")
                $('#successModal').modal('show')
            },
            closeModal () {
                // console.log("test")
                $('#successModal').modal('hide')
            },
            async register() {
                this.setAlert();
                this.isLoadingResponse = true;
                this.radioEnabled = false;
                this.secondaryButtonDisabled = true;
                console.log(this.form.code);
                console.log(this.form.code_type);
                // if()
                const data = {
                    "name": this.fullname,
                    "email": this.form.email,
                    "phone": this.form.phone.toString(),
                    "password": this.form.password,
                    "confirm_pass": this.form.confirmPassword, 
                    "code": this.form.code,
                    "code_type": this.form.radio
                }
                await axios.post('/register', data)
                .then(response => {
                    this.isLoadingResponse = false;
                    this.secondaryButtonDisabled = false;
                    this.radioEnabled = true;
                    // this.submitEnabled = false;
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
                    if (!error.response) {
                        // network error
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        this.secondaryButtonDisabled = false;
                        this.radioEnabled = true;
                        this.errorResponse = [
                            {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error',
                            }
                        ];
                        // this.modalShow = true;
                    } else if (error.response) {
                        this.showAlert = true;
                        this.isLoadingResponse = false;
                        this.secondaryButtonDisabled = false;
                        this.radioEnabled = true;
                        if(error.response.data.message == 'Error!') {
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': error.response.data.message, 
                                    'detail': error.response.data.data.error,
                                }
                            ]
                        } else {
                            // console.table(this.data);
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': error.response.status +' '+ error.response.statusText,
                                    'detail': 'Maaf permintaan anda tidak dapat dilakukan'
                                }
                            ];
                            // this.modalShow = true;
                        }
                        // this.alertMsg = error.response.status +' '+ error.response.statusText;
                        // console.log(error.response);
                        // console.log(error.response.data);
                    }
                })
            },  

            login(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.submitEnabled = false;
                this.radioEnabled = false;
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
                    this.submitEnabled = true;
                    this.secondaryButtonDisabled = false;
                    this.radioEnabled = true;
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': 'Error!', 
                            'detail': e,
                        }
                    ];
                }
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
                    // console.log(val.code);
                    let code_type = val.radio;
                    let code = val.code;
                    console.log(code_type);
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
                    
                    if(code_type == "0") {
                        this.codeEnabled = true;
                        this.codeString = "Masukkan NIM";
                        this.codeType = "0";
                    } else if(code_type == "1") {
                        this.codeEnabled = true;
                        this.codeString = "Masukkan NIDN";
                        this.codeType = "1";
                    }

                    if(code.length > 3 && email.length >= 6 && validateName && validatePhone && validatePassword && validateConfirmPassword) {
                        // console.log('Test');    
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                },
                deep: true,
            }
        },
        beforeCreate(){
            // console.table(this.$session != null, this.$loggedIn != 'null', this.$token != null);
            if(this.$session != null || this.$loggedIn != 'null') {
                if (this.$session['status'] == "0") {
                    this.$router.push({ name: "user.otpPage" }).then(() => { this.$router.go() });
                } else {
                    this.lastPath = this.$router.options.history.state.back
                    if(this.lastPath != null) {
                        this.$router.push({ path: this.lastPath }).then(() => { this.$router.go() });
                    }
                    else {
                        this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
                    }
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
