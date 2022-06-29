<template>

  <div class="home">
    <NavBar/>
    <MMRForm @childToHomeParent="onChildClick($event)"/>
    <AccountVue :account-response="accountData"/>
    <MMRData :mmr-response="mmrData" :mmr-history-response="mmrHistory"/>

    <MatchHistory :match-account-holder="accountData"/>
    <section v-if="offlinePage" class=" p-md-5  offline bg-dark text-light">
      <h1 class="text-center">Valorant Tracker</h1>

      <div class="container">
       <div class="text-center">
         <img  class="img-fluid  w-75" src="../assets/hero-jett.webp" alt="">
       </div>
        <div class="p-md-5">
        <div class="py-3">
          <h3>Account Data</h3>
          <p class="lead fs-4">
            With Valorant Tracker You can retrieve your account data and Stats as your Tier and Elo and Your Patched
            Tier.

          </p>
        </div>
        <div class="py-3">
          <h3>MMR History</h3>
          <p class="lead fs-4 ">
            You can also see a history of your MMR: Matchmaking Rating When You Are playing ranked and what changes
            happened to your last game.
          </p>
        </div>
        <div class="py-3">
          <h3>Match History</h3>
        <p class="lead fs-4 ">
          Check Your Last 5 games Status for Every Game Mode And Check Your KDA HeadShots, BodyShots, LegShots And Scores And Stats Of Other Players In the Same Match
        </p>
        </div>
        <div class="py-3">
          <h3>Latest News</h3>
          <p class="lead fs-4 ">
            Check The Latest News That Are Related To Game Updated, Developers And Esports
          </p>
        </div>
        </div>
      </div>
    </section>
    <FooterComp/>
  </div>
</template>

<script>
import MMRForm from "@/components/MMRForm";

const mmrURL = 'https://api.henrikdev.xyz/valorant/v1/mmr';
const mmrHistoryURL = 'https://api.henrikdev.xyz/valorant/v1/mmr-history';
const accountUrl = 'https://api.henrikdev.xyz/valorant/v1/account';
import AccountVue from "@/components/AccountVue";
import MMRData from "@/components/MMRData";
import MatchHistory from "@/components/MatchHistory";
import axios from "axios";
import NavBar from "@/components/NavBar";
import FooterComp from "@/components/FooterComp";


// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      offlinePage:true,
      userCreds: {
        userName: '',
        tagLine: '',
        region: '',

      },
      gameMode: 'competitive',
      accountData: {},
      mmrData: {},
      mmrHistory: {},
      matchHistory: {},
    }
  },
  components: {FooterComp, NavBar, MMRForm, MatchHistory, MMRData, AccountVue},
  methods: {
    onChildClick(value) {
      this.userCreds.userName = value.userName;
      this.userCreds.tagLine = value.tagLine;
      this.userCreds.region = value.region;
      this.AccountDataRequest();
      this.MMRDataRequest();
      this.MMRHistoryRequest();
      // this.matchHistoryRequest();

    },

    async AccountDataRequest() {

      // localStorage.removeItem('userData')
      // console.log("Requesting AccountDataRequest")

      await axios

          .get(accountUrl + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.accountData = response.data;
            localStorage.setItem('UserName', this.accountData.data.name);
            localStorage.setItem('UserTag', this.accountData.data.tag);
            localStorage.setItem('UserRegion', this.accountData.data.region);
            this.offlinePage = false


          })

          .catch(function (error) {
            this.offlinePage = true
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 429") {
              alert("Player Not Found")

            } else if (error.message === "Request failed with status code 401") {
              alert("Your API key was missing from the request, or wasn't correct.")

            } else if (error.message === "Request failed with status code 500") {
              alert("Something went wrong on our side.")

            }

          })
          .then(function () {

          });

    },

    async MMRDataRequest() {
      // console.log("Requesting MMRDataRequest")

      await axios

          .get(mmrURL + '/' + this.userCreds.region + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.mmrData = response.data;


          })

          .catch(function (error) {
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("API key has exceeded calls per month quota")
            } else if (error.message === "Request failed with status code 400") {
              alert("No location found matching parameter, often due to a missing or mistyped city or country")

            } else if (error.message === "Request failed with status code 401") {
              alert("Your API key was missing from the request, or wasn't correct.")

            } else if (error.message === "Request failed with status code 500") {
              alert("Something went wrong on our side.")

            }

          })
          .then(function () {

          });

    },

    async MMRHistoryRequest() {
      // console.log("Requesting MMRHistoryRequest")

      await axios

          .get(mmrHistoryURL + '/' + this.userCreds.region + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.mmrHistory = response.data;
            console.log(this.mmrHistory)


          })

          .catch(function (error) {
            // handle error
            if (error.message === "Request failed with status code 403") {
              alert("Please dont use hashtags")
            } else if (error.message === "Request failed with status code 429") {
              alert("PLayer Not Found")

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
// console.log(localStorage.userData.name)
    if (localStorage.getItem('UserName') !== null) {
      this.userCreds.userName = localStorage.UserName;
      this.userCreds.tagLine = localStorage.UserTag;
      this.userCreds.region = localStorage.UserRegion;
      this.AccountDataRequest();
      this.MMRDataRequest();
      this.MMRHistoryRequest();

      console.log(`UserName exists`, localStorage);
    } else {
      console.log(`UserName  not found`);
    }


  },

}
</script>
<style scoped>
.offline {

}

#container {


}
</style>
