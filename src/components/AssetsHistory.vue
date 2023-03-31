<template>
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="row">
                <div class="col-12">
                    <h6 class="m-0 font-weight-bold text-center text-primary">Riwayat Peminjaman Aset</h6>
                </div>
            </div>
        </div>
        <div class="card-body">
            <form class="w-100 d-none d-md-block d-sm-inline-block form-inline my-2 py-3 my-md-0 navbar-search row">
                <div class="input-group col-12">
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
            <div v-if="isLoading" class="d-flex justify-content-center">
                <div class="my-5 spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>
            <div v-else>
                <div v-if="this.loansArray.length == 0">
                    <div class="row">
                        <template v-if="this.errorResponse.length > 0">
                            <template v-for="item in errorResponse">
                                <h6 class="text-center my-3">{{item.message}}</h6>
                                <h6 class="text-center my-3">{{item.detail}}</h6>
                            </template>
                        </template>
                        <template v-else>
                            <template v-if="this.searchDateOne != '' || this.searchDateTwo != '' || this.searchDueDateOne != '' || this.searchDueDateTwo != '' ">
                                <h6 class="text-center mt-3">Tidak ada data peminjaman untuk pencarian yang anda minta</h6>
                                <h6 class="text-center">Atau koneksi anda terganggu, silakan muat ulang</h6>
                                <div class="my-5 col-12 text-center">
                                    <button :disabled="buttonDisabled" @click="backFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                        Hapus Filter
                                    </button>
                                </div>
                            </template>
                            <template v-else>
                                <h6 class="text-center mt-3">Tidak ada data peminjaman sampai saat ini</h6>
                                <h6 class="text-center">Atau koneksi anda terganggu, silakan muat ulang</h6>
                            </template>
                        </template>
                    </div>
                </div>
                <div v-else>
                    <div class="table-responsive d-none d-lg-block">
                        <table class="table table-hover table-bordered border d-none" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr class="text-center">
                                    <th colspan="6" class="align-middle">
                                        Riwayat Peminjaman {{ this.asset_name }} ({{ this.asset_code }})
                                    </th>
                                </tr>
                                <tr class="text-center">
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">Kode Transaksi</th>
                                    <th class="align-middle">Status</th>
                                    <th class="align-middle">Waktu Peminjaman</th>
                                    <th class="align-middle">Deadline Pengembalian</th>
                                    <th class="align-middle">Lama Peminjaman</th>
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
                                            <b class="text-danger">Terlambat</b>
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
                                </tr>
                                <tr v-for="item in errorResponse" :key="item.id" :class="showAlert == true">
                                    <td class="align-middle text-center" colspan="4">
                                        <b>{{item.message}}</b>
                                        <p>{{item.detail}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-hover table-bordered border" width="100%" cellspacing="0">
                            <thead>
                                <tr class="text-center">
                                    <th class="align-middle">No</th>
                                    <th class="align-middle">Kode Transaksi</th>
                                    <th class="align-middle">Status</th>
                                    <th class="align-middle">Waktu Peminjaman</th>
                                    <th class="align-middle">Deadline Pengembalian</th>
                                    <th class="align-middle">Lama Peminjaman</th>
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
                                            <b class="text-danger">Terlambat</b>
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
                        <table id="signatureAssetsHistory" class="d-none table table-borderless">
                            <tbody>
                                <tr class="text-center">
                                    <td>
                                        <h5>
                                            Cimahi, {{this.currentDate.toLocaleDateString("id")}} 
                                        </h5>
                                    </td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <h5>
                                            List dicetak oleh
                                        </h5>
                                    </td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <h5>&nbsp;</h5>
                                    </td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <h5>&nbsp;</h5>
                                    </td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <h5 class="text-center">
                                            {{this.$session.name}}
                                        </h5>
                                    </td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <h5 class="text-center">
                                            <template v-if="this.$session.code_type == '0'">
                                                NIM. 
                                            </template>
                                            <template v-else-if="this.$session.code_type == '1'">
                                                NIDN. 
                                            </template>
                                            <template v-else-if="this.$session.code_type == '2'">
                                                NIP. 
                                            </template>
                                            {{this.$session.code}}
                                        </h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row d-block d-lg-none d-flex justify-content-evenly">
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
                                                Terlambat
                                            </b>
                                            <b v-if="item.status == '2'" class="text-danger">
                                                Ditolak
                                            </b>
                                            <b v-if="item.status == '3'" class="text-success">
                                                Selesai
                                            </b>
                                        </big>
                                        <br>
                                        <big>Waktu Pinjam: {{item.date_string}}</big><br>
                                        <big>Deadline: {{item.due_date_string}}</big><br>
                                        <big>Lama Pinjam: <b>{{item.difference}}</b></big><br>
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
                    </div>
                    <div class="row my-lg-3 my-5">
                        <div v-if="this.searchDateOne != '' || this.searchDateTwo != '' || this.searchDueDateOne != '' || this.searchDueDateTwo != '' " class="col-12 text-center">
                            <button :disabled="buttonDisabled" @click="backFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                Hapus Filter
                            </button>
                        </div>
                        <div :class="this.loansArray.length < this.dataCount && this.isLoadingResponse1 == false ? 'col-12 text-center':'d-none'">
                            <button :disabled="buttonDisabled" @click="nextFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-light rounded-0':'btn w-100 btn-light rounded-0'">
                                Muat lebih banyak
                            </button>
                        </div>
                        <div :class="this.loansArray.length < this.dataCount && this.isLoadingResponse1 == false ? 'col-12 text-center my-5':'d-none'">
                            <button :disabled="buttonDisabled" @click="getAllFunction" :class="this.windowWidth >= this.$widthPotraitPhone ? 'btn w-50 btn-primary rounded-0':'btn w-100 btn-primary rounded-0'">
                                <i class="fa fa-undo"></i> &nbsp;Muat Seluruh Data
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
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import QrCode from 'qrcode.vue'
    import jsPDF from 'jspdf' 
    import html2canvas from "html2canvas"
    import * as htmlToImage from 'html-to-image'
    import 'jspdf-autotable'
    export default{
        props: ['dataId'],
        // setup(props) {
        //     id = props.dataId
        // },
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                isTyping: false,
                checkName: false,
                id: null,
                radioEnabled: true,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isLoadingAssets: false,
                isLoadingDemand: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                currentDate: new Date(),
                currentYear: new Date().getFullYear(),
                currentTime: new Date().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                errorDetail: false,
                loansStatus: 0,
                keyWords: '',
                skip: 0,
                take: 0,
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
                searchDateOne: '',
                searchDateTwo: '',
                searchDueDateOne: '',
                searchDueDateTwo: '',
                filterIds: [],
                selectDataArray: [],
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDemandResponse: [],
                sessionData: [],
                loansArray: [],
                deleteArray: [],
                detailObject: {},
                skipAsset: 0,
                takeAsset: 5,
                username: this.$session.name,
                asset_name: null,
                asset_code: null,
                errorDetail: false,
                errorAssetsArray: [],
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successDelete: false,
                submitEnabled: true,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png',
                validateForm: false,
                validateSelect: false
            }
        },
        components:{
            QrCode  
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
                this.detailFunction(this.id)
            },
            getAllFunction(){
                this.isLoading = true;
                this.buttonDisabled = true;
                this.skip = 0;
                this.take = this.dataCount;
                this.loansArray = [];
                this.detailFunction(this.id)
            },
            backFunction(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                let data = window.btoa(this.id);
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
                        this.$router.push({ name: 'menu.assetsDetail', query: {data: data} }).then(() => { this.$router.go() })
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
                this.isLoadingResponse1 = true;
                this.buttonDisabled = true;
                if(this.windowWidth > this.$widthLandscapePhone){
                    this.skip = 0;
                    this.take = 10;
                } else {
                    this.skip = 0;
                    this.take = 4;
                }
                this.isLoading = true;
                this.loansArray = [];
                this.detailFunction(this.id)
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
                        this.$router.push({ name: 'manageLoans.details', query: {data: data} }).then(() => { this.$router.go() })
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
                        this.$router.push({ name: 'manageLoans.returnDetails', query: {data: data} }).then(() => { this.$router.go() })
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
            async detailFunction(id){
                try {
                    // let data = window.atob(id)
                    this.dataObject = {
                        "skip": this.skip,
                        "take": this.take,
                        "dateOne": this.searchDateOne,
                        "dateTwo": this.searchDateTwo,
                        "dueDateOne": this.searchDueDateOne,
                        "dueDateTwo": this.searchDueDateTwo,
                        "orderDate": "DESC",
                        "asset_id": id
                    }
                    // console.table(this.dataObject);
                    await axios.get('/loans/historyAssets/', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response)
                        let date = new Date(response.data.data.loans.date);
                        let finalDate = date.toLocaleDateString("id");
                        // console.log(finalDate)
                        let finalTime = (date.toLocaleTimeString("id")).replace(".", ":").substring(0,5)+" WIB";
                        let difference = ''
                        let dueDate = new Date(response.data.data.loans.due_date);
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
                        let finalDueTime = (dueDate.toLocaleTimeString("id")).replace(".", ":").substring(0,5)+" WIB";
                        // console.log(difference)
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
                                    "return_id": response.data.data.loans[item].return_id,
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
                        this.asset_name = response.data.data.asset_name;
                        this.asset_code = response.data.data.asset_code;
                        this.dataCount = response.data.data.count;
                        // if (this.windowWidth < ) {
                            
                        // }
                        this.isLoadingResponse = false;
                        this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        // console.log(this.detailObject.qrCode)
                        // this.form.time = response.data.data.hours;
                        let select = response.data.data.loan_details;
                        // console.log(select[0]['asset_id'])
                        this.loansStatus = this.detailObject.status;
                        // console.log(this.selectDataArray)
                        this.isLoading = false;
                    }).catch((err) => {
                        if(!err.response) {
                            // console.log("Test")
                            this.errorDetail = true;
                            this.showAlert = true;
                            this.errorResponse = 
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                };
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingContent = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log("Test")
                            this.errorDetail = true;
                            // console.log(err.response.data);
                            this.showAlert = true;
                            this.errorResponse =
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                };
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        } else {
                            this.errorDetail = true;
                            this.showAlert = true;
                            this.errorResponse =
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                };
                            this.isLoadingResponse = false;
                            this.isLoadingContent = false;
                            this.buttonDisabled = false;
                        }
                    });
                    this.isLoadingContent = false;
                    // this.errorDetail = true;
                    this.isLoading = false;
                } catch (error) {
                    // console.log(error);
                    this.errorResponse = {'id': 1, 'message': "Data tidak ditemukan", 'detail': "Mungkin parameter yang anda berikan salah atau tidak ada koneksi"};
                    this.isLoadingResponse = false;
                    this.isLoadingContent = false;
                    this.isLoadingContent = false;
                    this.showAlert = true;
                    this.buttonDisabled = false;
                    this.errorDetail = true;
                    this.isLoading = false;
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
            
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
            if(this.windowWidth > this.$widthLandscapePhone) {
                this.take = 10;
            } else {
                this.take = 4;
            }
            // console.log(this.$baseUrl)
            this.id = this.dataId
            // console.log(this.id)
            this.detailFunction(this.id)
            // console.log(this.$route.query.search);
            // this.loansList();
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(typeof this.form.time)
            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            // setTimeout(() => this.isLoading = false, 3000);
            // console.log(this.errorDetail)
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>