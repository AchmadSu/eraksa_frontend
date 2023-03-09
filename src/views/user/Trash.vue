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
                        <h1 class="h3 mb-5 text-center text-gray-800">Kelola Sampah Pengguna</h1>

                        <!-- DataTales Example -->
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <div class="row">
                                    <div class="col-6">
                                        <h6 class="m-0 font-weight-bold text-primary">Data Sampah Pengguna</h6>
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
                                            <div :class="
                                                this.keyWords != NULL ||
                                                this.keyCodeType != NULL ||
                                                this.keyRole != NULL ||
                                                this.keyStatus != NULL ||
                                                this.keyStudyProgramName != NULL 
                                                ? 'col-12 pb-3':'d-none'"
                                            >
                                                <h5 class="text-center">
                                                    Menampilkan hasil pencarian
                                                    <template v-if="this.keyWords != ''">
                                                        Kata Kunci: {{ this.keyWords }} 
                                                        <br>
                                                    </template>
                                                    <template v-if="this.keyCodeType != ''">
                                                        <template v-if="this.keyCodeType == '0'">
                                                            Tipe: Mahasiswa
                                                        </template>
                                                        <template v-else-if="this.keyCodeType == '1'">
                                                            Tipe: Dosen
                                                        </template>
                                                        <br>
                                                    </template>
                                                    <template v-if="this.keyRole != ''">
                                                        <template v-if="this.keyRole == '1'">
                                                            Peran: Super-Admin
                                                        </template>
                                                        <template v-else-if="this.keyRole == '2'">
                                                            Peran: Admin
                                                        </template>
                                                        <template v-else-if="this.keyRole == '2'">
                                                            Peran: Member
                                                        </template>
                                                        <br>
                                                    </template>
                                                    <template v-if="this.keyStatus != ''">
                                                        <template v-if="this.keyStatus == '1'">
                                                            Status: Aktif
                                                        </template>
                                                        <template v-else-if="this.keyStatus == '0'">
                                                            Status: Belum diverifikasi
                                                        </template>
                                                        <br>
                                                    </template>
                                                    <template v-if="this.keyStudyProgramName != ''">
                                                        Program Studi: {{this.keyStudyProgramName}} <br>
                                                    </template>
                                                </h5>
                                            </div>
                                            <div class="col-12 pb-3">
                                                <button :disabled="buttonDisabled" @click="backFunction" class="btn w-100 btn-secondary rounded-0">
                                                    <i class="fa fa-arrow-left"></i> &ensp;Kembali
                                                </button>
                                            </div>
                                            <div :class="this.windowWidth >= this.$widthLandscapePhone ? 'mx-2 col-12 pb-3':'mx-2 col-12 pb-3'">
                                                <form class="w-100 d-sm-inline-block form-inline my-2 my-md-0 navbar-search row">
                                                    <div class="input-group col-12">
                                                        <input type="text"
                                                            v-model="form.keyWords"
                                                            name="search"
                                                            class="form-control input-lg bg-light"
                                                            placeholder="Cari Nama/Email/NIM/NIDN"
                                                            aria-label="Code"
                                                            aria-describedby="basic-addon2"
                                                        />
                                                        <template v-if="this.windowWidth > $widthPotraitPhone">
                                                            <select 
                                                                class="form-select form-select mb-3"
                                                                aria-describedby="basic-addon2"
                                                                aria-label=".form-select-lg example"
                                                                v-model="form.code_type"
                                                            >
                                                                <option selected disabled>Jenis Pengguna</option>
                                                                <option value="0">Mahasiswa</option>
                                                                <option value="1">Dosen</option>
                                                            </select>
                                                            <select 
                                                                class="form-select form-select mb-3"
                                                                aria-describedby="basic-addon2"
                                                                aria-label=".form-select-lg example"
                                                                v-model="form.status"
                                                            >
                                                                <option selected disabled>Status</option>
                                                                <option value="1">Aktif</option>
                                                                <option value="0">Belum diverifikasi</option>
                                                            </select>
                                                            <input type="text"
                                                                v-model="form.study_program_keyWords"
                                                                name="study_programs"
                                                                class="form-control input-lg bg-light" 
                                                                placeholder="Program Studi"
                                                                aria-label="Date"
                                                                aria-describedby="basic-addon2"
                                                            />
                                                            <select v-if="$roles == 'Super-Admin'"
                                                                class="form-select form-select mb-3"
                                                                aria-describedby="basic-addon2"
                                                                aria-label=".form-select-lg example"
                                                                v-model="form.roles"
                                                            >
                                                                <option selected disabled>Peran Pengguna</option>
                                                                <option value="1">Super-Admin</option>
                                                                <option value="2">Admin</option>
                                                                <option value="3">Member</option>
                                                            </select>
                                                        </template>
                                                        <div class="input-group-append h-50">
                                                            <button @click="searchFunction" :disabled="buttonDisabled" class="btn btn-primary" type="button">
                                                                <i class="fa fa-search fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div v-if="this.dataArray.length == 0">
                                            <div v-for="item in errorResponse" :key="item.id" class="row">
                                                <div v-if="this.windowWidth <= this.$widthPotraitPhone" class="col-12 d-flex justify-content-evenly">
                                                    <img class="w-100 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                                </div>
                                                <div v-else class="col-12 d-flex justify-content-evenly">
                                                    <img class="w-50 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/404.png'" alt="">
                                                </div>
                                                <div class="text-center col-12 text-sm-justify mt-3">
                                                    <h3 class="h4 mb-0 text-gray-800">{{item.message}}</h3>
                                                </div>
                                                <h6 class="text-center my-3">{{item.detail}}</h6>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div v-if="this.windowWidth > this.$widthLandscapePhone" class="table-responsive">
                                                <table class="table table-hover table-bordered border" id="dataTable" width="100%" cellspacing="0">
                                                    <thead>
                                                        <tr class="text-center">
                                                            <th class="align-middle">No</th>
                                                            <th class="align-middle">Nama</th>
                                                            <th class="align-middle">NIM/NIDN</th>
                                                            <th class="align-middle">Email</th>
                                                            <th class="align-middle">Tipe</th>
                                                            <th class="align-middle">Status</th>
                                                            <th class="align-middle">No WhatsApp</th>
                                                            <th class="align-middle">Program Studi</th>
                                                            <th class="align-middle">Peran Pengguna</th>
                                                            <th class="align-middle" colspan="2">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item, index in this.dataArray" :key="item.id">
                                                            <td class="align-middle text-center">{{index+1}}</td>
                                                            <td class="align-middle text-justify"><b>{{item.name}}</b></td>
                                                            <td class="align-middle text-justify">
                                                                <b>
                                                                    <template v-if="item.code == null">
                                                                        Umum
                                                                    </template>
                                                                    <template v-else>
                                                                        {{item.code}}
                                                                    </template>
                                                                </b>
                                                            </td>
                                                            <td class="align-middle">
                                                                <template v-if="item.email.length < 20">
                                                                    {{item.email}}
                                                                </template>
                                                                <template v-else>
                                                                    {{item.email.substring(0,19)+"..."}}
                                                                </template>
                                                            </td>
                                                            <td v-if="item.code_type == '0'" class="align-middle text-center">
                                                                <b>
                                                                    Mahasiswa
                                                                </b>
                                                            </td>
                                                            <td v-else class="align-middle text-center">
                                                                <b>
                                                                    Dosen
                                                                </b>
                                                            </td>
                                                            <td v-if="item.status == '1'" class="align-middle text-center text-primary">
                                                                <b>
                                                                    Aktif
                                                                </b>
                                                            </td>
                                                            <td v-else class="align-middle text-center text-danger">
                                                                <b>
                                                                    Akun Belum Diaktivasi
                                                                </b>
                                                            </td>
                                                            <td class="align-middle text-left">{{item.phone}}</td>
                                                            <td class="align-middle text-left">
                                                                <template v-if="item.study_program_name == null">
                                                                    &nbsp;
                                                                </template>
                                                                <template v-else>
                                                                    {{ item.study_program_name }}
                                                                </template>
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                {{ item.user_role }}
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                <button type="button" data-bs-toggle="modal" :data-bs-target="'#restoreModal'+item.id" :disabled="buttonDisabled" class="btn w-100 btn-primary">
                                                                    <i class="fa fa-undo"></i> <br> Pulihkan Data
                                                                </button>
                                                            </td>
                                                            <td class="align-middle text-center">
                                                                <button :disabled="buttonDisabled" type="button" data-bs-toggle="modal" :data-bs-target="'#eraseModal'+item.id" class="btn w-100 btn-danger ">
                                                                    <i class="fa fa-trash"></i> <br> Hapus Permanen
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
                                            </div>
                                            <div v-else class="row d-flex justify-content-evenly">
                                                <div v-for="item in this.dataArray" :key="item.id" class="col-sm-6 my-3">
                                                    <div class="card w-100 h-100 btn text-dark text-justify shadow-lg border-bottom-info p-3">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div class="icon"> <i class="fa fa-user"></i> </div>
                                                                <div class="ms-2 c-details">
                                                                    <h6 class="mb-0">Data Pengguna</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="my-2">
                                                            <p>
                                                                <big>Nama: <b>{{item.name}}</b></big><br>
                                                                <big>
                                                                    <template v-if="item.code_type == '0'">
                                                                        NIM: 
                                                                    </template>
                                                                    <template v-else>
                                                                        NIDN:
                                                                    </template>
                                                                    {{item.code}}
                                                                </big>
                                                                <br>
                                                                <big>
                                                                    Email:
                                                                    <template v-if="item.email < 20">
                                                                        {{item.email}}
                                                                    </template>
                                                                    <template v-else>
                                                                        {{item.email.substring(0,19)+"..."}}
                                                                    </template>
                                                                </big>
                                                                <br>
                                                                <big>
                                                                    Status:
                                                                    <template v-if="item.status == '1'">
                                                                        <b class="text-primary">Aktif</b>
                                                                    </template>
                                                                    <template v-else>
                                                                        <b class="text-danger">Akun belum diaktivasi</b>
                                                                    </template>
                                                                </big>
                                                                <br>
                                                                <big>No. WhatsApp: {{item.phone}}</big><br>
                                                                <big v-if="item.study_program_name">Program Studi: {{item.study_program_name}}</big><br>
                                                                <big>Peran Pengguna: <b>{{item.user_role}}</b></big><br>
                                                            </p>
                                                            <div class="mt-3">
                                                                <div class="row my-3 py-2">
                                                                    <div v-if="$roles == 'Super-Admin'" class="col-12 py-2">
                                                                        <button type="button" data-bs-toggle="modal" :data-bs-target="'#restoreModal'+item.id" :disabled="buttonDisabled" class="btn w-100 btn-primary rounded-0">
                                                                            <i class="fa fa-undo"></i> &ensp; Pulihkan Data
                                                                        </button>
                                                                    </div>
                                                                    <div v-if="$roles == 'Super-Admin'" class="col-12 w-100 text-center py-2">
                                                                        ATAU
                                                                    </div>
                                                                    <div class="col-12 py-2">
                                                                        <button :disabled="buttonDisabled" type="button" data-bs-toggle="modal" :data-bs-target="'#eraseModal'+item.id" class="btn w-100 btn-danger rounded-0">
                                                                            <i class="fa fa-trash"></i> &ensp; Hapus Akun
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-for="item in errorResponse" :key="item.id" :class="showAlert == true ? 'col-12':'d-none'">
                                                    <div class="card btn text-dark text-justify shadow-lg border-bottom-info p-3 mb-4">
                                                        <div class="d-flex justify-content-between">
                                                            <div class="d-flex flex-row align-items-center">
                                                                <div class="icon"> <i class="fa fa-pencil-square-o"></i> </div>
                                                                <div class="ms-2 c-details">
                                                                    <h6 class="mb-0">Data Permintaan</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="my-2">
                                                            <h3 class="heading">{{item.message}}</h3>
                                                            <div class="mt-3">
                                                                <div class="row my-3 py-2">
                                                                    <div class="col-12 py-2">
                                                                        <p>{{item.detail}}</p>
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
                                        <div v-if="this.keyCode != NULL ||
                                            this.keyCodeType != NULL ||
                                            this.keyStudyProgramName != NULL ||
                                            this.keyRole != NULL ||
                                            this.keyWords != NULL ||
                                            this.keyStatus != NULL
                                            " class="row my-lg-3 my-5"
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
                isLoadingDelete: false,
                isLoadingRestore: false,
                sidebarShow: true,
                imageLogo: false,
                keyWords: this.$route.query.keyWords,
                keyCode: this.$route.query.code,
                keyCodeType: this.$route.query.codeType,
                keyStatus: this.$route.query.status,
                keyStudyProgramName: this.$route.query.studyProgramName,
                keyRole: this.$route.query.role,
                currentYear: new Date().getFullYear(),
                currentDate: new Date().getDate(),
                currentTime: new Date().getTime(),
                // today: new Date().getDate().getTime(),
                setProgress: false,
                widthProgressBar: 0,
                dataCount: 0,
                skip: 0,
                take: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                form: {
                    keyWords: '',
                    code: '',
                    code_type: 'Jenis Pengguna',
                    status: 'Status',
                    study_program_keyWords: '',
                    roles: 'Peran Pengguna',
                },
                isDateOneIsset: false,
                isDueDateOneIsset: false,
                searchKeyWords: '',
                searchCode: '',
                searchCodeType: '',
                searchStatus: '',
                searchStudyPrograms: '',
                searchRole: null,
                errorResponse: [],
                code: [],
                successResponse: [],
                successDeleteResponse: [],
                sessionData: [],
                dataArray: [],
                deleteArray: [],
                username: this.$session.name,
                errorLoans: false,
                errorMaintenance: false,
                showAlert: false,
                showAlertSuccess: false,
                showAlertError: false,
                successDelete: false,
                successRestore: false,
                accountIcon: this.$baseUrl+'/src/loans/img/account.png'
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
                    console.log(val)
                    this.searchKeyWords = val.keyWords;
                    this.searchCode = val.code;
                    
                    if(val.code_type == '0' || val.code_type == '1') {
                        this.searchCodeType = val.code_type;
                    }

                    if(val.status == '0' || val.status == '1') {
                        this.searchStatus = val.status;
                    }

                    if(val.roles == '1' || val.roles == '2' || val.roles == '3') {
                        this.searchRole = parseInt(val.roles);
                    }

                    this.searchStudyPrograms = val.study_program_keyWords;
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
            trashRouter(){
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
                            this.$router.push({ name: 'manageUser.trash' }).then(() => { this.$router.go() })
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
                    await axios.put('/users/restore', this.dataObject)
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
                    this.skip = this.skip+10;
                    this.take = 10;
                } else {
                    this.skip = this.skip+4;
                    this.take = 4;
                }
                // console.log(this.skip)
                this.getUsers(this.skip, this.take)
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
                            this.$router.push({ name: 'manageUser' }).then(() => { this.$router.go() })
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
                        // console.log(this.searchParams);
                        setTimeout(() => {
                            this.$router.push({ name: 'manageUser', 
                                query: {
                                    keyWords: this.searchKeyWords,
                                    code: this.searchCode,
                                    codeType: this.searchCodeType,
                                    role: this.searchRole,
                                    status: this.searchStatus,
                                    studyProgramName: this.searchStudyPrograms
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
            async delete(id){
                this.isLoadingDelete = true;
                this.buttonDisabled = true;
                this.dataObject = {
                    "ids": [id]
                };
                // this.dataArray = this.dataArray.filter((e) => e.id !== id);
                try {
                    await axios.delete('/users/delete', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data);
                        // this.dataArray = this.dataArray.filter((item) => item.id !== id );
                        this.successDeleteResponse = [
                            {
                                "id": 1,
                                "message": response.data.message,
                                "detail": response.data.data.token
                            }
                        ];
                        this.showAlertSuccess = true;
                        this.isLoadingDelete = false;
                        this.successDelete = true;
                        this.buttonDisabled = false;
                    }).catch((err) => {
                        if(!err.response) {
                            this.errorDelete = [
                                {
                                    'id': 1,
                                    'message': "Network Error", 
                                    'detail': "Silakan periksa jaringan internet anda!",
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingDelete = false;
                        // console.log(err.response);
                        } else if (err.response.data.message == 'Error!'){
                            // console.log(err.response.data);
                            // this.showAlert = true;
                            this.errorDelete = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.data.message,
                                    'detail': err.response.data.data.error
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingDelete = false;
                        } else {
                            this.showAlert = true;
                            this.errorDelete = [
                                {
                                    'id': 1,
                                    'message': err.response.status +' '+ err.response.statusText,
                                    'detail': 'Mohon maaf permintaan anda tidak dapat dilakukan'
                                }
                            ];
                            this.showAlertError = true;
                            this.isLoadingResponse = false;
                            this.buttonDisabled = false;
                            this.isLoadingDelete = false;
                        }
                    });
                    this.isLoadingContent = false;
                } catch (error) {
                    this.errorDelete = [
                        {
                            'id': 1,
                            'message': error.code, 
                            'detail': error.message,
                        }
                    ];
                    this.showAlertError = true;
                    this.isLoadingResponse = false;
                    this.buttonDisabled = false;
                    this.isLoadingDelete = false;
                }
            },
            async getUsers(skip, take){
                // console.log('test1');
                this.showAlert = false;
                // const status = "0"
                this.dataObject = {
                    "skip": skip,
                    "take": take,
                    "status": this.keyStatus,
                    "keyWords": this.keyWords,
                    "code_type": this.keyCodeType,
                    "roles": this.keyRole,
                    "study_program_keyWords": this.keyStudyProgramName,
                    "order": "name",
                    "trash": 1
                }
                try {
                    await axios.get('/users/getAll', {params: this.dataObject})
                    .then((response) => {
                        // console.log(response.data.data.loans);
                        Object.keys(response.data.data.users).forEach((item) => {
                            this.dataArray.push(
                                {
                                    "id": response.data.data.users[item].id,
                                    "name": response.data.data.users[item].name,
                                    "code": response.data.data.users[item].code,
                                    "code_type": response.data.data.users[item].code_type,
                                    "status": response.data.data.users[item].status,
                                    "phone": response.data.data.users[item].phone,
                                    "study_program_id": response.data.data.users[item].study_program_id,
                                    "study_program_name": response.data.data.users[item].study_program_name,
                                    "user_role": response.data.data.users[item].user_role,
                                    "email": response.data.data.users[item].email,
                                }
                            );
                            // console.log(new Date().getTime() == getDueDateTime)
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
            } else if (this.$roles === "Member"){
                this.$router.push({ name: "dashboard" }).then(() => { this.$router.go() });
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
                this.take = 10;
                this.getUsers(this.skip, this.take);
            } else {
                this.take = 4;
                this.getUsers(this.skip, this.take);
            } 
            // this.dataArray.filter((index) => index !== 1 )
            // console.log(this.dataArray.length)

            
            window.scrollTo(0,0);
            // console.log(this.dataArray.length === 0);
            
            // setTimeout(() => this.isLoadingContent = false, 8000);
            setTimeout(() => this.isLoading = false, 3000);
        },
    }
</script>