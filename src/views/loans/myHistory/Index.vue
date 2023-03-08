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
                    <div :class="this.windowWidth >= this.$widthPotraitPhone ? 'container-fluid':'container-fluid my-5 py-5'">
                        <!-- Page Heading -->
                        <div class="row d-flex justify-content-evenly">
                            <div v-for="item in this.dataArray" :key="item.id" class="col-sm-6 col-lg-4 my-3">
                                <div @click="route(item.name)" class="card w-100 h-100 btn text-dark shadow-lg border-bottom-primary p-3">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                            <div class="ms-2 c-details">
                                                <span></span> <h6>Peminjaman</h6>
                                            </div>
                                        </div>
                                        <div class="badge text-primary"> <span>Menu</span> </div>
                                    </div>
                                    <div class="my-2">
                                        <h3 class="heading">
                                            <i :class="item.icon"></i> &ensp;{{item.onDisplay}}
                                        </h3>
                                        <div class=" mt-3">
                                            <div class="mt-3 text-center"> 
                                                <span v-if="this.windowWidth <= this.$widthLandscapePhone" class="text2">Ketuk untuk memilih</span>
                                                <span v-else class="text2">Klik untuk memilih</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div v-if="this.errorLoans == false" class="col-12 mb-5">
                                <a @click="createLoans" href="#" style="text-decoration: none;" :class="this.windowWidth <= this.$widthPotraitPhone ? 'w-100 d-md-none btn btn-sm btn-primary shadow-sm' : 'd-none'">
                                    <i class="fa fa-paper-plane"></i>&ensp;Ajukan Peminjaman
                                </a>
                            </div> -->
                        </div>
                        <hr class="sidebar-divider bg-secondary">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <div class="row">
                                    <div class="col-12">
                                        <h6 class="m-0 font-weight-bold text-center text-primary">Riwayat Peminjaman Terakhir Anda</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div v-if="this.loansArray.length == 0">
                                    <div v-for="item in errorResponse" :key="item.id" class="row">
                                        <div v-if="this.windowWidth <= this.$widthPotraitPhone" class="col-12 d-flex justify-content-evenly">
                                            <img class="w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                        </div>
                                        <div v-else class="col-12 d-flex justify-content-evenly">
                                            <img  class="w-50 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                        </div>
                                        <div class="text-center col-12 text-sm-justify mt-3">
                                            <h3 class="h4 mb-0 text-gray-800">{{item.message}}</h3>
                                        </div>
                                        <h6 class="text-center my-3">{{item.detail}}</h6>
                                    </div>
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
                                                <tr v-for="item in errorResponse" :key="item.id" :class="showAlert == true">
                                                    <td class="align-middle text-center" colspan="4">
                                                        <b>{{item.message}}</b>
                                                        <p>{{item.detail}}</p>
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
                                        <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'col-12':'d-none'">
                                            <div class="card btn text-dark text-justify shadow-lg border-bottom-info p-3 mb-4">
                                                <div class="d-flex justify-content-between">
                                                    <div class="d-flex flex-row align-items-center">
                                                        <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                                        <div class="ms-2 c-details">
                                                            <h6 class="mb-0">Data Peminjaman</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="my-2">
                                                    <h3 class="heading">{{item.message}}</h3>
                                                    <div class="mt-3">
                                                        <div class="row my-3 py-2">
                                                            <div class="col-12 py-2">
                                                                <p>{{item.detail}}</p>
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
                        <!-- <Maintenance v-if="this.$roles != 'Member'"></Maintenance> -->

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
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                sidebarShow: true,
                imageLogo: false,
                currentYear: new Date().getFullYear(),
                currentDate: new Date().getDate(),
                currentTime: new Date().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                errorResponse: [],
                sessionData: [],
                dataArray: [
                    {
                        "id": 1,
                        "name": "myLoans.request",
                        "onDisplay": "Request",
                        "icon": "fa fa-arrow-up"
                    },
                    {
                        "id": 2,
                        "name": "myLoans.active",
                        "onDisplay": "Aktif",
                        "icon": "fa fa-hourglass-start"
                    },
                    {
                        "id": 3,
                        "name": "myLoans.done",
                        "onDisplay": "Selesai",
                        "icon": "fa fa-check"
                    },
                    {
                        "id": 4,
                        "name": "myLoans.reject",
                        "onDisplay": "Ditolak",
                        "icon": "fa fa-times"
                    },
                ],
                loansArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        components: {
            Sidebar,
            Navbar,
            Footer,
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            async loansList(){
                this.dataLoans = {
                    "condition": "0",
                    "skip": 0,
                    "take": 3,
                    "orderDate": "DESC",
                    "loaner_id": this.$session.id
                }
                try {
                    await axios.get('/loans/getAll', {params: this.dataLoans})
                    .then((response) => {
                        // console.log(response);
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
                                    "return_id": response.data.data.loans[item].return_id,
                                    "loaner_id": response.data.data.loans[item].loaner_id,
                                    "loaner_name": response.data.data.loans[item].loaner_name,
                                    "lender_id": response.data.data.loans[item].lender_id,
                                    "lender_name": response.data.data.loans[item].lender_name,
                                    "recipient_id": response.data.data.loans[item].recipient_id,
                                    "recipient_name": response.data.data.loans[item].recipient_name,
                                    "due_date_time": getDueDateTime,
                                    "date": date,
                                    "difference": difference
                                }
                            );
                            // console.log(new Date().getTime() == getDueDateTime)
                        });
                        // console.log(this.dataArray);
                        this.isLoadingContent = false;
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
                this.isLoading = false;
            },
            detailRouter(id){
                // console.log("Teset")
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
                            this.$router.push({ name: 'myLoans.details', query: {data: data} }).then(() => { this.$router.go() })
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
            returnRouterFunction(id){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                // this.closeModal();
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
            createLoans(){
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
                            this.$router.push({ name: 'loans.create' }).then(() => { this.$router.go() })
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
            route(name){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
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
                            this.$router.push({ name: name }).then(() => { this.$router.go() })
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
            dashboard(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
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
            }
        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
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
            // console.log(this.$router.options.history.state.back === '/login');
            this.loansList();
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 5000);
        },
    }
</script>