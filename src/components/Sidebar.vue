<template>
    <ul class="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="bg-primary progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <!-- Sidebar - Brand -->
        <a @click="dashboard" class="sidebar-brand align-items-center justify-content-center mb-lg-5" href="#" :style="this.cursorStyle">
            <div class="sidebar-brand-icon">
                <img :class="windowWidth >= this.$widthComputer ? 'w-25 img-thumbnails':'w-50 img-thumbnails'" :src="this.$baseUrl+'/src/assets/img/logo-white-01.png'" alt="">
            </div>
            <div class="sidebar-brand-text my-5 mx-3">Eraksa</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider bg-white my-0">
        
        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-home" aria-hidden="true"></i>&ensp;
                <span>Home</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider bg-white">

        <!-- Heading -->
        <div v-if="this.$roles != 'Member'" class="sidebar-heading">
            Menu Admin
        </div>

        <div v-else class="sidebar-heading">
            Menu Kelola
        </div>
        <!-- Nav Item - Pages Collapse Menu -->
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fa fa-clone" aria-hidden="true"></i>&ensp;
                <span>Kelola Master</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Master Tabel</h6>
                    <a @click="router('manageStudyPrograms')" :class="this.$roles == 'Super-Admin' ? 'd-block collapse-item': 'd-none'" href="#" :style="this.cursorStyle"><i class="fa fa-graduation-cap"></i>&ensp; Program Studi</a>
                    <a @click="router('managePlacements')" class="collapse-item" href="#" :style="this.cursorStyle" aria-disabled="true">
                        &nbsp;<i class="fa fa-map-marker"></i>&ensp;&nbsp; Penempatan Aset
                    </a>
                    <a @click="router('manageCategoryAssets')" class="collapse-item" href="#" :style="this.cursorStyle"><i class="fa fa-cubes"></i>&ensp;Kategori Aset</a>
                    <!-- <a @click="router('manageWorkshops')" class="collapse-item" href="#" :style="this.cursorStyle"><i class="fa fa-briefcase"></i>&ensp; Bengkel Perawatan</a> -->
                </div>
            </div>
        </li>
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&ensp;
                <span>Kelola Peminjaman</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Peminjaman</h6>
                    <a @click="router('loans.create')" class="collapse-item" href="#" :style="this.cursorStyle"> 
                        <i class="fa fa-plus-circle"></i>&ensp; Buat Peminjaman
                    </a>
                    <a @click="router('manageLoans.accept')" v-if="this.$roles != 'Member'" class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-spinner"></i>&ensp; Aktif
                    </a>
                    <a @click="router('manageLoans.request')" v-if="this.$roles != 'Member'" class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru
                    </a>
                    <a @click="router('manageLoans.done')" v-if="this.$roles != 'Member'" class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-check"></i>&ensp; Selesai
                    </a>
                    <a @click="router('manageLoans.reject')" v-if="this.$roles != 'Member'" class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-times"></i>&ensp; Permintaan Ditolak
                    </a>
                    <a @click="router('loans.myHistory')" class="collapse-item" href="#" :style="this.cursorStyle"> 
                        <i class="fa fa-history"></i>&ensp; Riwayat Saya
                    </a>
                </div>
            </div>
        </li>

        <!-- <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseMaintenances"
                aria-expanded="true" aria-controls="collapseMaintenances">
                <i class="fa fa-recycle" aria-hidden="true"></i>&ensp;
                <span>Kelola Perawatan</span>
            </a>
            <div id="collapseMaintenances" class="collapse" aria-labelledby="headingMaintenances"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Jadwal Perawatan</h6>
                    <a class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-plus-circle"></i>&ensp; Buat Jadwal
                    </a>
                    <a class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-spinner"></i>&ensp; Aktif
                    </a>
                    <a v-if="this.$roles == 'Super-Admin'" class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru
                    </a>
                    <a class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-check"></i>&ensp; Selesai
                    </a>
                    <a class="collapse-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-times"></i>&ensp; Permintaan Ditolak
                    </a>
                    <a class="collapse-item" href="#" :style="this.cursorStyle"> 
                        <i class="fa fa-history"></i>&ensp; Riwayat Saya
                    </a>
                </div>
            </div>
        </li> -->

        <!-- Divider -->
        <hr v-if="this.$roles != 'Member'" class="sidebar-divider">

        <!-- Heading -->
        <div v-if="this.$roles != 'Member'" class="sidebar-heading">
            Kelola Objek
        </div>

        <!-- Nav Item - Users -->
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a @click="router('manageUser')" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-users"></i>&ensp;
                <span>Kelola Users</span>
            </a>
        </li>

        <!-- Nav Item - Assets -->
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a @click="router('manageAssets')" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-cube"></i>&ensp;
                <span>Kelola Aset</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block">

        <!-- Divider -->
        <hr class="sidebar-divider bg-white">

        <div class="sidebar-heading">
            Menu Master
        </div>
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a @click="router('menu.studyPrograms')" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-graduation-cap"></i>&ensp;
                <span>Program Studi</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="router('menu.categories')" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-cubes"></i>&ensp;
                <span>Kategori Aset</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="router('menu.placements')" class="nav-link" href="#" :style="this.cursorStyle">
                &nbsp;<i class="fa fa-map-marker"></i>&nbsp;&ensp;
                <span>Tempat Aset</span>
            </a>
        </li>
        <!-- <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-briefcase"></i>&ensp;
                <span>Bengkel</span>
            </a>
        </li> -->
    </ul>
</template>
<script>
    import axios from 'axios';
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                isLoadingRouter: false,
                isLoadingImage: true,
                cursorStyle: '',
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                studyProgramsArray: [],
                errorStudyPrograms: false,
                errorResponse: [],
                categoryAssetsArray: [],
                errorCategoryAssets: false,
                workshopsArray: [],
                errorWorkshops: false,
                placementsArray: [],
                errorPlacements: false,
                errorResponse: [],
                sessionData: [],
            }
        },
        methods: {
            dashboard(){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.cursorStyle = 'cursor: not-allowed';
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
                            this.$router.push({ name: 'dashboard' }).then(() => { this.$router.go() })
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
            router(name){
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.secondaryButtonDisabled = true;
                this.submitEnabled = false;
                this.cursorStyle = 'cursor: not-allowed';
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
                            this.$router.push({ name: name }).then(() => { this.$router.go() })
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
        },
        created(){
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        },
        destroyed() {
            // window.removeEventListener("resize", this.sizeHandler);
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
        }
    }
    
</script>