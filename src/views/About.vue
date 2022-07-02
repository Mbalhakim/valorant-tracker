<template>
  <NavBar/>


  <section class="p-5 bg-dark text-light">
    <div class="container py-5">

        <div class=" text-light py-2">
          <h1 class="">About :</h1>
          <p class="lead ">
            Valorant-Tracker is a non-official Tracker and not endorsed by Riot Games in any way.
            Riot Games, Valorant, and all associated properties are trademarks or registered trademarks of Riot Games,
            Inc.</p>
        </div>

        <div class="">
          <h3>Account Data</h3>
          <p class="lead fs-4">
            With Valorant Tracker You can retrieve your account data and Stats as your Tier and Elo and Your Patched
            Tier.

          </p>
        </div>
        <div class="">
          <h3>MMR History</h3>
          <p class="lead fs-4 ">
            You can also see a history of your MMR: Matchmaking Rating When You Are playing ranked and what changes
            happened to your last game.
          </p>
        </div>
        <div class="">
          <h3>Match History</h3>
          <p class="lead fs-4 ">
            Check Your Last 5 games Status for Every Game Mode And Check Your KDA HeadShots, BodyShots, LegShots And Scores And Stats Of Other Players In the Same Match
          </p>
        </div>
        <div class="">
          <h3>Latest News</h3>
          <p class="lead fs-4 ">
            Check The Latest News That Are Related To Game Updated, Developers And Esports
          </p>
        </div>

      </div>

  </section>

  <FooterComp class="fixed-bottom"/>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterComp from "@/components/FooterComp";

export default {
  name: "AboutView",
  components: {FooterComp, NavBar}
}
</script>

<style scoped>

</style>