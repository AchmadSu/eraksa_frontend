<template>
    <div id="listAssetsRow" class="table-responsive d-none">
        <table id="listAssetsTable" class="table table-sm table-borderless table-responsive">
            <thead id="head" class="d-none">
                <tr>
                    <th colspan="2">
                        <h3 class="heading text-left">Daftar Aset {{this.studyProgramName}}</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle px-5">
                        <h5>
                            Total Aset
                        </h5>
                    </td>
                    <td class="align-middle px-5">
                        <h5>: {{this.dataCount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}} unit</h5>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover table-bordered border" id="listAssetDetails" width="100%" cellspacing="0">
            <thead>
                <tr class="text-center">
                    <th class="align-middle">No</th>
                    <th class="align-middle">Nama</th>
                    <th class="align-middle">Kode Aset</th>
                    <th class="align-middle">Kondisi</th>
                    <th class="align-middle">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in this.dataArray" :key="item.id">
                    <td class="text-center align-middle">{{index+1}}</td>
                    <td class="align-middle"><b>{{item.name}}</b></td>
                    <td class="align-middle">{{item.code}}</td>
                    <td v-if="item.condition == '0'" class="align-middle">Optimal</td>
                    <td v-else-if="item.condition == '1'" class="align-middle">Rusak</td>
                    <td v-if="item.status == '0'" class="align-middle">Tersedia</td>
                    <td v-else-if="item.status == '1'" class="align-middle">Dipinjam</td>
                </tr>
            </tbody>
        </table>
        <table id="signatureListAssets" class="table table-borderless">
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
    <form>
        <div class="input-group mb-3">
            <select :disabled="this.isLoadingStudyPrograms" v-model="form.study_programs" class="form-select form-select" aria-label=".form-select example">
                <option selected disabled>Program Studi</option>
                <option v-for="item in studyProgramArray" :key="item.id" :value="item.id">{{item.name}}</option>
                <option v-if="this.showAlertStudyPrograms" v-for="item in errorStudyPrograms" :key="item.id" disabled>{{item.message}} {{item.detail}}</option>
            </select>
            <div v-if="this.isLoadingStudyPrograms == false">
                <div class="rounded-0 d-none d-lg-block">
                    <a @click="nextStudyProgram" v-if="this.studyProgramTotal > this.studyProgramArray.length" href="#" class="btn btn-light rounded-0">Muat lebih</a>                                                  
                    <a @click="getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)" v-if="this.showAlertStudyPrograms" href="#" class="btn btn-light rounded-0">Muat ulang</a>                                                  
                </div>
                <div class="rounded-0 d-sm-block d-lg-none">
                    <a @click="nextStudyProgram" v-if="this.studyProgramTotal > this.studyProgramArray.length" href="#" class="btn btn-light rounded-0"></a>                                                  
                    <a @click="getStudyProgram(this.skipStudyProgram, this.takeStudyProgram)" v-if="this.showAlertStudyPrograms" href="#" class="btn btn-light rounded-0"></a>                                                  
                </div>
            </div>
            <div v-else>
                <button type="submit" class="d-sm-block d-lg-none btn btn-light rounded-0" style="width:100%;" :disabled="true">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                <button type="submit" class="d-sm-none d-lg-block btn btn-light rounded-0" style="width:100%;" :disabled="true">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Memuat...
                </button>
            </div>
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
                <i class="fa fa-times"></i>&ensp;Tidak ada data Aset
            </button>
            <button :disabled="!this.isParamsChange || this.isLoadingStudyPrograms" type="button" @click="report" class="btn btn-light w-100">
                <i class="fa fa-rocket"></i>&ensp;Generate Report
            </button>
        </div>
    </div>
    <div v-else>
        <button :disabled="!isDownloadEnable" type="button" @click="downloadReport" class="btn btn-light w-100">
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
                isDownloadEnable: false,
                isLoadingContent: true,
                isLoadingResponse: false,
                isParams1: false,
                isParams2: false,
                isLoadingResponse1: false,
                isLoadingResponse2: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                isLoadingDelete: false,
                isLoadingStudyPrograms: false,
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
                form: {
                    study_programs: 'Program Studi',
                },
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
                loansArray: [],
                dataArray: [],
                deleteArray: [],
                detailObject: {},
                skipAsset: 0,
                takeAsset: 5,
                studyProgramArray: [],
                errorStudyPrograms: [],
                studyProgramName: '',
                studyProgramTotal: 0,
                showAlertStudyPrograms: false,
                skipStudyProgram: 0,
                takeStudyProgram: 10,
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
            form: {
                handler: function (val) {
                    let studyProgram = val.study_programs
                    if(studyProgram > 0) {
                        this.isParamsChange = true;
                    } else {
                        this.isParamsChange = false;
                    }
                },
                deep: true,
            }
        },
        methods: {
            toTop(){
                window.scrollTo(0,0);
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
                if(this.$roles == 'Admin'){
                    // console.log("test")
                    const ids = this.$session.study_program_id
                    this.data = {
                        "ids": [ids],
                        "skip": skip,
                        "take": take,
                    }
                } else {
                    this.data = {
                        "skip": skip,
                        "take": take,
                        "name": this.name
                    }
                }
                try {
                    await axios.get('/studyPrograms/getAll', {params: this.data})
                    .then((response) => {
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
            downloadReport(){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoading = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
                this.isLoadingResponse = true;
                const element1 = document.getElementById("listAssetsRow");
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
                    html: '#listAssetsTable',
                    theme: 'plain',
                })
                pdf.autoTable({
                    html: '#listAssetDetails',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.autoTable({
                    html: '#signatureListAssets',
                    theme: 'plain',
                })
                pdf.save('ERAKSA_listAssets_'+this.studyProgramName+'.pdf')
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
                        "study_program_id": this.form.study_programs,
                        "order": "name"
                    }
                    await axios.get('/assets/getAll', {params: data})
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
                                    "status": response.data.data.assets[item].status,
                                    "date": finalDate,
                                    "placement_name": response.data.data.assets[item].placement_name,
                                    "category_name": response.data.data.assets[item].category_name,
                                    "study_program_name": response.data.data.assets[item].study_program_name,
                                }
                            );
                            this.studyProgramName = response.data.data.assets[item].study_program_name;
                        });

                        // this.dataArray.filter((index) => index != 2)
                        this.dataCount = response.data.data.count;
                        this.isLoadingResponse = false;
                        this.isLoadingResponse1 = false;
                        this.isLoadingContent = false;
                        this.buttonDisabled = false;
                        this.isLoading = false;
                        this.isParamsChange = false;
                        this.isDownloadEnable = true;
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
            console.log("test")
            this.getStudyProgram(this.skipStudyProgram, this.takeStudyProgram);
            // this.report();
            // this.assignYearRange();
            // console.log(this.selectedMonth)
            setTimeout(() => this.isLoadingImage = false, 10000);
        },
    }
</script>