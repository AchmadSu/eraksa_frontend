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
                                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                                        <h3 class="fw-bolder text-secondary">
                                            TAMBAH ASET
                                        </h3>
                                    </div>
                                    <form class="form needs-validation" id="app" @submit.prevent="createFunction" novalidate>
                                        <div class="py-lg-4 py-md-0 py-sm-1">
                                            <div class="input-group mb-3">
                                                <span class="input-group-text bg-transparent" id="basic-addon1">
                                                    <i class="fa fa-cube"></i>
                                                </span>
                                                <input 
                                                    name="name" type="text" :class="this.checkName == false ? 'form-control is-invalid' : 'form-control is-valid'"
                                                    placeholder="Nama Aset" aria-label="name" 
                                                    aria-describedby="basic-addon1"
                                                    v-model="form.name"
                                                />
                                                <div :class="this.checkName == false ? 'text-start invalid-feedback' : 'd-none'">
                                                    Panjang minimal nama adalah 3 karakter
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <select v-model="form.study_programs" class="form-select form-select mb-3" aria-label=".form-select example">
                                                    <option selected disabled>Program Studi</option>
                                                    <option v-for="item in studyProgramArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                    <option v-if="this.showAlertStudyPrograms" v-for="item in errorStudyPrograms" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                </select>
                                                <div v-if="this.isLoadingStudyPrograms == false" class="rounded-0">
                                                    <a @click="getStudyProgram(this.skipStudyProgram+10, this.takeStudyProgram)" v-if="this.studyProgramTotal > this.studyProgramArray.length" href="#" class="btn btn-primary rounded-0">Muat lebih</a>                                                  
                                                    <a @click="getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)" v-if="this.showAlertStudyPrograms" href="#" class="btn btn-primary rounded-0">Muat ulang</a>                                                  
                                                </div>
                                                <div v-else>
                                                    <button type="submit" class="btn btn-primary rounded-0" style="width:100%;" :disabled="true">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        
                                                    </button>
                                                </div>
                                                <div :class="this.checkStudyProgram == false ? 'text-start invalid-feedback' : 'd-none'">
                                                    Pilih salah satu Program Studi!
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <select v-model="form.category_assets" class="form-select form-select mb-3" aria-label=".form-select example">
                                                    <option selected disabled>Kategori</option>
                                                    <option v-for="item in categoryArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                    <option v-if="this.showAlertCategory" v-for="item in errorCategory" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                </select>
                                                <div v-if="this.isLoadingCategory == false" class="rounded-0">
                                                    <a @click="getCategory(this.skipCategory+10, this.takeCategory)" v-if="this.categoryTotal > this.categoryArray.length" href="#" class="btn btn-primary rounded-0">Muat lebih</a>
                                                    <a @click="getCategory(this.skipCategory, this.takeCategory)" v-if="this.showAlertCategory" href="#" class="btn btn-primary rounded-0">Muat ulang</a>                                            
                                                </div>
                                                <div v-else>
                                                    <button type="submit" class="btn btn-primary rounded-0" style="width:100%;" :disabled="true">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        
                                                    </button>
                                                </div>
                                                <div :class="this.checkCategory == false ? 'text-start invalid-feedback' : 'd-none'">
                                                    Pilih salah satu kategori!
                                                </div>
                                            </div>
                                            <div class="input-group mb-3">
                                                <select v-model="form.placements" class="form-select form-select mb-3" aria-label=".form-select example">
                                                    <option selected disabled>Tempat</option>
                                                    <option v-for="item in placementsArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                    <option v-if="this.showAlertPlacements" v-for="item in errorCategory" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                </select>
                                                <div v-if="this.isLoadingPlacements == false" class="rounded-0">
                                                    <a @click="getPlacements(this.skipPlacements+10, this.takePlacements)" v-if="this.placementsTotal > this.placementsArray.length" href="#" class="btn btn-primary rounded-0">Muat lebih</a>
                                                    <a @click="getPlacements(this.skipPlacements, this.takePlacements)" v-if="this.showAlertPlacements" href="#" class="btn btn-primary rounded-0">Muat ulang</a>                                                  
                                                </div>
                                                <div v-else>
                                                    <button type="submit" class="btn btn-primary rounded-0" style="width:100%;" :disabled="true">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    </button>
                                                </div>
                                                <div :class="this.checkPlacements == false ? 'text-start invalid-feedback' : 'd-none'">
                                                    Pilih salah satu tempat!
                                                </div>
                                            </div>
                                            <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3' : 'd-none'" role="alert">
                                                <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                <button @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                            <div v-if="isLoadingResponse == false">
                                                <button type="submit" class="btn btn-success" style="width:100%;" :disabled="!submitEnabled">Tambah</button>
                                            </div>
                                            <div v-if="isLoadingResponse == true">
                                                <button type="submit" class="btn btn-success" style="width:100%;" :disabled="true">
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Memuat ...
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
                checkDescription: false,
                submitEnabled: false,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingStudyPrograms: true,
                isLoadingCategory: true,
                isLoadingPlacements: true,
                isLoadingResponse: false,
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
                prev: 0,
                next: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    name: '',
                    study_programs: 'Program Studi',
                    category_assets: 'Kategori',
                    placements: 'Tempat'
                },
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                studyProgramArray: [],
                errorStudyPrograms: [],
                studyProgramTotal: 0,
                categoryArray: [],
                errorCategory: [],
                categoryTotal: 0,
                placementsArray: [],
                errorPlacements: [],
                placementsTotal: 0,
                deleteArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                showAlertStudyPrograms: false,
                showAlertCategory: false,
                showAlertPlacements: false,
                skipStudyProgram: 0,
                takeStudyProgram: 10,
                skipCategory: 0,
                takeCategory: 10,
                skipPlacements: 0,
                takePlacements: 10,
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
                    let study_program_id = val.study_programs;
                    let category_id = val.category_assets;
                    let placement_id = val.placements;
                    let validateName = this.validateName(name);

                    // console.log(!(isNaN(study_program_id)))
                    // console.log(!(isNaN(category_id)))
                    // console.log(!(isNaN(placement_id)))
                    if(validateName && !(isNaN(study_program_id)) && !(isNaN(category_id)) && !(isNaN(placement_id))) {
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
            validateDescription(value){
                // console.log(value1);
                if(value.length >= 5) {
                    this.checkDescription = true;
                    // console.log(this.fullname);
                    return true;
                } else {
                    this.checkDescription = false;
                    return false;
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
                            this.$router.push({ name: 'manageAssets' }).then(() => { this.$router.go() })
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
            async createFunction(){
                this.setAlert();
                this.isLoadingResponse = true;
                this.buttonDisabled = true;
                this.cursorStyle = 'cursor: not-allowed';
                this.dataObject = {
                    "name": this.form.name,
                    "study_program_id": this.form.study_programs,
                    "category_id": this.form.category_assets,
                    "placement_id": this.form.placements,
                }
                // this.openModal();
                // console.log(this.dataObject);
                try {
                    await axios.post('/assets/create', this.dataObject)
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
                                'detail': response.data.data.code,
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
            async getStudyProgram(skip, take){
                this.isLoadingStudyPrograms = true;
                this.showAlertStudyPrograms = false;
                this.errorStudyPrograms = [];
                this.buttonDisabled = true;
                // console.log('test1');
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
            async getCategory(skip, take){
                this.isLoadingCategory = true;
                this.showAlertCategory = false;
                this.errorCategory = [];
                this.buttonDisabled = true;
                // console.log('test1');
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "order": "name"
                }
                try {
                    await axios.get('/categoryAssets/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.category_assets).forEach((item) => {
                            this.categoryArray.push(
                                {
                                    "id": response.data.data.category_assets[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.category_assets[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.categoryTotal = response.data.data.count;
                        this.isLoadingCategory = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertCategory = true;
                        this.isLoadingCategory = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorCategory = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertCategory = true;
                    this.isLoadingCategory = false;
                    this.buttonDisabled = false;
                }
            },
            async getPlacements(skip, take){
                this.isLoadingPlacements = true;
                this.showAlertPlacements = false;
                this.errorPlacements = [];
                this.buttonDisabled = true;
                // console.log('test1');
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                }
                try {
                    await axios.get('/placements/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.placements).forEach((item) => {
                            this.placementsArray.push(
                                {
                                    "id": response.data.data.placements[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.placements[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.placementsTotal = response.data.data.count;
                        this.isLoadingPlacements = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertPlacements = true;
                        this.isLoadingPlacements = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorPlacements = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertPlacements = true;
                    this.isLoadingPlacements = false;
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
            } else if (this.$roles === "Member"){
                // this.lastPath = this.$router.options.history.state.back
                this.lastPath = this.$router.options.history.state.back
                if(this.lastPath != null) {
                    this.$router.push({ path: this.lastPath }).then(() => { this.$router.go() });
                }
                else {
                    this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
                }
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            this.getStudyProgram(this.skipStudyProgram, this.takeStudyProgram);
            this.getCategory(this.skipCategory, this.takeCategory);
            this.getPlacements(this.skipPlacements, this.takePlacements);
            // console.log(this.$route.query.search);
            // this.loansList();
            // this.dataArray.filter((index) => index !== 1 )

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>