<template>
  <section v-if="mmrHistoryResponse.data" class="p-5 text-light" style="background:#364966 " id="contact">
    <div class="container">
      <h2 class="text-center mb-4">MMR History</h2>
      <div class="row  row-cols-lg-4 row-cols-md-2  g-lg-3 g-4 ">

        <div v-for="(rank, index) in mmrHistoryResponse.data" :key="index" class="col-md  bg-">

          <ul class="list-group list-group-flush lead">
            <li class="list-group-item text-light" style="background: #dc3d4b">
              <span class="fw-bold">Date:</span> {{ rank.date }}
            </li>
            <li class="list-group-item bg-dark text-light">
              <div class="d-flex ">
                <span class="fw-bold ">Tier patched: </span> <span class="px-1"> {{ rank.currenttierpatched }}</span>
                <figure>

                  <img v-if="rank.currenttierpatched === 'Iron 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/iron1.webp">
                  <img v-if="rank.currenttierpatched === 'Iron 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/iron2.webp">
                  <img v-if="rank.currenttierpatched === 'Iron 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/iron3.webp">

                  <img v-if="rank.currenttierpatched === 'Bronze 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/bronze1.webp">
                  <img v-if="rank.currenttierpatched === 'Bronze 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/bronze2.webp">
                  <img v-if="rank.currenttierpatched === 'Bronze 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/bronze3.webp">

                  <img v-if="rank.currenttierpatched === 'Silver 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/silver1.webp">
                  <img v-if="rank.currenttierpatched === 'Silver 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/silver2.webp">
                  <img v-if="rank.currenttierpatched === 'Silver 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/silver3.webp">

                  <img v-if="rank.currenttierpatched === 'Gold 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/gold1.webp">
                  <img v-if="rank.currenttierpatched === 'Gold 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/gold2.webp">
                  <img v-if="rank.currenttierpatched === 'Gold 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/gold3.webp">

                  <img v-if="rank.currenttierpatched === 'Ascendant 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/Ascendant1.png">
                  <img v-if="rank.currenttierpatched === 'Ascendant 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/Ascendant2.png">
                  <img v-if="rank.currenttierpatched === 'Ascendant 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/Ascendant3.png">

                  <img v-if="rank.currenttierpatched === 'Diamond 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/diamond1.webp">
                  <img v-if="rank.currenttierpatched === 'Diamond 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/diamond2.webp">
                  <img v-if="rank.currenttierpatched === 'Diamond 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/Diamond3.webp">

                  <img v-if="rank.currenttierpatched === 'Platinum 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/platinum1.webp">
                  <img v-if="rank.currenttierpatched === 'Platinum 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/platinum2.webp">
                  <img v-if="rank.currenttierpatched === 'Platinum 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/platinum3.webp">

                  <img v-if="rank.currenttierpatched === 'Immortal 1'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/immortal1.webp">
                  <img v-if="rank.currenttierpatched === 'Immortal 2'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/immortal2.webp">
                  <img v-if="rank.currenttierpatched === 'Immortal 3'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/immortal3.webp">
                  <img v-if="rank.currenttierpatched === 'Radiant'" class="img-fluid float-end tierImg"
                       src="../assets/ranks/radiant.webp">



                </figure>
              </div>
            </li>
            <li class="list-group-item bg-dark text-light">
              <span class="fw-bold">Tier:</span> {{ rank.currenttier }}
            </li>
            <li class="list-group-item bg-dark text-light">
              <span class="fw-bold">Ranking in tier:</span> {{ rank.ranking_in_tier }}
            </li>
            <li class="list-group-item bg-dark text-light">
              <span class="fw-bold">Elo:</span> {{ rank.elo }}
            </li>
            <li class="list-group-item bg-dark text-light">
              <span class="fw-bold">Change to last game:</span> {{ rank.mmr_change_to_last_game }}
            </li>
          </ul>
        </div>

        <div class="col-md my-4">
          <img class="img-fluid " src="" alt="">

        </div>
      </div>
    </div>
  </section>
  <section v-if="mmrHistoryResponse.name===null" class="p-5 text-light" style="background:#364966 ">
    <div class="container text-center">
<h1>Player has not played Ranked yet</h1>
    </div>

  </section>




</template>

<script>


export default {
  name: "MMRData",
  components: {},
  props: ['mmrResponse', 'mmrHistoryResponse'],
  data() {
    return {
      mmrData: {},
      mmrHistory: {},
      userName: '',
      tagLine: '',
      region: 'eu',
      rankImageUrl: ''

    }
  },
  methods: {
    rankImg() {
      for (let rankImg of this.mmrHistoryResponse.data) {
        // console.log(rankImg)

        if (rankImg.currenttierpatched === 'Diamond 3') {
          this.rankImageUrl = '../assets/ranks/Diamond3.webq'
          // console.log(this.rankImageUrl)
        }
        if (rankImg.currenttierpatched === 'Immortal 1') {
          this.rankImageUrl = '../assets/ranks/immortal1.webq'
          // console.log(this.rankImageUrl)
        }

      }
    },
    rankImg2() {
      this.mmrHistoryResponse.data.forEach(img => console.log(img.currenttierpatched))
    }

  },

}
</script>

<style scoped>
@media (min-width: 400px) {
  .tierImg {
    width: 60%;

  }

}


</style>