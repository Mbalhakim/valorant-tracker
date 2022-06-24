<template>
  <button @click="getMatchResults">match results</button>
  <div v-if="matchResult" class=" text-white">
    <div v-for="(match, index) in matchResult" :key="index" class=" h5 ">


      <div
          :style="{ 'background-image': `url(${require('@/assets/maps/' + match.metadata.map + '.jpg')})`,'background-size':'cover' , 'background-repeat':'no-repeat' }"
          class=" img-fluid bg-primary p-2" v-if="match.team==='Blue' "><span>Method 1</span> <br/>Blue Team <br/>
        <span class="bg-primary"> Player:{{ match.characterPro }}</span><br/>
        <span class="bg-success"> Stats: K:{{ match.stats.kills }} D:{{ match.stats.deaths }} A:{{ match.stats.assists }}</span>
        Map: {{ match.metadata.map }} ||
        Result: {{ match.teams.blue.rounds_won }} -
        {{ match.teams.blue.rounds_lost }}
      </div>
      <!--          player team is blue but blue team lost-->

      <div
          :style="{ 'background-image': `url(${require('@/assets/maps/' + match.metadata.map + '.jpg')})`,'background-size':'cover' , 'background-repeat':'no-repeat' }"
          class="img-fluid bg-danger p-2" v-else-if="match.team==='Red' "><span>Method 2</span> <br/>Red Team<br/>
        <span class="bg-danger"> Player:{{ match.characterPro }}</span><br/>
        <span class="bg-success"> Stats: K:{{ match.stats.kills }} D:{{ match.stats.deaths }} A:{{ match.stats.assists }}</span>
        Map:{{ match.metadata.map }} Result: {{ match.teams.red.rounds_won }} -
        {{ match.teams.red.rounds_lost }}
      </div>


    </div>

  </div>
</template>

<script>
let playerName;
let match;
let player;
export default {
  name: "matchResults",
  data() {
    return {
      matchKEy: '',
      matchHistory: {},
      userName: '',
      tagLine: '',
      region: '',
      gameMode: 'competitive',
      allPlayers: [],
      playerTeam: {"teamPro": "", "characterPro": ""},
      playerStats: {},
      matchResult: [],
      matchResultsBlue: [],
      matchResultsRed: [],

    }

  },
  props: ['matches', 'matchPlayer'],
  methods: {
    getMatchResults() {
      this.matchResult = [];

      playerName = this.matchPlayer.data.name;

      for (match of this.matches.data.data) {
        this.allPlayers = match.players.all_players;

        for (player of this.allPlayers) {


          if (player.name === playerName) {

            this.playerTeam.teamPro = player.team
            this.playerTeam.characterPro = player.character

            let returnTarget = Object.assign(match, player, this.playerTeam);
            // this.playerStats = Object.assign(player)
            // console.log( "Stats" ,this.playerStats)
            this.matchResult.push(returnTarget)
            console.log(this.matchResult)

            // console.log(match, player.name, match.metadata.map)


          } else {
            console.log("No match")
          }


        }


      }

    },
  }
}
</script>

<style scoped>

</style>


<!--
 this.matchResultsBlue = [];
      this.matchResultsRed = [];
      playerName = this.matchPlayer.data.name;
      // playerName = this.userName.charAt(0).toUpperCase() +this.userName.slice(1);
      // console.log(playerName)
      // this.matchHistoryResponse.data.data.forEach(player => console.log(player.players.all_players) && const )
      for ( match of this.matches.data.data) {
        this.allPlayers = match.players.all_players;
        // console.log(this.allPlayers)
        for ( player of this.allPlayers) {
          // console.log(player)
          // console.log(playerName ,player.name)

          if (player.name === playerName && player.team === "Blue") {
            this.playerTeam.team = player.team
            // console.log(player.name , player.team)

            this.matchResultsBlue.push(match)
            console.log(match, player.name, "Team Blue", match.metadata.map)



          } else if(player.name === playerName && player.team === "Red"){
            this.playerTeam.team = player.team
            // console.log(player.name , player.team)

            this.matchResultsRed.push(match)
            console.log(match, player.name, "Team Red", match.metadata.map)

          } else {
            console.log("No match")
          }


        }


      }
-->