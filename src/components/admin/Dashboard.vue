<template>
    <!-- Page Heading -->
    <div class="modal fade" id="reportModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="reportModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h5 class="text-white modal-title" id="eraseModalLabel"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> &ensp;Generate Report</h5>
                    <button :disabled="buttonDisabled" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-light">
                    <div class="card bg-success shadow w-100 mb-3 pb-2">
                        <div class="card-body mt-3">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-md text-center font-weight-bold text-light text-uppercase mb-3">
                                        Laporan transaksi peminjaman minggu lalu
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <ReportWeekly></ReportWeekly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-success shadow w-100 mb-3 pb-2">
                        <div class="card-body mt-3">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-md text-center font-weight-bold text-light text-uppercase mb-3">
                                        Laporan transaksi peminjaman per bulan
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <ReportWeekly></ReportWeekly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card bg-success shadow w-100 mb-3 pb-2">
                        <div class="card-body mt-3">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-md text-center font-weight-bold text-light text-uppercase mb-3">
                                        Laporan transaksi peminjaman per semester
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <ReportWeekly></ReportWeekly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn btn-danger" data-bs-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="this.isLoadingResponse == true" class="row d-flex align-items-center justify-content-center">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div class="my-5 spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        <!-- <div v-if="this.errorResponse == true">
            <div class="text-sm-justify row col-12 d-sm-flex align-items-center justify-content-center mb-3">
                <h3 class="h4 mb-0 text-gray-800">Tidak ada data statistik untuk saat ini</h3>
            </div>
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
                <h6 class="text-center my-3">Atau mungkin koneksi anda terganggu, silakan muat ulang!</h6>
            </div>
        </div> -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                <button type="button" data-bs-toggle="modal" data-bs-target="#reportModal" href="#" style="text-decoration: none;" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i class="fa fa-arrow-down"></i>&nbsp;Unduh Laporan
                </button>
            </div>
        
            <!-- Content Row -->
            <div class="row d-flex justify-content-evenly">
                <!-- Aset yang dipinjam -->
                <div v-if="this.isLoadingLoans == true" class="d-flex align-items-center justify-content-center col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-primary shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Banyak Aset <br> yang sedang dipinjam <br> Pekan ini
                                </div>
                                <div class="ml-2 spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-primary shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Banyak Aset <br> yang sedang dipinjam <br> Pekan ini
                                    </div>
                                    <div v-if="this.isErrorLoans" class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <h5>{{this.errorLoans.message}}</h5>
                                            <span class="text2">{{this.errorLoans.detail}}</span>
                                        </div>
                                    </div>
                                    <div v-else class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{loanPercentage}}%</div>
                                        </div>
                                        <div class="col">
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-primary" role="progressbar"
                                                    :style="this.styleLoanPercentage" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-info text-primary fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <!-- Aset yang diperbaiki -->
                <!-- <div v-if="this.isLoadingMaintenance == true" class="d-flex align-items-center justify-content-center col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-success shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Banyak Aset <br> yang sedang diperbaiki <br> Pekan ini
                                </div>
                                <div class="ml-2 spinner-border text-success" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                
                <!-- <div v-else class="col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-success shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Banyak Aset <br> yang sedang diperbaiki <br> Pekan ini
                                    </div>
                                    <div v-if="this.isErrorMaintenance" class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <h5>{{this.errorMaintenance.message}}</h5>
                                            <span class="text2">{{this.errorMaintenance.detail}}</span>
                                        </div>
                                    </div>
                                    <div v-else class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{this.maintenancePercentage}}%</div>
                                        </div>
                                        <div class="col">
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-success" role="progressbar"
                                                    :style="this.styleMaintenancePercentage" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-recycle text-success fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        
                <!-- Aset yang rusak -->
                <div v-if="this.isLoadingBroken == true" class="d-flex align-items-center justify-content-center col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-danger shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                    Banyak Aset <br> yang rusak <br> Saat ini
                                </div>
                                <div class="ml-2 spinner-border text-danger" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-danger shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                        Banyak Aset <br> yang rusak <br> Saat ini
                                    </div>
                                    <div v-if="this.isErrorBroken" class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <h5>{{this.errorBroken.message}}</h5>
                                            <span class="text2">{{this.errorBroken.detail}}</span>
                                        </div>
                                    </div>
                                    <div v-else class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{this.brokenPercentage}}%</div>
                                        </div>
                                        <div class="col">
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-danger" role="progressbar"
                                                    :style="this.styleBrokenPercentage" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-exclamation-triangle fa-2x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <!-- Aset baru -->
                <div v-if="this.isLoadingAdded == true" class="d-flex align-items-center justify-content-center col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-info shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Banyak Aset <br> baru yang ditambahkan <br> Pekan ini
                                </div>
                                <div class="ml-2 spinner-border text-info" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="col-xl-4 col-sm-6 mb-4">
                    <div class="card border-left-info shadow h-100 w-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                        Banyak Aset <br> baru yang ditambahkan <br> pekan ini
                                    </div>
                                    <div v-if="this.isErrorAdded" class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <h5>{{this.errorAdded.message}}</h5>
                                            <span class="text2">{{this.errorAdded.detail}}</span>
                                        </div>
                                    </div>
                                    <div v-else class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{addedPercentage}}%</div>
                                        </div>
                                        <div class="col">
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-info" role="progressbar"
                                                    :style="this.styleAddedPercentage" aria-valuenow="50" aria-valuemin="0"
                                                    aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fa fa-plus-circle fa-2x text-info"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import ReportWeekly from '../ReportWeekly.vue';
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoadingResponse: false,
                isLoadingLoans: false,
                isLoadingMaintenance: false,
                isLoadingBroken: false,
                isLoadingAdded: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isErrorLoans: false,
                isErrorMaintenance: false,
                isErrorBroken: false,
                isErrorAdded: false,
                loanPercentage: '',
                styleLoanPercentage: '',
                maintenancePercentage: '',
                styleMaintenancePercentage: '',
                brokenPercentage: '',
                styleBrokenPercentage: '',
                addedPercentage: '',
                styleAddedPercentage: '',
                isLoadingloanPercentage: false, 
                cursorStyle: '',
                currentYear: new Date().getFullYear(),
                currentDate: new Date().toISOString().slice(0, 10),
                weekAgo: '',
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                errorLoans: {},
                errorMaintenance: {},
                errorBroken: {},
                errorAdded: {},
                errorResponse: [],
                sessionData: [],
            }
        },
        components: {
            ReportWeekly
        },
        methods: {
            dashboard(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.cursorStyle = 'cursor: not-allowed';
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
                    // this.errorResponse = [
                    //     {
                    //         'id': 1,
                    //         'message': 'Error!', 
                    //         'detail': e,
                    //     }
                    // ];
                }
            },
            async loans(){
                try {
                    this.isLoadingLoans = true;
                    let weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate()-7);
                    weekAgo.toISOString().slice(0, 10);
                    this.weekAgo = weekAgo.toISOString().slice(0, 10);
                    // console.log("test");
                    // console.log(this.currentDate);
                    
                    // Banyak aset yg dipinjam
                    await axios.get('/loans/percentage', {params: {
                        "sleep": 0,
                        "status": "1",
                        "dateOne": this.weekAgo,
                        "dateTwo": this.currentDate
                    }})
                    .then((response) => {
                        this.styleLoanPercentage = 'width: '+response.data.data.percentage+'%;';
                        this.loanPercentage = response.data.data.percentage.toString();
                        // console.log(response);
                        // setTimeout(() => this.isLoadingLoans = false, 8000);
                    }).catch((err) => {
                        if(err.response.data.message == 'Error!'){
                            // console.log(err.response.data.message);
                            this.errorLoans = {
                                'id': 1,
                                'message': err.response.data.message,
                                'detail': err.response.data.data.error
                            }
                            this.isLoadingLoans = false;
                            this.isErrorLoans = true;
                            // this.returnLoansPercentage = true;
                            // this.isLoadingResponse = false;
                            // this.isErrorLoans = true;
                            // setTimeout(() => this.isLoadingLoans = false, 8000);
                        } else if(!err.response){
                            this.errorLoans = {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Silakan cek koneksi anda!',
                            }
                            this.isLoadingLoans = false;
                            this.isErrorLoans = true;
                            // this.errorResponseMessage.push(error);
                            // console.log(this.errorResponseMessage);
                        } else {
                            this.errorLoans = {
                                'id': 1,
                                'message': err.response.status +' '+ err.response.statusText,
                                'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                            }
                            this.isErrorLoans = true;
                            this.isLoadingLoans = false;
                        }
                    });
                    this.isLoadingLoans = false;
                    this.isLoadingResponse = false;
                } catch (error) {
                    this.isErrorLoans = true;
                }
                // this.isLoadingResponse = false;
                // setTimeout(() => this.isLoadingResponse = false, 20000);
                // console.log('test');
            },
            async maintenance(){
                try {
                    this.isLoadingMaintenance = true;
                    
                    // Banyak aset yang diperbaiki
                    await axios.get('/assets/percentage', {params: {
                        "sleep": 0,
                        "status": "2",
                        "condition": "0",
                        "dateOne": this.weekAgo,
                        "dateTwo": this.currentDate
                    }})
                    .then((response) => {
                        this.styleMaintenancePercentage = 'width: '+response.data.data.percentage+'%;';
                        this.maintenancePercentage = response.data.data.percentage.toString();
                        // console.log(this.styleLoanPercentage);
                        // setTimeout(() => this.isLoadingLoans = false, 8000);
                    }).catch((err) => {
                        if(err.response.data.message == 'Error!'){
                            // console.log(err.response.data.message);
                            this.errorMaintenance = {
                                'id': 1,
                                'message': err.response.data.message,
                                'detail': err.response.data.data.error
                            }
                            this.isErrorMaintenance = true;
                            // this.returnMainisErrorMaintenancePercentage = true;
                            // this.isLoadingResponse = false;
                            // this.isErrorMaintenance = true;
                            // setTimeout(() => this.isLoadingMainisErrorMaintenance = false, 8000);
                        } else if(!err.response){
                            this.errorMaintenance = {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Silakan cek koneksi anda!',
                            }
                            this.isErrorMaintenance = true;
                            // this.errorResponseMessage.push(error);
                            // console.log(this.errorResponseMessage);
                        } else {
                            this.errorMaintenance = {
                                'id': 1,
                                'message': err.response.status +' '+ err.response.statusText,
                                'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                            }
                            this.isErrorMaintenance = true;
                        }
                    });
                    this.isLoadingMaintenance = false;
                } catch (error) {
                    this.errorMaintenance = true;
                    this.isLoadingMaintenance = false;
                }
            },
            async broken(){
                // Banyak aset yang dalam keadaan rusak
                try {
                    this.isLoadingBroken = true;
                    await axios.get('/assets/percentage', {params: {
                        "sleep": 0,
                        "status": "0",
                        "condition": "1"
                    }})
                    .then((response) => {
                        this.styleBrokenPercentage = 'width: '+response.data.data.percentage+'%;';
                        this.brokenPercentage = response.data.data.percentage.toString();
                        // console.log(response);
                        // setTimeout(() => this.isLoadingLoans = false, 8000);
                    }).catch((err) => {
                        if(err.response.data.message == 'Error!'){
                            // console.log(err.response.data.message);
                            this.errorBroken = {
                                'id': 1,
                                'message': err.response.data.message,
                                'detail': err.response.data.data.error
                            }
                            this.isErrorBroken = true;
                            // this.returnLoansPercentage = true;
                            // this.isLoadingResponse = false;
                            // this.isErrorBroken = true;
                            // setTimeout(() => this.isLoadingLoans = false, 8000);
                        } else if(!err.response){
                            this.errorBroken = {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Silakan cek koneksi anda!',
                            }
                            this.isErrorBroken = true;
                            // this.errorResponseMessage.push(error);
                            // console.log(this.errorResponseMessage);
                        } else {
                            this.errorBroken = {
                                'id': 1,
                                'message': err.response.status +' '+ err.response.statusText,
                                'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                            }
                            this.isErrorBroken = true;
                        }
                    });
                    this.isLoadingBroken = false;
                } catch (error) {
                    this.isErrorBroken = true;
                    this.isLoadingBroken = false;
                }
            },
            async added(){
                try {
                    // Banyak aset yang ditambahkan
                    this.isLoadingAdded = true;
                    await axios.get('/assets/percentage', {params: {
                        "sleep": 0,
                        "condition": "0",
                        "dateOne": this.weekAgo,
                        "dateTwo": this.currentDate
                    }})
                    .then((response) => {
                        this.styleAddedPercentage = 'width: '+response.data.data.percentage+'%;';
                        this.addedPercentage = response.data.data.percentage.toString();
                        // console.log(this.styleLoanPercentage);
                        // setTimeout(() => this.isLoadingLoans = false, 8000);
                    }).catch((err) => {
                        if(err.response.data.message == 'Error!'){
                            // console.log(err.response.data.message);
                            this.errorAdded = {
                                'id': 1,
                                'message': err.response.data.message,
                                'detail': err.response.data.data.error
                            }
                            this.isErrorAdded = true;
                            // this.returnLoansPercentage = true;
                            // this.isLoadingResponse = false;
                            // this.isErrorLoans = true;
                            // setTimeout(() => this.isLoadingLoans = false, 8000);
                        } else if(!err.response){
                            this.isErrorAdded = true;
                            this.errorAdded = {
                                'id': 1,
                                'message': 'Error!', 
                                'detail': 'Network Error. Silakan cek koneksi anda!',
                            }
                            // this.errorResponseMessage.push(error);
                            // console.log(this.errorResponseMessage);
                        } else {
                            this.isErrorAdded = true;
                            this.errorAdded = {
                                'id': 1,
                                'message': err.response.status +' '+ err.response.statusText,
                                'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                            }
                        }
                    });
                    this.isLoadingAdded = false;
                } catch (error) {
                    this.isErrorAdded = true;
                    this.isLoadingAdded = false;
                }
            }
        },
        beforeCreate(){

        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        },
        destroyed() {
            // window.removeEventListener("resize", this.sizeHandler);
        },
        mounted(){
            setTimeout(() => this.isLoadingResponse = false, 3000);
            this.loans();
            this.maintenance();
            this.broken();
            this.added();
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            
            // console.log(this.weekAgo);
            window.scrollTo(0,0);
        }
    }
    
</script>