<template>
  <div class = "bg-dark  p-3 mt-5 text-center fw-bold text-danger" style="width: 100%" >

    <form @submit.prevent="EmitData">
      <div class ="row">
        <div class="col">
          <label for = "category">Category</label>
          <select class="form-select "  id="category" v-model="category">
            <option value="game_updates">Game updates</option>
            <option value="dev">Dev</option>
            <option value="esports">Esports</option>
<!--            <option value="announcments">Announcments</option>-->
          </select>
        </div>
        <div class="col">
          <label for = "language"> Region</label>
          <select class="form-select "  id="language" v-model="language">
            <option value="en-us">English-US</option>
            <option value="de-de">German</option>
            <option value="es-es">Spanish</option>
            <option value="fr-fr">French</option>
            <option value="it-it">Italian</option>
            <option value="ru-ru">Russian</option>
            <option value="tr-tr">Turkish</option>
            <option value="es-mx">Spanish (Mexico)</option>
            <option value="ko-kr">Korean</option>
            <option value="pt-br">Portuguese</option>

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
  name: "NewsForm",
  data(){
    return{
      language:"en-us",
      category:"game_updates",
    }
  },
  methods:{
    EmitData() {
      const article = {
        'articleCategory': this.category,
        'articleLanguage': this.language,

      }
      this.$emit('childToHomeParent', article)
    },
  }
}
</script>

<style scoped>

</style>