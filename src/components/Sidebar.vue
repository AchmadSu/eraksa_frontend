<template>
    
</template>
<script>
    export default{
        data() {
            return {
                windowWidth: window.innerWidth,
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