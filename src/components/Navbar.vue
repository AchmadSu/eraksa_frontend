<template>
    <nav :class="this.windowWidth >= this.$widthPotraitPhone ? 'navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow' : 'navbar navbar-expand navbar-light bg-white topbar py-3 mb-4 fixed-top shadow'">
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="bg-primary progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <ul class="navbar-nav">
            <!-- Sidebar Toggle (Topbar) -->
            <li class="nav-item" v-if="this.windowWidth < this.$widthComputer">
                <a class="nav-link btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </a>
            </li>
        </ul>

        <ul class="navbar-nav d-sm-block d-md-none">
            <li class="nav-item">
                <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                    <img v-if="this.windowWidth <= this.$widthPotraitPhone" class="w-75 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/logo-01.png'" alt="">
                    <img v-else-if="this.windowWidth > this.$widthPotraitPhone && this.windowWidth <= 640" class="w-75 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/logo.png'" alt="">
                    <img v-else-if="this.windowWidth <= this.$widthComputer" class="w-25 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/logo.png'" alt="">
                </a>
            </li>
        </ul>
        <!-- Topbar Search -->
        <div class="row">
            <div class="col-8">
                <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div class="input-group">
                        <input type="text" class="form-control input-lg bg-light" placeholder="Cari Aset, Kategori Aset..."
                            aria-label="Search" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button">
                                <i class="fa fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">
            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" href="#" :style="this.cursorStyle" id="searchDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-search fa-fw"></i>
                </a>
                <!-- Dropdown - Messages -->
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown">
                    <form class="form-inline mr-auto w-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small"
                                placeholder="Search for..." aria-label="Search"
                                aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fa fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" :style="this.cursorStyle" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-success"><b>{{username}}</b></span>
                    <img class="img-profile rounded-circle" :src="this.accountIcon">
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-user mr-2 text-primary"></i>
                        Ubah Profil
                    </a>
                    <div class="dropdown-divider"></div>
                    <a @click="logout" class="dropdown-item" href="#" :style="this.cursorStyle">
                        <i class="fa fa-sign-out fa-sm mr-2 text-danger"></i>
                        Logout
                    </a>
                </div>
            </li>
        </ul>
    </nav>
    <div class="bg-primary offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header text-light">
            <a @click="dashboard" class="sidebar-brand align-items-center justify-content-center ml-3" href="#" :style="this.cursorStyle">
                <img class="w-75 img-thumbnails" :src="this.$baseUrl+'/src/assets/img/logoPhone-white.png'" alt="">
            </a>
          <a class="mr-3 btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></a>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav sidebar-dark accordion" id="accordionSidebar">
                <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
                    <div class="bg-success progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                
                <!-- Nav Item - Dashboard -->
                <li class="nav-item mb-0">
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
                <li v-if="this.$roles != 'Member'" class="nav-item my-2">
                    <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fa fa-clone" aria-hidden="true"></i>&ensp;
                        <span>Kelola Master</span>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <ul class="list-group list-group-flush">
                                <li v-if="this.$roles == 'Super-Admin'" @click="manageStudyPrograms" class="list-group-item">
                                    <a class="text-dark collapse-item" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-graduation-cap"></i>&ensp; Program Studi
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        &nbsp;<i class="fa fa-map-marker"></i>&ensp;&nbsp; Penempatan Aset
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-cubes"></i>&ensp;Kategori Aset
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"><i class="fa fa-briefcase"></i>&ensp; Bengkel Perawatan</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <!-- Nav Item - Pages Collapse Menu -->
                <li class="nav-item my-2">
                    <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        &ensp;<span>Kelola Peminjaman</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"> <i class="fa fa-plus-circle"></i>&ensp; Buat Peminjaman</a>
                                </li>
                                <li v-if="this.$roles != 'Member'" class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"><i class="fa fa-spinner"></i>&ensp; Aktif</a>
                                </li>
                                <li v-if="this.$roles != 'Member'" class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"><i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru</a>
                                </li>
                                <li v-if="this.$roles != 'Member'" class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"><i class="fa fa-check"></i>&ensp; Selesai</a>
                                </li>
                                <li v-if="this.$roles != 'Member'" class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"><i class="fa fa-times"></i>&ensp; Permintaan Ditolak</a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle"> <i class="fa fa-history"></i>&ensp; Riwayat Saya</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
        
                <li v-if="this.$roles != 'Member'" class="nav-item my-2">
                    <a class="nav-link collapsed" href="#" :style="this.cursorStyle" data-toggle="collapse" data-target="#collapseMaintenances"
                        aria-expanded="true" aria-controls="collapseMaintenances">
                        <i class="fa fa-recycle" aria-hidden="true"></i>&ensp;
                        <span>Kelola Perawatan</span>
                    </a>
                    <div id="collapseMaintenances" class="collapse" aria-labelledby="headingMaintenances"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-spinner"></i>&ensp; Aktif
                                    </a>
                                </li>
                                <li v-if="this.$roles == 'Super-Admin'" class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-paper-plane"></i>&ensp; Permintaan Baru
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-check"></i>&ensp; Selesai
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-times"></i>&ensp; Permintaan Ditolak
                                    </a>
                                </li>
                                <li class="list-group-item">
                                    <a class="collapse-item text-dark" href="#" :style="this.cursorStyle">
                                        <i class="fa fa-plus-circle"></i>&ensp; Buat Jadwal Perawatan
                                    </a>
                                </li>
                            </ul>
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
                <li v-if="this.$roles != 'Member'" class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        <i class="fa fa-users"></i>&ensp;
                        <span>Kelola Users</span>
                    </a>
                </li>
        
                <!-- Nav Item - Assets -->
                <li v-if="this.$roles != 'Member'" class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        <i class="fa fa-cube"></i>&ensp;
                        <span>Kelola Aset</span>
                    </a>
                </li>
        
                <!-- Divider -->
                <hr v-if="this.$roles != 'Member'" class="sidebar-divider d-none d-md-block">
        
                <!-- Divider -->
                <hr class="sidebar-divider bg-white">
        
                <div class="sidebar-heading">
                    Menu Master
                </div>
                <!-- Nav Item - Pages Collapse Menu -->
                <li class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        <i class="fa fa-graduation-cap"></i>&ensp;
                        <span>Program Studi</span>
                    </a>
                </li>
                <li class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        <i class="fa fa-cubes"></i>&ensp;
                        <span>Kategori Aset</span>
                    </a>
                </li>
                <li class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        &nbsp;<i class="fa fa-map-marker"></i>&nbsp;&ensp;
                        <span>Tempat Aset</span>
                    </a>
                </li>
                <li v-if="this.$roles != 'Member'" class="nav-item my-2">
                    <a class="nav-link" href="#" :style="this.cursorStyle">
                        <i class="fa fa-briefcase"></i>&ensp;
                        <span>Bengkel</span>
                    </a>
                </li>
            </ul>
        </div>
      </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
                isLoading: true,
                isLoading: true,
                show: true,
                isLoadingResponse: false,
                isLoadingRouter: false,
                isLoadingImage: true,
                currentYear: new Date().getFullYear(),
                setProgress: false,
                widthProgressBar: 0,
                intervalProgressbar: null,
                widhtStyle: '',
                cursorStyle: '',
                errorResponse: [],
                sessionData: [],
                username: this.$session.name,
                accountIcon: this.$baseUrl+'/src/assets/img/account.png'
            }
        },
        methods: {
            toggleSideBar(){
                this.$parent.$emit('toggleSideBar')
            },
            dashboard(){
                this.setProgress = true;
                // console.log(this.setProgress);
                this.cursorStyle = 'cursor: not-allowed';
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
            },
            manageStudyPrograms(){
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
                            this.$router.push({ name: 'manageStudyPrograms' }).then(() => { this.$router.go() })
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
            async logout(){
                console.log("Test")
                this.setProgress = true;
                this.isLoadingRouter = true;
                this.submitEnabled = false;
                this.cursorStyle = 'cursor: not-allowed';
                try {
                    if(this.setProgress == true) {
                        this.intervalProgressbar = setInterval(() => {
                            this.widthProgressBar += 35;
                            this.widhtStyle = "width: "+ this.widthProgressBar.toString() +"%;";
                            if(this.widthProgressBar == 100) {
                                clearInterval(this.intervalProgressbar);
                                this.widthProgressBar = 0;
                                this.setProgress == false;
                                // this.setProgress = false;
                            }
                            // console.log(this.widhtStyle);
                        }, 1000);
                    }
                    await axios.post('/logout')
                    localStorage.clear();
                    setTimeout(() => this.$router.push({ name: "user.login" }), 4000);
                } catch (e) {
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
            window.RemoveEventListener('resize', function(event) {
                // console.log('hehe')
                this.windowWidth = window.innerWidth;
            }, true)
        },  
        mounted() {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            });
        },
    }
</script>