<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px; z-index: 10000;">
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
                    <div v-if="this.errorDetail">
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
                        <div class="row my-4 d-flex justify-content-center">
                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                                    <i class="fa fa-arrow-left"></i>&ensp; Kembali
                                </button>
                            </div>
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
                                            <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                        </div>
                                        <button @click="backFunction" type="button" class="float-end btn btn-success">Tutup</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <!-- DataTales Example -->
                            <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
                                <div :class="this.loansStatus == '0' ? 'row':'d-none'">
                                    <div v-if="isLoadingImage == true" class="col-sm-12 d-md-none text-center my-5">
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
                                    <div v-else class="d-md-none col-sm-12 text-center">
                                        <img :src="$baseUrl+'/src/assets/img/Data_security_28.png'" class="img-fluid" alt="...">
                                    </div>
                                    <div class="col-12 px-lg-5 text-center">
                                        <div class="d-flex justify-content-center input-group py-sm-3 mb-sm-3 mb-md-0 py-md-0 py-lg-1">
                                            <h3 class="fw-bolder text-secondary">
                                                EDIT PERAN PENGGUNA
                                            </h3>
                                        </div>
                                        <form class="form needs-validation" id="app" @submit.prevent="confirmFunction" novalidate>
                                            <div class="py-lg-4 py-md-0 py-sm-1">
                                                <div class="row d-flex justify-content-evenly my-sm-5 my-md-3">
                                                    <div class="col-12">
                                                        <div class="card w-100 h-100 btn text-dark text-justify p-3">
                                                            <div class="my-2">
                                                                <template v-if="this.windowWidth > $widthPotraitPhone">
                                                                    <table class="table table-sm table-borderless">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="align-middle" colspan="2">
                                                                                    <h5>Rincian Pengguna</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Nama Pengguna</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.name}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>
                                                                                        <template v-if="this.detailObject.code_type == '0'">
                                                                                            NIM
                                                                                        </template>
                                                                                        <template v-else-if="this.detailObject.code_type == '1'">
                                                                                            NUPTK
                                                                                        </template>
                                                                                        <template v-else-if="this.detailObject.code_type == '2'">
                                                                                            NIP
                                                                                        </template>
                                                                                    </h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.code}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Status</h5>
                                                                                </td>
                                                                                <td v-if="this.detailObject.status == '0'" class="align-middle">
                                                                                    <h5 class="text-danger">Akun Belum Diaktivasi</h5>
                                                                                </td>
                                                                                <td v-if="this.detailObject.status == '1'" class="align-middle">
                                                                                    <h5 class="text-primary">Aktif</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Email</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.email}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>No. WhatsApp</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.phone}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr v-if="this.detailObject.study_program_name">
                                                                                <td class="align-middle">
                                                                                    <h5>Program Studi</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.study_program_name}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Peran Pengguna Saat Ini</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.user_role}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </template>
                                                                <template v-else>
                                                                    <div class="row d-flex justify-content-evenly mb-5">
                                                                        <div class="col-12">
                                                                            <h6 class="heading text-center mb-3">{{this.detailObject.name}}</h6>
                                                                        </div>
                                                                        <div class="col-sm-12 my-3">
                                                                            <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-primary p-3">
                                                                                <div class="d-flex justify-content-between">
                                                                                    <div class="d-flex flex-row align-items-center">
                                                                                        <div class="icon"> <i class="fa fa-user"></i> </div>
                                                                                        <div class="ms-2 c-details">
                                                                                            <span>Detail User</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="my-2 text-left">
                                                                                    <small>
                                                                                        <p>
                                                                                            <template v-if="this.detailObject.code_type == '0'">
                                                                                                NIM: <b>{{this.detailObject.code}}</b>
                                                                                            </template>
                                                                                            <template v-else-if="this.detailObject.code_type == '1'">
                                                                                                NUPTK: <b>{{this.detailObject.code}}</b>
                                                                                            </template>
                                                                                            <template v-else-if="this.detailObject.code_type == '2'">
                                                                                                NIP: <b>{{this.detailObject.code}}</b>
                                                                                            </template>
                                                                                            <br> 
                                                                                            Email: {{ this.detailObject.email }}
                                                                                            <br>
                                                                                            Status:
                                                                                            <b v-if="this.detailObject.status == '0'" class="text-danger">Belum diaktivasi</b>
                                                                                            <b v-else-if="this.detailObject.status == '1'" class="text-primary">Aktif</b>
                                                                                            <br>
                                                                                            No. WhatsApp: <br> <b>{{ this.detailObject.phone }}</b>
                                                                                            <br>
                                                                                            <template v-if="this.detailObject.study_program_name">
                                                                                                Program Studi: <b>{{ this.detailObject.study_program_name }}</b>
                                                                                                <br>
                                                                                            </template>
                                                                                            Peran saat ini: <b>{{this.detailObject.user_role}}</b> <br>
                                                                                        </p>
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="col-lg-4 col-sm-12"> -->
                                                <div class="input-group mb-3">
                                                    <select v-model="form.roles" :class="isNaN(this.form.roles) ? 'form-select form-select is-invalid':'is-valid form-select form-select'" aria-label=".form-select example">
                                                        <option selected disabled>Pilih Peran</option>
                                                        <option v-for="item in rolesArray" :key="item.id" :value="item.value">{{item.description}}</option>
                                                    </select>
                                                    <div :class="isNaN(this.form.roles) ? 'text-start invalid-feedback' : 'd-none'">
                                                        Pilih salah satu peran!
                                                    </div>
                                                </div>
                                                <!-- </div> -->
                                                <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3 text-center' : 'd-none'" role="alert">
                                                    <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                    <a @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                                                </div>
                                                <div v-if="isLoadingResponse == false">
                                                    <button type="submit" class="btn btn-primary" :style="this.windowWidth <= $widthLandscapePhone ? 'width:100%;':'width:50%;'" :disabled="!submitEnabled"><i class="fa fa-cog"></i> Ubah Peran</button>
                                                </div>
                                                <div v-if="isLoadingResponse == true">
                                                    <button type="submit" class="btn btn-primary" :style="this.windowWidth <= $widthLandscapePhone ? 'width:100%;':'width:50%;'" :disabled="true">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Memuat ...
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="row my-4 d-flex justify-content-center">
                                    <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                        <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                                            <i class="fa fa-arrow-left"></i>&ensp; Kembali
                                        </button>
                                    </div>
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
                isTyping: false,
                isAdmin: false,
                checkName: false,
                radioEnabled: true,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingStudyPrograms: true,
                isLoadingAssets: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                errorDetail: false,
                loansStatus: 0,
                keyWords: '',
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    roles: 'Pilih Peran'
                },
                filterIds: [],
                studyProgramArray: [],
                errorStudyPrograms: [],
                studyProgramTotal: 0,
                rolesArray: [
                    {
                        "id": 1,
                        "value": 1,
                        "description": "Super-Admin"
                    },
                    {
                        "id": 2,
                        "value": 2,
                        "description": "Admin"
                    },
                    {
                        "id": 3,
                        "value": 3,
                        "description": "Member"
                    }
                ],
                selectDataArray: [],
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                showAlertStudyPrograms: false,
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                detailObject: {},
                skip: 0,
                take: 10,
                username: this.$session.name,
                errorAssets: false,
                errorAssetsArray: [],
                id: this.$route.query.data,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                submitEnabled: false,
                showAlertError: false,
                successDelete: false,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png',
                validateForm: false,
                validateSelect: false
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
                    let roles = val.roles
                    let study_program_id
                    if(roles == 2) {
                        this.isAdmin = true
                        study_program_id = val.study_programs
                    } else {
                        this.isAdmin = false
                        study_program_id = 0
                    }
                    // console.log(!isNaN(study_program_id))

                    if (!isNaN(roles) && !isNaN(study_program_id) && this.detailObject.status == '1') {
                        this.submitEnabled = true;
                    } else {
                        this.submitEnabled = false;
                    }
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
            validateRequest(){
                // console.log(value1);
                if(this.validateForm && this.validateSelect) {
                    this.submitEnabled = true;
                } else {
                    this.submitEnabled = false;
                }
            },
            backFunction(){
                this.isLoadingResponse2 = true;
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
                            this.$router.push({ name: 'manageUser' }).then(() => { this.$router.go() })
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
            async confirmFunction(){
                this.setAlert();
                this.isLoadingResponse = true;
                this.buttonDisabled = true;
                this.cursorStyle = 'cursor: not-allowed';
                this.radioEnabled = false;
                // let asset_ids = Object.values(this.filterIds)
                let data = window.atob(this.id)
                this.dataConfirm = {
                    "id": data,
                    "roles": this.form.roles,
                    "study_program_id": 0,
                }
                // console.log(this.dataConfirm)
                // this.openModal();
                // console.log(this.dataPlacements);
                try {
                    await axios.put('/users/assignRoles', this.dataConfirm)
                    .then((response) => {
                        this.showAlert = true;
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
                        this.isLoadingResponse = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        // console.log(this.successResponse)
                        this.openModal();
                        // this.backFunction();
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
                        this.radioEnabled = false;
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
                    this.radioEnabled = false;
                }
            },
            async detailFunction(id){
                try {
                    let data = window.atob(id)
                    await axios.get('/users/detail/'+data)
                    .then((response) => {
                        // console.log(response)
                        this.detailObject = {
                            "id": response.data.data.id,
                            "name": response.data.data.name,
                            "code": response.data.data.code,
                            "code_type": response.data.data.code_type,
                            "status": response.data.data.status,
                            "phone": response.data.data.phone,
                            "user_role": response.data.data.user_role,
                            "email": response.data.data.email,
                        };
                        
                        // console.log(this.detailObject)
                        // this.form.time = response.data.data.hours;
                        // console.log(this.selectDataArray)
                        this.isLoading = false;
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
                    // this.errorDetail = true;
                    this.isLoading = false;
                } catch (error) {
                    // console.log(error);
                    this.detailObject = {'id': 1, 'message': "Data tidak ditemukan", 'detail': "Mungkin parameter yang anda berikan salah atau tidak ada koneksi"};
                    this.isLoadingResponse = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.showAlert = true;
                    this.buttonDisabled = false;
                    this.errorDetail = true;
                    this.isLoading = false;
                }
            },
            setAlert(){
                // this.alertMsg = null;
                this.showAlert = false;
                this.successResponse = [];
                this.errorResponse = [];
            },
            nextStudyProgram(){
                this.skip = this.skip+10;
                this.getStudyProgram(this.skip, this.take)
            },
            async getStudyProgram(skip, take){
                this.isLoadingStudyPrograms = true;
                this.showAlertStudyPrograms = false;
                this.errorStudyPrograms = [];
                this.buttonDisabled = true;
                    // console.log("test")
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "name": this.name
                }
                
                try {
                    await axios.get('/studyPrograms/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.study_programs).forEach((item) => {
                            this.studyProgramArray.push(
                                {
                                    "id": response.data.data.study_programs[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.study_programs[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.studyProgramTotal = response.data.data.count;
                        this.isLoadingStudyPrograms = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertStudyPrograms = true;
                        this.isLoadingStudyPrograms = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorStudyPrograms = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertStudyPrograms = true;
                    this.isLoadingStudyPrograms = false;
                    this.buttonDisabled = false;
                }
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
                this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
            } else if (this.$route.query.data == null) {
                this.$router.push({ name: "dashboard" });
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            this.detailFunction(this.id)
            this.getStudyProgram(this.skip, this.take)
            // console.log(this.$route.query.search);
            // this.loansList();
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(typeof this.form.time)
            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 3000);
            // console.log(this.errorDetail)
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>