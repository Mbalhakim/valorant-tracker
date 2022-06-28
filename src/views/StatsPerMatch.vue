<template>
<NavBar />
  <section class="bg-dark py-5   text-light ">
    <div class="container img-fluid">

      <h1 class="text-center py-5">Valorant Match Stats</h1>
      <h2 v-if="matchStats.data" class="text-center">Map: {{ matchStats.data.data.metadata.map }}</h2>


      <h3 class="text-center">Team A</h3>
      <div v-for="(player,index) in TeamA" :key="index" class="">

        <div class="teamA row g-2 py-1">


          <img :src="player.assets.agent.small" class="img-fluid agentImg" alt="">


          <div class="col  align-self-center">{{ player.name }}#{{ player.tag }}</div>

          <div class="col  align-self-center">{{ player.stats.score }}</div>
          <div class="col  align-self-center">
            <div class="d-flex flex-column">
              <span>K/D/A/</span>
              <span> {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}</span>
            </div>
          </div>
          <div class="col  align-self-center ">
            <div class="d-flex flex-column">
              <span>Headshots</span>
              <span> {{ player.stats.headshots }}</span>
            </div>
          </div>
          <div class="col  align-self-center text-center ">
            <div class="d-flex flex-column">
              <span>BodyShots</span>
              <span> {{ player.stats.bodyshots }}</span>
            </div>
          </div>
          <div class="col  align-self-center text-center">
            <div class="d-flex flex-column">
              <span>LegShots</span>
              <span> {{ player.stats.legshots }}</span>
            </div>
          </div>

        </div>
      </div>


      <h3 class="text-center py-3">Team B</h3>
      <div v-for="(player,index) in TeamB" :key="index">


        <div class="teamB row g-2 ">

          <img :src="player.assets.agent.small" class="img-fluid agentImg" alt="">


          <div class="col  align-self-center">{{ player.name }}#{{ player.tag }}</div>

          <div class="col  align-self-center">{{ player.stats.score }}</div>
          <div class="col  align-self-center">
            <div class="d-flex flex-column">
              <span>K/D/A/</span>
              <span> {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}</span>
            </div>
          </div>
          <div class="col  align-self-center ">
            <div class="d-flex flex-column">
              <span>Headshots</span>
              <span> {{ player.stats.headshots }}</span>
            </div>
          </div>
          <div class="col  align-self-center text-center ">
            <div class="d-flex flex-column">
              <span>BodyShots</span>
              <span> {{ player.stats.bodyshots }}</span>
            </div>
          </div>
          <div class="col  align-self-center text-center">
            <div class="d-flex flex-column">
              <span>LegShots</span>
              <span> {{ player.stats.legshots }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>

import axios from "axios";
import NavBar from "@/components/NavBar";


let player;

export default {
  name: "StatsPerMatch",
  components: {NavBar},
  data() {
    return {
      matchId: this.$route.params.id,
      url: 'https://api.henrikdev.xyz/valorant/v2/match/',
      matchStats: {},
      TeamBlue: [],
      TeamRed: [],
      TeamA: [],
      TeamB: [],

      playersTeamA: "",
      playerInfo: {
        "playerTeam": "",
        "playerName": ""
      },
      allPlayers: [],

    }
  }, methods: {
    async matchHistoryRequest() {

      console.log("Requesting matchHistoryRequest")

      await axios

          .get(this.url + this.matchId, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.matchStats = response;
            this.getMatchResults()
            console.log(this.matchStats)

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
    getMatchResults() {

      this.allPlayers = this.matchStats.data.data.players.all_players
      this.TeamBlue = this.matchStats.data.data.players.blue
      this.TeamRed = this.matchStats.data.data.players.red


      for (player of this.allPlayers) {


        if (player.name === localStorage.userData) {
          console.log("yes")
          this.playersTeamA = player.team
          if (player.team === 'Blue') {

            this.TeamA = this.TeamBlue
            this.TeamB = this.TeamRed
          } else if (player.team === 'Red') {
            this.TeamA = this.TeamRed
            this.TeamB = this.TeamBlue
          }
          console.log(this.playersTeamA)

        } else {
          console.log("No match")
        }


      }


    }

  },

  mounted() {
    this.matchHistoryRequest()
    if (localStorage) {
      console.log(localStorage.userData)
    }

  }
}
</script>

<style scoped>
.agentImg {
  width: 10%
}

.bgImg {
  background: url("../assets/wall.png") no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.teamA {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgb(22, 229, 180, 0.5))
}

.teamB {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgba(234, 17, 17, 0.5))
}

@media (max-width: 450px) {
  .agentImg {
    width: 25%;

  }
}
</style>