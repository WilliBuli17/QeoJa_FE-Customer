<template>
  <div>
    <v-overlay :value="overlay">
      <app-progress-loading-component />
    </v-overlay>

    <app-bar-component
      :data-customer="dataCustomer"
    />

    <v-container
      id="dashboard-view"
      tag="section"
    >
      <v-row>
        <v-col cols="12">
          <app-box-component>
            <div slot="boxSidebar">
              <div>
                <div class="my-10">
                  <h5 class="text-h5">
                    Categories
                  </h5>
                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      v-for="n in dataKategori"
                      :key="n.name"
                      class="mt-2"
                      :label="compresString(n.name)"
                      :value="n.name"
                      color="primary"
                    />
                  </v-radio-group>
                </div>

                <div class="my-10">
                  <h5 class="text-h5">
                    Suppliers
                  </h5>
                  <v-checkbox
                    v-for="i in dataSupplier"
                    :key="i.name"
                    v-model="checkbox"
                    class="mt-2"
                    :label="compresString(i.name)"
                    :value="i.name"
                    color="primary"
                    hide-details=""
                  />
                </div>

                <div class="my-10">
                  <h5 class="text-h5">
                    Cost per person
                  </h5>
                  <v-range-slider
                    v-model="range"
                    step="50000"
                    :max="max"
                    :min="min"
                    hide-details
                    class="align-center"
                  />

                  <v-row>
                    <v-col cols="2">
                      <h6 class="text-h6 mt-2">
                        Min
                      </h6>
                    </v-col>
                    <v-col cols="10">
                      <h5 class="text-h5 mt-1">
                        Rp. {{ formatExample(range[0]) }}
                      </h5>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2">
                      <h6 class="text-h6 mt-2">
                        Max
                      </h6>
                    </v-col>
                    <v-col cols="10">
                      <h5 class="text-h5 mt-1">
                        Rp. {{ formatExample(range[1]) }}
                      </h5>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>

            <div slot="boxContent">
              <div class="px-8">
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col
                        cols="12"
                        xl="6"
                        lg="6"
                        md="6"
                        sm="12"
                      >
                        <h4 class="text-h4">
                          184 Produk Ditampilkan
                        </h4>
                      </v-col>

                      <v-col
                        cols="12"
                        xl="6"
                        lg="6"
                        md="6"
                        sm="12"
                      >
                        <app-search-component
                          v-model="search"
                          class="mt-n5"
                          hide-details
                        />
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col
                    v-for="(item, index) in filteredProducts"
                    :key="index"
                    cols="12"
                    xl="3"
                    lg="3"
                    md="4"
                    sm="6"
                  >
                    <app-card-product-component
                      :card-section="item"
                    >
                      <template v-slot:userButtonCard>
                        <app-btn-component
                          text
                          width="50%"
                          class="mb-5 mt-4"
                          @click="dialogOpen(item)"
                        >
                          <v-icon left>
                            mdi-open-in-new
                          </v-icon>
                          <span>Detail</span>
                        </app-btn-component>

                        <app-btn-component
                          width="50%"
                          class="mb-5 mt-4"
                          @click="addChart(item)"
                        >
                          <v-icon left>
                            mdi-shopping-outline
                          </v-icon>
                          <span>Keranjang</span>
                        </app-btn-component>
                      </template>
                    </app-card-product-component>
                  </v-col>

                  <v-col
                    cols="12"
                    class="mt-6"
                  >
                    <v-divider />
                  </v-col>

                  <v-col
                    cols="12"
                    class="mt-3"
                  >
                    <v-pagination
                      v-if="Math.ceil(dataProduk.length/perPage) > 1"
                      v-model="page"
                      class="food-truck-pagination"
                      :length="Math.ceil(dataProduk.length/perPage)"
                      circle
                    />
                  </v-col>
                </v-row>
              </div>
            </div>
          </app-box-component>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        :width="widthDialog"
      >
        <v-card>
          <app-material-card-component
            color="primary"
            full-header
          >
            <template #heading>
              <div class="pt-3 pb-2 px-3 white--text">
                <div class="text-h3 font-weight-normal">
                  Detail Produk
                </div>
              </div>
            </template>

            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="6"
                  lg="6"
                >
                  <v-avatar
                    size="100%"
                    rounded
                  >
                    <v-img :src="detailProduct.picture" />
                  </v-avatar>
                </v-col>

                <v-col
                  class="text-left"
                  cols="12"
                  sm="12"
                  md="6"
                  lg="6"
                >
                  <v-card-title class="justify-center">
                    <div class="text-h4 font-weight-middle">
                      {{ detailProduct.name }}
                    </div>
                  </v-card-title>

                  <v-card-title class="justify-start">
                    <div class="text-h4 font-weight-middle">
                      Rp. {{ formatExample(detailProduct.price) }}
                    </div>
                  </v-card-title>

                  <v-card-title class="justify-start">
                    <div class="text-h4 font-weight-middle">
                      {{ detailProduct.description }}
                    </div>
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <app-btn-component
                text
                @click="dialogClose"
              >
                Close
              </app-btn-component>
            </v-card-actions>
          </app-material-card-component>
        </v-card>
      </v-dialog>

      <app-snack-bar-component
        v-model="snackbar"
        :color="color"
        :title="title"
        :subtitle="subtitle"
        :multi-line="multiLine"
      />
    </v-container>

    <app-footer-component />
  </div>
