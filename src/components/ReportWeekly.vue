<template>
    <div id="mainRow" class="table-responsive d-none">
        <table id="primaryTable" class="table table-sm table-borderless table-responsive">
            <thead id="head" class="d-none">
                <tr>
                    <th colspan="2">
                        <h3 class="heading text-left">Detail Laporan Mingguan</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle px-5">
                        <h5>Periode: </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>{{this.range}}</h5>
                    </td>
                </tr>
                <tr>
                    <td class="align-middle px-5">
                        <h5>
                            Total Transaksi Peminjaman: 
                        </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>{{this.dataCount}}</h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover table-bordered border" id="dataTable" width="100%" cellspacing="0">
            <thead>
                <tr class="text-center">
                    <th class="align-middle">No</th>
                    <th class="align-middle">Kode</th>
                    <th class="align-middle">Status</th>
                    <th class="align-middle">Waktu Mulai</th>
                    <th class="align-middle">Tenggat Waktu</th>
                    <th class="align-middle">Periode</th>
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
                            <b class="text-danger">Overdue</b>
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
            </tbody>
        </table>
    </div>
    <div v-if="isLoading">
        <button type="button" :disabled="true" class="btn btn-light w-100">
            <i class="fa fa-clock-o"></i>&ensp;Sedang memuat...
        </button>
    </div>
    <div v-else>
        <button v-if="this.errorDetail" type="button" :disabled="true" class="btn btn-light w-100">
            <i class="fa fa-times"></i>&ensp;Tidak ada laporan untuk minggu ini
        </button>
        <button v-else type="button" @click="downloadReport" class="btn btn-light w-100">
            <i class="fa fa-download"></i>&ensp;Unduh Laporan
        </button>
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
                currentYear: new Date().getFullYear(),
                currentTime: new Date().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                range: '',
                errorDetail: false,
                loansStatus: 0,
                keyWords: '',
                skip: 0,
                take: 0,
                intervalProgressbar: null,
                widhtStyle: '',
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
                // monthsData: [
                //     {
                //         "id": 1,
                //         "value": "01",
                //         "description": ""
                //     }
                // ],
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
        watch: {
            
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            downloadReport(){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoading = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.isLoadingResponse = true;
                const element1 = document.getElementById("mainRow");
                let clonedElement1 = element1.cloneNode(true);
                $(clonedElement1).css("display", "block");
                // htmlToImage.toJpeg(document.getElementById("target"), { quality: 1 })
                // const imgData = dataUrl
                const pdf = new jsPDF("p", "pt", "a4")
                pdf.setFont("Montserrat");
                // const imgProps= pdf.getImageProperties(imgData);
                // let heightLeft = imgProps.height;
                // const pdfWidth = pdf.internal.pageSize.getWidth();
                // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                // let pageHeight= pdf.internal.pageSize.height;
                // let position = 0;
                // heightLeft -= pdfHeight;
                // console.log("Test")
                pdf.autoTable({
                    html: '#primaryTable',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#dataTable',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.save('LoansReportWeekly_'+this.range+'_.pdf')
                clonedElement1.remove();
                this.isLoadingResponse2 = false;
                this.setProgress = false;
                this.isLoadingRouter = false;
                this.secondaryButtonDisabled = false;
                this.buttonDisabled = false;
                this.isLoading = false;
            },
            async report(){
                try {
                    await axios.get('/loans/reportWeekly/')
                    .then((response) => {
                        console.log(response)
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
                        this.dataCount = response.data.data.count;
                        this.range = response.data.data.range1+"-"+response.data.data.range2;
                        this.isLoadingResponse = false;
                        this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        this.isLoading = false;
                    }).catch((err) => {
                        if(!err.response) {
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
        },
        destroyed() {
            window.removeEventListener("resize", this.sizeHandler);
        },
        beforeCreate(){
            
        },  
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            this.report();
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>