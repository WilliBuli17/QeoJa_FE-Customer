<template>
  <v-app>
    <default-app-bar v-if="view" />
    <Header v-else />
    <default-view />
    <Footer />
    <default-settings />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultAppBar: () => import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar.vue'
      ),
      DefaultView: () => import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
      DefaultSettings: () => import(
        /* webpackChunkName: "default-settings" */
        './Settings'
      ),
    },

    computed: {
      view () {
        if (this.$route.path === '/') {
          return true
        }
        return false
      },
    },
  }
</script>
