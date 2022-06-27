<template>

  <div class="home">
    <MMRForm @childToHomeParent="onChildClick($event)"/>
    <AccountVue :account-response="accountData"/>
    <MMRData :mmr-response="mmrData" :mmr-history-response="mmrHistory"/>

    <MatchHistory :match-account-holder="accountData"/>


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



// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      userCreds: {
        userName: '',
        tagLine: '',
        region: '',

      },
      gameMode: 'competitive',
      accountData: {},
      mmrData: {},
      mmrHistory: {},
      matchHistory: {}
    }
  },
  components: { MMRForm, MatchHistory, MMRData, AccountVue},
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
      console.log("Requesting AccountDataRequest")

     await axios

          .get(accountUrl + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.accountData = response.data;


          })

          .catch(function (error) {
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
      console.log("Requesting MMRDataRequest")

    await  axios

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
      console.log("Requesting MMRHistoryRequest")

    await  axios

          .get(mmrHistoryURL + '/' + this.userCreds.region + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine, {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.mmrHistory = response.data;


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

   // async matchHistoryRequest() {
   //    console.log("Requesting matchHistoryRequest")
   //
   //  await  axios
   //
   //        .get(MatchHistoryURL + '/' + this.userCreds.region + '/' + this.userCreds.userName + '/' + this.userCreds.tagLine + '?filter=' + this.gameMode, {
   //          'Content-type': 'application/ld+json',
   //        })
   //        .then((response) => {
   //          this.matchHistory = response;
   //          console.log(this.matchHistory)
   //          // let value = this.userName
   //          // this.matchHistory.find(
   //          //     function (str){
   //          //
   //          //        return console.log(str == value)
   //          //
   //          //     }
   //          //
   //          // )
   //
   //        })
   //
   //        .catch(function (error) {
   //          console.log(error)
   //          // handle error
   //          if (error.message === "Request failed with status code 403") {
   //            alert("Please dont use hashtags")
   //          } else if (error.message === "Request failed with status code 404") {
   //            alert("Player not found or does not play on")
   //
   //          } else if (error.message === "Request failed with status code 401") {
   //            alert("Your API key was missing from the request, or wasn't correct.")
   //
   //          } else if (error.message === "Request failed with status code 500") {
   //            alert("Something went wrong on our side.")
   //
   //          }
   //
   //        })
   //        .then(function () {
   //
   //        });
   //
   //  },

  },

  mounted() {

    // this.MMRDataRequest();
    // this.MMRHistoryRequest();
    // this.matchHistoryRequest();
  }
}
</script>
<style scoped>
#container {


}
</style>
