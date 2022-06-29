<template>
  <div class= "row row-cols-lg-3 align-items-end" >
    <div class="col ">
    <label class="form-label" for="selectoptio">Select game mode</label>
    <select id="selectoptio" class=" form-select" @change="matchHistoryRequest" v-model="gameMode">
      <option value="unrated">Unrated</option>
      <option value="competitive">Competitive</option>
      <option value="spikerush">Spikerush</option>
      <option value="replication">Replication</option>
      <option value="deathmatch">Deathmatch</option>
      <option value="escalation">Escalation</option>
    </select>
    </div>


  </div>

  <div v-if="noData " class=" text-white">
    <div v-for="(match, index) in matchResult" :key="index" class=" py-1 ">

      <div
          :style="{ 'background': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${require('@/assets/maps/' + match.metadata.map + '.jpg')})`,'background-size':'cover' , 'background-repeat':'no-repeat',  }"
          class="   matchResultsFeed" v-if="match.team==='Blue' ">
        <router-link  class="row text-white text-decoration-none" :to="{ name: 'matchStats', params: { id: match.metadata.matchid }}">
          <span v-if="match.teams.blue.has_won ===true" class="matchResultsFeedWon"> {{ match.metadata.game_start_patched }}
          <span> | Session Time: {{ match.session_playtime.minutes }} Minutes</span></span>
          <span v-else class=" matchResultsFeedLost "> {{ match.metadata.game_start_patched }}
           <span> | Session Time: {{ match.session_playtime.minutes }} Minutes</span></span>

        <div class="col ">
          <img :src="match.assets.agent.small" class="img-fluid float-start agentImg" alt="agent">
        </div>

        <div class="col align-self-center ">
          <span class="fs-2">{{ match.metadata.map }}</span>
        </div>

        <div v-if="match.teams.blue.has_won ===true" class="  fs-1 align-self-center col ">

          <span class="winingTeam">{{ match.teams.blue.rounds_won }}</span>-<span class="losingTeam">{{ match.teams.blue.rounds_lost }}</span>
        </div>
        <div v-else class="  fs-1 align-self-center col ">

          <span class="losingTeam">{{ match.teams.blue.rounds_won }}</span>-<span class="winingTeam">{{ match.teams.blue.rounds_lost }}</span>
        </div>

        <div class="col fs-5 align-self-center">
          <div class="d-flex flex-column">
            <span>K/D/A/</span>
            <span> {{ match.stats.kills }}/{{ match.stats.deaths }}/{{ match.stats.assists }}</span>
          </div>
        </div>
          </router-link>

      </div>
      <!--          player team is blue but blue team lost-->

      <div
          :style="{ 'background-image': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${require('@/assets/maps/' + match.metadata.map + '.jpg' )}) `,'background-size':'cover' , 'background-repeat':'no-repeat' }"
          class="    " v-else-if="match.team==='Red' ">
        <router-link  class="row text-white text-decoration-none" :to="{ name: 'matchStats', params: { id: match.metadata.matchid }}">


         <span v-if="match.teams.red.has_won ===true" class="matchResultsFeedWon"> {{ match.metadata.game_start_patched }}
          <span> | Session Time: {{ match.session_playtime.minutes }} Minutes</span></span>
          <span v-else class=" matchResultsFeedLost "> {{ match.metadata.game_start_patched }}
           <span> | Session Time: {{ match.session_playtime.minutes }} Minutes</span></span>
        <div class="col ">
          <img :src="match.assets.agent.small" class="img-fluid float-start agentImg" alt="agent">
        </div>
        <div class="col align-self-center ">
          <span class="fs-2">{{ match.metadata.map }}</span>
        </div>

        <div v-if="match.teams.red.has_won ===true" class="  fs-1 align-self-center col ">


          <span class="winingTeam">{{ match.teams.red.rounds_won }}</span>-<span class="losingTeam"> {{ match.teams.red.rounds_lost }}</span>


        </div>
        <div v-else class="  fs-1 align-self-center col ">


          <span class="losingTeam">{{ match.teams.red.rounds_won }}</span>-<span class="winingTeam">{{ match.teams.red.rounds_lost }}</span>


        </div>

        <div class="col  fs-5 align-self-center">
          <div class="d-flex flex-column">
            <span>K/D/A/</span>
            <span> {{ match.stats.kills }}/{{ match.stats.deaths }}/{{ match.stats.assists }}</span>
          </div>

        </div>
        </router-link>
      </div>


    </div>

  </div>
  <div v-else class="text-center p-5">
    <span class="h1">No data Found for the selected game mode</span>
  </div>
