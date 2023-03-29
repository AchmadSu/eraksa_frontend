<template>
    <div id="semesterAssetsRow" class="table-responsive d-none">
        <table id="semesterAssetsTable" class="table table-sm table-borderless table-responsive">
            <thead id="head" class="d-none">
                <tr>
                    <th colspan="2">
                        <h3 class="heading text-left">Detail Laporan Aset Rusak per Semester</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle px-5">
                        <h5>Periode </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>: Tahun Ajaran {{ this.resultAcademicYear }} Semester {{this.range}}</h5>
                    </td>
                </tr>
                <tr>
                    <td class="align-middle px-5">
                        <h5>
                            Total Aset Rusak
                        </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>: {{this.dataCount}} unit</h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover table-bordered border" id="semesterAssetsDetails" width="100%" cellspacing="0">
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
        <table id="signatureAssetsSemester" class="table table-borderless">
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
    <form>
        <div class="mb-3">
            <select :disabled="isLoading" v-model="selectedYear" class="form-select form-select" aria-label=".form-select example">
                <option selected disabled>Tahun Ajaran</option>
                <template v-for="year in yearRange">
                    <option :key="year" :value="year" v-if="this.academicYear >= year">
                        {{year}}/{{year+1}}
                    </option>
                </template>
            </select>
        </div>
        <div class="mb-3">
            <select :disabled="isLoading" v-model="selectedSemester" class="form-select form-select" aria-label=".form-select example">
                <option selected disabled>Semester</option>
                <option v-for="semester in semesterData" :key="semester" :value="semester.value">{{semester.description}}</option>
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
                <i class="fa fa-times"></i>&ensp;Tidak ada Laporan untuk Semester yang dipilih
            </button>
            <button type="button" @click="report" class="btn btn-light w-100">
                <i class="fa fa-rocket"></i>&ensp;Generate Report
            </button>
        </div>
    </div>
    <div v-else>
        <button :disabled="isNaN(this.selectedSemester)" type="button" @click="downloadReport" class="btn btn-light w-100">
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
            const today = new Date();
            const currentYear = new Date().getFullYear();
            const isBeforeAugust = today.getMonth() < 7;
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
                resultAcademicYear: 0,
                academicYear: isBeforeAugust ? currentYear - 1 : currentYear,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                sidebarShow: true,
                imageLogo: false,
                selectedYear: 'Tahun Ajaran',
                selectedSemester: 'Semester',
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
                semesterData: [
                    {
                        "id": 1,
                        "value": 1,
                        "description": "Ganjil"
                    },
                    {
                        "id": 2,
                        "value": 2,
                        "description": "Genap"
                    },
                ],
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
            selectedSemester: {
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
                const element1 = document.getElementById("semesterAssetsRow");
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
                    html: '#semesterAssetsTable',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#semesterAssetsDetails',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.autoTable({
                    html: '#signatureAssetsSemester',
                    theme: 'plain',
                })
                pdf.save('ERAKSA_AssetsReportSemester_'+this.resultAcademicYear+"_"+this.range+'.pdf')
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
                        "semester": this.selectedSemester,
                        "year": this.selectedYear
                    }
                    // console.log(data);
                    await axios.get('/assets/reportSemester/', {params: data})
                    .then((response) => {
                        // console.log(response)
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
                        this.range = response.data.data.range;
                        this.resultAcademicYear = response.data.data.academicYear;
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
            // console.log(this.selectedSemester)
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>