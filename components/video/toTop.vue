<template>
    <div>
        <div class="toTop" @click="scrollToTop()" v-show="backTopShow">
            <i class="iconfont icon-huidaodingbu"></i>
        </div>
    </div>
</template>
<style scoped>
     .toTop {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  position: fixed;
  right: 80px;
  bottom: 80px;
  color: #fff;
  background-color: #a6a6a6;
  cursor: pointer; }

.toTop:hover {
  background-color: #F25A36; }

</style>
<script type="text/ecmascript-6">
    export default {
        name:'toTop',
        data(){
            return {
                backTopShow:false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            scrollToTop() {
                // let back = setInterval(() => {
               document.body.scrollTop = document.documentElement.scrollTop = 0;
                // });
                // if (document.body.scrollTop!=0) {
                //     clearInterval(back)
                // }
            },
            handleScroll(){
                if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
                this.backTopShow=true;
                }
                else {
                this.backTopShow=false;
                }
            }
        }
    }
</script>
