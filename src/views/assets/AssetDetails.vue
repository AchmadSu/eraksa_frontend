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
                                        <div v-if="isLoadingImage == true" class="d-md-none d-block col-sm-12 text-center my-5">
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
                                        <div v-else class="col-sm-12 text-center d-md-none d-block">
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
                                                                                        <h5 class="text-primary" v-if="this.detailObject.status == '0' && this.detailObject.condition == '0'">Tersedia</h5>
                                                                                        <h5 class="text-danger" v-if="this.detailObject.status == '0' && this.detailObject.condition == '1'">Tidak Tersedia</h5>
                                                                                        <h5 class="text-success" v-else-if="this.detailObject.status == '1' && this.detailObject.condition == '0'">Sedang Dipinjam</h5>
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
                                                                                <div :class="this.detailObject.status == '0' && this.detailObject.condition == '1' ? 'card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-danger p-3':'card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-info p-3'">
                                                                                    <div class="d-flex justify-content-between">
                                                                                        <div class="d-flex flex-row align-items-center">
                                                                                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                                                                                            <div class="ms-2 c-details">
                                                                                                <span>Kategori Aset</span> <h6>{{this.detailObject.category_name}}</h6>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div v-if="this.detailObject.status == '0' && this.detailObject.condition == '0'" class="badge text-primary">
                                                                                            <span>
                                                                                                TERSEDIA
                                                                                            </span>
                                                                                        </div>
                                                                                        <div v-if="this.detailObject.status == '0' && this.detailObject.condition == '1'" class="badge text-danger">
                                                                                            <span>
                                                                                                RUSAK
                                                                                            </span>
                                                                                        </div>
                                                                                        <div v-if="this.detailObject.status == '1' && this.detailObject.condition == '0'" class="badge text-success">
                                                                                            <span>
                                                                                                DIPINJAM
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="my-2">
                                                                                        <h5 class="heading text-left">
                                                                                            {{this.detailObject.name}}
                                                                                        </h5>
                                                                                        <p>
                                                                                            {{this.detailObject.code}} <br>
                                                                                            Kondisi: 
                                                                                            <template v-if="this.detailObject.condition == '0'">
                                                                                                Optimal
                                                                                            </template>
                                                                                            <template v-else-if="this.detailObject.condition == '1'">
                                                                                                Rusak
                                                                                            </template>
                                                                                        </p>
                                                                                        <div class=" mt-3">
                                                                                            <div class="mt-3 text-left"> 
                                                                                                <span class="text2">Pemilik: <br> {{this.detailObject.study_program_name}}</span><br>
                                                                                                <span class="text2">{{this.detailObject.placement_name}}</span>
                                                                                            </div>
                                                                                        </div>
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
                                        </div>
                                        <div v-if="$roles == 'Super-Admin'" class="row my-4">
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'd-none':'col-4'">
                                                &nbsp;
                                            </div>
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                                <button @click="downloadFunction(this.detailObject.code)" :disabled="buttonDisabled" class="btn btn-success w-100">
                                                    <i class="fa fa-download"></i>&ensp; Unduh Rincian
                                                </button>
                                            </div>
                                            <p class="text-center mt-3">Rincian yang diunduh menyesuaikan dengan tabel riwayat peminjaman aset</p>
                                        </div>
                                        <div v-else-if="$roles == 'Admin' && $session.study_program_id == this.detailObject.study_program_id" class="row my-4">
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'd-none':'col-4'">
                                                &nbsp;
                                            </div>
                                            <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                                                <button @click="downloadFunction(this.detailObject.code)" :disabled="buttonDisabled" class="btn btn-success w-100">
                                                    <i class="fa fa-download"></i>&ensp; Unduh Rincian
                                                </button>
                                            </div>
                                            <p class="text-center mt-3">Rincian yang diunduh menyesuaikan dengan tabel riwayat peminjaman aset</p>
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
                        <AssetsHistory v-if="this.$roles == 'Super-Admin'" :dataId="this.detailObject.id">
                        </AssetsHistory>
                        <AssetsHistory v-else-if="this.$roles == 'Admin' && this.$session.study_program_id == this.detailObject.study_program_id" :dataId="this.detailObject.id">
                        </AssetsHistory>
                    </div>
                    <!-- /.container-fluid -->
                </div>
                <!-- End of Main Content -->
    
                <!-- Footer -->
                <Footer v-if="this.windowWidth >= this.$widthPotraitPhone" class="bottom-0"></Footer>
                <Footer v-else class="w-100 bottom-0"></Footer>   
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
    import AssetsHistory from '../../components/AssetsHistory.vue';
    
    // import Dashboard from '../components/admin/Dashboard.vue';
    // import Maintenance from '../components/admin/Maintenance.vue';
    import Footer from '../../components/Footer.vue';
    import { useRouter } from 'vue-router'
    import 'jspdf-autotable'
    import jsPDF from 'jspdf'
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
                isLoadingDownload: true,
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
            Footer,
            AssetsHistory
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
            downloadFunction(name){
                const element1 = document.getElementById("primaryTable");
                let clonedElement1 = element1.cloneNode(true);
                const element2 = document.getElementById("dataTable");
                let clonedElement2 = element2.cloneNode(true);
                const element3 = document.getElementById("head");
                let clonedElement3 = element3.cloneNode(true);
                const element4 = document.getElementById("signatureAssetsHistory");
                let clonedElement4 = element4.cloneNode(true);
                $(clonedElement1).css("display", "block");
                $(clonedElement2).css("display", "block");
                $(clonedElement3).css("display", "block");
                $(clonedElement4).css("display", "block");
                // htmlToImage.toJpeg(document.getElementById("target"), { quality: 1 })
                // const imgData = dataUrl
                const pdf = new jsPDF("p", "pt", "a4")
                pdf.setFont("Montserrat");
                // const imgProps= pdf.getImageProperties(imgData);
                // let heightLeft = imgProps.height;
                // const pdfWidth = pdf.internal.pageSize.getWidth();
                // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                // let pageHeight= pdf.internal.pageSize.height;
                // let position = 0;
                // heightLeft -= pdfHeight;
                // console.log("Test")
                pdf.autoTable({
                    html: '#primaryTable',
                    theme: 'plain',
                })
                // pdf.addImage(imgData, 'PNG', 40, pdfHeight+20, 80, 80);
                pdf.addPage();
                pdf.autoTable({
                    html: '#dataTable',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.autoTable({
                    html: '#signatureAssetsHistory',
                    theme: 'plain',
                })
                pdf.save('ERAKSA_assetDetails_'+name+'.pdf')
                clonedElement1.remove();
                clonedElement2.remove();
                clonedElement3.remove();
                clonedElement4.remove();
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
            // console.log(window.atob(this.id));
            this.detailFunction(this.id);
            // console.log(this.$refs);
            // this.dataArray.filter((index) => index !== 1 )

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>