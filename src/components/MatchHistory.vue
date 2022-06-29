<template>

  <section v-if="matchAccountHolder.data" class="bg-dark text-light py-5">
    <div class="container">
      <h1>Match History</h1>

<match-results />
    </div>
  </section>


</template>

<script>


import MatchResults from "@/components/matchResults";

export default {
  name: "MatchHistory",
  components: {MatchResults},
  props: ['matchAccountHolder'],
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




  },
}
</script>

<style scoped>

</style>