</template>

<script>
  import AppProgressLoadingComponent from '../components/AppProgressLoadingComponent'
  import AppBarComponent from '../components/AppBarComponent'
  import AppBoxComponent from '../components/AppBoxComponent'
  import AppBtnComponent from '../components/AppBtnComponent'
  import AppSearchComponent from '../components/AppSearchComponent'
  import AppCardProductComponent from '../components/AppCardProductComponent'
  import AppMaterialCardComponent from '../components/AppMaterialCardComponent'
  import AppSnackBarComponent from '../components/AppSnackBarComponent'
  import AppFooterComponent from '../components/AppFooterComponent'
  import ApiService from '../service/ApiService'

  export default {
    name: 'DashboardView',

    components: {
      AppProgressLoadingComponent,
      AppBarComponent,
      AppBoxComponent,
      AppBtnComponent,
      AppSearchComponent,
      AppCardProductComponent,
      AppMaterialCardComponent,
      AppSnackBarComponent,
      AppFooterComponent,
    },

    data: () => ({
      overlay: false,
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      dataProduk: [],
      dataSupplier: [],
      dataKategori: [],
      page: 1,
      perPage: 24,
      radioGroup: 'All',
      checkbox: [],
      range: [],
      min: 0,
      max: 0,
      search: null,
      dialog: false,
      detailProduct: {
        name: null,
        picture: null,
        description: null,
        price: null,
      },
      dataCustomer: {
        id: null,
        email: null,
        name: null,
        phone: null,
        picture: null,
      },
    }),

    computed: {
      widthDialog () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '100%'
          case 'sm': return '70%'
          case 'md': return '80%'
          case 'lg': return '70%'
          case 'xl': return '60%'
          default : return '100%'
        }
      },

      filteredProducts () {
        let filteredArrays = this.dataProduk

        filteredArrays = filteredArrays.filter(product => {
          return product.price >= this.range[0] && product.price <= this.range[1]
        })

        if (this.search !== null) {
          filteredArrays = filteredArrays.filter(product => {
            return product.name.toLowerCase().includes(this.search.toLowerCase()) ||
              product.category.toLowerCase().includes(this.search.toLowerCase()) ||
              product.suplier.toLowerCase().includes(this.search.toLowerCase())
          })
        }

        if (this.radioGroup !== 'All') {
          filteredArrays = filteredArrays.filter(product => {
            return product.category.toLowerCase().includes(this.radioGroup.toLowerCase())
          })
        }

        if (this.checkbox.length > 0) {
          filteredArrays = filteredArrays.filter(product => {
            return this.checkbox.includes(product.suplier)
          })
        }

        return filteredArrays.slice((this.page - 1) * this.perPage, this.page * this.perPage)
      },
    },

    mounted () {
      this.read()
      this.readSupplier()
      this.readKategori()
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      async read () {
        this.overlay = true
        const result = await this.apiService.getData(this.$http, 'product')
        await this.readUser()
        this.dataProduk = result.data.data
        this.max = this.dataProduk[this.dataProduk.length - 1].price
        this.range = [this.min, this.max]
        this.dataProduk.sort((a, b) => {
          return a.price - b.price
        })
        this.overlay = false
        this.alert(result.data.status, result.data.message)
      },

      async readSupplier () {
        const result = await this.apiService.getData(this.$http, 'supplier')
        this.dataSupplier = result.data.data
      },

      async readKategori () {
        const result = await this.apiService.getData(this.$http, 'category')
        this.dataKategori = result.data.data
        this.dataKategori.push(
          {
            id: 0,
            name: 'All',
          },
        )
        this.dataKategori.sort((a, b) => {
          return a.id - b.id
        })
      },

      compresString (string) {
        const length = 25
        const trimmedString = string.length > length ? string.substring(0, length - 3) + '...' : string

        return trimmedString
      },

      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')

        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },

      dialogOpen (item) {
        this.dialog = true
        this.detailProduct.name = item.name
        this.detailProduct.description = item.description
        this.detailProduct.price = item.price
        this.detailProduct.picture = this.$file + item.picture
      },

      dialogClose () {
        this.dialog = false
        Object.keys(this.detailProduct).forEach(key => {
          this.detailProduct[key] = null
        })
      },

      async readUser () {
        let result

        if (sessionStorage.getItem('user')) {
          result = await this.apiService.getData(this.$http, `customer/${sessionStorage.getItem('user')}`)
        } else {
          result = await this.apiService.getData(this.$http, `customer/${localStorage.getItem('user')}`)
        }

        if (result.data.data) {
          this.dataCustomer.id = result.data.data[0].id
          this.dataCustomer.email = result.data.data[0].email
          this.dataCustomer.name = result.data.data[0].name
          this.dataCustomer.phone = result.data.data[0].phone
          this.dataCustomer.picture = result.data.data[0].picture
        }
      },

      async addChart (item) {
        if (!sessionStorage.getItem('token') && !localStorage.getItem('token')) {
          this.$router.push('/login/')
        } else {
          const cart = new FormData()
          cart.append('amount_of_product', 1)
          cart.append('customer_id', this.dataCustomer.id)
          cart.append('product_id', item.id)
          await this.apiService.storeData(this.$http, 'cart', cart)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bg-transparent {
    background-color: transparent !important;
  }
  .o-hidden {
    overflow: hidden !important;
  }
</style>
