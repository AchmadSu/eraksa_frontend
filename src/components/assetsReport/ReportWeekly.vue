<template>
    <div id="mainAssetsRowWeekly" class="table-responsive d-none">
        <table id="primaryAssetsTableWeekly" class="table table-sm table-borderless table-responsive">
            <thead id="head" class="d-none">
                <tr>
                    <th colspan="2">
                        <h3 class="heading text-left">Detail Laporan Aset Rusak Mingguan</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle px-5">
                        <h5>Periode </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>: {{this.range}}</h5>
                    </td>
                </tr>
                <tr>
                    <td class="align-middle px-5">
                        <h5>
                            Total Aset Rusak
                        </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>: {{this.dataCount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}} unit</h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover table-bordered border" id="dataAssetsTableWeekly" width="100%" cellspacing="0">
            <thead>
                <tr class="text-center">
                    <th class="align-middle">No</th>
                    <th class="align-middle">Nama</th>
                    <th class="align-middle">Kode Aset</th>
                    <th class="align-middle">Kondisi</th>
                    <th class="align-middle">Pemilik</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in this.dataArray" :key="item.id">
                    <td class="text-center align-middle">{{index+1}}</td>
                    <td class="align-middle"><b>{{item.name}}</b></td>
                    <td class="align-middle">{{item.code}}</td>
                    <td class="align-middle">Rusak</td>
                    <td class="align-middle">{{item.study_program_name}}</td>
                </tr>
            </tbody>
        </table>
        <table id="signatureAssetsWeekly" class="table table-borderless">
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
                            Laporan dibuat oleh
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
    <div v-if="isLoading">
        <button type="button" :disabled="true" class="btn btn-light w-100">
            <i class="fa fa-clock-o"></i>&ensp;Sedang memuat...
        </button>
    </div>
    <div v-else>
        <button v-if="this.errorDetail" type="button" :disabled="true" class="btn btn-light w-100">
            <i class="fa fa-times"></i>&ensp;Tidak ada laporan untuk pekan lalu
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
                currentDate: new Date(),
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
                const element1 = document.getElementById("mainAssetsRowWeekly");
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
                    html: '#primaryAssetsTableWeekly',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#dataAssetsTableWeekly',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.autoTable({
                    html: '#signatureAssetsWeekly',
                    theme: 'plain',
                })
                pdf.save('ERAKSA_AssetsReportWeekly_'+this.range+'.pdf')
                clonedElement1.remove();
                this.isLoadingResponse2 = false;
                this.setProgress = false;
                this.isLoadingRouter = false;
                this.secondaryButtonDisabled = false;
                this.buttonDisabled = false;
                this.isLoading = false;
            },
            async report(){
                this.dataArray = [];
                try {
                    await axios.get('/assets/reportWeekly/')
                    .then((response) => {
                        Object.keys(response.data.data.assets).forEach((item) => {
                            let date = new Date(response.data.data.assets[item].date);
                            let finalDate = date.toLocaleDateString("id");
                            this.dataArray.push(
                                {
                                    "id": response.data.data.assets[item].id,
                                    "name": response.data.data.assets[item].name,
                                    "code": response.data.data.assets[item].code,
                                    "condition": response.data.data.assets[item].condition,
                                    "date": finalDate,
                                    "placement_name": response.data.data.assets[item].placement_name,
                                    "category_name": response.data.data.assets[item].category_name,
                                    "study_program_name": response.data.data.assets[item].study_program_name,
                                }
                            );
                        });

                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
                        this.range = response.data.data.range1+" - "+response.data.data.range2;
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