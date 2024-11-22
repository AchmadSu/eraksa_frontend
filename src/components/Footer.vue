<template>
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; Ecep Achmad Sutisna {{ this.currentYear }}</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->
</template>

<script>
    export default{
        data() {
            return {
                currentYear: new Date().getFullYear(),
            }
        },
        mounted(){
            window.onresize = () => {
                this.windowWidth = window.innerWidth
                // window.location.reload();
            }
        }
    }
</script>