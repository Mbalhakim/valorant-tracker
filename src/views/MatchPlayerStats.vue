<template>
  <NavBar />
  <section class=" py-5 bg-dark text-light">
    <div class="container py-5 ">
      <div class="row py-5 backgroundImg bg-secondary rounded-3" :style="{ 'background-image': 'url(' + this.AbilitiesAgent.background + ')' }">
        <div class="col-md ">
          <img :src="this.AbilitiesAgent.fullPortraitV2" class="img-fluid" alt="">
        </div>
        <div class="col-md align-self-center"><h4>Agent: {{AbilitiesAgent.displayName}}</h4> <p class="">
       {{AbilitiesAgent.description}}
        </p> </div>
        <div v-if="AbilitiesAgent.role" class="col-md align-self-center"><h4>Role: {{AbilitiesAgent.role.displayName}} </h4><p>
          {{AbilitiesAgent.role.description}}
        </p></div>

      </div>
      <div class="table-responsive py-5 text-center">
        <caption class="h1 text-center">Kills: </caption>
        <table class="table text-light  ">

          <thead>
          <th>Round</th>
          <th>Kills</th>
          <th>Weapons</th>
          <th>Deaths</th>
          </thead>
        <tbody>
        <tr v-for="(kill, index) in this.killsArray" :key="index">
          <td class="col bg-secondary"><span>Round {{kill.round +1}}</span></td>
          <td class="col Kills"><span>{{kill.killer_display_name}}</span></td>
          <td class="col img-fluid">
            <img v-if="kill.damage_weapon_id==='Ability1'" :src="this.AbilityQImg" class="img-fluid " :alt="this.AbilityQImg">
            <img v-if="kill.damage_weapon_id==='Ability2'" :src="this.AbilityEImg" class=" img-fluid " :alt="this.UltimateImg">
            <img  v-if="kill.damage_weapon_id==='GrenadeAbility'" :src="this.AbilityCImg" class=" img-fluid " :alt="this.AbilityCImg">
            <img  v-if="kill.damage_weapon_id==='Ultimate'" :src="this.UltimateImg" class="img-fluid " :alt="this.UltimateImg">
            <img v-else :src="kill.damage_weapon_assets.killfeed_icon" class="" alt="">
          </td>
          <td class="Deaths"><span>{{kill.victim_display_name}}</span></td>
        </tr>
        </tbody>
        </table>



<!--        <div class="" v-for="(kill, index) in this.killsArray" :key="index">-->
<!--          <div class="col py-5">-->
<!--          <div class="d-flex flex-row bg-danger w-50">-->
<!--            <span>{{kill.damage_weapon_id}}</span>-->
<!--            <img v-if="kill.damage_weapon_id==='Ability1'" :src="this.AbilityQImg" class="px-1 img-fluid w-25" :alt="this.AbilityQImg">-->
<!--            <img v-if="kill.damage_weapon_id==='Ability2'" :src="this.AbilityEImg" class="px-1 img-fluid w-25" :alt="this.UltimateImg">-->
<!--            <img  v-if="kill.damage_weapon_id==='GrenadeAbility'" :src="this.AbilityCImg" class="px-1 img-fluid w-25" :alt="this.AbilityCImg">-->
<!--            <img  v-if="kill.damage_weapon_id==='Ultimate'" :src="this.UltimateImg" class="px-1 img-fluid w-25" :alt="this.UltimateImg">-->
<!--            <img v-else :src="kill.damage_weapon_assets.display_icon" class="w-25" alt="">-->
<!--            <span>{{kill.killer_display_name}}</span>-->
<!--&lt;!&ndash;           <img :src="kill.damage_weapon_assets.display_icon" class="img-fluid" alt="">&ndash;&gt;-->
<!--            <span>{{kill.victim_display_name}}  </span>-->
<!--            <span class="px-1"> Round:{{kill.round}}</span>-->
<!--            <span class="px-1"> Agent:{{LocalAgent}}</span>-->
<!--          </div>-->
<!--          </div>-->
<!--        </div>-->

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
      urlAgent:'https://valorant-api.com/v1/agents',
      AbilitiesOfAllAgents:{},
      AbilitiesAgent: {},
      AbilityQ:'Ability1',
      AbilityE:'Ability2',
      AbilityC:'GrenadeAbility',
      Ultimate:'Ultimate',
      AbilityQImg:'',
      AbilityEImg:'',
      AbilityCImg:'',
      UltimateImg:'',
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

    async agentAbilities() {
      console.log("agentAbilities")

      await axios

          .get(this.urlAgent, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.AbilitiesOfAllAgents = response;
            console.log( this.AbilitiesOfAllAgents)
            if (this.agent === undefined){
              console.log("undefined" ,"getAbilitiesAgentExist()")
              this.getAbilitiesAgentExist();
            }else{
              console.log("defined" ,"getAbilities()")
              this.getAbilities();
            }


            // console.log("agentAbilities", this.AbilitiesOfAgent)

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

    getAbilities(){

      for(let agent of this.AbilitiesOfAllAgents.data.data){
        console.log("params working")

        if (agent.displayName === this.agent && agent.isPlayableCharacter ===true){
          console.log(agent.displayName,  agent.description)
          this.AbilitiesAgent = Object.assign(agent)
          for(let ability of this.AbilitiesAgent.abilities){
            console.log(ability.slot)
            if(ability.slot === 'Ability1'){
              this.AbilityQImg = ability.displayIcon
            }

            if(ability.slot === 'Ability2'){
              this.AbilityEImg = ability.displayIcon
            }

            if(ability.slot === 'Grenade'){
              this.AbilityCImg = ability.displayIcon
            }

            if(ability.slot === 'Ultimate'){
              this.UltimateImg = ability.displayIcon
            }
          }


          // if(agent.abilities.slot === 'Ability1'){
          //   this.AbilityCImg = agent.abilities.slot.displayIcon
          //   console.log( this.AbilityCImg)
          // }


        }
      }

    },

    getAbilitiesAgentExist(){

      for(let agent of this.AbilitiesOfAllAgents.data.data){
        console.log("Local working")

        if (agent.displayName === localStorage.Agent && agent.isPlayableCharacter ===true){
          console.log(agent.displayName,  agent.description)
          this.AbilitiesAgent = Object.assign(agent)
          for(let ability of this.AbilitiesAgent.abilities){
            console.log(ability.slot)
            if(ability.slot === 'Ability1'){
              this.AbilityQImg = ability.displayIcon
            }

            if(ability.slot === 'Ability2'){
              this.AbilityEImg = ability.displayIcon
            }

            if(ability.slot === 'Grenade'){
              this.AbilityCImg = ability.displayIcon
            }

            if(ability.slot === 'Ultimate'){
              this.UltimateImg = ability.displayIcon
            }
          }


          // if(agent.abilities.slot === 'Ability1'){
          //   this.AbilityCImg = agent.abilities.slot.displayIcon
          //   console.log( this.AbilityCImg)
          // }


        }
      }

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
          // console.log( this.killsArray)


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
            // console.log( this.killsArray)

          }

      }
    },

  },
  mounted() {

     this.PlayerMatchResults();
     this.agentAbilities();




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
.Kills{
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgb(22, 229, 180, 0.5))
}

.Deaths{
  background: linear-gradient(to left, rgb(24, 34, 45, 0.5), rgba(234, 17, 17, 0.5))
}
.backgroundImg{
  background: no-repeat;
  background-size: contain;

}

@media (max-width: 450px) {
  .table-responsive img {
    width: 50%;

  }
  .table-responsive{
    width: 80%;
    font-size:1rem;
  }


}
</style>