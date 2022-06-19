<template>
  <div>
    <!-- <v-app-bar-nav-icon tile dark @click="drawer = true"></v-app-bar-nav-icon> -->
    <div class="d-flex justify-space-between align-center ps-4 pe-3 mt-3 mb-2">
      <div class="d-flex align-center">
        <v-icon class="me-1">
          mdi-shopping-outline
        </v-icon>

        <h4 class="mb-0 grey--text text--darken-1 f-600">
          {{ dataCart ? `${dataCart.length} Item` : `Kosong` }}
        </h4>
      </div>

      <slot name="userDrawerCloseButton" />
    </div>

    <v-divider />

    <div class="navbar-scroll">
      <div
        v-for="index in dataCart"
        :key="index.name"
      >
        <div class="d-flex align-center justify-space-between pa-3 my-4">
          <div class="d-flex align-center">
            <div class="text-center me-5">
              <v-btn
                icon
                color="primary"
                outlined
                small
                @click="updateItemChart(index, 'add')"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <p class="my-2">
                {{ index.amount_of_product }}
              </p>

              <v-btn
                icon
                color="primary"
                outlined
                small
                @click="updateItemChart(index, 'min')"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>

            <v-avatar
              size="64"
              tile
              class="me-4"
            >
              <img
                class="br-10"
                :src="`${$file}${index.picture}`"
                alt=""
              >
            </v-avatar>

            <div class="">
              <h5 class="text-truncate d-inline-block mw-200 mb-0 f-600">
                {{ index.name }}
              </h5>

              <p class="text-12 mb-0">
                {{
                  `Rp. ${formatExample(index.price)} X ${
                    index.amount_of_product
                  }`
                }}
              </p>

              <h5 class="primary--text">
                {{
                  `Rp. ${formatExample(index.price * index.amount_of_product)}`
                }}
              </h5>

              <h5
                v-if="checksQuantity(index.amount_of_product, index.stock_quantity)"
                class="red--text mt-2"
              >
                Stok Produk Sisa {{ index.stock_quantity }}.
              </h5>
            </div>
          </div>

          <v-btn
            icon
            @click="updateItemChart(index, 'del')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-divider />
      </div>
    </div>

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
  import ApiService from '../service/ApiService'

  export default {
    name: 'AppShoppingCartComponent',

    props: {
      dataCart: Array,
    },

    data: () => ({
      apiService: new ApiService(),
      dataKeranjang: [],
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
    }),

    watch: {
      dataCart () {
        return this.dataCart
      },
      deep: true,
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      checksQuantity (amountoOfProduct, stockQuantity) {
        if (Number(amountoOfProduct) > Number(stockQuantity)) {
          return true
        } else {
          return false
        }
      },

      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },

      async updateItemChart (item, action) {
        if ((action === 'min' && item.amount_of_product === 1) || action === 'del') {
          await this.apiService.deleteData(this.$http, `cart/${item.id}`)
        } else {
          const cart = new FormData()
          cart.append('amount_of_product', action === 'add' ? 1 : -1)
          cart.append('customer_id', item.customer_id)
          cart.append('product_id', item.product_id)
          const result = await this.apiService.storeData(this.$http, 'cart', cart)
          if (result.data.status === 'warning') {
            this.alert(result.data.status, result.data.message)
          }
        }
        this.$emit('clicked-item-cart', null)
      },
    },
  }
</script>

<style lang="scss">
.mw-200 {
  max-width: 200px;
}
</style>
