<template>
  <div>
    <v-app-bar
      fixed
      color="white"
      elevate-on-scroll
      width="100%"
    >
      <v-container class="d-flex align-center">
        <app-btn-component
          text
          dark
          color="black"
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
          color="black"
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
          color="black"
          class="no-background-hover"
          @click="setLink()"
        >
          <v-icon class="me-0 me-sm-3">
            mdi-cart-outline
          </v-icon>
          <span class="d-none d-sm-block">Cart</span>
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
            color="primary"
          >
            Checkout Now
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
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'
  import AppShoppingCartComponent from './AppShoppingCartComponent'
  import ApiService from '../service/ApiService'

  export default {
    name: 'AppHeaderComponent',

    components: {
      AppBtnComponent,
      AppShoppingCartComponent,
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
      }
    },

    methods: {
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
