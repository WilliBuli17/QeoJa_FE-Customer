<template>
  <div class="hero-section">
    <Header :class="toggleNavClass()" />

    <div
      id="navbar-hero"
    >
      <v-container>
        <div class="d-flex align-center mt-6 mb-16  navbar-container">
          <v-btn
            text
            dark
            class="no-background-hover"
            to="/"
          >
            <v-avatar tile>
              <img
                src="../../assets/logo.png"
                alt=""
              >
            </v-avatar>
          </v-btn>

          <v-spacer />

          <v-btn
            dark
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
            dark
            text
            tile
            class="me-2"
            @click="setLink()"
          >
            <v-icon
              color="white"
              small
            >
              mdi-cart-outline
            </v-icon>
          </v-btn>

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
                  @click="shoppingCartDrawer = false"
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
      </v-container>
    </div>

    <v-container>
      <div class="mt-16">
        <v-row>
          <v-col
            cols="12"
            xl="5"
            class="mx-auto"
          >
            <h1 class="white--text text-center text-h3 font-weight-regular mb-4">
              Discover the best food & drinks in <span class="font-weight-bold">New York</span>
            </h1>

            <h4 class="text-h6 white--text text-center font-weight-light mb-5">
              The meals you love, delivered with care
            </h4>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <GoToBtn />
  </div>
</template>

<script>
  export default {
    name: 'DefaultAppBar',

    data: () => ({
      active: false,
      dialog: false,
      shoppingCartDrawer: false,
    }),

    mounted () {
      window.document.onscroll = () => {
        if (window.scrollY > 200) {
          this.active = true
        } else {
          this.active = false
        }
      }
    },

    methods: {
      toggleNavClass () {
        if (this.active === false) {
          return 'nav'
        } else {
          return 'sticky-nav'
        }
      },

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

<style lang="scss" scoped>
  .hero-section {
    background-image: url('../../assets/header-bg.png');
    background-size: cover;
    .nav {
      display: none;
    }
  }
</style>
