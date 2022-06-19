<template>
  <v-container
    id="transaksi-view"
    class="fill-height hero-section"
    fluid
    tag="section"
  >
    <v-overlay :value="overlay">
      <app-progress-loading-component />
    </v-overlay>

    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <app-material-card-component
          icon="mdi-credit-card-settings-outline"
          icon-small
          title="Transaksi"
          color="primary"
          style="background-color: rgba(255,255,255, 0.8)"
        >
          <v-row>
            <v-col
              class="px-10 order-last order-md-first"
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <v-form
                ref="form"
                lazy-validation
              >
                <v-row justify="end">
                  <v-col cols="12">
                    <v-card
                      class="border br-10"
                      elevation="3"
                    >
                      <div class="py-2 px-10">
                        <h1>Data Pembeli</h1>
                      </div>

                      <v-divider />

                      <div>
                        <div class="px-4 px-sm-10 pa-4">
                          <app-text-input-component
                            v-model="dataCustomer.name"
                            label="Nama"
                            class="my-5"
                            readonly
                          />

                          <app-text-input-component
                            v-model="dataCustomer.phone"
                            label="No. Hp"
                            class="my-5"
                            readonly
                          />

                          <app-text-autocomplete-component
                            v-model="form.addressId"
                            :items="dataAlamat"
                            item-text="address"
                            item-value="id"
                            :rules="AddressRules"
                            label="Alamat"
                            @change="onChange"
                          />

                          <app-text-autocomplete-component
                            v-model="form.bankId"
                            :items="dataBank"
                            item-text="bank_name"
                            item-value="id"
                            :rules="BankRules"
                            label="Bank"
                            class="my-5"
                            @change="onChange"
                          />

                          <v-textarea
                            v-model="form.message"
                            label="Pesan Khusus"
                            auto-grow
                            row-height="14"
                          />
                        </div>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col
                    cols="6"
                    class="mt-5 mt-lg-16 mt-md-16"
                  >
                    <app-btn-component
                      class="text-capitalize mb-3"
                      block
                      color="grey darken-1 white--text"
                      to="/"
                      :loading="loadingButton"
                    >
                      Kembali
                    </app-btn-component>
                  </v-col>

                  <v-col
                    cols="6"
                    class="mt-5 mt-lg-16 mt-md-16"
                  >
                    <app-btn-component
                      class="text-capitalize mb-3"
                      block
                      :loading="loadingButton"
                      @click="setForm"
                    >
                      Bayar
                    </app-btn-component>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>

            <v-col
              v-if="dataCart.length > 0"
              class="px-10"
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <v-row justify="end">
                <v-col cols="12">
                  <v-card
                    class="border br-10"
                    elevation="3"
                  >
                    <div class="py-2 px-10">
                      <h1>Detail Order</h1>
                    </div>

                    <v-divider />

                    <v-card
                      class="overflow-y-auto"
                      height="500"
                    >
                      <div
                        v-for="index in dataCart"
                        :key="index.name"
                      >
                        <div class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <v-avatar
                              rounded
                              size="70"
                              class="me-sm-4 mx-auto mb-3 mb-sm-0"
                            >
                              <img :src="$file + index.picture">
                            </v-avatar>

                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                {{ index.name }}
                              </div>

                              <div lass="text-14 mb-1 mb-sm-0">
                                {{ `Rp. ${formatExample(index.price)} X ${index.amount_of_product}` }}
                              </div>
                            </div>
                          </div>

                          <p class="mb-0 text-15 mb-3 mb-sm-0">
                            Rp. {{ formatExample(index.amount_of_product * index.price) }}
                          </p>
                        </div>

                        <div class="px-16">
                          <v-divider />
                        </div>
                      </div>
                    </v-card>
                  </v-card>
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="6"
                  class="mt-5"
                >
                  <v-card
                    elevation="3"
                    class="border br-10"
                  >
                    <div class="pa-5">
                      <h4 class="mb-3">
                        Total Harga
                      </h4>

                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          Subtotal Produk :
                        </p>

                        <p class="tex-14 mb-0 font-weight-bold">
                          Rp. {{ formatExample(form.subTotal) }}
                        </p>
                      </div>

                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          Biaya Pengiriman :
                        </p>

                        <p class="tex-14 mb-0 font-weight-bold">
                          Rp. {{ formatExample(form.shippingCost) }}
                        </p>
                      </div>

                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0">
                          Pajak (11%) :
                        </p>

                        <p class="tex-14 mb-0 font-weight-bold">
                          Rp. {{ formatExample(form.tax) }}
                        </p>
                      </div>

                      <v-divider class="my-3" />

                      <div class="d-flex justify-space-between mb-2">
                        <p class="tex-14 mb-0 font-weight-bold">
                          Total:
                        </p>

                        <p class="tex-14 mb-0 font-weight-bold">
                          Rp. {{ formatExample(form.grandTotal) }}
                        </p>
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </app-material-card-component>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      :width="widthDialog"
      persistent
    >
      <payment
        v-if="dialog === true"
        :bank="form.bankId"
        :nominal="form.grandTotal"
        :transaction="transaction"
      />
    </v-dialog>

    <app-snack-bar-component
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
  import Payment from './SubView/Payment'

  export default {
    name: 'TransaksiView',

    components: {
      Payment,
    },

    data: () => ({
      overlay: false,
      apiService: new ApiService(),
      dataCustomer: {
        id: null,
        name: null,
        phone: null,
      },
      dataCart: [],
      dataAlamat: [],
      dataBank: [],
      form: {
        subTotal: 0,
        shippingCost: 0,
        tax: 0,
        grandTotal: 0,
        totalVolumeProduct: 0,
        message: null,
        addressId: null,
        bankId: null,
      },
      AddressRules: [
        v => !!v || 'Alamat Harus Diisi',
      ],
      BankRules: [
        v => !!v || 'Bank Harus Diisi',
      ],
      loadingButton: false,
      dialog: false,
      transaction: null,
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
    }),

    computed: {
      widthDialog () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '100%'
          case 'sm': return '80%'
          case 'md': return '60%'
          case 'lg': return '50%'
          case 'xl': return '40%'
          default : return '100%'
        }
      },
    },

    mounted () {
      this.readUser()
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      onChange () {
        this.form.shippingCost = 0
        if (this.form.addressId) {
          const result = this.dataAlamat.filter((alamat) => {
            return alamat.id === this.form.addressId
          })

          this.form.shippingCost = result[0].expedition_cost * this.form.totalVolumeProduct
          this.form.shippingCost.toFixed(2)
          this.form.grandTotal = this.form.subTotal + this.form.tax + this.form.shippingCost
          this.form.grandTotal.toFixed(2)
        }
      },

      async readUser () {
        this.overlay = true
        let result

        if (sessionStorage.getItem('user')) {
          result = await this.apiService.getData(this.$http, `customer/${sessionStorage.getItem('user')}`)
        } else {
          result = await this.apiService.getData(this.$http, `customer/${localStorage.getItem('user')}`)
        }

        if (result.data.data) {
          this.dataCustomer.id = result.data.data[0].id
          this.dataCustomer.name = result.data.data[0].name
          this.dataCustomer.phone = result.data.data[0].phone
          this.readCart()
          this.readAddress()
          this.readBank()
        }
      },

      async readCart () {
        const result = await this.apiService.getData(this.$http, `cart/${this.dataCustomer.id}`)
        this.dataCart = result.data.data

        this.form.subTotal = result.data.data.reduce((accumulator, object) => {
          return accumulator + (object.price * object.amount_of_product)
        }, 0)

        this.form.totalVolumeProduct = result.data.data.reduce((accumulator, object) => {
          return accumulator + (object.volume * object.amount_of_product)
        }, 0)

        this.form.tax = this.form.subTotal * 0.11
        this.form.tax.toFixed(2)
        this.form.grandTotal = this.form.subTotal + this.form.tax + this.form.shippingCost
        this.form.grandTotal.toFixed(2)
        this.overlay = false
      },

      async readAddress () {
        const result = await this.apiService.getData(this.$http, `address/${this.dataCustomer.id}`)
        this.dataAlamat = result.data.data
      },

      async readBank () {
        const result = await this.apiService.getData(this.$http, 'bankPayment')
        this.dataBank = result.data.data
      },

      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')

        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },

      async setForm () {
        // if (this.totalVolumeProduct < 5000000) {
        //   this.alert('warning', 'Jumlah Pembelian Kurang Dri Ketentuan Minimal Pembelian')
        // } else

        if (this.$refs.form.validate()) {
          this.loadingButton = true
          const transaksi = new FormData()
          transaksi.append('subtotal_price', this.form.subTotal)
          transaksi.append('shipping_cost', this.form.shippingCost)
          transaksi.append('tax', this.form.tax)
          transaksi.append('grand_total_price', this.form.grandTotal)
          transaksi.append('total_volume_product', this.form.totalVolumeProduct)
          transaksi.append('customer_id', this.dataCustomer.id)
          transaksi.append('address_id', this.form.addressId)
          transaksi.append('bank_payment_id', this.form.bankId)
          if (this.form.message) {
            transaksi.append('message', this.form.message)
          }

          await this.readCart()
          let check = true

          for (let i = 0; i < this.dataCart.length; i++) {
            if (this.dataCart[i].stock_quantity < this.dataCart[i].amount_of_product) {
              this.alert('warning', 'Ada Produk Yang Stocknya Kurang')
              this.loadingButton = false
              check = false
              break
            }
          }

          if (check) {
            const result = await this.apiService.storeData(this.$http, 'transaction', transaksi)
            this.loadingButton = false

            if (result.data.status === 'success') {
              this.apiService.deleteData(this.$http, `cartReset/${this.dataCustomer.id}`)
              this.transaction = result.data.data.id
              this.dialog = true
            }
          }
        }
      },
    },
  }
</script>

<style scoped>
  .hero-section {
    background-image: url('../assets/header-bg.png');
    background-size: cover;
  }
</style>
