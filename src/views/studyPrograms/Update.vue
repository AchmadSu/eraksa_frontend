<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top top-0 progress':'d-none'" style="height: 5px; z-index:10000;">
            <div class="bg-primary progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div id="wrapper">

            <!-- Sidebar -->
            <Sidebar v-if="this.windowWidth >= this.$widthComputer"></Sidebar>
            <!-- End of Sidebar -->
    
            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">
    
                <!-- Main Content -->
                <div id="content">
    
                    <!-- Topbar -->
                    <Navbar></Navbar>
                    <!-- End of Topbar -->
    
                    <!-- Begin Page Content -->
                    <div class="container-fluid">
                        <!-- DataTales Example -->
                        <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
                            <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
                                <div class="my-5 spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="errorDetail == true">
                                    <div class="row">
                                        <div v-if="this.windowWidth >= this.$widthLandscapePhone" class="col-3">&nbsp;
                                        </div>
                                        <div v-if="this.windowWidth >= this.$widthLandscapePhone" class="col-4 mx-5">
                                            <img class="mx-5 w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                        </div>
                                        <div v-else-if="this.windowWidth >= this.$widthPotraitPhone" class="col-11 mx-5">
                                            <img class="w-75 mx-5 px-5 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                        </div>
                                        <div v-else class="col-12">
                                            <img  class="w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                        </div>
                                        <h3 class="text-center my-3">{{this.detailObject.message}}</h3>
                                        <p class="text-center my-3">{{this.detailObject.detail}}</p>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="modal fade" id="successModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="successModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header bg-success">
                                                    <h5 class="text-white modal-title" id="eraseModalLabel"><font-awesome-icon icon="fa-solid fa-circle-check" /> &ensp;Permintaan berhasil!</h5>
                                                    <button @click="backFunction" :disabled="buttonDisabled" type="button" class="btn-close" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div v-for="item, index in successResponse" :key="item.id" class="text-start text-success ml-3 alert alert-dismissible" role="alert">
                                                        <strong>{{ item.message }}</strong><br/>{{ item.detail }} 
                                                    </div>
                                                    <button @click="backFunction" type="button" class="float-end btn btn-success">Tutup</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <div class="row">
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
                                        <div class="col-md-6 col-12 px-lg-5 text-center">
                                            <div class="input-group py-md-0 py-lg-1">
                                                <h3 class="fw-bolder text-secondary">
                                                    EDIT PROGRAM STUDI
                                                </h3>
                                            </div>
                                            <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                                                <h5 class="text-secondary">
                                                    {{this.detailObject.name}}
                                                </h5>
                                            </div>
                                            <form class="form needs-validation" id="app" @submit.prevent="updateFunction" novalidate>
                                                <div class="py-lg-4 py-md-0 py-sm-1">
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text bg-transparent" id="basic-addon1">
                                                            <i class="text secondary fa fa-graduation-cap"></i>
                                                        </span>
                                                        <input 
                                                            name="name" type="text" :class="this.checkName == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                                            placeholder="Nama Program Studi Baru" aria-label="name" 
                                                            aria-describedby="basic-addon1"
                                                            v-model="form.name"
                                                        />
                                                        <div :class="this.checkName == false ? 'text-start invalid-feedback' : 'd-none'">
                                                            Panjang minimal nama adalah 3 karakter
                                                        </div>
                                                    </div>
                                                    <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3' : 'd-none'" role="alert">
                                                        <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                        <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>
                                                    <div v-if="isLoadingResponse == false">
                                                        <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="!submitEnabled">Update</button>
                                                    </div>
                                                    <div v-if="isLoadingResponse == true">
                                                        <button type="submit" class="btn btn-primary" style="width:100%;" :disabled="true">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Memuat ...
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-4">
                                <div :class="this.windowWidth <= $widthLandscapePhone ? 'd-none':'col-4'">
                                    &nbsp;
                                </div>
                                <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                    <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                                        <i class="fa fa-arrow-left"></i>&ensp; Kembali
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.container-fluid -->
    
                </div>
                <!-- End of Main Content -->
    
                <!-- Footer -->
                <Footer v-if="this.windowWidth >= this.$widthPotraitPhone" class="bottom-0"></Footer>
                <Footer v-else class="w-100 position-absolute bottom-0"></Footer>
                <!-- End of Footer -->
                
            </div>
            <!-- End of Content Wrapper -->
    
        </div>
        <!-- End of Page Wrapper -->
        <a @click="toTop" class="scroll-to-top rounded" href="#">
            <i class="fa fa-arrow-up"></i>
        </a>
    </div>
