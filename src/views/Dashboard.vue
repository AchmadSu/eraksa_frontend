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
                        <div v-if="this.$roles == 'Super-Admin'">
                            <Dashboard></Dashboard>
                            <hr class="sidebar-divider bg-secondary">
                        </div>
                        <!-- Page Heading -->
                        <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h4 mb-0 text-gray-800">Aset yang dapat dipinjam</h1>
                            </div>
                            <div class="my-5 spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="this.errorLoans == true" class="text-lg-center text-sm-justify d-sm-flex align-items-center justify-content-between mb-3">
                                <h3 class="h4 mb-0 text-gray-800">Tidak ada Aset yang dapat dipinjam untuk saat ini</h3>
                            </div>
                            <div v-else class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h4 mb-0 text-gray-800">Aset yang dapat dipinjam</h1>
                                <a href="#" style="text-decoration: none;" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i class="fa fa-paper-plane"></i>&ensp;Ajukan Peminjaman
                                </a>
                            </div>
                            <div class="row" v-if="this.errorLoans == true">
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
                            <div class="row">
                                <div v-for="item in this.loansArray" :key="item.id" class="col-sm-6 col-lg-4 my-3">
                                    <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-primary p-3">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div class="icon"> <i class="fa fa-cube"></i> </div>
                                                <div class="ms-2 c-details">
                                                    <h6 class="mb-0">Kategori Aset</h6> <span>{{item.category_name}}</span>
                                                </div>
                                            </div>
                                            <div class="badge text-primary"> <span>TERSEDIA</span> </div>
                                        </div>
                                        <div class="my-2">
                                            <h3 class="heading">{{item.name}}</h3>
                                            <h6>{{item.code}}</h6>
                                            <h6>{{item.study_program_name}}</h6>
                                            <div class=" mt-3">
                                                <div class="mt-3"> 
                                                    <span v-if="this.windowWidth <= this.$widthLandscapePhone" class="text2">Ketuk untuk selengkapnya</span>
                                                    <span v-else class="text2">Klik untuk selengkapnya</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="this.errorLoans == false" class="col-12 mb-5">
                                    <a href="#" style="text-decoration: none;" :class="this.windowWidth <= this.$widthPotraitPhone ? 'w-100 d-md-none btn btn-sm btn-primary shadow-sm' : 'd-none'">
                                        <i class="fa fa-paper-plane"></i>&ensp;Ajukan Peminjaman
                                    </a>
                                </div>
                            </div>
                        </div>
                        <hr class="sidebar-divider bg-secondary">
                        <Maintenance v-if="this.$roles != 'Member'"></Maintenance>

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
    import Sidebar from '../components/Sidebar.vue';
    import Navbar from '../components/Navbar.vue'
    import Dashboard from '../components/admin/Dashboard.vue';
    import Maintenance from '../components/admin/Maintenance.vue';
    import Footer from '../components/Footer.vue'
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
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                errorResponse: [],
                sessionData: [],
                loansArray: [],
                maintenanceArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        components: {
            Sidebar,
            Dashboard,
            Navbar,
            Footer,
            Maintenance
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            async loansList(){
                if (this.windowWidth >= this.$widthLandscapePhone) {
                    // console.log('test1');
                    this.dataLoans = {
                        "status": "0",
                        "condition": "0",
                        "skip": 0,
                        "take": 6,
                        "random": 1
                    }
                } else {
                    this.dataLoans = {
                        "status": "0",
                        "condition": "0",
                        "skip": 0,
                        "take": 4,
                        "random": 1
                    }
                }
                try {
                    await axios.get('/assets/getAll', {params: this.dataLoans})
                    .then((response) => {
                        // console.table(this.dataLoans);
                        Object.keys(response.data.data.assets).forEach((item) => {
                            this.loansArray.push(response.data.data.assets[item]);
                        });
                        // console.log(this.loansArray);
                        this.isLoadingContent = false;
                    }).catch((err) => {
                        if(!err.response || err.response){
                            this.errorLoans = true;
                        }
                    });
                    this.isLoadingContent = false;
                } catch (error) {
                    this.isLoadingContent = false;
                    this.errorLoans = true;
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
            // console.log(this.windowWidth >= this.$widthLandscapePhone);
            this.loansList();
            window.scrollTo(0,0);
            // console.log(this.loansArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 5000);
        },
    }
</script>