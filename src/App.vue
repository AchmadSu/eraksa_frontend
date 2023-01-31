<template>
    <router-view></router-view>
</template>

<script>
// import LoadingPage from './components/LoadingPage';
import { useRouter } from 'vue-router'
export default {
  // name: 'App',
  data(){
    return {
      windowWidth: window.innerWidth,
      currentYear: new Date().getFullYear(),
    }
  },
  methods: {
    sizeHandler(e){
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
    }
  },
  created(){
      window.addEventListener("resize", this.sizeHandler);
  },
  destroyed() {
      window.removeEventListener("resize", this.sizeHandler);
  },
  mounted(){
    // this.isLoading = true;
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
    // window.onpopstate =  ((e)=>{
    //   history.go(e)
    // });
    // window.scrollTo(0,0);
    setTimeout(() => this.isLoading = false, 2000);
  }
}

</script>