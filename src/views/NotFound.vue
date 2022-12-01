<template>
  <div class="position-relative min-vh-100">
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="text-center text-danger">
          <h3><font-awesome-icon icon="fa-solid fa-triangle-exclamation" /></h3>
          <h4 v-if="this.windowWidth > this.$widhRotatePhone">404 | Page Not Found!</h4>
          <h4 v-else>404 | Not Found!</h4>
      </div> 
    </div>
  </div>
</template>

<script>
// import LoadingPage from './components/LoadingPage';
export default {
  // name: 'App',
  data(){
    return {
    //   isLoading: true,
      windowWidth: window.innerWidth,
      currentYear: new Date().getFullYear(),
    }
  },
  mounted(){
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
    // window.scrollTo(0,0);
    setTimeout(() => this.isLoading = false, 2000);
  }
}

</script>