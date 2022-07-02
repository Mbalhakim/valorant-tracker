<template>
<NavBar />

  <section v-if="matchStats.data" class="bg-dark py-5   text-light ">
    <div class="container py-5">

<div  class="py-5" :style="{ 'background-image': `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${require('@/assets/banermaps/' + matchStats.data.data.metadata.map + '.jpg' )}) `,'background-size':'cover' , 'background-repeat':'no-repeat' }">
  <h1 class="text-center  "> {{ matchStats.data.data.metadata.map }} Match Stats</h1>

</div>
      <div class="table-responsive ">
      <table class="table text-light  mt-5">

        <thead>
        <th class="" v-for="(round, index) in this.matchStats.data.data.rounds" :key="index">
          <div v-if="round.winning_team === 'Blue' && playersTeamA=== 'Blue'" class=" img-fluid bg-dark text-center">
            <!--              {{index}} Method 1 {{round.winning_team}} || {{round.end_type}}-->
            <figure>
              <figcaption class=" ">Round</figcaption>
              <img v-if="round.end_type === 'Bomb defused'" src="../assets/win/diffusewin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Bomb detonated'" src="../assets/win/explosionwin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Eliminated'" src="../assets/win/eliminationwin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Round timer expired'" src="../assets/win/timewin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Surrendered'" src="../assets/win/earlysurrender.webp" :alt="round.end_type">
              <figcaption class=" ">{{index+1}}</figcaption>
            </figure>
            <!--              <img v-else src="../assets/win/diffusewin.webp" alt="">-->
          </div>
          <div v-if="round.winning_team === 'Blue' && playersTeamA=== 'Red'" class="  img-fluid bg-dark text-center">
            <!--            {{index}} Method 1 {{round.winning_team}} || {{round.end_type}}-->
            <figure>
              <figcaption class=" ">Round</figcaption>
              <img v-if="round.end_type === 'Bomb defused'" src="../assets/win/diffuseloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Bomb detonated'" src="../assets/win/explosionloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Eliminated'" src="../assets/win/eliminationloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Round timer expired'" src="../assets/win/timeloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Surrendered'" src="../assets/win/earlysurrender.webp" :alt="round.end_type">

              <figcaption class=" ">{{index+1}}</figcaption>
            </figure>
            <!--              <img v-else src="../assets/win/diffusewin.webp" alt="">-->
          </div>

          <div v-if="round.winning_team === 'Red' && playersTeamA === 'Red'" class="  img-fluid bg-dark text-center ">
            <figure>
              <!--            {{index}} {{round.winning_team}} || {{round.end_type}}-->
              <figcaption class=" ">Round</figcaption>
              <img v-if="round.end_type === 'Bomb defused'" src="../assets/win/diffusewin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Bomb detonated'" src="../assets/win/explosionwin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Eliminated'" src="../assets/win/eliminationwin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Round timer expired'" src="../assets/win/timewin.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Surrendered'" src="../assets/win/earlysurrender.webp" :alt="round.end_type">

              <figcaption class=" ">{{index+1}}</figcaption>
            </figure>
          </div>

          <div v-if="round.winning_team === 'Red' && playersTeamA=== 'Blue'" class="  img-fluid bg-dark text-center">
            <!--            {{index}} Method 1 {{round.winning_team}} || {{round.end_type}}-->
            <figure>
              <figcaption class=" ">Round</figcaption>
              <img v-if="round.end_type === 'Bomb defused'" src="../assets/win/diffuseloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Bomb detonated'" src="../assets/win/explosionloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Eliminated'" src="../assets/win/eliminationloss.webp" :alt="round.end_type">
              <img v-if="round.end_type === 'Round timer expired'" src="../assets/win/timeloss.webp" :alt="round.end_type">
              <img  v-if="round.end_type === 'Surrendered'" src="../assets/win/earlysurrender.webp" :alt="round.end_type">

              <!--              <img v-else src="../assets/win/diffusewin.webp" alt="">-->
              <figcaption class=" ">{{index+1}}</figcaption>
            </figure>
          </div>

        </th>
        </thead>
      </table>
      </div>



      <h3 class="text-center p-3">Team A</h3>
      <div v-for="(player,index) in TeamA" :key="index" class="">

        <router-link class="teamA row text-decoration-none text-light  g-2 py-3 mobileRes" :to="{name:'player', params:{id:player.puuid, agent:player.character}}">


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

        </router-link>
      </div>


      <h3 class="text-center py-3">Team B</h3>
      <div v-for="(player,index) in TeamB" :key="index">
        <router-link class="teamB row text-decoration-none text-light  g-2 py-3 mobileRes" :to="{name:'player', params:{id:player.puuid, agent:player.character}}">

        <div class=" mobileRes row py-3 g-2 ">

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
        </router-link>
      </div>

    </div>
  </section>


  <section  v-if="offlineMatchPage===true" class="p-5 bg-dark text-light offlinePage">
    <div class="container p-5 ">
      <div class="container p-5 ">
        <div class="container p-5 ">
          <div class="container p-5 ">

            <h1 class="text-center">Results can be show through Home match link <router-link  class=" text-danger " :to="{ name: 'home',}"> Home
            </router-link></h1>

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
      offlineMatchPage:null,


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
            console.log(this.matchStats)

            this.offlineMatchPage = false
            localStorage.setItem("MatchId",this.matchId)
            this.getMatchResults();
            // console.log(this.matchStats)

          })

          .catch(function (error) {
            console.log(error)
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 404") {
              // alert("Match Stats must be through Home match Link")
              this.offlineMatchPage = false

            } else if (error.message === "Request failed with status code 401") {
              // console.log("Your API key was missing from the request, or wasn't correct.")
              this.offlineMatchPage = false

            } else if (error.message === "Request failed with status code 500") {
              // alert("Something went wrong on our side.")
              this.offlineMatchPage = false

            }

          })
          .then(function () {

          });

    },
    async matchRequestById() {
      // console.log("Requesting matchHistoryRequest")

      await axios

          .get(this.url + localStorage.MatchId, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.matchStats = response;

            this.offlineMatchPage = false
            this.getMatchResults();
            // console.log(this.matchStats)

          })

          .catch(function (error) {
            console.log(error)
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 404") {
              alert("Match Stats must be through Home match Link")
              this.offlineMatchPage = false

            } else if (error.message === "Request failed with status code 401") {
              // console.log("Your API key was missing from the request, or wasn't correct.")
              this.offlineMatchPage = false

            } else if (error.message === "Request failed with status code 500") {
              alert("Something went wrong on our side.")
              this.offlineMatchPage = false

            }

          })
          .then(function () {

          });

    },
    getMatchResults() {

      this.allPlayers = this.matchStats.data.data.players.all_players
      this.TeamBlue = this.matchStats.data.data.players.blue
      this.TeamRed = this.matchStats.data.data.players.red
console.log(this.matchStats)

      for (player of this.allPlayers) {


        if (player.name === localStorage.UserName) {
          // console.log("yes")

          console.log(player)
          if (player.team === 'Blue') {

            this.TeamA = this.TeamBlue
            this.TeamB = this.TeamRed
            this.playersTeamA = player.team
          } else if (player.team === 'Red') {
            this.TeamA = this.TeamRed
            this.TeamB = this.TeamBlue
            this.playersTeamA = player.team
          }
          this.TeamA.sort((a,b) => b.stats.score - a.stats.score);
          this.TeamB.sort((a,b) => b.stats.score - a.stats.score);


          // console.log("Sorting", this.TeamA)
          // console.log(this.playersTeamA)

        } else {
          // console.log("No match")
        }


      }


    }

  },

  mounted() {
    this.offlineMatchPage = true
    // this.matchHistoryRequest()



    if (localStorage.getItem('MatchId') !== null) {

      this.matchRequestById();

      // console.log(`UserName exists`, localStorage);
    }
    this.matchHistoryRequest();
    document.body.scrollTop = document.documentElement.scrollTop = 0;

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
.offlinePage{
  height: 100vh;
}
.table-responsive::-webkit-scrollbar{
  width: 12px;
}
.table-responsive::-webkit-scrollbar-thumb{
  background-color: #15deaf;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid #15deaf;
}
.table-responsive::-webkit-scrollbar-thumb:window-inactive{

}

@media (max-width: 450px) {
  .agentImg {
    width: 15%;

  }
  .mobileRes .col{
    width: 80%;
    font-size: 0.5rem;
  }


}
</style>