</template>
<script>
    import Sidebar from '../../components/Sidebar.vue';
    import Navbar from '../../components/Navbar.vue';
    // import Dashboard from '../components/admin/Dashboard.vue';
    // import Maintenance from '../components/admin/Maintenance.vue';
    import Footer from '../../components/Footer.vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                checkName: false,
                errorDetail: false,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                name: '',
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                prev: 0,
                next: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    name: '',
                },
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                detailObject: {},
                deleteArray: [],
                username: this.$session.name,
                id: this.$route.query.data,
                errorDetail: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successDelete: false,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        components: {
            Sidebar,
            Navbar,
            Footer
        },
        watch: {
            form: {
                handler: function (val) {
                    let name = val.name;
                    let validateName = this.validateName(name);
                    if(validateName){
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
                    // console.log(name)
                },
                deep: true,
            },
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.errorResponse = [];
            },
            openModal() {
                // console.log("test")
                $('#successModal').modal('show')
            },
            closeModal() {
                // console.log("test")
                $('#successModal').modal('hide')
            },
            validateName(value){
                // console.log(value1);
                if(value.length >= 3) {
                    this.checkName = true;
                    // console.log(this.fullname);
                    return true;
                } else {
                    this.checkName = false;
                    return false;
                }
            },
            backFunction(){
                // this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.closeModal();
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
                        // console.log("Test");
                        setTimeout(() => {
                            this.$router.push({ name: 'manageStudyPrograms' }).then(() => { this.$router.go() })
                        }, 4000);
                    }
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
            async detailFunction(id){
                try {
                    let data = window.atob(id)
                    await axios.get('/studyPrograms/detail/'+data)
                    .then((response) => {
                        // console.log(response.data.data)
                        this.detailObject = {"id": response.data.data.id, "name": response.data.data.name};
                        this.form.name = this.detailObject.name;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorDetail = true;
                            this.showAlert = true;
                            this.detailObject = 
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                };
                        this.isLoadingResponse = false;
                        this.buttonDisabled = false;
                        this.isLoadingContent = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            this.errorDetail = true;
                            // console.log(err.response.data);
                            this.showAlert = true;
                            this.detailObject =
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                };
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        } else {
                            this.errorDetail = true;
                            this.showAlert = true;
                            this.detailObject =
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                };
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        }
                    });
                    this.isLoadingContent = false;
                } catch (error) {
                    // console.log(error);
                    this.detailObject = {'id': 1, 'message': error.code, 'detail': error.message,};
                    this.isLoadingResponse = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.showAlert = true;
                    this.buttonDisabled = false;
                }
                this.isLoading = false;
            },
            async updateFunction(){
                this.setAlert();
                this.isLoadingResponse = true;
                this.buttonDisabled = true;
                let data = window.atob(this.id)
                // this.cursorStyle = 'cursor: not-allowed';
                this.dataStudyProgram = {
                    "id": data,
                    "name": this.form.name,
                }
                // console.log(this.dataStudyProgram);
                try {
                    await axios.put('/studyPrograms/update', this.dataStudyProgram)
                    .then((response) => {
                        // this.showAlert = true;
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
                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
                        this.isLoadingResponse = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        this.openModal();
                    }).catch((err) => {
                        if(!err.response) {
                            this.showAlert = true;
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                        this.isLoadingResponse = false;
                        this.buttonDisabled = false;
                        this.isLoadingContent = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.showAlert = true;
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        } else {
                            this.showAlert = true;
                            this.errorResponse = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                }
                            ];
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        }
                    });
                    this.isLoadingContent = false;
                } catch (error) {
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.isLoadingResponse = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.showAlert = true;
                    this.buttonDisabled = false;
                }
            },
            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.successResponse = [];
                this.errorResponse = [];
            },
        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
            // console.table(this.dataArray)
        },
        destroyed() {
            window.removeEventListener("resize", this.sizeHandler);
        },
        beforeCreate(){
            // console.table(this.$session != null, this.$loggedIn != 'null');
            if(this.$session == null || this.$loggedIn == 'null') {
                // console.log(this.lastPath);
                // this.lastPath = this.$router.options.history.state.back
                this.$router.push({ name: 'user.login' }).then(() => { this.$router.go() })
            } else if (this.$session['status'] === "0") {
                this.$router.push({ name: "user.otpPage" });
            } else if (this.$roles !== "Super-Admin"){
                // this.lastPath = this.$router.options.history.state.back
                this.lastPath = this.$router.options.history.state.back
                if(this.lastPath != null) {
                    this.$router.push({ path: this.lastPath }).then(() => { this.$router.go() });
                }
                else {
                    this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
                }
            } else if (this.$route.query.data == null) {
                this.$router.push({ name: "dashboard" });
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            // console.log(window.atob(this.id));
            this.detailFunction(this.id);
            // this.loansList();
            console.log(this.detailObject);
            // this.dataArray.filter((index) => index !== 1 )

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>