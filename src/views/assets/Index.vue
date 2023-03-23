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
                            <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
                                <div class="my-5 spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div v-else>
                                <div class="row">
                                    <div :class="
                                        this.keyWords != null ||
                                        this.creator != null ||
                                        this.studyProgram != null ||
                                        this.placement != null ||
                                        this.category != null ?
                                        'col-12 pb-3':'d-none'"
                                    >
                                        <h5 class="text-center">
                                            Menampilkan hasil pencarian
                                            <br>
                                            <template v-if="this.keyWords != null && this.keyWords != ''">
                                                Nama Aset atau Kode Aset: {{ this.keyWords}} <br>
                                            </template>
                                            <template v-for="item, index in dataArray" :key="item.id">
                                                <template v-if="this.studyProgram != '' && this.studyProgram != null && item.study_program_id == this.dataStudyProgram && index == 0">
                                                    Program Studi: {{ item.study_program_name }}
                                                    <br>
                                                </template>
                                            </template>
                                            <template v-for="item, index in dataArray" :key="item.id">
                                                <template v-if="this.category != '' && this.category != null && item.category_id == this.dataCategory && index == 0">
                                                    Kategori: {{ item.category_name }}
                                                    <br>
                                                </template>
                                            </template>
                                            <template v-for="item, index in dataArray" :key="item.id">
                                                <template v-if="this.placement != '' && this.placement != null && item.placement_id == this.dataPlacement && index == 0">
                                                    Tempat: {{ item.placement_name }}
                                                    <br>
                                                </template>
                                            </template>
                                        </h5>
                                    </div>
                                    <div class="col-12 pb-3">
                                        <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search">
                                            <div class="input-group">
                                                <input type="text" v-model="form.search" name="search" class="form-control input-lg bg-light" placeholder="Cari Nama atau Kode"
                                                    aria-label="Search" aria-describedby="basic-addon2">

                                                <template v-if="this.windowWidth > $widthPotraitPhone">
                                                    <template v-if="this.$roles == 'Super-Admin'">
                                                        <select :disabled="this.isLoadingStudyPrograms" v-model="form.study_programs" class="form-select form-select" aria-label=".form-select example">
                                                            <option selected disabled>Program Studi</option>
                                                            <option v-for="item in studyProgramArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                            <option v-if="this.showAlertStudyPrograms" v-for="item in errorStudyPrograms" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                        </select>
                                                        <div v-if="this.isLoadingStudyPrograms == false">
                                                            <div class="rounded-0 d-none d-lg-block">
                                                                <a @click="nextStudyProgram" v-if="this.studyProgramTotal > this.studyProgramArray.length" href="#" class="btn btn-success rounded-0"></a>                                                  
                                                                <a @click="getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)" v-if="this.showAlertStudyPrograms" href="#" class="btn btn-success rounded-0"></a>                                                  
                                                            </div>
                                                            <div class="rounded-0 d-sm-block d-lg-none">
                                                                <a @click="nextStudyProgram" v-if="this.studyProgramTotal > this.studyProgramArray.length" href="#" class="btn btn-success rounded-0"></a>                                                  
                                                                <a @click="getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)" v-if="this.showAlertStudyPrograms" href="#" class="btn btn-success rounded-0"></a>                                                  
                                                            </div>
                                                        </div>
                                                        <div v-else>
                                                            <button type="submit" class="d-sm-block d-lg-none btn btn-success rounded-0" style="width:100%;" :disabled="true">
                                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            </button>
                                                            <button type="submit" class="d-sm-none d-lg-block btn btn-success rounded-0" style="width:100%;" :disabled="true">
                                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            </button>
                                                        </div>
                                                    </template>

                                                    <select :disabled="this.isLoadingCategory" v-model="form.category_assets" class="form-select form-select" aria-label=".form-select example">
                                                        <option selected disabled>Kategori</option>
                                                        <option v-for="item in categoryArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                        <option v-if="this.showAlertCategory" v-for="item in errorCategory" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                    </select>
                                                    <div v-if="this.isLoadingCategory == false">
                                                        <div class="rounded-0 d-none d-lg-block">
                                                            <a @click="nextCategory" v-if="this.categoryTotal > this.categoryArray.length" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>
                                                            <a @click="getCategory(this.skipCategory, this.takeCategory)" v-if="this.showAlertCategory" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>                                            
                                                        </div>
                                                        <div class="rounded-0 d-sm-block d-lg-none">
                                                            <a @click="nextCategory" v-if="this.categoryTotal > this.categoryArray.length" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>
                                                            <a @click="getCategory(this.skipCategory, this.takeCategory)" v-if="this.showAlertCategory" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>
                                                        </div>
                                                    </div> 
                                                    <div v-else>
                                                        <button type="submit" class="btn btn-success rounded-0 d-sm-block d-lg-none" style="width:100%;" :disabled="true">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="submit" class="btn btn-success rounded-0 d-none d-lg-block" style="width:100%;" :disabled="true">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        </button>
                                                    </div>

                                                    <select :disabled="this.isLoadingPlacements" v-model="form.placements" class="form-select form-select" aria-label=".form-select example">
                                                        <option selected disabled>Tempat</option>
                                                        <option v-for="item in placementsArray" :key="item.id" :value="item.id">{{item.name}}</option>
                                                        <option v-if="this.showAlertPlacements" v-for="item in errorPlacements" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
                                                    </select>
                                                    <div v-if="this.isLoadingPlacements == false">
                                                        <div class="rounded-0 d-none d-lg-block">
                                                            <a @click="nextPlacements" v-if="this.placementsTotal > this.placementsArray.length" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>
                                                            <a @click="getPlacements(this.skipPlacements, this.takePlacements)" v-if="this.showAlertPlacements" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>                                                  
                                                        </div>
                                                        <div class="rounded-0 d-sm-block d-lg-none">
                                                            <a @click="nextPlacements" v-if="this.placementsTotal > this.placementsArray.length" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>
                                                            <a @click="getPlacements(this.skipPlacements, this.takePlacements)" v-if="this.showAlertPlacements" href="#" class="btn btn-success rounded-0"><i class="fa fa-undo"></i></a>                                                  
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <button type="submit" class="btn btn-success rounded-0 d-sm-block d-lg-none" style="width:100%;" :disabled="true">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        </button>
                                                        <button type="submit" class="btn btn-success rounded-0 d-none d-lg-block" style="width:100%;" :disabled="true">
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        </button>
                                                    </div>
                                                </template>

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
                                            <div @click="detailRouter(item.id)" :class="item.status == '0' && item.condition == '1' ? 'card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-danger p-3' : 'card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-info p-3'">
                                                <div class="d-flex justify-content-between">
                                                    <div class="d-flex flex-row align-items-center">
                                                        <div class="icon"> <i class="fa fa-cube"></i> </div>
                                                        <div class="ms-2 c-details">
                                                            <span>Kategori Aset</span> <h6>{{item.category_name}}</h6>
                                                        </div>
                                                    </div>
                                                    <div v-if="item.status == '0' && item.condition == '0'" class="badge text-primary"> 
                                                        <span>TERSEDIA</span>  
                                                    </div>
                                                    <div v-else-if="item.status == '1' && item.condition == '0'" class="badge text-success"> 
                                                        <span>DIPINJAM</span>  
                                                    </div>
                                                    <div v-else-if="item.status == '0' && item.condition == '1'" class="badge text-danger"> 
                                                        <span>RUSAK</span>  
                                                    </div>
                                                </div>
                                                <div class="my-2">
                                                    <h3 class="heading text-left">
                                                        <template v-if="item.name.length < 20">
                                                            {{item.name}}
                                                        </template>
                                                        <template v-else>
                                                            {{(item.name).substring(0,20)+"..."}}
                                                        </template>
                                                    </h3>
                                                    <h6>
                                                        <template v-if="item.code.length < 30">
                                                            {{item.code}}
                                                        </template>
                                                        <template v-else>
                                                            {{ (item.code).substring(0,30)+"..." }}
                                                        </template>
                                                    </h6>
                                                    <h6>
                                                        <template v-if="item.study_program_name.length < 30">
                                                            {{item.study_program_name}}
                                                        </template>
                                                        <template v-else>
                                                            {{(item.study_program_name).substring(0,30)+"..."}}
                                                        </template>
                                                    </h6>
                                                    <div class=" mt-3">
                                                        <div class="mt-3 text-center"> 
                                                            <span v-if="this.windowWidth <= this.$widthLandscapePhone" class="text2">Ketuk untuk selengkapnya</span>
                                                            <span v-else class="text2">Klik untuk selengkapnya</span>
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
                                <div 
                                    v-if="this.keyWords != null || this.placement != null || this.category != null || this.placement != null || this.studyProgram != null" 
                                    class="row my-lg-3 my-5"
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
    import * as htmlToImage from 'html-to-image'
    // import Dashboard from '../components/admin/Dashboard.vue';
    // import Maintenance from '../components/admin/Maintenance.vue';
    import Footer from '../../components/Footer.vue';
    import QrCode from 'qrcode.vue';
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                QrValue: null,
                isLoading: true,
                isLoading: true,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingStudyPrograms: true,
                isLoadingCategory: true,
                isLoadingPlacements: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                keyWords: this.$route.query.search,
                creator: this.$route.query.creator,
                studyProgram: this.$route.query.studyProgram,
                placement: this.$route.query.placement,
                category: this.$route.query.category,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                skip: 0,
                take: 0,
                dataStudyProgram: '',
                dataCategory: '',
                dataPlacements: '',
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    search: '',
                    creator: '',
                    study_programs: 'Program Studi',
                    category_assets: 'Kategori',
                    placements: 'Tempat',
                },
                searchParams: '',
                creatorParams: '',
                studyProgramParams: '',
                placementParams: '',
                categoryParams: '',
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                studyProgramArray: [],
                errorStudyPrograms: [],
                studyProgramTotal: 0,
                categoryArray: [],
                errorCategory: [],
                categoryTotal: 0,
                placementsArray: [],
                errorPlacements: [],
                placementsTotal: 0,
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successDelete: false,
                showAlertStudyPrograms: false,
                showAlertCategory: false,
                showAlertPlacements: false,
                skipStudyProgram: 0,
                takeStudyProgram: 10,
                skipCategory: 0,
                takeCategory: 10,
                skipPlacements: 0,
                takePlacements: 10,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        components: {
            Sidebar,
            Navbar,
            Footer,
            QrCode
        },
        watch: {
            form: {
                handler: function (val) {
                    // console.log(val)
                    this.searchParams = val.search;
                    this.creatorParams = val.creator;
                    if(!isNaN(val.study_programs)) {
                        this.studyProgramParams = window.btoa(val.study_programs);
                    }
                    if(!isNaN(val.category_assets)) {
                        this.categoryParams = window.btoa(val.category_assets);
                    }   
                    if(!isNaN(val.placements)) {
                        this.placementParams = window.btoa(val.placements);
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
            downloadQrCode(code, target){
                htmlToImage.toJpeg(document.getElementById(target), { quality: 0.95 })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = code + '.jpeg';
                    link.href = dataUrl;
                    link.click();
                });
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
                            this.$router.push({ name: 'menu.assetsDetail', query: {data: data} }).then(() => { this.$router.go() })
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
                if(this.windowWidth > this.$widthLandscapePhone){
                    this.skip = this.skip+6;
                    this.take = 6;
                } else {
                    this.skip = this.skip+4;
                    this.take = 4;
                }
                // console.log(this.skip)
                this.getAssets(this.skip, this.take)
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
                            this.$router.push({ name: 'menu.assets' }).then(() => { this.$router.go() })
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
                        // console.log("Test");
                        setTimeout(() => {
                            this.$router.push({ 
                                name: 'menu.assets', 
                                query: {
                                    search: this.searchParams,
                                    studyProgram: this.studyProgramParams,
                                    category: this.categoryParams,
                                    placement: this.placementParams,
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
            async getAssets(skip, take){
                // console.log('test1');
                this.showAlert = false;
                let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                let testStudyProgram = base64regex.test(this.studyProgram)
                let testCategory = base64regex.test(this.category)
                let testPlacements = base64regex.test(this.placement)
                if(testStudyProgram) {
                    this.dataStudyProgram = window.atob(this.studyProgram)
                }
                if(testCategory) {
                    this.dataCategory = window.atob(this.category)
                }
                if(testPlacements) {
                    this.dataPlacements = window.atob(this.placement)
                }
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "keyWords": this.keyWords,
                    "category_id": this.dataCategory,
                    "placement_id": this.dataPlacements,
                    "study_program_id": this.dataStudyProgram,
                    "order": "name"
                }
                try {
                    await axios.get('/assets/getAll', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data);
                        Object.keys(response.data.data.assets).forEach((item) => {
                            let data = window.btoa(response.data.data.assets[item].id);
                            let date = new Date(response.data.data.assets[item].date);
                            let finalDate = date.toLocaleDateString("id");
                            this.dataArray.push(
                                {
                                    "id": response.data.data.assets[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.assets[item].name,
                                    "code": response.data.data.assets[item].code,
                                    "condition": response.data.data.assets[item].condition,
                                    "status": response.data.data.assets[item].status,
                                    "date": finalDate,
                                    "placement_id": response.data.data.assets[item].placement_id,
                                    "placement_name": response.data.data.assets[item].placement_name,
                                    "category_id": response.data.data.assets[item].category_id,
                                    "category_name": response.data.data.assets[item].category_name,
                                    "user_id": response.data.data.assets[item].user_id,
                                    "user_name": response.data.data.assets[item].user_name,
                                    "study_program_id": response.data.data.assets[item].study_program_id,
                                    "study_program_name": response.data.data.assets[item].study_program_name,
                                    "qrCode": "localhost:3000/assets/edit?"+data
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
            nextStudyProgram(){
                this.skipStudyProgram = this.skipStudyProgram+10;
                this.getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)
            },
            async getStudyProgram(skip, take){
                this.isLoadingStudyPrograms = true;
                this.showAlertStudyPrograms = false;
                this.errorStudyPrograms = [];
                this.buttonDisabled = true;
                // console.log('test1');
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "name": this.name
                }
                try {
                    await axios.get('/studyPrograms/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.study_programs).forEach((item) => {
                            this.studyProgramArray.push(
                                {
                                    "id": response.data.data.study_programs[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.study_programs[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.studyProgramTotal = response.data.data.count;
                        this.isLoadingStudyPrograms = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorStudyPrograms = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertStudyPrograms = true;
                        this.isLoadingStudyPrograms = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorStudyPrograms = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertStudyPrograms = true;
                    this.isLoadingStudyPrograms = false;
                    this.buttonDisabled = false;
                }
            },
            nextCategory(){
                this.skipCategory = this.skipCategory+10;
                this.getCategory(this.skipCategory, this.takeCategory)
            },
            async getCategory(skip, take){
                this.isLoadingCategory = true;
                this.showAlertCategory = false;
                this.errorCategory = [];
                this.buttonDisabled = true;
                // console.log('test1');
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "order": "name"
                }
                try {
                    await axios.get('/categoryAssets/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.category_assets).forEach((item) => {
                            this.categoryArray.push(
                                {
                                    "id": response.data.data.category_assets[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.category_assets[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.categoryTotal = response.data.data.count;
                        this.isLoadingCategory = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorCategory = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertCategory = true;
                        this.isLoadingCategory = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorCategory = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertCategory = true;
                    this.isLoadingCategory = false;
                    this.buttonDisabled = false;
                }
            },
            nextPlacements(){
                this.skipPlacements = this.skipPlacements+10;
                this.getPlacements(this.skipPlacements, this.takePlacements)
            },
            async getPlacements(skip, take){
                this.isLoadingPlacements = true;
                this.showAlertPlacements = false;
                this.errorPlacements = [];
                this.buttonDisabled = true;
                // console.log('test1');
                this.data = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                }
                try {
                    await axios.get('/placements/getAll', {params: this.data})
                    .then((response) => {
                        // console.table(response.data.data.count);
                        Object.keys(response.data.data.placements).forEach((item) => {
                            this.placementsArray.push(
                                {
                                    "id": response.data.data.placements[item].id,
                                    "row": this.index++,
                                    "name": response.data.data.placements[item].name,
                                }
                            );
                        });
                        // this.studyProgramArray.filter((index) => index != 2)
                        this.placementsTotal = response.data.data.count;
                        this.isLoadingPlacements = false;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                        } else {
                            this.errorPlacements = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': ''
                                }
                            ];
                        }
                        this.showAlertPlacements = true;
                        this.isLoadingPlacements = false;
                        this.buttonDisabled = false;
                    });
                } catch (error) {
                    this.errorPlacements = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertPlacements = true;
                    this.isLoadingPlacements = false;
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
            if(this.windowWidth > this.$widthLandscapePhone){
                this.take = 6;
                this.getAssets(this.skip, this.take);
            } else {
                this.take = 4;
                this.getAssets(this.skip, this.take);
            }
            this.getStudyProgram(this.skipStudyProgram, this.takeStudyProgram);
            this.getCategory(this.skipCategory, this.takeCategory);
            this.getPlacements(this.skipPlacements, this.takePlacements); 
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(this.studyProgram)

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
        },
    }
</script>