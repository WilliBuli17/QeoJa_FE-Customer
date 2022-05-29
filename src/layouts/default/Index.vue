<template>
  <v-app>
    <login v-if="loginView" />

    <error v-else-if="errorView" />

    <default-view v-else />

    <default-settings />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
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
    },
  }
</script>
