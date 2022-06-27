

<script>
export default {
  name: "MatchMode",
  data(){
    return{
      gameMode:'competitive'

    }
  },
  methods:{
    gameModeChange() {

      this.$emit('matchModeToHome', this.gameMode)
    }
  }
}
</script>

<style scoped>

</style>