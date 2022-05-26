<template>
  <v-app>
    <login v-if="loginView" />

    <error v-else-if="errorView" />

    <div v-else>
      <default-app-bar v-if="navView" />
      <Header v-else />

      <default-view />
      <Footer />
      <default-settings />
    </div>
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
      Login: () => import(
        /* webpackChunkName: "login" */
        '../../views/Login'
      ),
      Error: () => import(
        /* webpackChunkName: "error" */
        '../../views/Error'
      ),
    },

    computed: {
      loginView () {
        if (this.$route.path === '/login/') {
          return true
        }
        return false
      },

      errorView () {
        if (this.$route.name === 'Error') {
          return true
        }
        return false
      },

      navView () {
        if (this.$route.path === '/') {
          return true
        }
        return false
      },
    },
  }
</script>
