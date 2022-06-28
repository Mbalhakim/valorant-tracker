<template>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top px-md-5">

      <a href="#" class="navbar-brand text-danger fw-bolder">Valorant Tracker</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home'}">
            Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'articles'}">
              Articles
            </router-link>
          </li>

        </ul>
      </div>


  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>