<template>
    <!-- <link rel="stylesheet" type="text/css" :href="this.$baseUrl+'src/assets/css/sb-admin-2.css'"> -->
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px; z-index: 10000;">
            <div class="bg-primary progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
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
            <div class="row">
                <div v-if="windowWidth > $widthPotraitPhone" class="col-12 text-center">
                    <form class="form needs-validation" id="app" novalidate>
                        <div class="py-lg-4 py-md-0 py-sm-1">
                            <div class="row d-flex justify-content-evenly my-sm-5 my-md-3">
                                <div class="col-8">
                                    <div class="bg-light card w-100 h-100 btn text-justify rounded-0">
                                        <div id="target" class="bg-light p-5">
                                            <div class="d-flex justify-content-center input-group py-sm-3 mb-sm-3 mb-md-0 py-md-0 py-lg-1">
                                                <h3 class="fw-bolder text-secondary">
                                                    SURAT PERNYATAAN
                                                </h3>
                                            </div>
                                            <div class="my-2">
                                                <table class="table table-sm table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td class="align-middle">
                                                                <h5>Nama</h5>
                                                            </td>
                                                            <td class="align-middle">
                                                                <h5>: {{this.detailObject.loaner_name}}</h5>
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
                                                                <h5>: {{this.detailObject.loaner_code}}</h5>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-middle" colspan="2">
                                                                <h5>Dengan ini menyatakan bahwa:</h5>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-middle" colspan="2">
                                                                <h5>
                                                                    <ol class="my-2">
                                                                        <li class="my-2">Saya melakukan transaksi peminjaman aset dengan kode pinjam <br><b>{{this.detailObject.code}}</b></li>
                                                                        <li class="my-2">
                                                                            Saya melakukan peminjaman pada: 
                                                                            <ol type="a">
                                                                                <li class="my-2">Tanggal dan Waktu: {{this.detailObject.date}}</li>
                                                                                <li class="my-2">Tenggat Waktu: {{this.detailObject.due_date}}</li>
                                                                                <li class="my-2">Periode: {{this.detailObject.difference}}</li>
                                                                            </ol>
                                                                        </li>
                                                                        <li class="my-2">Saya melakukan peminjaman atas beberapa aset yang diantaranya adalah:</li>
                                                                        <table class="table table-bordered">
                                                                            <thead>
                                                                                <tr>
                                                                                    <td class="align-middle text-center">
                                                                                        No
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        Nama Aset
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        Kode Aset
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        Jenis Aset
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        Total Aset
                                                                                    </td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr v-for="item, index in selectDataArray" :key="item.id">
                                                                                    <td class="align-middle text-center">
                                                                                        {{index+1}}
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        {{item.name}}
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        {{item.code}}
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        {{item.category_name}}
                                                                                    </td>
                                                                                    <td class="align-middle text-center">
                                                                                        ....
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <li class="my-2"><b>Saya bersedia bertanggung jawab</b> apabila terdapat kerusakan dan/atau kehilangan terhadap seluruh aset yang saya pinjam</li>
                                                                    </ol>
                                                                </h5>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-middle" colspan="2">
                                                                <h5>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="d-flex justify-content-evenly">
                                                <table class="table table-borderless">
                                                    <thead>
                                                        <tr class="text-center">
                                                            <td>
                                                                <h5>
                                                                    <ul style="list-style-type:none;">
                                                                        <li>
                                                                            Disetujui Oleh,
                                                                        </li>
                                                                    </ul>
                                                                </h5>
                                                            </td>
                                                            <td>
                                                                <h5>
                                                                    <ul style="list-style-type:none;">
                                                                        <li>
                                                                            Peminjam,
                                                                        </li>
                                                                    </ul>
                                                                </h5>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr class="text-center">
                                                            <td>
                                                                <h5>
                                                                    <ul style="list-style-type:none;">
                                                                        <li>
                                                                            <QrCode 
                                                                                :value="this.detailObject.qrCode"
                                                                                size="80"
                                                                                level="H" 
                                                                            />
                                                                        </li>
                                                                    </ul>
                                                                </h5>
                                                            </td>
                                                            <td>
                                                                <h5>&nbsp;</h5>
                                                            </td>
                                                        </tr>
                                                        <tr class="text-center">
                                                            <td>
                                                                <h5 class="text-center">
                                                                    <ul style="list-style-type:none;">
                                                                        <li>
                                                                            {{this.detailObject.lender_name}}
                                                                        </li>
                                                                        <li>
                                                                            <template v-if="this.detailObject.lender_code_type == '0'">
                                                                                NIM. 
                                                                            </template>
                                                                            <template v-else>
                                                                                NIDN. 
                                                                            </template>
                                                                            {{this.detailObject.lender_code}}
                                                                        </li>
                                                                    </ul>
                                                                </h5>
                                                            </td>
                                                            <td>
                                                                <h5 class="text-center">
                                                                    <ul style="list-style-type:none;">
                                                                        <li>
                                                                            {{this.detailObject.loaner_name}}
                                                                        </li>
                                                                        <li>
                                                                            <template v-if="this.detailObject.loaner_code_type == '0'">
                                                                                NIM. 
                                                                            </template>
                                                                            <template v-else>
                                                                                NIDN. 
                                                                            </template>
                                                                            {{this.detailObject.loaner_code}}
                                                                        </li>
                                                                    </ul>
                                                                </h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="p-5">
                                            <button type="button" @click="downloadLetterFunction(this.detailObject.code)" :disabled="buttonDisabled" class="btn btn-success w-100">
                                                <i class="fa fa-download"></i>&ensp;Unduh Surat Persetujuan
                                            </button>
                                        </div>
                                        <div class="row my-4 d-flex justify-content-center">
                                            <div class="col-4">
                                                <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                                                    <i class="fa fa-arrow-left"></i>&ensp; Kembali
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div :class= "windowWidth <= $widthPotraitPhone ? 'container my-5 p-5' : 'd-none'">
                <div class="col-12">
                    <img  class="w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                </div>
                <h3 class="text-center my-3">Rasio layar tidak sesuai</h3>
                <p class="text-center my-3">Halaman ini tidak dapat dimuat dalam layar ponsel secara potrait, gunakan landscape</p>
                <div class="row my-4 d-flex justify-content-center">
                    <div :class="this.windowWidth <= $widthLandscapePhone ? 'col-12' :'col-4'">
                        <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                            <i class="fa fa-arrow-left"></i>&ensp; Kembali
                        </button>
                    </div>
                </div>
            </div>
            <Footer v-if="this.windowWidth >= this.$widthPotraitPhone" class="bottom-0"></Footer>
            <Footer v-else class="w-100 position-absolute bottom-0"></Footer>
            <a @click="toTop" class="scroll-to-top rounded" href="#">
                <i class="fa fa-arrow-up"></i>
            </a>
        </div>
    </div>
