<template>
    <ul class="navbar-nav bg-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="bg-success progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <!-- Sidebar - Brand -->
        <a @click="dashboard" class="sidebar-brand align-items-center justify-content-center mb-lg-5" href="#">
            <div class="sidebar-brand-icon">
                <img :class="windowWidth >= this.$widthComputer ? 'w-25 img-thumbnails':'w-50 img-thumbnails'" :src="this.$baseUrl+'/src/assets/img/logo-white-01.png'" alt="">
            </div>
            <div class="sidebar-brand-text my-5 mx-3">Eraksa</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider bg-white my-0">
        
        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a @click="dashboard" class="nav-link" href="#">
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
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fa fa-clone" aria-hidden="true"></i>&ensp;
                <span>Kelola Master</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Master Tabel</h6>
                    <a :class="this.$roles == 'Super-Admin' ? 'd-block collapse-item': 'd-none'" href="#"><i class="fa fa-graduation-cap"></i>&ensp; Program Studi</a>
                    <a class="collapse-item" href="#">
                        &nbsp;<i class="fa fa-map-marker"></i>&ensp;&nbsp; Penempatan Aset
                    </a>
                    <a class="collapse-item" href="#"><i class="fa fa-cubes"></i>&ensp;Kategori Aset</a>
                    <a class="collapse-item" href="#"><i class="fa fa-briefcase"></i>&ensp; Bengkel Perawatan</a>
                </div>
            </div>
        </li>
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>&ensp;
                <span>Kelola Peminjaman</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Peminjaman</h6>
                    <a class="collapse-item" href="#"> 
                        <i class="fa fa-plus-circle"></i>&ensp; Buat Peminjaman
                    </a>
                    <a v-if="this.$roles != 'Member'" class="collapse-item" href="#">
                        <i class="fa fa-spinner"></i>&ensp; Aktif
                    </a>
                    <a v-if="this.$roles != 'Member'" class="collapse-item" href="#">
                        <i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru
                    </a>
                    <a v-if="this.$roles != 'Member'" class="collapse-item" href="#">
                        <i class="fa fa-check"></i>&ensp; Selesai
                    </a>
                    <a v-if="this.$roles != 'Member'" class="collapse-item" href="#">
                        <i class="fa fa-times"></i>&ensp; Permintaan Ditolak
                    </a>
                    <a class="collapse-item" href="#"> 
                        <i class="fa fa-history"></i>&ensp; Riwayat Saya
                    </a>
                </div>
            </div>
        </li>

        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMaintenances"
                aria-expanded="true" aria-controls="collapseMaintenances">
                <i class="fa fa-recycle" aria-hidden="true"></i>&ensp;
                <span>Kelola Perawatan</span>
            </a>
            <div id="collapseMaintenances" class="collapse" aria-labelledby="headingMaintenances"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Jadwal Perawatan</h6>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-spinner"></i>&ensp; Aktif
                    </a>
                    <a v-if="this.$roles == 'Super-Admin'" class="collapse-item" href="#">
                        <i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru
                    </a>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-check"></i>&ensp; Selesai
                    </a>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-times"></i>&ensp; Permintaan Ditolak
                    </a>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-plus-circle"></i>&ensp; Buat Jadwal Perawatan
                    </a>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr v-if="this.$roles != 'Member'" class="sidebar-divider">

        <!-- Heading -->
        <div v-if="this.$roles != 'Member'" class="sidebar-heading">
            Kelola Objek
        </div>

        <!-- Nav Item - Users -->
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link" href="#">
                <i class="fa fa-users"></i>&ensp;
                <span>Kelola Users</span>
            </a>
        </li>

        <!-- Nav Item - Assets -->
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link" href="#">
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
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProdi"
                aria-expanded="true" aria-controls="collapseProdi">
                <i class="fa fa-graduation-cap"></i>&ensp;
                <span>Program Studi</span>
            </a>
            <div id="collapseProdi" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Daftar Prodi</h6>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-thumb-tack" aria-hidden="true"></i>&ensp; Teknik Informatika
                    </a>
                </div>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCategory"
                aria-expanded="true" aria-controls="collapseCategory">
                <i class="fa fa-cubes"></i>&ensp;
                <span>Kategori Aset</span>
            </a>
            <div id="collapseCategory" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Daftar Kategori</h6>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-thumb-tack" aria-hidden="true"></i>&ensp; Projector
                    </a>
                </div>
            </div>
        </li>
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePlacement"
                aria-expanded="true" aria-controls="collapsePlacement">
                &nbsp;<i class="fa fa-map-marker"></i>&ensp;&nbsp;
                <span>Tempat Aset</span>
            </a>
            <div id="collapsePlacement" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Daftar Penempatan</h6>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-thumb-tack" aria-hidden="true"></i>&ensp; Nama Tempat
                    </a>
                </div>
            </div>
        </li>
        <li v-if="this.$roles != 'Member'" class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseWorkshop"
                aria-expanded="true" aria-controls="collapseWorkshop">
                <i class="fa fa-briefcase"></i>&ensp;
                <span>Bengkel Perawatan</span>
            </a>
            <div id="collapseWorkshop" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Bengkel Perawatan</h6>
                    <a class="collapse-item" href="#">
                        <i class="fa fa-thumb-tack" aria-hidden="true"></i>&ensp; Nama Bengkel
                    </a>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
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
            }
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
            }
            window.scrollTo(0,0);
        }
    }
    
</script>