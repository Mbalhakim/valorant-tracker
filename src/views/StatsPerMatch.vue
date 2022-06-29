<template>
<NavBar />
  <section class="bg-dark py-5   text-light ">
    <div class="container img-fluid">

      <h1 class="text-center py-5">Valorant Match Stats</h1>
      <div  v-if="matchStats.data" class="text-center  py-5">
        <h1>Map: {{ matchStats.data.data.metadata.map }}</h1>
        <img class="img-fluid" :src="require('../assets/maps/' + matchStats.data.data.metadata.map + '.jpg')" alt="map">
      </div>


      <h3 class="text-center">Team A</h3>
      <div v-for="(player,index) in TeamA" :key="index" class="">

        <div class="teamA row  g-2 py-3 mobileRes">


          <img :src="player.assets.agent.small" class="img-fluid agentImg" alt="">


          <div class="col  align-self-center">
            <div class="d-flex flex-column">
              <span>Name</span>
              <span>{{ player.name }}#{{ player.tag }}</span>
            </div>
          </div>

          <div class="col  align-self-center">
            <div class="d-flex flex-column ">
              <span>Score</span>
              <span>{{ player.stats.score }}</span>
            </div>
          </div>
          <div class="col  align-self-center">
            <div class="d-flex flex-column">
              <span>K/D/A/</span>
              <span> {{ player.stats.kills }}/{{ player.stats.deaths }}/{{ player.stats.assists }}</span>
            </div>
          </div>
          <div class="col  align-self-center text-center">
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


        <div class="teamB mobileRes row py-3 g-2 ">

          <img :src="player.assets.agent.small" class="img-fluid agentImg" alt="">


          <div class="col  align-self-center">
          <div class="d-flex flex-column">
            <span>Name</span>
            <span>{{ player.name }}#{{ player.tag }}</span>
          </div>
          </div>

          <div class="col  align-self-center ">
          <div class="d-flex flex-column ">
            <span>Score</span>
            <span>{{ player.stats.score }}</span>
          </div>
          </div>
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
<FooterComp />
</template>

<script>

import axios from "axios";
import NavBar from "@/components/NavBar";
import FooterComp from "@/components/FooterComp";


let player;

export default {
  name: "StatsPerMatch",
  components: {FooterComp, NavBar},
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
      // console.log("Requesting matchHistoryRequest")

      await axios

          .get(this.url + this.matchId, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.matchStats = response;
            this.getMatchResults();
            // console.log(this.matchStats)

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


        if (player.name === localStorage.UserName) {
          // console.log("yes")
          this.playersTeamA = player.team
          if (player.team === 'Blue') {

            this.TeamA = this.TeamBlue
            this.TeamB = this.TeamRed
          } else if (player.team === 'Red') {
            this.TeamA = this.TeamRed
            this.TeamB = this.TeamBlue
          }
          this.TeamA.sort((a,b) => b.stats.score - a.stats.score);
          this.TeamB.sort((a,b) => b.stats.score - a.stats.score);
          console.log("Sorting", this.TeamA)
          // console.log(this.playersTeamA)

        } else {
          // console.log("No match")
        }


      }


    }

  },

  mounted() {
    this.matchHistoryRequest()


  }
}
</script>

<style scoped>
.agentImg {
  width: 10%
}



.teamA {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgb(22, 229, 180, 0.5))
}

.teamB {
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgba(234, 17, 17, 0.5))
}

@media (max-width: 450px) {
  .agentImg {
    width: 15%;

  }
  .mobileRes .col{
    width: 80%;
    font-size: 0.5rem;
  }

  /*.mobileRes{*/
  /*  -moz-column-count: 3;*/
  /*  column-count: 1;*/
  /*  width: 30em;*/
  /*  width: 100%;*/
  /*  -webkit-column-break-inside: avoid;*/

  /*}*/
}
</style>