</template>
<script>
    import Sidebar from '../../components/Sidebar.vue';
    import Navbar from '../../components/Navbar.vue';
    import Footer from '../../components/Footer.vue';
    import axios from 'axios'
    import QrCode from 'qrcode.vue'
    import jsPDF from 'jspdf' 
    import html2canvas from "html2canvas"
    import * as htmlToImage from 'html-to-image'
    export default{
        // props: ['dataId'],
        // setup(props) {
        //     id = props.dataId
        // },
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
                id: this.$route.query.data,
                errorAssets: false,
                errorAssetsArray: [],
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
        components:{
            QrCode,
            Sidebar,
            Navbar,
            Footer  
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            backFunction(){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                // this.closeModal();
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
                            this.$router.push({ name: 'manageLoans.details', query:{data: this.id} }).then(() => { this.$router.go() })
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
            downloadLetterFunction(name){
                htmlToImage.toJpeg(document.getElementById("target"), { quality: 1 })
                .then(function (dataUrl) {
                    const imgData = dataUrl
                    const pdf = new jsPDF
                    const imgProps= pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save(name+'.pdf')
                    // let link = document.createElement('a');
                    // link.download = name + '.jpeg';
                    // link.href = dataUrl;
                    // link.click();
                });
            },
            async detailFunction(id){
                try {
                    let data = window.atob(id)
                    // console.log(id);
                    await axios.get('/loans/detail/'+ data)
                    .then((response) => {
                        console.log(response)
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
                            "qrCode": "http://localhost:3000/loans/details?data="+ id
                        };
                        // console.log(this.detailObject.qrCode)
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
                            // console.log("Test")
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
                            // console.log("Test")
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
            } else if (this.$roles == "Member") {
                this.$router.push({ name: "dashboard" });
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            // console.log(this.$baseUrl)
            this.detailFunction(this.id)
            if (this.$roles == 'Member') {
                this.submitEnabled = false;
            }
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