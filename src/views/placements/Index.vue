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
                            <div :class="this.name != NULL ? 'col-12 pb-3':'d-none'">
                                <h5 class="text-center">
                                    <template v-if="this.name != ''">
                                        Menampilkan hasil pencarian: {{this.name}}
                                    </template>
                                </h5>
                            </div>
                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'col-6 pb-3':'col-12 pb-3'">
                                <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search" @submit.prevent="searchFunction">
                                    <div class="input-group">
                                        <input type="text" v-model="form.search" name="search" class="form-control input-lg bg-light" placeholder="Cari Nama Tempat"
                                            aria-label="Search" aria-describedby="basic-addon2">
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
                            <div v-for="item in errorResponse" :key="item.id" class="row d-sm-flex justify-content-center">
                                <div v-if="this.windowWidth <= this.$widthPotraitPhone" class="col-12 d-flex justify-content-center">
                                    <img class="w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                </div>
                                <div v-else class="col-12 d-flex justify-content-center">
                                    <img  class="w-50 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                </div>
                                <div class="text-center text-sm-justify mt-3">
                                    <h3 class="h4 mb-0 text-gray-800">{{item.message}}</h3>
                                </div>
                                <h6 class="text-center my-3">{{item.detail}}</h6>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row d-flex justify-content-evenly">
                                <div v-for="item in this.dataArray" :key="item.id" class="col-sm-6 col-lg-4 my-3">
                                    <div @click="route(item.id)" class="card w-100 h-100 btn text-dark shadow-lg border-bottom-primary p-3">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div class="icon"> <i class="fa fa-map-marker"></i> </div>
                                                <div class="ms-2 c-details">
                                                    <span></span> <h6>Data Tempat</h6>
                                                </div>
                                            </div>
                                            <div class="badge text-primary"> <span>Menu</span> </div>
                                        </div>
                                        <div class="my-2">
                                            <h3 class="heading">
                                                {{ item.name }}
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
                            </div>
                            <hr class="sidebar-divider bg-secondary">
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
                        <div v-if="this.name != NULL" class="row my-lg-3 my-5">
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
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                sidebarShow: true,
                imageLogo: false,
                name: this.$route.query.search,
                currentYear: new Date().getFullYear(),
                currentDate: new Date().getDate(),
                currentTime: new Date().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    search: '',
                },
                searchParams: '',
                skip: 0,
                take: 10,
                dataCount: 0,
                errorResponse: [],
                sessionData: [],
                dataArray: [],
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
        watch: {
            form: {
                handler: function (val) {
                    this.searchParams = val.search;
                },
                deep: true,
            },
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
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
                        // console.log("Test");
                        setTimeout(() => {
                            this.$router.push({ name: 'menu.placements', query: {search: this.searchParams} }).then(() => { this.$router.go() })
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
            nextFunction(){
                this.isLoadingResponse1 = true;
                this.buttonDisabled = true;
                this.skip = this.skip+10;
                this.getData(this.skip, this.take)
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
                            this.$router.push({ name: 'menu.placements' }).then(() => { this.$router.go() })
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
            async getData(skip, take){
                    // console.log('test1');
                this.showAlert = false;
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "name": this.name
                }
                try {
                    await axios.get('/placements/getAll', {params: this.dataObject})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.placements).forEach((item) => {
                            this.dataArray.push(
                                {
                                    "id": response.data.data.placements[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.placements[item].name,
                                }
                            );
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
            route(id){
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
                            // this.$router.push({ name:  }).then(() => { this.$router.go() })
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
            this.getData(this.skip, this.take);
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout((6 10> this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 5000);
        },
    }
</script>