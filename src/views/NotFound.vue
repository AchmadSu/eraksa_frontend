<template>
    <div class="min-vh-100 container-fluid text-center bg-light text-danger position-absolute top-50 start-50 translate-middle p-5">
        <div class="my-5">
            <h3><font-awesome-icon icon="fa-solid fa-triangle-exclamation" /></h3>
            <h4>404 | Page Not Found!</h4>
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
    // this.isLoading = true;
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
    // window.scrollTo(0,0);
    setTimeout(() => this.isLoading = false, 2000);
  }
}

</script>