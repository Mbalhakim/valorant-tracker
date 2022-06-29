<template>
  <NavBar />

  <section class="py-5 bg-dark">
    <h1 class="text-center text-light ">Valorant News</h1>
    <div class="container">
      <NewsForm  @childToHomeParent="onChildClick($event)"/>

      <div class="row g-3  ">
          <div class="col-md-3 "  v-for="(article,index) in valorantArticles.data" :key="index">
            <div class="card bg-dark text-white ">
              <div class="card-body ">
                <img class="img-fluid " :src="article.banner_url" alt="">
                <div class="h1 mb-3">

                </div>
                <h3 class="card-title mb-3">
                  {{article.title}}
                </h3>
                <a v-if="article.external_link!==null" :href="article.external_link" target="_blank" class="btn btn-danger float-end">
                  Watch
                </a>
                <p class="card-text lead">
                 {{article.category}}
                </p>
                <p class="card-text lead">
                  Date: {{article.date}}
                </p>
                <a :href="article.url"  target="_blank" class="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>


      </div>
    </div>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
import NewsForm from "@/components/NewsForm";
let ArticleUrl='https://api.henrikdev.xyz/valorant/v1/website/';
export default {
  name: "ValorantArticles",
  components: {NewsForm, NavBar},
  data() {
    return {
      matchKEy: '',
      valorantArticles: {},
      language:"en-us",
      category:"game_updates",
    }

  },
  methods:{
    onChildClick(value) {
      console.log(value)
      this.category = value.articleCategory;
      this.language = value.articleLanguage;
      this.getValorantArticles();

    },
    async getValorantArticles() {


      console.log("Requesting matchHistoryRequest")

      await axios

          .get(ArticleUrl + this.language + '?filter=' + this.category , {
            'Content-type': 'application/ld+json',
          })
          .then((response) => {
            this.valorantArticles = response.data;
            console.log(this.valorantArticles)

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
    this.getValorantArticles();
  }
}
</script>

<style scoped>

</style>