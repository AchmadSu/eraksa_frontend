<template>
    <div v-if="this.isLoadingContent == true" class="row d-flex align-items-center justify-content-center">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h4 mb-0 text-gray-800">Aset yang sedang dalam perbaikan</h1>
        </div>
        <div class="my-5 spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div v-if="this.errorMaintenance == true" class="text-sm-justify d-sm-flex align-items-center justify-content-between mb-3">
            <h3 class="h4 mb-0 text-gray-800">Tidak ada Aset yang sedang dalam perbaikan saat ini</h3>
            <a href="#" style="text-decoration: none;" class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                <i class="fa fa-paper-plane"></i>&ensp;Ajukan Perawatan
            </a>
        </div>
        <div v-else class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h4 mb-0 text-gray-800">Aset yang sedang dalam perbaikan</h1>
            <a href="#" style="text-decoration: none;" class="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm">
                <i class="fa fa-paper-plane"></i>&ensp;Ajukan Perawatan
            </a>
        </div>
        <div class="row" v-if="this.errorMaintenance == true">
            <!-- <h3>{{item.messa}}</h3> -->
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
        <div class="row d-flex justify-content-evenly">
            <div v-for="item in this.maintenanceArray" :key="item.id" class="col-sm-6 col-lg-4 my-3">
                <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-success p-3">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div class="icon"> <i class="fa fa-cube"></i> </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0">Kategori Aset</h6> <span>{{item.category_name}}</span>
                            </div>
                        </div>
                        <div class="badge text-justify text-success"> <span>DIPERBAIKI</span> </div>
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
            <div class="col-12 mb-5">
                <a href="#" style="text-decoration: none;" :class="this.windowWidth <= this.$widthPotraitPhone ? 'w-100 p-2 d-md-none btn btn-sm btn-success shadow-sm' : 'd-none'">
                    <i class="fa fa-paper-plane"></i>&ensp;Ajukan Perawatan
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoadingContent: false,
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
                maintenanceArray: [],
                errorMaintenance: false,
            }
        },
        methods: {
            async maintenanceList(){
                this.isLoadingContent = true;
                if (this.windowWidth >= this.$widthLandscapePhone) {
                    // console.log('test1');
                    this.dataMaintenance = {
                        "sleep": 0,
                        "status": "2",
                        "condition": "0",
                        "skip": 0,
                        "take": 6
                    }
                } else {
                    this.dataMaintenance = {
                        "sleep": 0,
                        "status": "2",
                        "condition": "0",
                        "skip": 0,
                        "take": 4
                    }
                }
                // console.table(this.dataMaintenance);
                try {
                    await axios.get('/assets/getAll', {params: this.dataMaintenance})
                    .then((response) => {
                        Object.keys(response.data.data.assets).forEach((item) => {
                            this.maintenanceArray.push(response.data.data.assets[item]);
                        });
                        this.isLoadingContent = false;
                    }).catch((err) => {
                        if(!err.response || err.response){
                            // this.isLoadingContent = false;
                            this.errorMaintenance = true;
                        }
                    });
                    this.isLoadingContent = false;
                    // this.isLoadingContent = false;
                } catch (error) {
                    this.isLoadingContent = false;
                    this.errorMaintenance = true;
                }
                this.isLoadingContent = false;
            },
        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        },
        mounted(){
            this.maintenanceList();
            // console.log(this.maintenanceArray)
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            // console.log(this.windowWidth >= this.$widthLandscapePhone);
            window.scrollTo(0,0);
            // console.log(this.loansArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 5000);
        },
    }
</script>