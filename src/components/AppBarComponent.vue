<template>
  <div class="hero-section">
    <app-header-component
      :class="toggleNavClass()"
      :data-customer="dataCustomer"
    />

    <div id="navbar-hero">
      <v-container>
        <div class="d-flex align-center mt-6 mb-16 navbar-container">
          <app-btn-component
            text
            dark
            color="white"
            class="no-background-hover"
            to="/"
          >
            <v-avatar tile>
              <img
                src="../assets/logo.png"
                alt=""
              >
            </v-avatar>
          </app-btn-component>

          <v-spacer />

          <app-btn-component
            dark
            text
            color="white"
            class="no-background-hover"
            to="/profil/"
          >
            <v-icon class="me-0 me-sm-3">
              mdi-account-circle-outline
            </v-icon>
            <span class="d-none d-sm-block">Account</span>
          </app-btn-component>

          <app-btn-component
            dark
            text
            tile
            color="white"
            class="no-background-hover"
            @click="setLink()"
          >
            <v-icon class="me-0 me-sm-3">
              mdi-cart-outline
            </v-icon>
            <span class="d-none d-sm-block">Cart</span>
          </app-btn-component>

          <v-navigation-drawer
            v-model="shoppingCartDrawer"
            width="500"
            fixed
            temporary
            right
          >
            <app-shopping-cart-component
              :data-cart="dataCart"
              @clicked-item-cart="setLink"
            >
              <template v-slot:userDrawerCloseButton>
                <app-btn-component
                  icon
                  color
                  @click="shoppingCartDrawer = false"
                >
                  <v-icon color="primary">
                    mdi-close
                  </v-icon>
                </app-btn-component>
              </template>
            </app-shopping-cart-component>

            <template v-slot:append>
              <div class="pa-2">
                <app-btn-component
                  class="text-capitalize mb-3"
                  block
                  color="primary"
                >
                  Checkout Now
                </app-btn-component>
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
            <h1
              class="white--text text-center text-h3 font-weight-regular mb-4"
            >
              Discover the best food & drinks in
              <span class="font-weight-bold">New York</span>
            </h1>

            <h4 class="text-h6 white--text text-center font-weight-light mb-5">
              The meals you love, delivered with care
            </h4>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <app-snack-bar-component
      v-model="snackbar"
      :color="color"
      :title="title"
      :subtitle="subtitle"
      :multi-line="multiLine"
    />

    <app-go-to-btn-component />
  </div>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'
  import AppHeaderComponent from './AppHeaderComponent'
  import AppShoppingCartComponent from './AppShoppingCartComponent'
  import AppSnackBarComponent from '../components/AppSnackBarComponent'
  import AppGoToBtnComponent from './AppGoToBtnComponent'
  import ApiService from '../service/ApiService'

  export default {
    name: 'AppBarComponent',

    components: {
      AppBtnComponent,
      AppHeaderComponent,
      AppShoppingCartComponent,
      AppSnackBarComponent,
      AppGoToBtnComponent,
    },

    props: {
      dataCustomer: Object,
    },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      active: false,
      dialog: false,
      shoppingCartDrawer: false,
      dataCart: [],
    }),

    mounted () {
      window.document.onscroll = () => {
        if (window.scrollY > 250) {
          this.active = true
        } else {
          this.active = false
        }
      }
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      toggleNavClass () {
        if (this.active === false) {
          return 'nav'
        } else {
          return 'sticky-nav'
        }
      },

      async setLink () {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          this.$router.push('/login/')
        } else {
          const result = await this.apiService.getData(this.$http, `cart/${this.dataCustomer.id}`)
          if (result.data.data) {
            this.dataCart = result.data.data
            this.shoppingCartDrawer = true
            this.alert(result.data.status, result.data.message)
          } else {
            this.shoppingCartDrawer = false
            this.alert('fails', 'Data Kosong')
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.hero-section {
  background-image: url("../assets/header-bg.png");
  background-size: cover;
  .nav {
    display: none;
  }
}
</style>
