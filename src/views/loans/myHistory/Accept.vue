<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px; z-index: 10000">
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

                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="m-0 font-weight-bold text-primary">Data Peminjaman Aktif</h6>
                                    </div>
                                    <div class="col-6">
                                        <h6 class="text-right font-weight-bold m-0 text-primary">Total Data: {{this.dataCount}}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="">
                                    <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
                                        <div class="my-5 spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="row">
                                            <div :class="this.keyCode != null ||
                                                this.keyDateOne != null ||
                                                this.keyDateTwo != null ||
                                                this.keyDueDateOne != null ||
                                                this.keyDueDateTwo != null ?
                                                'col-12 pb-3':'d-none'"
                                            >
                                                <h5 class="text-center">
                                                    Menampilkan hasil pencarian untuk
                                                    <br>
                                                    <template v-if="this.keyCode != '' && this.keyCode != null">
                                                        Kode Peminjaman: {{ this.keyCode }} <br>
                                                    </template>
                                                    <template v-if="this.keyDateOne != '' && keyDateTwo == ''">
                                                        Tanggal Peminjaman: {{ new Date(this.keyDateOne).toLocaleDateString("id") }} <br>
                                                    </template>
                                                    <template v-if="this.keyDateOne != '' && keyDateTwo != ''">
                                                        Tanggal Peminjaman di antara: {{ new Date(this.keyDateOne).toLocaleDateString("id") }} s/d {{ new Date(this.keyDateTwo).toLocaleDateString("id") }} <br>
                                                    </template>
                                                    <template v-if="this.keyDueDateOne != '' && keyDueDateTwo == ''">
                                                        Tenggat: {{ new Date(this.keyDueDateOne).toLocaleDateString("id") }} <br>
                                                    </template>
                                                    <template v-if="this.keyDueDateOne != '' && keyDueDateTwo != ''">
                                                        Tenggat Peminjaman di antara: {{ new Date(this.keyDueDateOne).toLocaleDateString("id") }} s/d {{ new Date(this.keyDueDateTwo).toLocaleDateString("id") }} <br>
                                                    </template>
                                                </h5>
                                            </div>
                                            <div class="col-12 pb-3">
                                                <button :disabled="buttonDisabled" @click="backRouter" class="btn w-100 btn-secondary rounded-0">
                                                    <i class="fa fa-arrow-left"></i> &ensp;Kembali
                                                </button>
                                            </div>
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'mx-2 col-12 pb-3':'mx-2 col-12 pb-3'">
                                                <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search row">
                                                    <div class="input-group col-12">
                                                        <input type="text"
                                                            v-model="form.code"
                                                            name="search"
                                                            class="form-control input-lg bg-light"
                                                            placeholder="Cari Kode"
                                                            aria-label="Code"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <input type="text"
                                                            v-model="form.dateOne"
                                                            name="date"
                                                            :class="this.windowWidth > $widthPotraitPhone ? 'form-control input-lg bg-light':'d-none'" 
                                                            placeholder="Tanggal Awal"
                                                            aria-label="Date"
                                                            aria-describedby="basic-addon2"
                                                            onfocus="(this.type='date')"
                                                        />
                                                        <input v-if="isDateOneIsset" type="text"
                                                            v-model="form.dateTwo"
                                                            name="date"
                                                            :class="this.windowWidth > $widthPotraitPhone ? 'form-control input-lg bg-light':'d-none'" 
                                                            placeholder="Tanggal Akhir"
                                                            aria-label="Date"
                                                            aria-describedby="basic-addon2"
                                                            onfocus="(this.type='date')"
                                                        />
                                                        <input type="text"
                                                            v-model="form.dueDateOne"
                                                            name="dueDate"
                                                            :class="this.windowWidth > $widthPotraitPhone ? 'form-control input-lg bg-light':'d-none'" 
                                                            placeholder="Tenggat Awal"
                                                            aria-label="Date"
                                                            aria-describedby="basic-addon2"
                                                            onfocus="(this.type='date')"
                                                        />
                                                        <input v-if="isDueDateOneIsset" type="text"
                                                            v-model="form.dueDateTwo"
                                                            name="date"
                                                            :class="this.windowWidth > $widthPotraitPhone ? 'form-control input-lg bg-light':'d-none'" 
                                                            placeholder="Tanggal Akhir"
                                                            aria-label="Date"
                                                            aria-describedby="basic-addon2"
                                                            onfocus="(this.type='date')"
                                                        />
                                                        <div class="input-group-append">
                                                            <button @click="searchFunction" :disabled="buttonDisabled" class="btn btn-primary" type="button">
                                                                <i class="fa fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div v-if="this.dataArray.length == 0">
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
                                                            <th class="align-middle">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item, index in this.dataArray" :key="item.id">
                                                            <td class="align-middle text-center">{{index+1}}</td>
                                                            <td class="align-middle text-justify"><b>{{item.code}}</b></td>
                                                            <td class="align-middle text-center" v-if="item.status == '1' && this.currentTime <= item.due_date_time"><b class="text-primary">Aktif</b></td>
                                                            <td class="align-middle text-center" v-if="item.status == '1' && this.currentTime > item.due_date_time"><b class="text-danger">Overdue</b></td>
                                                            <td class="align-middle text-center">{{item.date_string}}</td>
                                                            <td class="align-middle text-center">{{item.due_date_string}}</td>
                                                            <td class="align-middle text-center"><b>{{item.difference}}</b></td>
                                                            <td class="align-middle text-center">
                                                                <button @click="detailRouter(item.id)" :disabled="buttonDisabled" class="btn w-100 btn-primary">
                                                                    <i class="fa fa-info"></i> <br> Lihat Rincian
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
                                                <div v-for="item in this.dataArray" :key="item.id" class="col-sm-6 my-3">
                                                    <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-info p-3">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                                                <div class="ms-2 c-details">
                                                                    <h6 class="mb-0">Data Peminjaman Aktif</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="my-2">
                                                            <h5 class="heading text-left">{{item.code}}</h5> <br>
                                                            <p>
                                                                <big v-if="item.status == '1'">
                                                                    Status: 
                                                                    <b v-if="this.currentTime <= item.due_date_time" class="text-primary">Aktif</b>
                                                                    <b v-if="this.currentTime > item.due_date_time" class="text-danger">Overdue</b>
                                                                </big>
                                                                <br>
                                                                <big>Tanggal: {{item.date_string}}</big><br>
                                                                <big>Tenggat: {{item.due_date_string}}</big><br>
                                                                <big>Periode: <b>{{item.difference}}</b></big><br>
                                                            </p>
                                                            <div class="mt-3">
                                                                <div v-if="item.status == '1'" class="row my-3 py-2">
                                                                    <div class="col-12 py-2">
                                                                        <button @click="detailRouter(item.id)" :disabled="buttonDisabled" class="btn w-100 btn-primary rounded-0">
                                                                            <i class="fa fa-info"></i> &ensp; Lihat Rincian
                                                                        </button>
                                                                    </div>
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
                                                                    <h6 class="mb-0">Data Peminjaman Aktif</h6>
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
                                            <div class="row my-lg-3 my-5">
                                                <div :class="this.dataArray.length < this.dataCount && this.isLoadingResponse1 == false ? 'col-12 text-center':'d-none'">
                                                    <button :disabled="buttonDisabled" @click="nextFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                        Muat lebih banyak
                                                    </button>
                                                </div>
                                                <div class="col-12 text-center">
                                                    <button v-if="this.isLoadingResponse1 == true" :disabled="buttonDisabled" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Memuat...
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="this.keyCode != null ||
                                            this.keyDateOne != null ||
                                            this.keyDateTwo != null ||
                                            this.keyDueDateOne != null ||
                                            this.keyDueDateTwo != null
                                            " class="row my-lg-3 my-5"
                                        >
                                            <div v-if="this.isLoadingResponse2 == false" class="col-12 text-center">
                                                <button :disabled="buttonDisabled" @click="backFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    Hapus Filter
                                                </button>
                                            </div>
                                            <div v-if="this.isLoadingResponse2 == true" class="col-12 text-center">
                                                <button :disabled="buttonDisabled" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Memuat...
                                                </button>
                                            </div>
                                        </div>
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
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                keyCode: this.$route.query.code,
                keyDateOne: this.$route.query.dateOne,
                keyDateTwo: this.$route.query.dateTwo,
                keyDueDateOne: this.$route.query.dueDateOne,
                keyDueDateTwo: this.$route.query.dueDateTwo,
                currentYear: new Date().getFullYear(),
                currentDate: new Date().getDate(),
                currentTime: new Date().getTime(),
                // today: new Date().getDate().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                skip: 0,
                take: 10,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    code: '',
                    dateOne: '',
                    dateTwo: '',
                    dueDateOne: '',
                    dueDateTwo: '',
                    loaner: '',
                },
                isDateOneIsset: false,
                isDueDateOneIsset: false,
                searchCode: '',
                searchDateOne: '',
                searchDateTwo: '',
                searchDueDateOne: '',
                searchDueDateTwo: '',
                searchLoaner: '',
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successDelete: false,
                accountIcon: this.$baseUrl+'/src/loans/img/account.png'
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
                    this.searchCode = val.code;
                    this.searchDateOne = val.dateOne;
                    this.searchDateTwo = val.dateTwo;
                    this.searchDueDateOne = val.dueDateOne;
                    this.searchDueDateTwo = val.dueDateTwo;
                    this.searchLoaner = val.loaner;
                    if(this.searchDateOne.length > 0) {
                        this.isDateOneIsset = true;
                    } else {
                        this.isDateOneIsset = false;
                    }
                    if (this.searchDueDateOne.length > 0) {
                        this.isDueDateOneIsset = true
                    } else {
                        this.isDueDateOneIsset = false
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
            backRouter(){
                // console.log("Teset")
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                // let data = window.btoa(id);
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
                            this.$router.push({ name: 'loans.myHistory' }).then(() => { this.$router.go() })
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
            detailReturnRouter(id){
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
            setSuccessClose(id){
                // console.log(id);
                this.successDelete = false;
                this.dataArray = this.dataArray.filter((item) => item.id !== id );
                this.dataCount--;
                this.successDeleteResponse = [];
            },
            nextFunction(){
                this.isLoadingResponse1 = true;
                this.buttonDisabled = true;
                this.skip = this.skip+10;
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
                const status = "1"
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "status": status,
                    "code": this.keyCode,
                    "dateOne": this.keyDateOne,
                    "dateTwo": this.keyDateTwo,
                    "dueDateOne": this.keyDueDateOne,
                    "dueDateTwo": this.keyDueDateTwo,
                    "loaner_id": this.$session.id,
                    "orderDate": "DESC"
                }
                try {
                    await axios.get('/loans/getAll', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data.loans);
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
                            this.dataArray.push(
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
            // console.log(this.take);
            // this.loansList();
            this.getLoans(this.skip, this.take);
             
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(this.dataArray.length)

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
        },
    }
</script>