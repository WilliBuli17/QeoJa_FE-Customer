<template>
  <div>
    <v-overlay :value="overlay">
      <app-progress-loading-component />
    </v-overlay>

    <div v-if="!overlay">
      <v-app-bar
        fixed
        :color="(this.$vuetify.theme.dark) ? '#121212' : '#FFFFFF'"
        elevate-on-scroll
        width="100%"
      >
        <v-container class="d-flex align-center">
          <app-btn-component
            text
            :color="(this.$vuetify.theme.dark) ? '#FFFFFF' : '#121212'"
            class="no-background-hover"
            to="/"
          >
            <v-avatar size="60">
              <img
                src="../assets/logo.png"
                alt=""
              >
            </v-avatar>
          </app-btn-component>

          <v-spacer />

          <app-account-component
            :dark="false"
            @load="loadOverlay"
          />

          <app-btn-component
            text
            tile
            :color="(this.$vuetify.theme.dark) ? '#FFFFFF' : '#121212'"
            class="no-background-hover"
            @click="setLink()"
          >
            <v-icon class="me-0 me-sm-3">
              mdi-shopping-outline
            </v-icon>
            <span class="d-none d-sm-block">Keranjang</span>
          </app-btn-component>
        </v-container>
      </v-app-bar>

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

      <app-snack-bar-component
        v-model="snackbar"
        :color="color"
        :title="title"
        :subtitle="subtitle"
        :multi-line="multiLine"
      />
    </div>
  </div>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'
  import AppShoppingCartComponent from './AppShoppingCartComponent'
  import ApiService from '../service/ApiService'
  import AppAccountComponent from './AppAccountComponent'

  export default {
    name: 'AppHeaderComponent',

    components: {
      AppBtnComponent,
      AppShoppingCartComponent,
      AppAccountComponent,
    },

    props: {
      dataCustomer: Object,
    },

    data () {
      return {
        apiService: new ApiService(),
        color: null,
        title: null,
        subtitle: null,
        snackbar: false,
        multiLine: true,
        dialog: false,
        shoppingCartDrawer: false,
        dataCart: [],
        disabled: false,
        overlay: false,
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

      async setLink () {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          this.$router.push('/login/')
        } else {
          const result = await this.apiService.getData(this.$http, `cart/${this.dataCustomer.id}`)
          if (result.data.data) {
            this.dataCart = result.data.data
            this.shoppingCartDrawer = true

            for (let i = 0; i < this.dataCart.length; i++) {
              if (Number(this.dataCart[i].stock_quantity) < Number(this.dataCart[i].amount_of_product)) {
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
