<template>
    <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
        <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
            <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
        </div>
    </div>
    <div v-else>
        <div v-for="item, index in dataArray" :key="item.id" class="modal fade" :id="'restoreModal'+item.id" tabindex="-1" data-bs-backdrop="static" aria-labelledby="restoreModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog modal-dialog-centered">
                <div v-if="successRestore == false" class="modal-content">
                    <div class="modal-header bg-primary">
                        <h5 class="text-light dark modal-title" id="restoreModalLabel"><i class="fa fa-undo"></i> &ensp;Konfirmasi pemulihan</h5>
                        <button :disabled="buttonDisabled" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-primary">
                        Apakah anda yakin akan memulihkan <b>{{ item.name }}</b>?
                        <div v-for="item in errorRestore" :key="item.id" :class="showAlertError == true ? 'text-start mt-3 alert alert-warning alert-dismissible' : 'd-none'" role="alert">
                            <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div class="mt-3 float-end">
                            <button :disabled="buttonDisabled" type="button" class="mr-4 mr-lg-3 btn btn-light" data-bs-dismiss="modal">Batal</button>
                            <button v-if="this.isLoadingRestore == false" :disabled="buttonDisabled" @click="this.restore(item.id)" type="button" class="btn btn-primary">Pulihkan</button>
                            <button :disabled="buttonDisabled" v-if="this.isLoadingRestore" class="btn btn-primary">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memuat...
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="successRestore" class="modal-content">
                    <div class="modal-header bg-success">
                        <h5 class="text-light modal-title" id="eraseModalLabel"><font-awesome-icon icon="fa-solid fa-circle-check" /> &ensp;Permintaan berhasil!</h5>
                        <button @click="setSuccessClose(item.id)" :disabled="buttonDisabled" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div v-for="item in successRestoreResponse" :key="item.id" :class="showAlertSuccess == true ? 'modal-body':'d-none'">
                        <div class="text-success alert alert-dismissible" role="alert">
                            <strong> {{ item.message }}</strong> <br/> {{ item.detail }} 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button @click="setSuccessClose(item.id)" :disabled="buttonDisabled" type="button" class="btn btn-success" data-bs-dismiss="modal" aria-label="Close">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px; z-index:10000;">
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
                        <h1 class="h3 mb-5 text-center text-gray-800">Kelola Data Sampah <br> Aset</h1>

                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="m-0 font-weight-bold text-primary">Data Aset</h6>
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
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'col-6':'col-12 pb-3'">
                                                <button :disabled="buttonDisabled" @click="indexRouter" class="btn w-100 btn-secondary rounded-0">
                                                    <i class="fa fa-arrow-left"></i> &ensp;Kembali
                                                </button>
                                            </div>
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'col-6 pb-3':'col-12 pb-3'">
                                                <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search" @submit.prevent="searchFunction">
                                                    <div class="input-group">
                                                        <input type="text" v-model="form.search" name="search" class="form-control input-lg bg-light" placeholder="Cari Kode"
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
                                                <div v-if="this.windowWidth <= this.$widthLandscapePhone" class="col-12 d-flex justify-content-center">
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
                                            <table v-if="this.windowWidth > this.$widthLandscapePhone" class="table table-hover table-bordered border-" id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr class="text-center">
                                                        <th class="align-middle">No</th>
                                                        <th class="align-middle">Nama</th>
                                                        <th class="align-middle">Kode Aset</th>
                                                        <th class="align-middle">Dibuat oleh</th>
                                                        <th class="align-middle">Program Studi</th>
                                                        <th class="align-middle">Kondisi</th>
                                                        <th class="align-middle">Status</th>
                                                        <th class="align-middle">Tanggal Masuk</th>
                                                        <th class="align-middle">Penempatan</th>
                                                        <th class="align-middle">Aset</th>
                                                        <th class="align-middle">
                                                            Aksi
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item, index in this.dataArray" :key="item.id">
                                                        <td class="text-center">{{index+1}}</td>
                                                        <td><b>{{item.name}}</b></td>
                                                        <td>{{item.code}}</td>
                                                        <td>{{item.user_name}}</td>
                                                        <td>{{item.study_program_name}}</td>
                                                        <td v-if="item.condition == 0">Optimal</td>
                                                        <td v-else>Rusak</td>
                                                        <td v-if="item.status == 0">Tersedia</td>
                                                        <td v-else-if="item.status == 1">Dipinjam</td>
                                                        <td v-else-if="item.status == 2">Diperbaiki</td>
                                                        <td>{{item.date}}</td>
                                                        <td>{{item.placement_name}}</td>
                                                        <td>{{item.category_name}}</td>
                                                        <td class="text-center">
                                                            <button type="button" data-bs-toggle="modal" :data-bs-target="'#restoreModal'+item.id" :disabled="buttonDisabled" class="btn w-100 btn-primary">
                                                                <i class="fa fa-undo"></i>
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
                                                <div v-for="item in this.dataArray" :key="item.id" class="col-sm-6 col-lg-4">
                                                    <div class="card btn text-dark text-justify shadow-lg border-bottom-info p-3 mb-4">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div class="icon"> <i class="fa fa-graduation-cap"></i> </div>
                                                                <div class="ms-2 c-details">
                                                                    <h6 class="mb-0">Data Aset</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="my-2">
                                                            <h3 class="heading">{{item.name}}</h3>
                                                            <p>{{item.code}}</p>
                                                            <p>
                                                                <small>Dibuat oleh: {{item.user_name}}</small><br>
                                                                <small>Program Studi: <br>{{item.study_program_name}}</small><br>
                                                                <small>Kondisi: </small>
                                                                <small v-if="item.condition == 0">Optimal</small>
                                                                <small v-else>Rusak</small>
                                                                <br>
                                                                <small>Status: </small>
                                                                <small v-if="item.status == 0">Tersedia</small>
                                                                <small v-else-if="item.status == 1">Dipinjam</small>
                                                                <small v-else-if="item.status == 2">Diperbaiki</small>
                                                                <br>
                                                                <small>Tanggal masuk: {{item.date}}</small><br>
                                                                <small>Penempatan: {{item.placement_name}}</small><br>
                                                                <small>Aset: {{item.category_name}}</small><br>
                                                            </p>
                                                            <div class="mt-3">
                                                                <div class="row my-3 py-2">
                                                                    <div class="col-12 py-2">
                                                                        <button :disabled="buttonDisabled" type="button" data-bs-toggle="modal" :data-bs-target="'#restoreModal'+item.id" class="btn w-100 btn-primary rounded-0">
                                                                            <i class="fa fa-undo"></i> &ensp; Pulihkan
                                                                        </button>
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
                                        <div v-if="this.$route.query.search != NULL" class="row my-lg-3 my-5">
                                            <div v-if="this.isLoadingResponse2 == false" class="col-12 text-center">
                                                <button :disabled="buttonDisabled" @click="backFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                                    Muat seluruh data
                                                </button>
                                            </div>
                                            <div class="col-12 text-center">
                                                <button :disabled="buttonDisabled" v-if="this.isLoadingResponse2 == true" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
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
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingRestore: false,
                sidebarShow: true,
                imageLogo: false,
                keyWords: this.$route.query.search,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                skip: 0,
                take: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    search: '',
                },
                searchParams: '',
                errorResponse: [],
                errorRestore: [],
                successResponse: [],
                successRestoreResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                username: this.$session.name,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successRestore: false,
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
                    this.searchParams = val.search;
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
            closeModal(id){
                let modal = '#restoreModal'+id;
                $(modal).modal('hide');
            },  
            indexRouter(){
                // this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.isLoadingRestore = true;
                // this.closeModal();
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
                            this.$router.push({ name: 'manageAssets' }).then(() => { this.$router.go() })
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
                this.successRestore = false;
                this.dataArray = this.dataArray.filter((item) => item.id !== id );
                this.dataCount--;
                this.successRestoreResponse = [];
                // this.closeModal(id);
                if (this.dataCount <= 0) {
                    this.indexRouter();
                }
            },
            nextFunction(){
                this.isLoadingResponse1 = true;
                this.buttonDisabled = true;
                if(this.windowWidth > this.$widthLandscapePhone){
                    this.skip = this.skip+10;
                    this.take = 10;
                } else {
                    this.skip = this.skip+4;
                    this.take = 4;
                }
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
                            this.$router.push({ name: 'manageAssets.trash' }).then(() => { this.$router.go() })
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
                            this.$router.push({ name: 'manageAssets.trash', query: {search: this.searchParams} }).then(() => { this.$router.go() })
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
            async restore(id){
                this.isLoadingRestore = true;
                this.buttonDisabled = true;
                this.dataObject = {
                    "ids": [id]
                };
                // console.log(this.dataObject)
                // this.dataArray = this.dataArray.filter((e) => e.id !== id);
                try {
                    await axios.put('/assets/restore', this.dataObject)
                    .then((response) => {
                        // console.log(response.data.data);
                        // this.dataArray = this.dataArray.filter((item) => item.id !== id );
                        this.successRestoreResponse = [
                            {
                                "id": 1,
                                "message": response.data.message,
                                "detail": response.data.data.token
                            }
                        ];
                        this.showAlertSuccess = true;
                        this.isLoadingRestore = false;
                        this.successRestore = true;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorRestore = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingRestore = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            // this.showAlert = true;
                            this.errorRestore = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingRestore = false;
                        } else {
                            this.showAlert = true;
                            this.errorRestore = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingRestore = false;
                        }
                    });
                    this.isLoadingContent = false;
                } catch (error) {
                    this.errorRestore = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertError = true;
                    this.isLoadingResponse = false;
                    this.buttonDisabled = false;
                    this.isLoadingRestore = false;
                }
            },
            async getAssets(skip, take){
                    // console.log('test1');
                this.showAlert = false;
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "sleep": 3,
                    "keyWords": this.keyWords
                }
                try {
                    await axios.get('/assets/trash', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data);
                        Object.keys(response.data.data.assets).forEach((item) => {
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
                                }
                            );
                        });
                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
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
            } else if (this.$roles === "Member"){
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
            if(this.windowWidth > this.$widthLandscapePhone){
                this.take = 10;
                this.getAssets(this.skip, this.take);
            } else {
                this.take = 4;
                this.getAssets(this.skip, this.take);
            } 
            // this.dataArray.filter((index) => index !== 1 )

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
        },
    }
</script>