<template>
  <div class="position-relative min-vh-100">
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="text-center text-danger">
          <h3><font-awesome-icon icon="fa-solid fa-triangle-exclamation" /></h3>
          <h4 v-if="this.windowWidth > this.$widhRotatePhone">404 | Page Not Found!</h4>
          <h4 v-else>404 | Not Found!</h4>
          <div class="row my-4 d-flex justify-content-center">
            <button @click="backFunction" :disabled="buttonDisabled" class="btn btn-light w-100">
                <i class="fa fa-arrow-left"></i>&ensp; Kembali
            </button>
        </div>
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
  methods: {
    backFunction(){      
      this.$router.push({ name: 'dashboard' }).then(() => { this.$router.go() })
    },
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