<template>

  <section class="p-5 bg-dark text-light">
    <div class="container">
      <h1>Match History</h1>
<match-results :match-player="matchAccountHolder"  :matches="matchHistoryResponse"/>
    </div>
  </section>
</template>

<script>


import MatchResults from "@/components/matchResults";
export default {
  name: "MatchHistory",
  components: {MatchResults},
  props: ['matchHistoryResponse', 'matchAccountHolder'],
  data() {
    return {
      matchKEy: '',
      matchHistory: {},
      userName: '',
      tagLine: '',
      region: '',
      gameMode: 'competitive',
      allPlayers: [],
      playerTeam: {"team": ""},
      matchResultsBlue: [],
      matchResultsRed: [],
    }
  },

  methods: {
    // isPlayer(player) {
    //   return player.name === 'Tenz'
    // },



  },
}
</script>

<style scoped>

</style>