<template>
  <v-menu
    bottom
    left
    min-width="200"
    offset-y
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        class="ml-2 no-background-hover"
        min-width="0"
        text
        :dark="dark"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="me-0 me-sm-3">
          mdi-account-circle-outline
        </v-icon>
        <span class="d-none d-sm-block">Account</span>
      </v-btn>
    </template>

    <v-list
      :tile="false"
      flat
      nav
    >
      <template v-for="(p, i) in profile">
        <v-divider
          v-if="p.divider"
          :key="`divider-${i}`"
          class="mb-2 mt-2"
        />

        <app-btn-component
          v-else-if="p.check"
          :key="`check-${i}`"
          text
          block
          @click="logout"
        >
          <app-bar-item-component>
            <v-list-item-title v-text="p.title" />
          </app-bar-item-component>
        </app-btn-component>

        <app-btn-component
          v-else-if="p.title === 'Profil'"
          :key="`item-${i}`"
          text
          block
          @click="profil"
        >
          <app-bar-item-component>
            <v-list-item-title v-text="profilTitle(p.title)" />
          </app-bar-item-component>
        </app-btn-component>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  import AppBarItemComponent from './AppBarItemComponent'
  import ApiService from '../service/ApiService'

  export default {
    name: 'AppAccountComponent',

    components: {
      AppBarItemComponent,
    },

    props: {
      dark: Boolean,
    },

    data: () => ({
      apiService: new ApiService(),
      profile: [
        { title: 'Profil' },
        { divider: true },
        {
          title: 'Log out',
          check: !((!sessionStorage.getItem('token') && !localStorage.getItem('token'))),
        },
      ],
    }),

    methods: {
      async logout () {
        this.$emit('load', null)
        const result = await this.apiService.storeData(this.$http, 'logout', null)
        if (result.data.status === 'success') {
          if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
          } else if (localStorage.getItem('token')) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
          }
          this.$emit('load', null)

          if (this.$route.path !== '/') this.$router.push('/')
        }
      },

      profil () {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          this.$router.push('/login/')
        } else if (this.$route.path !== '/profil/') {
          this.$router.push('/profil/')
        }
      },

      profilTitle (value) {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          return 'Login'
        } else {
          return value
        }
      },
    },
  }
</script>
