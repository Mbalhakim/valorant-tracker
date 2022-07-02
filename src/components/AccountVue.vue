<template>


 <section v-if="accountResponse.data"  id="accountImg" class="p-5 bg-dark pt-lg-0 text-light img-fluid">

   <div class="container">
<div class="row">
  <div class="col mt-md-5">
    <figure>
      <img id="profileImg" class=" img-fluid rounded-circle" :src="accountResponse.data.card.small" alt="">
      <figcaption class=" px-md-4">Level: {{accountResponse.data.account_level}}</figcaption>
    </figure>
  </div>
  <div class="col mt-md-5">
<div class=" mt-md-5 ">
  <h1 class="profileName">{{accountResponse.data.name}} <span class="bg-dark rounded-1 text-light">#{{accountResponse.data.tag}}</span></h1>
</div>
  </div>
</div>
   </div>
   
 </section>



<!--  {{ accountResponse }}-->

</template>

<script>


export default {
  name: "AccountVue",
  components: {},
  data() {
    return {
      // accountData:{},
      // userName:'',
      // tagLine:'',

    }
  },
  props: ['accountResponse'],
  methods: {}
}
</script>

<style scoped>
#accountImg {
  /*background-repeat: no-repeat;*/
  /*background-size: auto;*/
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/hero-jett.webp");
  max-width:100%;
  height:auto;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;


}
@media (min-width: 375px){
  figure{
    width: 58%;

  }

}


</style>