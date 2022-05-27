<template>
  <div>
    <v-app-bar
      fixed
      color="white"
      elevate-on-scroll
      width="100%"
    >
      <v-container class="d-flex align-center">
        <v-btn
          text
          dark
          class="no-background-hover"
          to="/"
        >
          <v-avatar
            class="me-10"
            tile
          >
            <img
              src="../assets/logo.png"
              alt=""
            >
          </v-avatar>
        </v-btn>

        <v-spacer />

        <v-btn
          light
          text
          class="no-background-hover"
          :to="'/profil/'"
        >
          <v-icon class="me-0 me-sm-3">
            mdi-account-circle-outline
          </v-icon>
          <span class="d-none d-sm-block">Account</span>
        </v-btn>

        <v-btn
          light
          text
          tile
          class="me-2"
          @click="setLink()"
        >
          <v-icon small>
            mdi-cart-outline
          </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="shoppingCartDrawer"
      width="500"
      fixed
      temporary
      right
    >
      <ShoppingCart>
        <template v-slot:userDrawerCloseButton>
          <v-btn
            icon
            color
            @click.stop="shoppingCartDrawer = false"
          >
            <v-icon color="primary">
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </ShoppingCart>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            class="text-capitalize mb-3"
            block
            color="primary"
          >
            Checkout Now ($ 220)
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    data () {
      return {
        dialog: false,
        shoppingCartDrawer: false,
      }
    },

    methods: {
      setLink () {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          this.$router.push('/login/')
        } else {
          this.shoppingCartDrawer = true
        }
      },
    },
  }
</script>
