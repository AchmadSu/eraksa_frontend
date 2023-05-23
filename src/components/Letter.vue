<template>
    <div id="mainRow" class="d-none row">
        <div class="col-12 text-center">
            <form class="form needs-validation" id="app" novalidate>
                <div class="py-lg-4 py-md-0 py-sm-1">
                    <div class="row d-flex justify-content-evenly my-sm-5 my-md-3">
                        <div class="col-8">
                            <div class="bg-light card w-100 h-100 btn text-justify rounded-0">
                                <div class="p-5">
                                    <div class="my-2">
                                        <table id="letterTable" class="table table-responsive table-sm table-borderless">
                                            <thead>
                                                <tr>
                                                    <td id="headerLetter" class="text-center align-middle" colspan="2">
                                                        <h4>Surat Pernyataan</h4>
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="align-middle">
                                                        <h5>Nama</h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>: {{this.detailObject.loaner_name}}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="align-middle">
                                                        <h5>
                                                            <template v-if="this.detailObject.loaner_code_type == '0'">NISN</template>
                                                            <template v-else-if="this.detailObject.loaner_code_type == '1'">NUPTK</template>
                                                            <template v-else-if="this.detailObject.loaner_code_type == '2'">NIP</template>
                                                        </h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>: {{this.detailObject.loaner_code}}</h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="align-middle" colspan="2">
                                                        <h5>Dengan ini menyatakan bahwa: </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>
                                                            1.
                                                        </h5> 
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>
                                                            Saya melakukan transaksi peminjaman aset dengan kode pinjam {{this.detailObject.code}}
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>
                                                            2.
                                                        </h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>
                                                            Saya melakukan peminjaman Tanggal: {{this.detailObject.date}}
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>
                                                            3.
                                                        </h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>
                                                            Saya akan mengembalikan aset sebelum Tanggal: {{this.detailObject.due_date}}
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>
                                                            4.
                                                        </h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>
                                                            Saya meminjam beberapa aset yang tertera pada Lampiran
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h5>
                                                            5.
                                                        </h5>
                                                    </td>
                                                    <td class="align-middle">
                                                        <h5>
                                                            Saya bersedia bertanggung jawab apabila terdapat kerusakan dan/atau kehilangan terhadap seluruh aset yang saya pinjam
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="align-middle" colspan="2">
                                                        <h5>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="background-color: #fff;" class="d-flex justify-content-evenly">
                                        <table id="signatureTable" class="table table-borderless">
                                            <tbody>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5>
                                                            &nbsp;
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5>
                                                            Cimahi, {{this.currentDate.toLocaleDateString("id")}} 
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5>
                                                            Disetujui Oleh,
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5>
                                                            Peminjam,
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5>
                                                            <QrCode 
                                                                :value="this.detailObject.qrCode"
                                                                id="qrTarget"
                                                                size="300"
                                                                level="H" 
                                                            />
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5>&nbsp;</h5>
                                                    </td>
                                                </tr>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5>
                                                            &nbsp;
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5>&nbsp;</h5>
                                                    </td>
                                                </tr>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5 class="text-center">
                                                            {{this.detailObject.lender_name}}
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="text-center">
                                                            {{this.detailObject.loaner_name}}
                                                        </h5>
                                                    </td>
                                                </tr>
                                                <tr class="text-center">
                                                    <td>
                                                        <h5 class="text-center">
                                                            <template v-if="this.detailObject.lender_code_type == '0'">
                                                                NISN. 
                                                            </template>
                                                            <template v-else-if="this.detailObject.lender_code_type == '1'">
                                                                NUPTK. 
                                                            </template>
                                                            <template v-else-if="this.detailObject.lender_code_type == '2'">
                                                                NIP. 
                                                            </template>
                                                            {{this.detailObject.lender_code}}
                                                        </h5>
                                                    </td>
                                                    <td>
                                                        <h5 class="text-center">
                                                            <template v-if="this.detailObject.loaner_code_type == '0'">
                                                                NISN. 
                                                            </template>
                                                            <template v-else-if="this.detailObject.loaner_code_type == '1'">
                                                                NUPTK. 
                                                            </template>
                                                            <template v-else-if="this.detailObject.loaner_code_type == '2'">
                                                                NIP. 
                                                            </template>
                                                            {{this.detailObject.loaner_code}}
                                                        </h5>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <table style="font-family: times new roman; font-size: 12pt; background-color: #fff;" id="headDetailTable" class="table table-bordered mt-5">
                                    <thead>
                                        <tr>
                                            <td class="align-middle text-center">
                                                Lampiran {{ this.detailObject.code }}
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                                <table style="font-family: times new roman; font-size: 12pt; background-color: #fff;" id="detailTable" class="table table-bordered mt-5">
                                    <thead>
                                        <tr>
                                            <td class="align-middle text-center">
                                                No
                                            </td>
                                            <td class="align-middle text-center">
                                                Nama Aset
                                            </td>
                                            <td class="align-middle text-center">
                                                Kode Aset
                                            </td>
                                            <td class="align-middle text-center">
                                                Jenis Aset
                                            </td>
                                            <td class="align-middle text-center">
                                                Total Aset
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item, index in selectDataArray" :key="item.id">
                                            <td class="align-middle text-center">
                                                {{index+1}}
                                            </td>
                                            <td class="align-middle text-center">
                                                {{item.name}}
                                            </td>
                                            <td class="align-middle text-center">
                                                {{item.code}}
                                            </td>
                                            <td class="align-middle text-center">
                                                {{item.category_name}}
                                            </td>
                                            <td class="align-middle text-center">
                                                ....
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <button v-if="isLoading" type="button" :disabled="buttonDisabled" class="btn btn-info w-100">
        <span class="spinner-border text-light" role="status" aria-hidden="true"></span>
    </button>
    <button v-else type="button" @click="downloadLetterFunction(this.detailObject.code)" :disabled="this.errorDetail" class="btn btn-info w-100">
        <i class="fa fa-download"></i>&ensp;Unduh Surat Pernyataan
    </button>
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
                prev: 0,
                next: 5,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    radio: '',
                },
                filterIds: [],
                selectDataArray: [],
                errorResponse: [],
                errorDelete: [],
                successResponse: [],
                successDemandResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                detailObject: {},
                skipAsset: 0,
                takeAsset: 5,
                username: this.$session.name,
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
        methods: {
            toTop(){
                window.scrollTo(0,0);
            },
            backFunction(){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.buttonDisabled = true;
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
                            this.$router.push({ name: 'manageLoans.details', query:{data: this.id} }).then(() => { this.$router.go() })
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
            downloadLetterFunction(name){
                this.isLoadingResponse2 = true;
                this.setProgress = true;
                this.isLoadingRouter = true;
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
                    html: '#letterTable',
                    theme: 'plain',
                    body: [{
                        content: '#headerLetter',
                        styles: {
                            halign:'center'
                        }
                    }]
                })
                pdf.autoTable({
                    html: '#signatureTable',
                    theme: 'plain',
                })
                // pdf.addImage(imgData, 'PNG', 40, pdfHeight+20, 80, 80);
                pdf.addPage();
                pdf.autoTable({
                    html: '#headDetailTable',
                    theme: 'plain'
                })
                pdf.autoTable({
                    html: '#detailTable',
                    showHead: 'everyPage',
                    theme: 'grid'
                })
                pdf.save('ERAKSA_Letter_'+name+'.pdf')
                clonedElement1.remove();
                this.isLoadingResponse2 = false;
                this.setProgress = false;
                this.isLoadingRouter = false;
                this.secondaryButtonDisabled = false;
                this.submitEnabled = false;
                this.buttonDisabled = false;
                this.isLoadingResponse = false;
            },
            async detailFunction(id){
                try {
                    // let data = window.atob(id)
                    // console.log(id);
                    await axios.get('/loans/detail/'+ id)
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
                        this.detailObject = {
                            "id": response.data.data.loans.id,
                            "code": response.data.data.loans.code,
                            "status": response.data.data.loans.status,
                            "date": finalDate+" "+finalTime,
                            "due_date": finalDueDate+" "+finalDueTime,
                            "due_date_time": getDueDateTime,
                            "return_id": response.data.data.loans.return_id,
                            "loaner_id": response.data.data.loans.loaner_id,
                            "loaner_name": response.data.data.loans.loaner_name,
                            "loaner_code_type": response.data.data.loans.loaner_code_type,
                            "loaner_code": response.data.data.loans.loaner_code,
                            "lender_id": response.data.data.loans.lender_id,
                            "lender_name": response.data.data.loans.lender_name,
                            "lender_code_type": response.data.data.loans.lender_code_type,
                            "lender_code": response.data.data.loans.lender_code,
                            "difference": difference,
                            "qrCode": "http://localhost:3000/loans/details?data="+ window.btoa(id)
                        };
                        // console.log(this.detailObject.qrCode)
                        // this.form.time = response.data.data.hours;
                        let select = response.data.data.loan_details;
                        // console.log(select[0]['asset_id'])
                        this.loansStatus = this.detailObject.status;
                        Object.keys(select).forEach((item) => {
                            this.selectDataArray.push(
                                {
                                    "id": select[item].asset_id,
                                    "name": select[item].asset_name,
                                    "code": select[item].asset_code,
                                    "condition": select[item].asset_condition,
                                    "status": select[item].asset_status,
                                    "category_name": select[item].asset_category_name,
                                    "study_program_name": select[item].asset_study_program_name,
                                }
                            )
                            // console.log(this.selectDataArray)
                            this.filterIds.push(select[item].asset_id)
                        })
                        // console.log(this.selectDataArray)
                        this.isLoading = false;
                    }).catch((err) => {
                        if(!err.response) {
                            // console.log("Test")
                            this.errorDetail = true;
                            this.showAlert = true;
                            this.detailObject = 
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
                            this.detailObject =
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
                            this.detailObject =
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
                    this.detailObject = {'id': 1, 'message': "Data tidak ditemukan", 'detail': "Mungkin parameter yang anda berikan salah atau tidak ada koneksi"};
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