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
                                <div v-if="isLoadingImage == true" class="col-sm-12 d-lg-none text-center my-5">
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
                                    <div class="input-group mb-3 py-sm-3 py-md-0 py-lg-1">
                                        <h3 class="fw-bolder text-secondary">
                                            BUAT PEMINJAMAN
                                        </h3>
                                    </div>
                                    <form class="form needs-validation" id="app" @submit.prevent="createFunction" novalidate>
                                        <div class="py-lg-4 py-md-0 py-sm-1">
                                            <div class="row">
                                                <div class="col-lg-8 col-sm-12">
                                                    <div class="dropdown input-group mb-3">
                                                        <a style="width: 100%;" :class="this.selectDataArray.length == 0 ? 'form-select is-invalid btn btn-light':'form-select is-valid btn btn-light'" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                                            Pilih Aset
                                                        </a>
                                                        <ul style="width: 100%;" class="dropdown-menu border-bottom-success shadow-lg p-2" aria-labelledby="dropdownMenuLink">
                                                            <li v-if="isTyping" class="pb-2 text-center">
                                                                Tekan tombol ENTER untuk mengeksekusi pencarian
                                                            </li>
                                                            <li class="pb-2 d-none d-lg-block">
                                                                <a class="border-primary" href="#">
                                                                    <input @keyup.enter="searchFunction" type="text"
                                                                        v-model="form.search"
                                                                        name="search"
                                                                        class="dropdown-item form-control input-lg bg-light"
                                                                        placeholder="Ketik Nama, Kode atau Kategori"
                                                                        aria-label="Search"
                                                                        aria-describedby="basic-addon2"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li class="pb-2 d-block d-lg-none">
                                                                <a class="border-primary" href="#">
                                                                    <input @keyup.enter="searchFunction" type="text"
                                                                        v-model="form.search"
                                                                        name="search"
                                                                        class="dropdown-item form-control input-lg bg-light"
                                                                        placeholder="Ketik Nama atau Kategori"
                                                                        aria-label="Search"
                                                                        aria-describedby="basic-addon2"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li v-if="this.isLoadingAssets == false" v-for="item in dataArray" :selectedAssets="selectedAssets" class="mb-2">
                                                                <div v-if="item.id != this.selectDataArray.id" class="list-group mt-3">
                                                                    <a @click="addSelection(item.id)" href="#" class="border-primary dropdown-item list-group-item list-group-item-action">
                                                                        <h6 class="h6">
                                                                            <template v-if="this.windowWidth > $widthPotraitPhone">
                                                                                <template v-if="item.name.length < 35">
                                                                                    {{item.name}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.name.substring(0,35)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                            <template v-else>
                                                                                <template v-if="item.name.length < 20">
                                                                                    {{item.name}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.name.substring(0,20)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                        </h6>
                                                                        <h6 class="h6 text-secondary">
                                                                            <template v-if="this.windowWidth > $widthPotraitPhone">
                                                                                <template v-if="item.code.length < 35">
                                                                                    {{item.code}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.code.substring(0,35)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                            <template v-else>
                                                                                <template v-if="item.code.length < 20">
                                                                                    {{item.code}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.code.substring(0,20)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                        </h6>
                                                                        <h6 class="h6 text-secondary">
                                                                            <template v-if="this.windowWidth > $widthPotraitPhone">
                                                                                <template v-if="item.study_program_name.length < 35">
                                                                                    {{item.study_program_name}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.study_program_name.substring(0,35)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                            <template v-else>
                                                                                <template v-if="item.study_program_name.length < 20">
                                                                                    {{item.study_program_name}}
                                                                                </template>
                                                                                <template v-else>
                                                                                    {{item.study_program_name.substring(0,20)+"..."}}
                                                                                </template>
                                                                            </template>
                                                                        </h6>
                                                                    </a>
                                                                </div>
                                                            </li>
                                                            <li v-if="this.errorAssets" v-for="item in this.errorAssetsArray" class="mb-2 mt-2 text-center d-flex justify-content-center">
                                                                <div class="list-group">
                                                                    <h6>{{item.message}}</h6>
                                                                    <span>{{item.detail}}</span>
                                                                </div>
                                                            </li>
                                                            <li v-if="this.isLoadingAssets" class="mb-2 mt-2 d-flex justify-content-center">
                                                                <div class="list-group">
                                                                    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                                                        <span class="visually-hidden">Loading...</span>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <div v-if="this.isLoadingAssets == false && this.errorAssets == false" class="row text-center d-flex justify-content-evenly mt-3 mb-2">
                                                                <div v-if="this.skipAsset > 0" class="col-6">
                                                                    <a @click="prevFunction" class="btn btn-primary">
                                                                        <i class="fa fa-arrow-left"></i> 
                                                                        <!-- <template v-if="this.windowWidth > $widthPotraitPhone"> -->
                                                                            Sebelumnya
                                                                        <!-- </template> -->
                                                                    </a>
                                                                </div>
                                                                <div v-if="this.next < this.dataCount" class="col-6">
                                                                    <a @click="nextFunction" class="btn btn-primary">
                                                                        <i class="fa fa-arrow-right"></i> 
                                                                        <!-- <template v-if="this.windowWidth > $widthPotraitPhone"> -->
                                                                            Selanjutnya
                                                                        <!-- </template> -->
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div v-if="this.isLoadingAssets == false && (this.keyWords != '' || this.errorAssets)" class="row text-center d-flex justify-content-center mt-3 mb-2">
                                                                <div class="col-12 d-flex justify-content-center">
                                                                    <a @click="loadAllFunction" class="btn btn-primary">
                                                                        <i class="fa fa-undo"></i> 
                                                                        <template v-if="this.keyWords != ''">
                                                                            Muat Seluruh Data
                                                                        </template>
                                                                        <template v-else>
                                                                            Muat Ulang
                                                                        </template>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </ul>
                                                        <div :class="this.selectDataArray.length == 0 ? 'text-start invalid-feedback' : 'd-none'">
                                                            Tidak ada aset yang dipilih
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-sm-12">
                                                    <div class="input-group mb-3">
                                                        <select v-model="form.time" :class="isNaN(this.form.time) ? 'form-select form-select is-invalid text-center':'is-valid text-center form-select form-select'" aria-label=".form-select example">
                                                            <option selected disabled>Lama Peminjaman</option>
                                                            <option v-for="item in timesArray" :key="item.id" :value="item.value">{{item.description}}</option>
                                                        </select>
                                                        <div :class="isNaN(this.form.time) ? 'text-start invalid-feedback' : 'd-none'">
                                                            Pilih salah satu periode!
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row d-flex justify-content-evenly mb-5">
                                                <div v-for="item, index in selectDataArray" class="col-sm-6 col-lg-4 my-3">
                                                    <div @click="removeSelection(item.id)" class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-primary p-3">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div class="icon"> <i class="fa fa-cube"></i> </div>
                                                                <div class="ms-2 c-details">
                                                                    <span>Kategori Aset</span> <h6>{{item.category_name}}</h6>
                                                                </div>
                                                            </div>
                                                            <div class="badge text-primary"> <span>DIPILIH</span> </div>
                                                        </div>
                                                        <div class="my-2">
                                                            <h3 class="heading text-left">{{item.name}}</h3>
                                                            <h6>{{item.code}}</h6>
                                                            <h6>{{item.study_program_name}}</h6>
                                                            <div class="text-center mt-3">
                                                                <div class="mt-3"> 
                                                                    <span v-if="this.windowWidth <= this.$widthLandscapePhone" class="text2">Ketuk untuk membatalkan pilihan</span>
                                                                    <span v-else class="text2">Klik untuk membatalkan pilihan</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3 text-center' : 'd-none'" role="alert">
                                                <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                <a @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                                            </div>
                                            <div v-if="isLoadingResponse == false">
                                                <button type="submit" class="btn btn-success" :style="this.windowWidth <= $widthLandscapePhone ? 'width:100%;':'width:50%;'" :disabled="!submitEnabled"><i class="fa fa-paper-plane"></i> Ajukan Permintaan</button>
                                            </div>
                                            <div v-if="isLoadingResponse == true">
                                                <button type="submit" class="btn btn-success" :style="this.windowWidth <= $widthLandscapePhone ? 'width:100%;':'width:50%;'" :disabled="true">
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
                checkName: false,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
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
                keyWords: '',
                prev: 0,
                next: 5,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    time: 'Lama Peminjaman',
                    search: '',
                },
                filterIds: [],
                timesArray: [
                    {
                        "id": 1,
                        "value": 2,
                        "description": "2 Jam"
                    },
                    {
                        "id": 2,
                        "value": 3,
                        "description": "3 Jam"
                    },
                    {
                        "id": 3,
                        "value": 4,
                        "description": "4 Jam"
                    },
                    {
                        "id": 4,
                        "value": 8,
                        "description": "8 Jam"
                    },
                    {
                        "id": 5,
                        "value": 12,
                        "description": "12 Jam"
                    },
                    {
                        "id": 6,
                        "value": 24,
                        "description": "1 Hari"
                    },
                    {
                        "id": 7,
                        "value": 48,
                        "description": "2 Hari"
                    },
                    {
                        "id": 8,
                        "value": 72,
                        "description": "3 Hari"
                    },
                    {
                        "id": 9,
                        "value": 96,
                        "description": "4 Hari"
                    },
                    {
                        "id": 10,
                        "value": 120,
                        "description": "5 Hari"
                    },
                    {
                        "id": 11,
                        "value": 144,
                        "description": "6 Hari"
                    },
                    {
                        "id": 12,
                        "value": 168,
                        "description": "1 Minggu"
                    },
                    {
                        "id": 13,
                        "value": 336,
                        "description": "2 Minggu"
                    },
                    {
                        "id": 14,
                        "value": 504,
                        "description": "3 Minggu"
                    },
                    {
                        "id": 15,
                        "value": 720,
                        "description": "1 Bulan"
                    },
                ],
                selectDataArray: [],
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                skipAsset: 0,
                takeAsset: 5,
                username: this.$session.name,
                errorAssets: false,
                errorAssetsArray: [],
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
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
            submitEnabled: {
                handler: function () {
                    if(this.validateSelect && this.validateForm) {
                        this.submitEnabled = true
                    } else {
                        this.submitEnabled = false
                    }
                },
                deep: true,
            },
            selectDataArray: {
                handler: function(val){
                    let length = val.length
                    if(length > 0) {
                        this.validateSelect = true;
                    } else {
                        this.validateSelect = false;
                    }
                    this.validateRequest()
                },
                deep: true,
            },
            form: {
                handler: function (val) {
                    let time = val.time
                    let search = val.search
                    
                    if(search) {
                        this.isTyping = true;
                    } else {
                        this.isTyping = false;
                    }

                    if (!isNaN(time)) {
                        this.validateForm = true;
                    } else {
                        this.validateForm = false;
                    }
                    
                    this.validateRequest()
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
                            this.$router.push({ name: 'dashboard' }).then(() => { this.$router.go() })
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
                let asset_ids = Object.values(this.filterIds)
                this.dataCreate = {
                    "hours": this.form.time,
                    "asset_ids" : asset_ids
                }
                // console.log(this.dataCreate)
                // this.openModal();
                // console.log(this.dataPlacements);
                try {
                    await axios.post('/loans/create', this.dataCreate)
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
            searchFunction(){
                this.dataArray = [];
                this.keyWords = this.form.search
                this.skipAsset = 0;
                this.next = 5;
                this.getAssets(this.skipAsset, this.takeAsset)
            },
            loadAllFunction(){
                this.dataArray = [];
                this.keyWords = '';
                this.form.search = '';
                this.skipAsset = 0;
                this.next = 5;
                this.getAssets(this.skipAsset, this.takeAsset)
            },
            prevFunction(){
                this.dataArray = [];
                this.skipAsset = this.skipAsset - 5;
                this.next = this.next - 5;
                this.getAssets(this.skipAsset, this.takeAsset)
            },
            nextFunction(){
                this.dataArray = [];
                this.skipAsset = this.skipAsset + 5;
                this.next = this.next + 5;
                this.getAssets(this.skipAsset, this.takeAsset)
            },
            async getAssets(skip, take){
                this.errorAssets = false;
                this.isLoadingAssets = true;
                this.showAlert = false;
                let negation_ids = Object.values(this.filterIds)
                // console.log(negation_ids)
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "keyWords": this.keyWords,
                    "order": "name",
                    "condition": 0,
                    "status": 0,
                    "negation_ids": negation_ids 
                }
                try {
                    await axios.get('/assets/getAll', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data);
                        Object.keys(response.data.data.assets).forEach((item) => {
                            this.dataArray.push(
                                {
                                    "id": response.data.data.assets[item].id,
                                    "name": response.data.data.assets[item].name,
                                    "code": response.data.data.assets[item].code,
                                    "condition": response.data.data.assets[item].condition,
                                    "status": response.data.data.assets[item].status,
                                    "category_name": response.data.data.assets[item].category_name,
                                    "study_program_name": response.data.data.assets[item].study_program_name,
                                }
                            );
                        });
                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
                        // console.log(this.dataCount)
                        // if (this.windowWidth < ) {
                            
                        // }
                        this.isLoadingAssets = false;
                        // this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorAssets = true;
                            this.errorAssetsArray = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                        this.isLoadingAssets = false;
                        // this.isLoadingResponse1 = false;
                        this.buttonDisabled = false;
                        this.isLoadingContent = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorAssets = true;
                            this.errorAssetsArray = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                            this.isLoadingAssets = false;
                            // this.isLoadingResponse1 = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        } else {
                            this.errorAssets = true;
                            this.errorAssetsArray = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                }
                            ];
                            this.isLoadingAssets = false;
                            // this.isLoadingResponse1 = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        }
                    });
                    this.isLoadingContent = false;
                    this.isLoading = false;
                } catch (error) {
                    this.errorAssetsArray = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.isLoadingAssets = false;
                    this.isLoading = false;
                    // this.isLoadingResponse1 = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.errorAssets = true;
                    this.buttonDisabled = false;
                }
            },
            addSelection(id){
                // console.log(index)
                let select = this.dataArray.filter(item => item.id == id)
                Object.keys(select).forEach((item) => {
                    this.selectDataArray.push(select[item])
                    this.filterIds.push(select[item].id)
                })
                this.dataArray = this.dataArray.filter(item => item.id != id)
                // this.skipAsset = this.skipAsset - 5;
                // this.getAssets(this.skipAsset, this.takeAsset)
                // console.log(this.filterIds)
            },
            removeSelection(id){
                // let select = this.selectDataArray.filter(item => item.id == id)
                // this.dataArray.push(select[0])
                this.selectDataArray = this.selectDataArray.filter(item => item.id != id)
                this.filterIds = this.filterIds.filter(item => item != id)
                this.dataArray = []
                this.getAssets(this.skipAsset, this.takeAsset)
                // console.log(this.filterIds)
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
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            this.getAssets(this.skipAsset, this.takeAsset)
            // console.log(this.$route.query.search);
            // this.loansList();
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(typeof this.form.time)
            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>