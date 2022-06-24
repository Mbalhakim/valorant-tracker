<template>
  <div class = "container mt-3">
    <h1> Account Data Form</h1>
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
                  placeholder="EUW3 no #"
                  v-model="tagLine"
                  required
          >
        </div>
        <div class = "col mt-4">
          <button type = "submit" class = "btn btn-danger"> Submit </button>
        </div>
      </div>
    </form>
  </div>



</template>

<script>
export default {
  name: "AccountForm",
  data() {
    return {
      userName: '',
      tagLine: ''
    }
  },
  methods:{
    axiosEmitRequest() {
      const userCred = {
        'userName': this.userName,
        'tagLine': this.tagLine
      }
      this.$emit('childToHomeParent', userCred)
    },
  }
}
</script>

<style scoped>

</style>