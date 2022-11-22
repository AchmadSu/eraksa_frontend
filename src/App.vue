<template>
  <div v-if="isLoading == true" class="min-vh-100 container-fluid bg-light position-absolute">
    <div class="position-absolute top-50 start-50 translate-middle p-5 text-center">
        <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span> <h3 class="text-primary">Processing</h3>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
// import LoadingPage from './components/LoadingPage';
export default {
  // name: 'App',
  data(){
    return {
      isLoading: true,
      windowWidth: window.innerWidth,
      currentYear: new Date().getFullYear(),
    }
  },
  mounted(){
    // this.isLoading = true;
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
    // window.scrollTo(0,0);
    setTimeout(() => this.isLoading = false, 2000);
  }
}

</script>