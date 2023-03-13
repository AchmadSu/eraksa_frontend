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
                                                        <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                                                    </div>
                                                    <button @click="backFunction" type="button" class="float-end btn btn-success">Tutup</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-flex justify-content-center">
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
                                        <div v-else class="col-sm-12 text-center">
                                            <img :src="$baseUrl+'/src/assets/img/Data_security_28.png'" :class="this.windowWidth <= $widthPotraitPhone ? 'img-fluid' : 'img-fluid w-50'" alt="...">
                                        </div>
                                        <div class="col-12 px-lg-5 text-center">
                                            <div class="input-group py-md-0 py-lg-1 d-flex justify-content-center">
                                                <h3 class="fw-bolder text-secondary">
                                                    DETAIL ASET
                                                </h3>
                                            </div>
                                            <form class="form needs-validation" id="app" novalidate>
                                                <div class="py-md-0 py-sm-1">
                                                    <div class="row d-flex justify-content-center my-sm-5 my-md-3">
                                                        <div class="col-12">
                                                            <div class="card w-100 h-100 btn text-dark text-justify p-3">
                                                                <div class="mb-2">
                                                                    <!-- <template v-if="this.windowWidth > $widthPotraitPhone"> -->
                                                                        <table id="primaryTable" class="d-none d-md-block table table-sm table-borderless table-responsive">
                                                                            <thead id="head" class="d-none">
                                                                                <tr>
                                                                                    <th colspan="2">
                                                                                        <h3 class="heading text-left">Detail Aset</h3>
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>Nama Aset</h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>{{this.detailObject.name}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>
                                                                                            Kode Aset
                                                                                        </h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>{{this.detailObject.code}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>
                                                                                            Kategori Aset
                                                                                        </h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>{{this.detailObject.category_name}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>
                                                                                            Program Studi
                                                                                        </h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>{{this.detailObject.study_program_name}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>
                                                                                            Penempatan
                                                                                        </h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>{{this.detailObject.placement_name}}</h5>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>Kondisi</h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5 class="text-primary" v-if="this.detailObject.condition == '0'">Optimal</h5>
                                                                                        <h5 class="text-danger" v-else-if="this.detailObject.condition == '1'">Rusak</h5>
                                                                                        <!-- <h5 class="text-success" v-else-if="this.detailObject.condition == '2'">Sedang Diperbaiki</h5> -->
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5>Status</h5>
                                                                                    </td>
                                                                                    <td class="align-middle px-5">
                                                                                        <h5 class="text-primary" v-if="this.detailObject.status == '0'">Tersedia</h5>
                                                                                        <h5 class="text-success" v-else-if="this.detailObject.status == '1'">Sedang Dipinjam</h5>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    <!-- </template> -->
                                                                    <!-- <template v-else> -->
                                                                        <!-- <div class="row d-flex justify-content-evenly mb-5 d-block d-md-none">
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
                                                                        </div> -->
                                                                    <!-- </template> -->
                                                                    <div v-if="this.loansArray.length <= 0" class="py-5 input-group d-flex justify-content-center">
                                                                        <h5 class="text-secondary">
                                                                            Aset ini belum memiliki riwayat peminjaman
                                                                        </h5>
                                                                    </div>
                                                                    <div v-else>
                                                                        <div v-if="this.windowWidth > this.$widthLandscapePhone" class="table-responsive">
                                                                            <table class="table table-hover table-bordered border" id="dataTable" width="100%" cellspacing="0">
                                                                                <thead>
                                                                                    <tr class="text-center">
                                                                                        <th class="align-middle">No</th>
                                                                                        <th class="align-middle">Kode</th>
                                                                                        <th class="align-middle">Status</th>
                                                                                        <th class="align-middle">Waktu Mulai</th>
                                                                                        <th class="align-middle">Tenggat Waktu</th>
                                                                                        <th class="align-middle">Periode</th>
                                                                                        <!-- <th class="align-middle">Status Peminjaman</th> -->
                                                                                        <th class="align-middle" colspan="2">Aksi</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr v-for="item, index in this.loansArray" :key="item.id">
                                                                                        <td class="align-middle text-center">{{index+1}}</td>
                                                                                        <td class="align-middle text-justify"><b>{{item.code}}</b></td>
                                                                                        <td class="align-middle text-center">
                                                                                            <template v-if="item.status == '0'">
                                                                                                <b class="text-secondary">Menunggu Konfirmasi</b>
                                                                                            </template>
                                                                                            <template v-if="item.status == '1' && this.currentTime <= item.due_date_time">
                                                                                                <b class="text-primary">Aktif</b>
                                                                                            </template>
                                                                                            <template v-if="item.status == '1' && this.currentTime > item.due_date_time">
                                                                                                <b class="text-danger">Overdue</b>
                                                                                            </template>
                                                                                            <template v-if="item.status == '2'">
                                                                                                <b class="text-danger">Ditolak</b>
                                                                                            </template>
                                                                                            <template v-if="item.status == '3'">
                                                                                                <b class="text-success">Selesai</b>
                                                                                            </template>
                                                                                        </td>
                                                                                        <td class="align-middle text-center">{{item.date_string}}</td>
                                                                                        <td class="align-middle text-center">{{item.due_date_string}}</td>
                                                                                        <td class="align-middle text-center"><b>{{item.difference}}</b></td>
                                                                                        <td :colspan="item.return_id ? '':'2'" class="align-middle text-center">
                                                                                            <button @click="detailRouter(item.id)" :disabled="buttonDisabled" class="btn w-100 btn-primary">
                                                                                                <i class="fa fa-info"></i> <br> Lihat Rincian
                                                                                            </button>
                                                                                        </td>
                                                                                        <td :class="item.return_id ? 'align-middle text-center':'d-none'">
                                                                                            <button @click="returnRouterFunction(item.return_id)" :disabled="buttonDisabled" class="btn w-100 btn-success">
                                                                                                <i class="fa fa-info"></i> <br> Lihat Rincian Pengembalian
                                                                                            </button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <div v-else class="row d-flex justify-content-evenly">
                                                                            <div v-for="item in this.loansArray" :key="item.id" class="col-sm-6 my-3">
                                                                                <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-info p-3">
                                                                                    <div class="d-flex justify-content-between">
                                                                                        <div class="d-flex flex-row align-items-center">
                                                                                            <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                                                                            <div class="ms-2 c-details">
                                                                                                <h6 class="mb-0">Data Peminjaman</h6>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="my-2">
                                                                                        <h5 class="heading text-left">{{item.code}}</h5> <br>
                                                                                        <p>
                                                                                            <big>Status: 
                                                                                                <b v-if="item.status == '0'" class="text-secondary">
                                                                                                    Menunggu Konfirmasi
                                                                                                </b>
                                                                                                <b v-if="item.status == '1' && this.currentTime <= item.due_date_time" class="text-primary">
                                                                                                    Aktif
                                                                                                </b>
                                                                                                <b v-if="item.status == '1' && this.currentTime > item.due_date_time" class="text-danger">
                                                                                                    Overdue
                                                                                                </b>
                                                                                                <b v-if="item.status == '2'" class="text-danger">
                                                                                                    Ditolak
                                                                                                </b>
                                                                                                <b v-if="item.status == '3'" class="text-success">
                                                                                                    Selesai
                                                                                                </b>
                                                                                            </big>
                                                                                            <br>
                                                                                            <big>Tanggal: {{item.date_string}}</big><br>
                                                                                            <big>Tenggat: {{item.due_date_string}}</big><br>
                                                                                            <big>Periode: <b>{{item.difference}}</b></big><br>
                                                                                        </p>
                                                                                        <div class="mt-3">
                                                                                            <div class="row my-3 py-2">
                                                                                                <div class="col-12 py-2">
                                                                                                    <button @click="detailRouter(item.id)" :disabled="buttonDisabled" class="btn w-100 btn-primary rounded-0">
                                                                                                        <i class="fa fa-info"></i> &ensp; Lihat Rincian
                                                                                                    </button>
                                                                                                </div>
                                                                                                <template v-if="item.status == '3'">
                                                                                                    <div class="col-12 w-100 text-center py-2">
                                                                                                        ATAU
                                                                                                    </div>
                                                                                                    <div class="col-12 py-2">
                                                                                                        <button @click="returnRouterFunction(item.return_id)" type="button" class="btn w-100 btn-success rounded-0">
                                                                                                            <i class="fa fa-info"></i> &ensp; Lihat Rincian Pengembalian
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </template>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
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
                checkDescription: false,
                submitEnabled: false,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingLoans: true,
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
                    placements: 'Tempat',
                    condition: 'Kondisi'
                },
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                loansArray: [],
                errorLoans: [],
                loansTotal: 0,
                categoryArray: [],
                errorCategory: [],
                categoryTotal: 0,
                placementsArray: [],
                errorPlacements: [],
                placementsTotal: 0,
                deleteArray: [],
                conditionArray:[
                    {
                        "id": 1,
                        "condition": "0",
                        "description": "Optimal"
                    },
                    {
                        "id": 2,
                        "condition": "1",
                        "description": "Rusak"
                    }
                ],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                showAlertLoans: false,
                showAlertCategory: false,
                showAlertPlacements: false,
                skipStudyProgram: 0,
                takeStudyProgram: 10,
                skipCategory: 0,
                takeCategory: 10,
                skipPlacements: 0,
                takePlacements: 10,
                successDelete: false,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png',
                id: this.$route.query.data
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
                    let condition = val.condition;
                    let validateName = this.validateName(name);

                    // console.log(!(isNaN(study_program_id)))
                    // console.log(!(isNaN(category_id)))
                    // console.log(!(isNaN(placement_id)))
                    if(validateName && !(isNaN(study_program_id)) && !(isNaN(category_id)) && !(isNaN(placement_id)) && condition != null) {
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
            openModal () {
                // console.log("test")
                $('#successModal').modal('show')
            },
            closeModal () {
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
            async detailFunction(id){
                try {
                    let data = window.atob(id)
                    await axios.get('/assets/detail/'+data)
                    .then((response) => {
                        // console.log(response.data.data)
                        this.detailObject = {
                            "id": response.data.data.id,
                            "name": response.data.data.name,
                            "code": response.data.data.code,
                            "placement_id": response.data.data.placement_id,
                            "placement_name": response.data.data.placement_name,
                            "category_id": response.data.data.category_id,
                            "category_name": response.data.data.category_name,
                            "study_program_id": response.data.data.study_program_id,
                            "study_program_name": response.data.data.study_program_name,
                            "condition": response.data.data.condition,
                            "status": response.data.data.status
                        };
                        this.form.study_programs = this.detailObject.study_program_id
                        this.form.placements = this.detailObject.placement_id
                        this.form.category_assets = this.detailObject.category_id
                        this.form.name = this.detailObject.name
                        this.form.condition = this.detailObject.condition
                        // console.log(typeof this.detailObject.placement_id)
                        // this.form.name = this.detailObject.name;
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
            },
            nextFunction(){
                this.isLoadingResponse1 = true;
                this.buttonDisabled = true;
                if(this.windowWidth > this.$widthLandscapePhone){
                    this.skip = this.skip+10;
                    this.take = 10;
                } else {
                    this.skip = this.skip+4;
                    this.take = 4;
                }
                // console.log(this.skip)
                this.getLoans(this.skip, this.take)
            },
            backFunction(){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
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
                            this.$router.push({ name: 'myLoans.active' }).then(() => { this.$router.go() })
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
            searchFunction(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
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
                        // console.log(this.searchParams);
                        setTimeout(() => {
                            this.$router.push({ name: 'myLoans.active', 
                                query: {
                                    code: this.searchCode,
                                    dateOne: this.searchDateOne,
                                    dateTwo: this.searchDateTwo,
                                    dueDateOne: this.searchDueDateOne,
                                    dueDateTwo: this.searchDueDateTwo
                                }
                            }).then(() => { this.$router.go() })
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
            async getLoans(skip, take){
                // console.log('test1');
                this.showAlert = false;
                let data = window.atob(this.id)
                this.dataObject = {
                    // "skip": skip,
                    // "take": take,
                    // "status": status,
                    // "code": this.keyCode,
                    // "dateOne": this.keyDateOne,
                    // "dateTwo": this.keyDateTwo,
                    // "dueDateOne": this.keyDueDateOne,
                    // "dueDateTwo": this.keyDueDateTwo,
                    // "loaner_id": this.$session.id,
                    // "orderDate": "DESC"
                    "asset_id": data
                }
                try {
                    await axios.get('/loans/historyAssets', {params: this.dataObject})
                    .then((response) => {
                        console.log(response.data.data.loans);
                        Object.keys(response.data.data.loans).forEach((item) => {
                            let date = new Date(response.data.data.loans[item].date);
                            let finalDate = date.toLocaleDateString("id");
                            let finalTime = (date.toLocaleTimeString("id")).replace(".", ":").substring(0,5);
                            // let finalTime = date.format("id");
                            // // finalTime = finalTime.format('hh:mm')
                            let difference = ''
                            let dueDate = new Date(response.data.data.loans[item].due_date);
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
                            let finalDueTime = (dueDate.toLocaleTimeString("id")).replace(".", ":").substring(0,5);
                            this.loansArray.push(
                                {
                                    "id": response.data.data.loans[item].id,
                                    "row": this.index++,
                                    "code": response.data.data.loans[item].code,
                                    "status": response.data.data.loans[item].status,
                                    "date_string": finalDate+" "+finalTime,
                                    "due_date_string": finalDueDate+" "+finalDueTime,
                                    "due_date_time": getDueDateTime,
                                    "date": date,
                                    "difference": difference
                                }
                            );
                            // console.log(new Date().getTime() == getDueDateTime)
                        });

                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
                        // if (this.windowWidth < ) {
                            
                        // }
                        this.isLoadingResponse = false;
                        this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
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
                        this.isLoadingResponse1 = false;
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
                            this.isLoadingResponse1 = false;
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
                            this.isLoadingResponse1 = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        }
                    });
                    this.isLoadingContent = false;
                    this.isLoading = false;
                } catch (error) {
                    this.errorResponse = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.isLoadingResponse = false;
                    this.isLoading = false;
                    this.isLoadingResponse1 = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.showAlert = true;
                    this.buttonDisabled = false;
                }
                this.isLoadingLoans = false;
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
            // console.log(window.atob(this.id));
            this.detailFunction(this.id);
            this.getLoans();
            // console.log(this.detailObject);
            // this.dataArray.filter((index) => index !== 1 )

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>