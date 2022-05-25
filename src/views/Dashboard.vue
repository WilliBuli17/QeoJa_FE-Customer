<template>
  <v-container
    id="dashboard-view"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <Box>
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

              <div class="my-10 mr-5">
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
                      <Search
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
                  <Card
                    :card-section="item"
                  >
                    <template v-slot:userButtonCard>
                      <AppBtn
                        text
                        width="50%"
                        class="mb-5 mt-4"
                      >
                        <v-icon left>
                          mdi-open-in-new
                        </v-icon>
                        <span>Detail</span>
                      </AppBtn>

                      <AppBtn
                        width="50%"
                        class="mb-5 mt-4"
                      >
                        <v-icon left>
                          mdi-shopping-outline
                        </v-icon>
                        <span>Keranjang</span>
                      </AppBtn>
                    </template>
                  </Card>
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
        </Box>
      </v-col>
    </v-row>

    <Snackalertbar
      v-model="snackbar"
      :color="color"
      :title="title"
      :subtitle="subtitle"
      :multi-line="multiLine"
    />
  </v-container>
</template>

<script>
  import ApiService from '../service/ApiService'

  export default {
    name: 'DashboardView',

    data: () => ({
      apiService: new ApiService(),
      dataProduk: [],
      dataSupplier: [],
      dataKategori: [],
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      page: 1,
      perPage: 24,
      radioGroup: 'All',
      checkbox: [],
      range: [],
      min: 0,
      max: 0,
      search: null,
    }),

    computed: {
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
        const result = await this.apiService.getData(this.$http, 'product')
        this.dataProduk = result.data.data

        this.dataProduk.sort((a, b) => {
          return a.price - b.price
        })

        this.max = this.dataProduk[this.dataProduk.length - 1].price
        this.range = [this.min, this.max]

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
