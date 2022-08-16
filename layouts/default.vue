<template>
  <div class="layout relative">
    <Header />
    <main></main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "DefaultLayout",
  components: {
    Header,
  },
};
</script>