</template>

<script>
import axios from "axios";

const MatchHistoryURL = 'https://api.henrikdev.xyz/valorant/v3/matches';

let playerName;
let match;
let player;
export default {
  name: "matchResults",
  components: {},

  data() {
    return {
      matchKEy: '',
      matchHistory: {},
      noData: null,
      userName: '',
      tagLine: '',
      region: '',
      gameMode: 'competitive',
      allPlayers: [],
      playerTeam: {"teamPro": "", "characterPro": "", "killImg": ""},
      playerStats: {},
      matchResult: [],
      matchResultsBlue: [],
      matchResultsRed: [],

    }

  },

  methods: {
    getMatchResults() {

      this.matchResult = [];
      this.noData = this.matchHistory.data.data.length !== 0;

      playerName = localStorage.UserName;
      // console.log("playername ",playerName)


      for (match of this.matchHistory.data.data) {
        this.allPlayers = match.players.all_players;
        // console.log("all players",this.allPlayers)

        for (player of this.allPlayers) {


          if (player.name === playerName) {

            this.playerTeam.teamPro = player.team
            localStorage.setItem("playerTeam",player.team)
            // console.log("player team",player.team)

            this.playerTeam.characterPro = player.character
            // console.log("player character",player.character)

            this.playerTeam.killImg = player.assets.agent.killfeed
            // console.log("player killImg",player.assets.agent.killfeed)


            let returnTarget = Object.assign(match, player, this.playerTeam);
            // this.playerStats = Object.assign(player)
            // console.log( "Stats" ,this.playerStats)
            this.matchResult.push(returnTarget)
            // console.log(this.matchResult,match, this.playerTeam)

            // console.log(match, player.name, match.metadata.map)


          } else {
            console.log("No match")
          }


        }


      }

    },

    async matchHistoryRequest() {


      console.log("Requesting matchHistoryRequest")

      await axios

          .get(MatchHistoryURL + '/' + localStorage.UserRegion + '/' + localStorage.UserName+ '/' + localStorage.UserTag + '?filter=' + this.gameMode, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.matchHistory = response;
            // console.log(this.matchHistory)
            this.getMatchResults();
            // this.getMatchResults();

            // let value = this.userName
            // this.matchHistory.find(
            //     function (str){
            //
            //        return console.log(str == value)
            //
            //     }
            //
            // )

          })

          .catch(function (error) {
            console.log(error)
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 404") {
              alert("Player not found or does not play on")

            } else if (error.message === "Request failed with status code 401") {
              alert("Your API key was missing from the request, or wasn't correct.")

            } else if (error.message === "Request failed with status code 500") {
              alert("Something went wrong on our side.")

            }

          })
          .then(function () {

          });

    },
  },
  mounted() {

  },
  created() {

    this.matchHistoryRequest();
  }
}
</script>

<style scoped>
.agentImg {
  width: 40%;
}

.matchResultsFeedWon {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgb(22, 229, 180, 0.5))
}
.matchResultsFeedLost {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgba(229, 22, 60, 0.5))
}
.winingTeam{
  color: #00FFD5FF;
}
.losingTeam{
  color: rgba(255, 9, 0, 0.92);
}

@media (max-width: 450px) {
  .agentImg {
    width: 100%;

  }


}
</style>

