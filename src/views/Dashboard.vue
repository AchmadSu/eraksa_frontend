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
                        <div v-if="this.$roles != 'Member'">
                            <Dashboard></Dashboard>
                        </div>
                        <!-- Page Heading -->
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">Aset yang dapat dipinjam</h1>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="card btn text-dark text-justify shadow-lg border-bottom-success p-3 mb-4">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                                            <div class="ms-2 c-details">
                                                <h6 class="mb-0">Kategori Aset</h6> <span> Nama Kategori</span>
                                            </div>
                                        </div>
                                        <div class="badge text-success"> <span>TERSEDIA</span> </div>
                                    </div>
                                    <div class="my-2">
                                        <h3 class="heading">Nama Aset<br>Kode Aset</h3>
                                        <h6>Nama Program Studi</h6>
                                        <div class=" mt-3">
                                            <div class="mt-3"> 
                                                <span class="text1">XXX kali Dipinjam <br>
                                                <span v-if="this.windowWidth <= this.$widthPotraitPhone" class="text2">Ketuk untuk selengkapnya</span>
                                                <span v-else class="text2">Klik untuk selengkapnya</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card btn text-dark text-justify shadow-lg border-bottom-success p-3 mb-4">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                                            <div class="ms-2 c-details">
                                                <h6 class="mb-0">Kategori Aset</h6> <span> Nama Kategori</span>
                                            </div>
                                        </div>
                                        <div class="badge text-success"> <span>TERSEDIA</span> </div>
                                    </div>
                                    <div class="my-2">
                                        <h3 class="heading">Nama Aset<br>Kode Aset</h3>
                                        <h6>Nama Program Studi</h6>
                                        <div class=" mt-3">
                                            <div class="mt-3"> 
                                                <span class="text1">XXX kali Dipinjam <br>
                                                <span v-if="this.windowWidth <= this.$widthPotraitPhone" class="text2">Ketuk untuk selengkapnya</span>
                                                <span v-else class="text2">Klik untuk selengkapnya</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card btn text-dark text-justify shadow-lg border-bottom-success p-3 mb-4">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                                            <div class="ms-2 c-details">
                                                <h6 class="mb-0">Kategori Aset</h6> <span> Nama Kategori</span>
                                            </div>
                                        </div>
                                        <div class="badge text-success"> <span>TERSEDIA</span> </div>
                                    </div>
                                    <div class="my-2">
                                        <h3 class="heading">Nama Aset<br>Kode Aset</h3>
                                        <h6>Nama Program Studi</h6>
                                        <div class=" mt-3">
                                            <div class="mt-3"> 
                                                <span class="text1">XXX kali Dipinjam <br>
                                                <span v-if="this.windowWidth <= this.$widthPotraitPhone" class="text2">Ketuk untuk selengkapnya</span>
                                                <span v-else class="text2">Klik untuk selengkapnya</span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card btn text-dark text-justify shadow-lg border-bottom-success p-3 mb-4">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex flex-row align-items-center">
                                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                                            <div class="ms-2 c-details">
                                                <h6 class="mb-0">Kategori Aset</h6> <span> Nama Kategori</span>
                                            </div>
                                        </div>
                                        <div class="badge text-success"> <span>TERSEDIA</span> </div>
                                    </div>
                                    <div class="my-2">
                                        <h3 class="heading">Nama Aset<br>Kode Aset</h3>
                                        <h6>Nama Program Studi</h6>
                                        <div class=" mt-3">
                                            <div class="mt-3"> 
                                                <span class="text1">XXX kali Dipinjam <br>
                                                <span v-if="this.windowWidth <= this.$widthPotraitPhone" class="text2">Ketuk untuk selengkapnya</span>
                                                <span v-else class="text2">Klik untuk selengkapnya</span>
                                            </span>
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
    import Sidebar from '../components/sidebar/Dashboard.vue';
    import Navbar from '../components/Navbar.vue'
    import Dashboard from '../components/admin/Dashboard.vue';
    import Footer from '../components/Footer.vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
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
                username: this.$session.name,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        components: {
            Sidebar,
            Dashboard,
            Navbar,
            Footer,
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
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
        beforeCreate(){
            // console.table(this.$session != null, this.$loggedIn != 'null');
            if(this.$session == null || this.$loggedIn == 'null') {
                // console.log(this.lastPath);
                // this.lastPath = this.$router.options.history.state.back
                this.$router.push({ name: 'user.login' }).then(() => { this.$router.go() })
            }
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            window.scrollTo(0,0);
            
            setTimeout(() => this.isLoadingImage = false, 5000);
            setTimeout(() => this.isLoading = false, 5000);
        }
    }
</script>