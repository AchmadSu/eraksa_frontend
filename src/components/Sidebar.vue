<template>
    <ul class="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
        <div :class="this.setProgress == true ? 'fixed-top progress':'d-none'" style="height: 5px;">
            <div class="bg-primary progress-bar" role="progressbar" :style="this.widhtStyle" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <!-- Sidebar - Brand -->
        <a @click="dashboard" class="sidebar-brand align-items-center justify-content-center mb-lg-5" href="#" :style="this.cursorStyle">
            <div class="sidebar-brand-icon">
                <img :class="windowWidth >= this.$widthComputer ? 'w-50 img-thumbnails':'w-50 img-thumbnails'" :src="this.$baseUrl+'/src/assets/img/logo-white-01.png'" alt="">
            </div>
        </a>

        <!-- Divider -->
        <!-- <hr class="sidebar-divider bg-white my-0"> -->
        
        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-tachometer" aria-hidden="true"></i>&ensp;
                <span>Dashboard</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-book" aria-hidden="true"></i>&ensp;
                <span>Modul</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-users" aria-hidden="true"></i>&ensp;
                <span>Peserta</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-comments" aria-hidden="true"></i>&ensp;
                <span>Group Chat</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-user-circle" aria-hidden="true"></i>&ensp;
                <span>Pemateri</span>
            </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider bg-white">

        <a @click="dashboard" class="sidebar-brand text-left" href="#" :style="this.cursorStyle">
            <div class="sidebar-brand-text">Profile</div>
        </a>

        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-cog" aria-hidden="true"></i>&ensp;
                <span>Settings</span>
            </a>
        </li>
        <li class="nav-item">
            <a @click="dashboard" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-calendar" aria-hidden="true"></i>&ensp;
                <span>Calendar</span>
            </a>
        </li>
        <hr class="sidebar-divider bg-white mt-3">
        <li class="nav-item">
            <a @click="logout" class="nav-link" href="#" :style="this.cursorStyle">
                <i class="fa fa-power-off" aria-hidden="true"></i>&ensp;
                <span>Logout</span>
            </a>
        </li>
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
            async logout(){
                // console.log("Test")
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
                    setTimeout(() => this.$router.push({ name: "user.login" }), 3000);
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