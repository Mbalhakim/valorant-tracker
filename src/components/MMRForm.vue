<template>
  <div class = "bg-dark  p-3 mt-5 text-center fw-bold text-danger" style="width: 100%" >

    <form @submit.prevent="axiosEmitRequest">
      <div class ="row">
        <div class ="col">
          <label for = "userName"> UserName</label>
          <input class = "form-control"
                 type="text"
                 name="UserName"
                 id="userName"
                 placeholder="Tenz"
                 v-model="userName"
                 required>
        </div>
        <div class = "col">
          <label for = "TagLine">Tag Line</label>
          <input  class = "form-control"
                  type="text"
                  name="TagLine"
                  id="TagLine"
                  placeholder="EU23"
                  v-model="tagLine"
                  required
          >
        </div>
        <div class="col px-sm-1">
          <label for = "regionSelect"> Region</label>
          <select class="form-select "  id="regionSelect" v-model="region">
            <option value="na">North America</option>
            <option value="ap">Asia-Pacific</option>
            <option value="eu">Europe</option>
            <option value="kr">Korea</option>
          </select>
        </div>
        <div class = "col mt-4 text-center">
          <button type = "submit" class = "btn btn-danger text-light fw-bolder"> Submit </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "MMRForm",
  data() {
    return {
      userName: 'tenz',
      tagLine: '2001',
      region:'eu'
    }
  },
  methods:{
    axiosEmitRequest() {
      const userCredReg = {
        'userName': this.userName,
        'tagLine': this.tagLine,
        'region':this.region
      }
      this.$emit('childToHomeParent', userCredReg)
    },
  }
}
</script>

<style scoped>

</style>