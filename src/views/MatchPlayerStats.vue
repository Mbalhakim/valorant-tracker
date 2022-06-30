<template>
  <NavBar />
<h1>asd</h1>
  <section class="p-5 bg-dark text-light">
    <div class="container">
      <div class="">
        <div class="" v-for="(kill, index) in this.killsArray" :key="index">
          <div class="col p-5">
          <div class="d-flex flex-row bg-danger w-50">
            <span>{{kill.damage_weapon_id}}</span>
            <img v-if="kill.damage_weapon_id!== 'Ultimate'" :src="kill.damage_weapon_assets.display_icon" class="img-fluid px-1 w-25" alt="">
            <img v-if="kill.damage_weapon_id==='Ability1'" :src="AbilityQ" class="px-1 img-fluid w-25" alt="">
            <img v-if="kill.damage_weapon_id==='Ability2'" :src="AbilityE" class="px-1 img-fluid w-25" alt="">
            <img v-if="kill.damage_weapon_id==='Ability3'" :src="AbilityC" class="px-1 img-fluid w-25" alt="">
            <img v-if="kill.damage_weapon_id==='Ultimate'" :src="Ultimate" class="px-1 img-fluid w-25" alt="">
            <span>{{kill.killer_display_name}}</span>
<!--            <img :src="kill.damage_weapon_assets.display_icon" class="img-fluid" alt="">-->
            <span>{{kill.victim_display_name}}  </span>
            <span class="px-1"> Round:{{kill.round}}</span>
            <span class="px-1"> Agent:{{LocalAgent}}</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterComp class="fixed-bottom " />
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterComp from "@/components/FooterComp";
import axios from "axios";

export default {
  name: "MatchPlayerStats",
  data(){
    return{
      matchStats:{},
      killsArray:[],
      playerParams:this.$route.params.id,
      agent:this.$route.params.agent,
      LocalAgent:null,
      AbilityQ:'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/abilities/ability1/displayicon.png',
      AbilityE:'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/abilities/ability2/displayicon.png',
      AbilityC:'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/abilities/grenade/displayicon.png',
      Ultimate:'https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/abilities/ultimate/displayicon.png',
      url:'https://api.henrikdev.xyz/valorant/v2/match/',
    }
  },
  components: {FooterComp, NavBar},
  methods:{
    async PlayerMatchResults() {
      console.log("PlayerMatchResults")
      // console.log("Requesting matchHistoryRequest")

      await axios

          .get(this.url + localStorage.MatchId, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.matchStats = response;
            console.log(this.matchStats)
            if (this.playerParams === undefined){
              this.getStatsExist();
            }else{
              this.getStats();
            }


            // console.log(this.matchStats)

          })

          .catch(function (error) {
            console.log(error)
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 404") {
              // alert("Match Stats must be through Home match Link")


            } else if (error.message === "Request failed with status code 401") {
              // console.log("Your API key was missing from the request, or wasn't correct.")


            } else if (error.message === "Request failed with status code 500") {
              // alert("Something went wrong on our side.")


            }

          })
          .then(function () {

          });

    },

    getStats() {

            localStorage.removeItem('PlayerParams')
            localStorage.removeItem('Agent')
            localStorage.setItem('PlayerParams', this.playerParams)

            localStorage.setItem('Agent', this.agent)



      for (let player of this.matchStats.data.data.kills) {
        // console.log(player)


        if (player.killer_puuid === localStorage.PlayerParams) {
          // console.log("yes")
          // console.log(player)
          this.killsArray.push(player)
          this.LocalAgent = localStorage.Agent

          // Sorting the array by the time of the kill.
          this.killsArray.sort((a, b) => a.round - b.round);
          console.log( this.killsArray)


        }
      }
    },

    getStatsExist() {



        for (let player of this.matchStats.data.data.kills) {
          // console.log(player)


          if (player.killer_puuid === localStorage.PlayerParams) {
            // console.log("yes")
            // console.log(player)
            this.killsArray.push(player)
            this.LocalAgent = localStorage.Agent

            // Sorting the array by the time of the kill.
            this.killsArray.sort((a, b) => a.round - b.round);
            console.log( this.killsArray)

          }

      }
    },

  },
  mounted() {

     this.PlayerMatchResults();




    // if(this.$route.params.id !== null){
    //   localStorage.setItem("PlayerParams", this.playerParams)
    //   this.PlayerMatchResults();
    // }
    // if (localStorage.getItem('MatchId') !== null) {
    //
    //
    //   // console.log(`UserName exists`, localStorage);
    // }



  }
}
</script>

<style scoped>

</style>