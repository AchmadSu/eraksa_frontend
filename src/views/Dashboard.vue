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
                        <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h4 mb-0 text-gray-800">Modul Kompetensi</h1>
                            </div>
                            <div class="my-5 spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="this.errorLoans == true" class="text-lg-center text-sm-justify d-sm-flex align-items-center justify-content-between mb-3">
                                <h3 class="h4 mb-0 text-gray-800">Tidak ada Modul untuk saat ini</h3>
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
                            <div v-for="item in this.lessonArray" :key="item.lesson_id" class="row d-flex justify-content-evenly">
                                <div class="col-12">
                                    <div class="card w-100 h-100 btn text-light text-justify shadow-lg border-bottom-light p-3"
                                    style="background-image: linear-gradient(to bottom right, #32a8a8, #3277a8);">
                                        <div class="my-2">
                                            <h3 class="heading text-justify">
                                                {{item.lesson}}
                                            </h3>
                                            <div class="mt-4">
                                                <h6 class="text-justify">{{item.lesson_desc}}</h6>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-6">
                                                <p>
                                                    <i class="fa fa-user" aria-hidden="true"></i>&ensp;
                                                    Pemateri by John Doe
                                                    &nbsp;
                                                    &nbsp;
                                                    &nbsp;
                                                    <i class="fa fa-calendar" aria-hidden="true"></i>&ensp;
                                                    14-01-2025
                                                </p>
                                            </div>
                                            <div class="col-6 text-right">
                                                <button class="btn btn-light">
                                                    MULAI LEARNING
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-sm-flex align-items-center justify-content-between mt-4 mb-3">
                                <h1 class="h4 mb-0 text-gray-800">MODUL KOMPETENSI</h1>
                            </div>
                            <div class="row d-flex justify-content-evenly">
                                <div v-for="item in this.moduleArray" :key="item.id" class="col-sm-6 col-lg-4 my-3">
                                    <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-primary p-3">
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <div class="icon"> <i class="fa fa-book"></i> </div>
                                                <div class="ms-2 c-details">
                                                    <span>{{item.code}}</span> <h6>Adhivasindo</h6>
                                                </div>
                                            </div>
                                            <div class="badge text-primary"> <span>MODULES</span> </div>
                                        </div>
                                        <div class="my-2">
                                            <h3 class="heading text-center">
                                                <template v-if="item.module.length < 20">
                                                    {{(item.module).toUpperCase()}}
                                                </template>
                                                <template v-else>
                                                    {{(item.module).substring(0,20)+"..."}}
                                                </template>
                                            </h3>
                                            <div class="mt-4">
                                                <h6 class="text-center">MATERI KOMPETENSI</h6>
                                                <div class="mt-3 list-group">
                                                    <table class="table table-sm">
                                                        <tbody>
                                                            <tr v-for="item in item.lessons" :key="item.lesson_id" href="#">
                                                                <td>{{item.lesson}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-sm-flex align-items-center justify-content-between mt-4 mb-3">
                                <h1 class="h4 mb-0 text-gray-800">NILAI PESERTA</h1>
                            </div>
                            <div class="row rounded px-1 pt-1 mb-3 shadow-lg" style="background-image: linear-gradient(to bottom right, #32a8a8, #3277a8);">
                                <div class="col-12 bg-light">
                                    <table class="table">
                                        <thead>
                                            <tr style="font-weight: bold;">
                                                <td class="text-center">Rank</td>
                                                <td>Name</td>
                                                <td class="text-center">Class</td>
                                                <td class="text-center">Modul</td>
                                                <td class="text-center">Point</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in this.valuationArray" :key="item.id">
                                                <td class="text-center">{{index + 1}}</td>
                                                <td><b>{{item.name}}</b></td>
                                                <td class="text-center">{{item.module.toUpperCase()}}</td>
                                                <td class="text-center">{{item.lesson_code.toUpperCase()}}</td>
                                                <td class="text-center">{{item.point}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                moduleArray: [],
                lessonArray: [],
                valuationArray: [],
                keyWords: this.$route.query.search,
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
            addOneLesson(data) {
            const selectedRecord = data[0]; // Example: picking the first item
                if (selectedRecord) {
                    this.lessonArray.push(selectedRecord);
                }
            },
            async getModules(){
                this.param = {
                    "paginate": "10",
                    "keyword": this.keyWords
                }
                try {
                    await axios.get('/modules', {params: this.param})
                    .then((response) => {
                        console.log(response.data.data);
                        Object.keys(response.data.data).forEach((item) => {
                            this.moduleArray.push(response.data.data[item]);
                        });
                        console.log(this.moduleArray);
                        this.addOneLesson(this.moduleArray[0].lessons);
                        console.log(this.lessonArray);
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
            async getValuations(){
                this.param = {
                    "paginate": "10",
                    "order_by": "point",
                    "sort": "DESC"
                }
                try {
                    await axios.get('/valuations', {params: this.param})
                    .then((response) => {
                        console.log(response.data.data);
                        Object.keys(response.data.data).forEach((item) => {
                            this.valuationArray.push(response.data.data[item]);
                        });
                        console.log(this.valuationArray);
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
            }
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            this.getModules();
            this.getValuations();
            window.scrollTo(0,0);
            setTimeout(() => this.isLoading = false, 5000);
        },
    }
</script>