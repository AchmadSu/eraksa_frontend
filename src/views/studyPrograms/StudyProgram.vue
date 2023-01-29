<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
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
                        <h1 class="h3 mb-5 text-gray-800">Kelola Data Program Studi</h1>

                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="m-0 font-weight-bold text-primary">Data Program Studi</h6>
                                    </div>
                                    <div class="col-6">
                                        <h6 v-if="this.dataCount != 0" class="text-right font-weight-bold m-0 text-primary">Total Data: {{this.dataCount}}</h6>
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
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'col-6':'d-none'">
                                                &nbsp;
                                            </div>
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'col-6 pb-3':'col-12 pb-3'">
                                                <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search" @submit.prevent="searchFunction">
                                                    <div class="input-group">
                                                        <input type="text" v-model="form.search" name="search" class="form-control input-lg bg-light" placeholder="Cari Program Studi"
                                                            aria-label="Search" aria-describedby="basic-addon2">
                                                        <div class="input-group-append">
                                                            <button @click="searchFunction(this.search)" :disabled="buttonDisabled" class="btn btn-primary" type="button">
                                                                <i class="fa fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <table v-if="this.windowWidth > this.$widthLandscapePhone" class="table table-hover table-bordered border-" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr class="text-center">
                                                    <th class="align-middle">No</th>
                                                    <th class="align-middle">Nama</th>
                                                    <th class="align-middle" colspan="2">
                                                        <button :disabled="buttonDisabled" class="btn w-75 btn-success">
                                                            <i class="fa fa-plus"></i> &ensp; Tambah Data
                                                        </button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in this.studyProgramArray" :key="item.id">
                                                    <td class="text-center">{{item.row}}</td>
                                                    <td><b>{{item.name}}</b></td>
                                                    <td class="text-center">
                                                        <button :disabled="buttonDisabled" v-if="this.windowWidth >= this.$widthComputer" class="btn w-75 btn-primary">
                                                            <i class="fa fa-pencil"></i> &ensp; Ubah data
                                                        </button>
                                                        <button :disabled="buttonDisabled" v-else class="btn w-75 btn-primary">
                                                            Ubah data
                                                        </button>
                                                    </td>
                                                    <td class="text-center">
                                                        <button :disabled="buttonDisabled" v-if="this.windowWidth >= this.$widthComputer" class="btn w-75 btn-danger">
                                                            <i class="fa fa-trash-o"></i> &ensp; Hapus data
                                                        </button>
                                                        <button :disabled="buttonDisabled" v-else class="btn w-75 btn-danger">
                                                            Hapus data
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr v-for="item in errorResponse" :key="item.id" :class="showAlert == true">
                                                    <td class="text-center" colspan="4">
                                                        <b>{{item.message}}</b>
                                                        <p>{{item.detail}}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div v-else class="row">
                                            <div v-for="item in this.studyProgramArray" :key="item.id" class="col-sm-6 col-lg-4">
                                                <div class="card btn text-dark text-justify shadow-lg border-bottom-info p-3 mb-4">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="d-flex flex-row align-items-center">
                                                            <div class="icon"> <i class="fa fa-graduation-cap"></i> </div>
                                                            <div class="ms-2 c-details">
                                                                <h6 class="mb-0">Data Prodi</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="my-2">
                                                        <h3 class="heading">{{item.name}}</h3>
                                                        <div class="mt-3">
                                                            <div class="row my-3 py-2">
                                                                <div class="col-12 py-2">
                                                                    <button :disabled="buttonDisabled" class="btn w-100 btn-primary rounded-0">
                                                                        <i class="fa fa-pencil"></i> &ensp; Ubah data
                                                                    </button>
                                                                </div>
                                                                <div class="col-12 w-100 text-center py-2">
                                                                   ATAU
                                                                </div>
                                                                <div class="col-12 py-2">
                                                                    <button :disabled="buttonDisabled" class="btn w-100 btn-danger rounded-0">
                                                                        <i class="fa fa-trash-o"></i> &ensp; Hapus
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="this.next != 0 && this.next < this.dataCount && this.isLoadingResponse == false" class="row my-lg-3 my-5">
                                            <div class="col-12 text-center">
                                                <button :disabled="buttonDisabled" @click="nextFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    Muat lebih banyak
                                                </button>
                                            </div>
                                            <div class="col-12 text-center">
                                                <button :disabled="buttonDisabled" v-if="this.isLoadingResponse == true" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Memuat...
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="this.$route.query.search != NULL" class="row my-lg-3 my-5">
                                            <div v-if="this.isLoadingResponse == false" class="col-12 text-center">
                                                <button :disabled="buttonDisabled" @click="backFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    Muat seluruh data
                                                </button>
                                            </div>
                                            <div class="col-12 text-center">
                                                <button :disabled="buttonDisabled" v-if="this.isLoadingResponse == true" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
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
                <Footer></Footer>
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
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                sidebarShow: true,
                imageLogo: false,
                name: this.$route.query.search,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                no: 0,
                prev: 0,
                next: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    search: '',
                },
                search: '',
                errorResponse: [],
                successResponse: [],
                sessionData: [],
                studyProgramArray: [],
                maintenanceArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
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
                    this.search = val.search;
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
            nextFunction(){
                this.isLoadingResponse = true;
                this.buttonDisabled = true;
                if(this.windowWidth >= this.$widthComputer){
                    this.next = this.next+10;
                } else {
                    this.next = this.next+4;
                }
                this.studyProgramList(this.next, this.next)
            },
            backFunction(){
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
                            this.$router.push({ name: 'manageStudyPrograms' }).then(() => { this.$router.go() })
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
            searchFunction(search){
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
                            this.$router.push({ name: 'manageStudyPrograms', query: {search: search} }).then(() => { this.$router.go() })
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
            async studyProgramList(skip, take){
                    // console.log('test1');
                this.showAlert = false;
                this.dataStudyProgram = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "name": this.name
                }
                try {
                    await axios.get('/studyPrograms/getAll', {params: this.dataStudyProgram})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.study_programs).forEach((item) => {
                            this.no++;
                            this.studyProgramArray.push(
                                {
                                    "id": response.data.data.study_programs[item].id,
                                    "row": this.no,
                                    "name": response.data.data.study_programs[item].name,
                                }
                            );
                        });
                        this.dataCount = response.data.data.count;
                        // console.log(this.studyProgramArray.length);
                        this.isLoadingResponse = false;
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
            dashboard(){
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
            console.table(this.studyProgramArray)
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
            } else if (this.$roles !== "Super-Admin"){
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
            // console.log(this.$route.query.search);
            // this.loansList();
            if(this.windowWidth >= this.$widthComputer){
                this.studyProgramList(0, 10);
            } else {
                this.studyProgramList(0, 4);
            } 
            // console.table(this.studyProgramArray)
            window.scrollTo(0,0);
            // console.log(this.studyProgramArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
        },
    }
</script>