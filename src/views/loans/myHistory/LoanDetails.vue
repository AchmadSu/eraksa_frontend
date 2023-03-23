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
                        <div class="container-fluid">
                            <!-- DataTales Example -->
                            <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'container my-5 p-5 shadow-lg bg-body rounded'">
                                <div v-if="this.detailObject.loaner_id == this.$session.id" class="row">
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
                                                DETAIL PEMINJAMAN
                                            </h3>
                                        </div>
                                        <form class="form needs-validation" id="app" novalidate>
                                            <div class="py-lg-4 py-md-0 py-sm-1">
                                                <div class="row d-flex justify-content-evenly my-sm-5 my-md-3">
                                                    <div class="col-12">
                                                        <div class="card w-100 h-100 btn text-dark text-justify p-3">
                                                            <div class="my-2">
                                                                <!-- <template v-if="this.windowWidth > $widthPotraitPhone"> -->
                                                                    <table id="primaryTable" class="d-none d-md-block table table-sm table-borderless table-responsive">
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
                                                                                    <h5>Rincian Peminjaman</h5>
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
                                                                                        <template v-else>
                                                                                            NIDN
                                                                                        </template>
                                                                                    </h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.loaner_code}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <template v-if="this.detailObject.status != '0'">
                                                                                <tr>
                                                                                    <td class="align-middle">
                                                                                        <h5>Dikonfirmasi oleh</h5>
                                                                                    </td>
                                                                                    <td class="align-middle">
                                                                                        <h5>{{this.detailObject.lender_name}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle">
                                                                                        <h5>
                                                                                            <template v-if="this.detailObject.lender_code_type == '0'">
                                                                                                NIM
                                                                                            </template>
                                                                                            <template v-else>
                                                                                                NIDN
                                                                                            </template>
                                                                                        </h5>
                                                                                    </td>
                                                                                    <td class="align-middle">
                                                                                        <h5>{{this.detailObject.lender_code}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                            </template>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Status</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5 v-if="this.detailObject.status == '0'"> Menunggu Konfirmasi</h5>
                                                                                    <h5 class="text-primary" v-else-if="this.detailObject.status == '1' && this.currentTime <= this.detailObject.due_date_time"> Aktif</h5>
                                                                                    <h5 class="text-danger" v-else-if="this.detailObject.status == '1' && this.currentTime > this.detailObject.due_date_time"> Overdue</h5>
                                                                                    <h5 class="text-danger" v-else-if="this.detailObject.status == '2'"> Ditolak</h5>
                                                                                    <h5 class="text-success" v-else-if="this.detailObject.status == '3'"> Selesai</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Waktu Mulai</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.date}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Tenggat Waktu</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.due_date}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>Periode</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{this.detailObject.difference}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table class="d-none d-md-block table table-sm table-borderless">
                                                                        <thead>
                                                                            <tr>
                                                                                <td colspan="2">
                                                                                    <h4>Rincian Aset</h4>
                                                                                </td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>
                                                                                        <ol>
                                                                                            <li v-for="item, index in selectDataArray" :key="item.id">
                                                                                                {{item.name}} ({{ item.code }})
                                                                                            </li>
                                                                                        </ol>
                                                                                    </h5>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table id="targetTable" class="d-none table table-sm table-borderless">
                                                                        <thead>
                                                                            <tr>
                                                                                <td colspan="5">
                                                                                    <h4>Rincian Aset</h4>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="align-middle">
                                                                                    <h5>No</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>Nama Aset</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>Kode</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>Kategori</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>Prodi</h5>
                                                                                </td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr v-for="item, index in selectDataArray" :key="item.id">
                                                                                <td class="align-middle">
                                                                                    <h5>{{index+1}}</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{item.name}}</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{item.code}}</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{item.category_name}}</h5>
                                                                                </td>
                                                                                <td class="align-middle">
                                                                                    <h5>{{item.study_program_name}}</h5>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                <!-- </template> -->
                                                                <!-- <template v-else> -->
                                                                    <div class="row d-flex justify-content-evenly mb-5 d-block d-md-none">
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
                                                                                                {{this.detailObject.loaner_name}}
                                                                                            </b>
                                                                                            Dikonfirmasi oleh:
                                                                                            <b>
                                                                                                {{this.detailObject.lender_name}}
                                                                                            </b>
                                                                                            <br>
                                                                                            Status:
                                                                                                <template v-if="this.detailObject.status == '0'">
                                                                                                    <b>Menunggu Konfirmasi</b>
                                                                                                </template> 
                                                                                                <template v-if="this.detailObject.status == '1' && this.currentTime <= this.detailObject.due_date_time">
                                                                                                    <b class="text-primary">Aktif</b>
                                                                                                </template> 
                                                                                                <template v-else-if="this.detailObject.status == '1' && this.currentTime > this.detailObject.due_date_time">
                                                                                                    <b class="text-danger">Overdue</b>
                                                                                                </template> 
                                                                                                <template v-if="this.detailObject.status == '2'">
                                                                                                    <b>Ditolak</b>
                                                                                                </template> 
                                                                                                <template v-if="this.detailObject.status == '3'">
                                                                                                    <b class="text-success">Ditolak</b>
                                                                                                </template> 
                                                                                            <br>
                                                                                            Mulai: <br> <b>{{ this.detailObject.date }}</b>
                                                                                            <br>
                                                                                            Tenggat: <br> <b>{{ this.detailObject.due_date }}</b>
                                                                                            <br>
                                                                                            Periode: <b>{{ this.detailObject.difference }}</b>
                                                                                            <br>
                                                                                            <b>Rincian Aset</b> <br>
                                                                                            <ol>
                                                                                                <li v-for="item in selectDataArray">
                                                                                                    {{ item.name }} ({{ item.code }}) <br>
                                                                                                </li>
                                                                                            </ol>
                                                                                        </p>
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                <!-- </template> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'text-start alert alert-warning alert-dismissible my-3 text-center' : 'd-none'" role="alert">
                                                    <strong> <font-awesome-icon icon="fa-solid fa-triangle-exclamation" /> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                    <a @click="setAlert" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="row my-4 d-flex justify-content-center">
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                                <!-- <Letter id="targetPdf" :hidden="isHidden" :dataId="this.detailObject.id">
                                                </Letter> -->
                                                <button type="button" @click="downloadLoanDetail(this.detailObject.code)" :disabled="buttonDisabled" class="btn btn-primary w-100">
                                                    <i class="fa fa-download"></i>&ensp;Unduh Rincian Peminjaman
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="this.detailObject.status == '0'" class="row my-4 d-flex justify-content-center">
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                                <button @click="updateFunction(this.detailObject.id)" :disabled="buttonDisabled" class="btn btn-success w-100">
                                                    Ubah Permintaan Peminjaman&ensp; <i class="fa fa-pencil"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="this.detailObject.status == '3'" class="row my-4 d-flex justify-content-center">
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                                <button @click="returnRouterFunction(this.detailObject.return_id)" :disabled="buttonDisabled" class="btn btn-success w-100">
                                                    Lihat Rincian Pengembalian&ensp; <i class="fa fa-check-square-o"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div :class="this.detailObject.loaner_id == this.$session.id ? 'd-none':'row mh-100'">
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
                                    <h3 class="text-center my-3">Data Tidak Ditemukan</h3>
                                    <p class="text-center my-3">Permintaan tidak dapat dilakukan</p>
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
                        <!-- <Letter :dataId="this.detailObject.id"></Letter> -->
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
    import Sidebar from '../../../components/Sidebar.vue';
    import Navbar from '../../../components/Navbar.vue';
    // import Dashboard from '../components/admin/Dashboard.vue';
    // import Maintenance from '../components/admin/Maintenance.vue';
    import Footer from '../../../components/Footer.vue';
    // import Letter from './Letter.vue';
    import { useRouter } from 'vue-router'
    // import HTML2PDF from 'html2pdf.js'
    import axios from 'axios'
    import 'jspdf-autotable'
    import jsPDF from 'jspdf'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                isTyping: false,
                isHidden: true,
                checkName: false,
                radioEnabled: true,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingAssets: false,
                isLoadingDemand: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                currentYear: new Date().getFullYear(),
                currentTime: new Date().getTime(),
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
                form: {
                    radio: '',
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
                successDemandResponse: [],
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
                submitEnabled: true,
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
            openDemandModal() {
                // console.log("test")
                $('#demandModal').modal('show')
            },
            closeModal() {
                // console.log("test")
                $('#successModal').modal('hide')
            },
            closeDemandModal() {
                // console.log("test")
                $('#demandModal').modal('hide')
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
                        // this.lastPath = this.$router.options.history.state.back
                        setTimeout(() => {
                            this.$router.push({ name: "loans.myHistory" }).then(() => { this.$router.go() })
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
            downloadLoanDetail(name){
                this.isLoadingResponse2 = true;
                // this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.closeModal();
                const element1 = document.getElementById("primaryTable");
                const element2 = document.getElementById("targetTable");
                let clonedElement1 = element1.cloneNode(true);
                let clonedElement2 = element2.cloneNode(true);
                $(clonedElement1).css("display", "block");
                $(clonedElement2).css("display", "block");

                const pdf = new jsPDF("p", "pt", "a4")
                pdf.setFont("Times New Roman");
                pdf.autoTable({
                    html: '#primaryTable',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#targetTable',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.save('ERAKSA_myLoanDetails_'+name+'.pdf')
                clonedElement1.remove();
                clonedElement2.remove();
                this.isLoadingResponse2 = false;
                // this.setProgress = false;
                this.isLoadingRouter = false;
                this.secondaryButtonDisabled = false;
                this.submitEnabled = false;
                this.buttonDisabled = false;
            },
            returnRouterFunction(id){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.closeModal();
                let data = window.btoa(id);
                // console.log(data);
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
                            this.$router.push({ name: 'myLoans.returnDetails', query: {data: data} }).then(() => { this.$router.go() })
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
            updateFunction(id){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                let data = window.btoa(id);
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
                            this.$router.push({ name: 'loans.update', query: {data: data} }).then(() => { this.$router.go() })
                        }, 3000);
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
                    await axios.get('/loans/detail/'+ data)
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
                            "due_date_time": getDueDateTime,
                            "return_id": response.data.data.loans.return_id,
                            "loaner_id": response.data.data.loans.loaner_id,
                            "loaner_name": response.data.data.loans.loaner_name,
                            "loaner_code_type": response.data.data.loans.loaner_code_type,
                            "loaner_code": response.data.data.loans.loaner_code,
                            "lender_id": response.data.data.loans.lender_id,
                            "lender_name": response.data.data.loans.lender_name,
                            "lender_code_type": response.data.data.loans.lender_code_type,
                            "lender_code": response.data.data.loans.lender_code,
                            "difference": difference,
                        };
                        // console.log(this.detailObject.loaner_id)
                        // console.log(this.$session.id)
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