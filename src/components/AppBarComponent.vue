<template>
  <div class="bg-opacity">
    <v-overlay :value="overlay">
      <app-progress-loading-component />
    </v-overlay>

    <div class="content">
      <app-header-component
        v-if="!overlay"
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
              <v-avatar
                size="100"
                color="grey lighten-3"
              >
                <img
                  src="../assets/logo.png"
                  alt=""
                >
              </v-avatar>
            </app-btn-component>

            <v-spacer />

            <app-account-component
              :dark="true"
              @load="loadOverlay"
            />

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
                    to="/transaksi/"
                    :disabled="disabled"
                  >
                    Beli
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
              <h2
                class="white--text text-center text-h2 font-weight-regular mb-2"
              >
                Selamat Datang di
                <span class="font-weight-bold">QeoJa</span>
              </h2>

              <h4 class="text-h4 white--text text-center font-weight-light mb-5">
                Layanan Distibutor Barang Kelontong Terpercaya di NTT
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
  </div>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'
  import AppHeaderComponent from './AppHeaderComponent'
  import AppShoppingCartComponent from './AppShoppingCartComponent'
  import AppSnackBarComponent from '../components/AppSnackBarComponent'
  import AppGoToBtnComponent from './AppGoToBtnComponent'
  import ApiService from '../service/ApiService'
  import AppAccountComponent from './AppAccountComponent'

  export default {
    name: 'AppBarComponent',

    components: {
      AppBtnComponent,
      AppHeaderComponent,
      AppShoppingCartComponent,
      AppSnackBarComponent,
      AppGoToBtnComponent,
      AppAccountComponent,
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
      disabled: false,
      overlay: false,
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
      loadOverlay () {
        this.overlay = !this.overlay
      },

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

            for (let i = 0; i < this.dataCart.length; i++) {
              if (this.dataCart[i].stock_quantity < this.dataCart[i].amount_of_product) {
                this.disabled = true
                break
              } else {
                this.disabled = false
              }
            }
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
.bg-opacity{
    position: relative;
    background-color: #000;
  .nav {
    display: none;
  }
}

.bg-opacity::before{
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.4;
    background-image: url("../assets/header-bg.png");
    background-size: cover;
}

.content{
  position: relative;
  width: 100%;
  height: 450px;
}
</style>
