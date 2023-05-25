<template>
    <div id="monthlyAssetsRow" class="table-responsive d-none">
        <table id="monthlyAssetsTable" class="table table-sm table-borderless table-responsive">
            <thead id="head" class="d-none">
                <tr>
                    <th colspan="2">
                        <h3 class="heading text-left">Detail Laporan Aset Rusak Bulanan</h3>
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
        <table class="table table-hover table-bordered border" id="monthlyAssetDetails" width="100%" cellspacing="0">
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
                    <td class="align-middle">Sarana dan Prasarana</td>
                </tr>
            </tbody>
        </table>
        <table id="signatureAssetsMonthly" class="table table-borderless">
            <tbody>
                <tr class="text-center">
                    <td>
                        <h5>
                            Bandung Barat, {{this.currentDate.toLocaleDateString("id")}} 
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
                                NISN. 
                            </template>
                            <template v-else-if="this.$session.code_type == '1'">
                                NUPTK. 
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
    <form>
        <div class="mb-3">
            <select :disabled="isLoading" v-model="selectedYear" class="form-select form-select" aria-label=".form-select example">
                <option v-for="year in yearRange" :key="year" :value="year">{{year}}</option>
            </select>
        </div>
        <div class="mb-3">
            <select :disabled="isLoading" v-model="selectedMonth" class="form-select form-select" aria-label=".form-select example">
                <option selected disabled>Bulan</option>
                <option v-for="month in monthsData" :key="month" :value="month.value">{{month.description}}</option>
            </select>
        </div>
    </form>
    <div v-if="isParamsChange">
        <div v-if="isLoading">
            <button type="button" :disabled="true" class="btn btn-light w-100">
                <i class="fa fa-clock-o"></i>&ensp;Sedang memuat...
            </button>
        </div>
        <div v-else>
            <button v-if="this.errorDetail" :disabled="true" type="button" @click="report" class="btn btn-warning w-100 mb-3">
                <i class="fa fa-times"></i>&ensp;Tidak ada Laporan untuk Bulan yang dipilih
            </button>
            <button :disabled="isNaN(this.selectedMonth) || this.selectedYear <= 0" type="button" @click="report" class="btn btn-light w-100">
                <i class="fa fa-rocket"></i>&ensp;Generate Report
            </button>
        </div>
    </div>
    <div v-else>
        <button :disabled="isNaN(this.selectedMonth) || this.selectedYear <= 0" type="button" @click="downloadReport" class="btn btn-light w-100">
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
            const currentYear = new Date().getFullYear();
            return {
                windowWidth: window.innerWidth,
                isLoading: false,
                isTyping: false,
                checkName: false,
                id: null,
                radioEnabled: true,
                buttonDisabled: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isParams1: false,
                isParams2: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                selectedYear: currentYear,
                selectedMonth: 'Bulan',
                yearRange: Array.from({length: 10}, (_, i) => currentYear - i),
                currentDate: new Date(),
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
                isParamsChange: false,
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
                monthsData: [
                    {
                        "id": 1,
                        "value": 1,
                        "description": "Januari"
                    },
                    {
                        "id": 2,
                        "value": 2,
                        "description": "Februari"
                    },
                    {
                        "id": 3,
                        "value": 3,
                        "description": "Maret"
                    },
                    {
                        "id": 4,
                        "value": 4,
                        "description": "April"
                    },
                    {
                        "id": 5,
                        "value": 5,
                        "description": "Mei"
                    },
                    {
                        "id": 6,
                        "value": 6,
                        "description": "Juni"
                    },
                    {
                        "id": 7,
                        "value": 7,
                        "description": "Juli"
                    },
                    {
                        "id": 8,
                        "value": 8,
                        "description": "Agustus"
                    },
                    {
                        "id": 9,
                        "value": 9,
                        "description": "September"
                    },
                    {
                        "id": 10,
                        "value": 10,
                        "description": "Oktober"
                    },
                    {
                        "id": 11,
                        "value": 11,
                        "description": "November"
                    },
                    {
                        "id": 12,
                        "value": 12,
                        "description": "Desember"
                    },
                ],
                loansArray: [],
                dataArray: [],
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
            selectedYear: {
                handler: function (val) {
                    this.year = val;
                    if(val > 0) {
                        this.isParamsChange = true;
                    } else {
                        this.isParamsChange = false;
                    }
                },
                deep: true,
            },
            selectedMonth: {
                handler: function (val) {
                    // console.log(val)
                    if(val > 0) {
                        this.isParamsChange = true;
                    } else {
                        this.isParamsChange = false;
                    }
                },
                deep: true,
            },
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
                const element1 = document.getElementById("monthlyAssetsRow");
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
                    html: '#monthlyAssetsTable',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#monthlyAssetDetails',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.autoTable({
                    html: '#signatureAssetsMonthly',
                    theme: 'plain',
                })
                pdf.save('ERAKSA_AssetsReportMonthly_'+this.range+'.pdf')
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
                this.isLoading = true;
                this.errorDetail = false;
                try {
                    let data = {
                        "month": this.selectedMonth,
                        "year": this.selectedYear
                    }
                    await axios.get('/assets/reportMonthly/', {params: data})
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
                        this.range = response.data.data.month+" "+response.data.data.year;
                        this.isLoadingResponse = false;
                        this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        this.isLoading = false;
                        this.isParamsChange = false;
                        // console.table(this.loansArray)
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
            // this.report();
            // this.assignYearRange();
            // console.log(this.selectedMonth)
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>