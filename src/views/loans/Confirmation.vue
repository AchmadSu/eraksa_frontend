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
                        <div class="modal fade" id="confirmModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="confirmModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header bg-primary">
                                        <h5 class="text-white modal-title" id="eraseModalLabel"><i class="fa fa-question-circle" aria-hidden="true"></i>&ensp;Konfirmasi Permintaan Peminjaman</h5>
                                        <button :disabled="buttonDisabled" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="text-start text-primary ml-3 alert alert-dismissible" role="alert">
                                            <strong> Apakah anda yakin akan mengonfirmasi peminjaman aset transaksi ini? Konfirmasi tidak dapat dibatalkan</strong> <br/> 
                                        </div>
                                        <div v-for="item in errorResponse" :key="item.id" :class="showAlertError == true ? 'text-start mt-3 alert alert-warning alert-dismissible' : 'd-none'" role="alert">
                                            <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button :disabled="buttonDisabled" type="button" class="mr-4 mr-lg-3 btn btn-light" data-bs-dismiss="modal">Batal</button>
                                        <button v-if="this.isLoadingResponse == false" :disabled="buttonDisabled" @click="confirmFunction" type="button" class="btn btn-primary">Konfirmasi</button>
                                        <button :disabled="buttonDisabled" v-if="this.isLoadingResponse" class="btn btn-primary">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Memuat...
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                KONFIRMASI PERMINTAAN PEMINJAMAN
                                            </h3>
                                        </div>
                                        <form class="form needs-validation" id="app" novalidate>
                                            <div class="py-lg-4 py-md-0 py-sm-1">
                                                <div class="row d-flex justify-content-evenly my-sm-5 my-md-3">
                                                    <div class="col-12">
                                                        <div class="card w-100 h-100 btn text-dark text-justify p-3">
                                                            <div class="my-2">
                                                                <template v-if="this.windowWidth > $widthPotraitPhone">
                                                                    <table class="table table-sm table-borderless">
                                                                        <thead>
                                                                            <tr>
                                                                                <th colspan="2">
                                                                                    <h3 class="heading text-left">{{this.detailObject.code}}</h3>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="align-middle" colspan="2">
                                                                                    <h5>Rincian Permintaan</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Nama Peminjam</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.loaner_name}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>
                                                                                        <template v-if="this.detailObject.loaner_code_type == '0'">
                                                                                            NIM
                                                                                        </template>
                                                                                        <template v-else-if="this.detailObject.loaner_code_type == '1'">
                                                                                            NIDN
                                                                                        </template>
                                                                                        <template v-else-if="this.detailObject.loaner_code_type == '2'">
                                                                                            NIP
                                                                                        </template>
                                                                                    </h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.loaner_code}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Status</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5 v-if="this.detailObject.status == '0'"> Menunggu Konfirmasi</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Waktu Peminjaman</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.date}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Deadline Pengembalian</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.due_date}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Lama Peminjaman</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.difference}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table class="table table-sm table-borderless">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Rincian Aset</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <ol>
                                                                                        <h5>
                                                                                            <li v-for="item, index in selectDataArray" :key="item.id">
                                                                                                <template v-if="this.windowWidth > $widthLandscapePhone">
                                                                                                    <template v-if="item.name.length+item.code.length < 60">
                                                                                                        {{ item.name }} ({{ item.code }}) <br>
                                                                                                    </template>
                                                                                                    <template v-else>
                                                                                                        {{ (item.name+' ('+item.code).substring(0,60)+"..."}} <br>
                                                                                                    </template>
                                                                                                </template>
                                                                                                <template v-else>
                                                                                                    <template v-if="item.name.length+item.code.length < 40">
                                                                                                        {{ item.name }} ({{ item.code }}) <br>
                                                                                                    </template>
                                                                                                    <template v-else>
                                                                                                        {{ (item.name+' ('+item.code).substring(0,40)+"..."}} <br>
                                                                                                    </template>
                                                                                                </template>
                                                                                            </li>
                                                                                        </h5>
                                                                                    </ol>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </template>
                                                                <template v-else>
                                                                    <div class="row d-flex justify-content-evenly mb-5">
                                                                        <div class="col-12">
                                                                            <h6 class="heading text-center mb-3">{{this.detailObject.code}}</h6>
                                                                        </div>
                                                                        <div class="col-sm-12 my-3">
                                                                            <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-primary p-3">
                                                                                <div class="d-flex justify-content-between">
                                                                                    <div class="d-flex flex-row align-items-center">
                                                                                        <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                                                                        <div class="ms-2 c-details">
                                                                                            <span>Detail Peminjaman</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="my-2 text-left">
                                                                                    <small>
                                                                                        <p>
                                                                                            Peminjam:
                                                                                            <b>
                                                                                                <template v-if="this.detailObject.loaner_name.length > 20">
                                                                                                    {{(this.detailObject.loaner_name).substring(0,20)+"..."}}
                                                                                                </template>
                                                                                                {{this.detailObject.loaner_name}}
                                                                                            </b>
                                                                                            <br>
                                                                                            Status:
                                                                                                <template v-if="this.detailObject.status == '0'">
                                                                                                    <b>Menunggu Konfirmasi</b>
                                                                                                </template> 
                                                                                            <br>
                                                                                            Waktu Pinjam: <br> <b>{{ this.detailObject.date }}</b>
                                                                                            <br>
                                                                                            Deadline: <br> <b>{{ this.detailObject.due_date }}</b>
                                                                                            <br>
                                                                                            Lama Pinjam: <b>{{ this.detailObject.difference }}</b>
                                                                                            <br>
                                                                                            <b>Rincian Aset</b> <br>
                                                                                            <ol>
                                                                                                <li v-for="item in selectDataArray">
                                                                                                    <template v-if="item.name.length+item.code.length < 40">
                                                                                                        {{ item.name }} ({{ item.code }}) <br>
                                                                                                    </template>
                                                                                                    <template v-else>
                                                                                                        {{ (item.name+' ('+item.code).substring(0,40)+"..."}} <br>
                                                                                                    </template>
                                                                                                </li>
                                                                                            </ol>
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
                                                <div v-if="$roles == 'Super-Admin'" class="row ml-1 input-group mb-3 btn-group rounded-0 d-flex justify-content-evenly" role="group">
                                                    <input 
                                                        type="radio" 
                                                        class="btn-check" 
                                                        name="status"
                                                        value="2"
                                                        id="status2"
                                                        v-model="this.option"
                                                        :disabled="!this.radioEnabled">
                                                    <label :class="windowWidth <= $widthLandscapePhone ? 
                                                        'my-2 p-2 col-12 btn btn-outline-danger rounded-0':
                                                        'p-3 w-100 col-6 btn btn-outline-danger rounded-start'" 
                                                        for="status2"
                                                    >
                                                    <b><i class="fa fa-ban"></i> &ensp; TOLAK</b>
                                                    </label>
                                                    <input 
                                                        type="radio" 
                                                        class="btn-check" 
                                                        name="status"
                                                        value="1"
                                                        id="status1"
                                                        v-model="this.option"
                                                        :disabled="!this.radioEnabled"
                                                        >
                                                    <label :class="windowWidth <= $widthLandscapePhone ? 
                                                        'my-2 p-2 col-12 btn btn-outline-success rounded-0':
                                                        'p-3 col-6 btn btn-outline-success rounded-end'" 
                                                        for="status1"
                                                    >
                                                    <b><i class="fa fa-circle-check"></i> &ensp; SETUJU</b>
                                                    </label>
                                                </div>
                                                <div v-if="isLoadingResponse == false">
                                                    <button 
                                                        v-if="$roles == 'Super-Admin'" type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#confirmModal"
                                                        class="btn btn-primary" 
                                                        :style="this.windowWidth <= $widthLandscapePhone ? 
                                                        'width:100%;':'width:50%;'"
                                                        :disabled="!submitEnabled"
                                                    >
                                                        <i class="fa fa-paper-plane"></i> Kirim Konfirmasi
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div :class="this.loansStatus == '0' ? 'd-none':'row mh-100'">
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
                                    <h3 class="text-center my-3">Status tidak sesuai</h3>
                                    <p class="text-center my-3">Status data peminjaman bukan permintaan peminjaman. Permintaan perbaruan data tidak dapat dilakukan</p>
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
                checkName: false,
                radioEnabled: true,
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
                errorDetail: false,
                loansStatus: 0,
                keyWords: '',
                prev: 0,
                next: 5,
                intervalProgressbar: null,
                widhtStyle: '',
                option: 0,
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
                detailObject: {},
                skipAsset: 0,
                takeAsset: 5,
                username: this.$session.name,
                errorAssets: false,
                errorAssetsArray: [],
                id: this.$route.query.data,
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
            option: {
                handler: function (val) {
                    // console.log(val)
                    // let radio = val.radio
                    if(val.length > 0) {
                        // console.log(val);
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
            closeConfirmModal() {
                // console.log("test")
                $('#confirmModal').modal('hide')
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
                            this.$router.push({ name: 'manageLoans.request' }).then(() => { this.$router.go() })
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
                    "status": this.option,
                }
                // console.log(this.dataConfirm)
                // this.openModal();
                // console.log(this.dataPlacements);
                try {
                    await axios.put('/loans/confirmation', this.dataConfirm)
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
                        this.closeConfirmModal();
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
                    await axios.get('/loans/detail/'+data)
                    .then((response) => {
                        let date = new Date(response.data.data.loans.date);
                        let finalDate = date.toLocaleDateString("id");
                        // console.log(finalDate)
                        let finalTime = (date.toLocaleTimeString("id")).replace(".", ":").substring(0,5)+" WIB";
                        let difference = ''
                        let dueDate = new Date(response.data.data.loans.due_date);
                        const getDate = date.getDate();
                        const getDateTime = date.getTime();
                        const getTime = date.getHours();
                        const getDueDate = dueDate.getDate();
                        const getDueDateTime = dueDate.getTime();
                        const getDueTime = dueDate.getHours();
                        // console.log(compareDueDate);
                        if(getDate == getDueDate) {
                            difference = (getDueTime - getTime)+" Jam"
                        } else {
                            let calculate = Math.round((getDueDateTime - getDateTime) / (1000*3600*24))
                            // console.log(calculate)
                            // let calculateDays = calculate / (1000*3600*24) 
                            if (calculate < 7 && calculate > 1) {
                                difference = (calculate)+" Hari"   
                            } else if(calculate > 7 && calculate < 30) {
                                difference = (calculate/7)+" Minggu"   
                            } else if(calculate > 30){
                                difference = (calculate/30)+" Bulan"   
                            } else {
                                difference = (24 - (getTime - getDueTime))+" Jam" 
                            }
                        }
                        let finalDueDate = dueDate.toLocaleDateString("id");
                        let finalDueTime = (dueDate.toLocaleTimeString("id")).replace(".", ":").substring(0,5)+" WIB";
                        // console.log(difference)
                        this.detailObject = {
                            "id": response.data.data.loans.id,
                            "code": response.data.data.loans.code,
                            "status": response.data.data.loans.status,
                            "date": finalDate+" "+finalTime,
                            "due_date": finalDueDate+" "+finalDueTime,
                            "loaner_id": response.data.data.loans.loaner_id,
                            "loaner_name": response.data.data.loans.loaner_name,
                            "loaner_code_type": response.data.data.loans.loaner_code_type,
                            "loaner_code": response.data.data.loans.loaner_code,
                            "difference": difference,
                        };
                        // console.log(this.detailObject)
                        // this.form.time = response.data.data.hours;
                        let select = response.data.data.loan_details;
                        // console.log(select[0]['asset_id'])
                        this.loansStatus = this.detailObject.status;
                        Object.keys(select).forEach((item) => {
                            this.selectDataArray.push(
                                {
                                    "id": select[item].asset_id,
                                    "name": select[item].asset_name,
                                    "code": select[item].asset_code,
                                    "condition": select[item].asset_condition,
                                    "status": select[item].asset_status,
                                    "category_name": select[item].asset_category_name,
                                    "study_program_name": select[item].asset_study_program_name,
                                }
                            )
                            // console.log(this.selectDataArray)
                            this.filterIds.push(select[item].asset_id)
                        })
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