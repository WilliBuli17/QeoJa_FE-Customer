<template>
  <v-container
    id="riwayat-transaksi-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <app-material-card-component
          icon="mdi-credit-card-settings-outline"
          icon-small
          title="Riwayat Transaksi"
          color="primary"
        >
          <v-row class="px-2">
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <app-search-component v-model="search" />
            </v-col>
          </v-row>

          <div v-if="progressLoading">
            <app-progress-loading-component />
          </div>

          <v-data-table
            v-else
            :headers="headers"
            :search="search"
            :items="dataTransaksi"
            item-key="idKey"
          >
            <template v-slot:[`item.index`]="{ item }">
              {{ dataTransaksi.indexOf(item) + 1 }}
            </template>

            <template v-slot:[`item.created_at`]="{ item }">
              {{ timeConverter(item.created_at) }}
            </template>

            <template v-slot:[`item.grand_total_price`]="{ item }">
              Rp. {{ formatExample(item.grand_total_price) }}
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <app-btn-component
                v-if="item.status === 'Menunggu Konfirmasi' && showcheck(item.created_at)"
                small
                elevation="5"
                class="ma-2 green accent-4"
                rel="noopener noreferrer"
                @click="dialogOpenPayment(item)"
              >
                <v-icon left>
                  mdi-credit-card-settings-outline
                </v-icon>
                <span>Bayar</span>
              </app-btn-component>

              <app-btn-component
                small
                elevation="5"
                class="ma-2 blue accent-4"
                rel="noopener noreferrer"
                @click="dialogOpen(item)"
              >
                <v-icon left>
                  mdi-open-in-new
                </v-icon>
                <span>Detail</span>
              </app-btn-component>
            </template>
          </v-data-table>
        </app-material-card-component>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      persistent
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
                Detail Transaksi Pelanggan
              </div>
            </div>
          </template>

          <v-form
            ref="form"
            lazy-validation
          >
            <v-card-text>
              <v-row>
                <v-col
                  class="px-5"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <app-text-input-component
                    v-model="form.customer"
                    label="Pelanggan"
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <app-text-input-component
                    v-model="form.city"
                    label="Kota"
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  class="px-5"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <v-textarea
                    v-model="form.address"
                    rows="1"
                    auto-grow
                    label="Alamat"
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="6"
                >
                  <v-textarea
                    v-model="form.message"
                    rows="1"
                    auto-grow
                    label="Pesan Khusus"
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.subTotal"
                    label="Sub Total"
                    prefix="Rp."
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.tax"
                    label="Pajak"
                    prefix="Rp."
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.shippingCost"
                    label="Biaya Pengiriman"
                    prefix="Rp."
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.grandTotalPrice"
                    label="Total Biaya"
                    prefix="Rp."
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.bank"
                    label="Bank"
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-btn-component
                    small
                    class="mt-5"
                    block
                    dense
                    target="_blank"
                    :loading="loadingButton"
                    :href="$file + form.receipt"
                  >
                    Resi
                  </app-btn-component>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.deliveryDate"
                    label="Tanggal Pengiriman"
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.arrivedDate"
                    label="Tanggal Tiba"
                    readonly
                  />
                </v-col>

                <v-col
                  class="px-5"
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                >
                  <app-text-input-component
                    v-model="form.status"
                    label="Status"
                    readonly
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <div v-if="progressLoading">
                    <app-progress-loading-component />
                  </div>

                  <v-card
                    v-else
                    class="overflow-y-auto pa-2"
                    max-height="400"
                  >
                    <div
                      v-if="$vuetify.breakpoint.mdAndUp"
                      class="px-4"
                    >
                      <v-row>
                        <v-col
                          class="d-flex justify-center"
                          cols="3"
                        >
                          <h4 class="font-600 grey--text text--darken-2">
                            Produk
                          </h4>
                        </v-col>

                        <v-col
                          class="d-flex justify-center"
                          cols="3"
                        >
                          <h4 class="font-600 grey--text text--darken-2">
                            Jumlah
                          </h4>
                        </v-col>

                        <v-col
                          class="d-flex justify-center"
                          cols="3"
                        >
                          <h4 class="font-600 grey--text text--darken-2">
                            Status
                          </h4>
                        </v-col>

                        <v-col
                          class="d-flex justify-center"
                          cols="3"
                        >
                          <h4 class="font-600 grey--text text--darken-2">
                            Total
                          </h4>
                        </v-col>
                      </v-row>
                    </div>

                    <v-card
                      v-for="index in dataDetailTransaksi"
                      :key="index.id"
                      elevation="0"
                      class="border br-10 mb-4"
                    >
                      <div class="px-4">
                        <v-row class="align-center">
                          <v-col
                            class="d-flex justify-lg-start justify-center"
                            cols="12"
                            md="3"
                          >
                            <h4 class="font-600">
                              <v-avatar
                                rounded
                                size="60"
                              >
                                <img :src="$file + index.picture">
                              </v-avatar>

                              {{ index.name }}
                            </h4>
                          </v-col>

                          <v-col
                            class="d-flex justify-center"
                            cols="12"
                            md="3"
                          >
                            <p class="f-600 mt-3">
                              {{ index.amount_of_product }}
                            </p>
                          </v-col>

                          <v-col
                            class="d-flex justify-center"
                            cols="12"
                            md="3"
                          >
                            <v-chip
                              class="f-600"
                              :color="`${colorStatus(index.status)} accent-1`"
                              small
                              :text-color="`${colorStatus(index.status)} accent-4`"
                            >
                              {{ index.status.toUpperCase() }}
                            </v-chip>
                          </v-col>

                          <v-col
                            class="d-flex justify-center"
                            cols="12"
                            md="3"
                          >
                            <p class="f-600">
                              Rp. {{ formatExample(index.total_price) }}
                            </p>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="mt-5 px-5">
                <app-btn-component
                  v-if="form.status === 'Menunggu Konfirmasi'"
                  block
                  dense
                  :loading="loadingButton"
                  @click="setForm('Batal')"
                >
                  Batalkan
                </app-btn-component>

                <app-btn-component
                  v-if="form.status === 'Pengiriman Selesai'"
                  block
                  dense
                  :loading="loadingButton"
                  @click="setForm('Konfir')"
                >
                  Konfirmasi Produk Telah Sampai
                </app-btn-component>
              </v-row>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <app-btn-component
                text
                class="font-weight-medium"
                :loading="loadingButton"
                @click="dialogClose"
              >
                Simpan
              </app-btn-component>
            </v-card-actions>
          </v-form>
        </app-material-card-component>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogPayment"
      :width="widthDialogPayment"
      persistent
    >
      <payment
        v-if="dialogPayment === true"
        :bank="bankId"
        :nominal="grandTotal"
        :transaction="transactionId"
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
  import AppMaterialCardComponent from '../../components/AppMaterialCardComponent'
  import AppSnackBarComponent from '../../components/AppSnackBarComponent'
  import AppBtnComponent from '../../components/AppBtnComponent'
  import AppProgressLoadingComponent from '../../components/AppProgressLoadingComponent'
  import AppSearchComponent from '../../components/AppSearchComponent'
  import AppTextInputComponent from '../../components/AppTextInputComponent'
  import Payment from './Payment'

  import ApiService from '../../service/ApiService'

  export default {
    name: 'RiwayatTransaksiView',

    components: {
      AppMaterialCardComponent,
      AppSnackBarComponent,
      AppSearchComponent,
      AppProgressLoadingComponent,
      AppBtnComponent,
      AppTextInputComponent,
      Payment,
    },

    props: {
      customer: Number,
    },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      search: null,
      headers: [
        {
          text: 'No',
          value: 'index',
          align: 'start',
          sortable: false,
          class: 'primary--text',
        },
        {
          text: 'Tanggal Transaksi',
          value: 'created_at',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Tanggal Kirim',
          value: 'delivery_date',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Tanggal Tiba',
          value: 'arrived_date',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Nominal Transaksi',
          value: 'grand_total_price',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Status',
          value: 'status',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Action',
          value: 'actions',
          align: 'end',
          sortable: false,
          class: 'primary--text',
        },
      ],
      progressLoading: false,
      dataTransaksi: [],
      dialog: false,
      dataDetailTransaksi: [],
      form: {
        id: null,
        customer: null,
        city: null,
        address: null,
        status: null,
        deliveryDate: null,
        arrivedDate: null,
        message: null,
        subTotal: null,
        tax: null,
        shippingCost: null,
        grandTotalPrice: null,
        bank: null,
        receipt: null,
        time: null,
      },
      loadingButton: false,
      dialogPayment: false,
      bankId: null,
      grandTotal: null,
      transactionId: null,
    }),

    computed: {
      widthDialog () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '100%'
          case 'sm':
            return '90%'
          case 'md':
            return '90%'
          case 'lg':
            return '90%'
          case 'xl':
            return '90%'
          default:
            return '100%'
        }
      },

      widthDialogPayment () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '100%'
          case 'sm':
            return '80%'
          case 'md':
            return '60%'
          case 'lg':
            return '50%'
          case 'xl':
            return '40%'
          default :
            return '100%'
        }
      },
    },

    mounted () {
      this.read()
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      dialogOpenPayment (item) {
        this.bankId = Number(item.bank_payment_id)
        this.transactionId = Number(item.id)
        this.grandTotal = parseFloat(item.grand_total_price)
        this.dialogPayment = true
      },

      timeConverter (value) {
        const a = new Date(value)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const year = a.getFullYear()
        const month = months[a.getMonth()]
        const date = a.getDate()
        const time = date + ' ' + month + ' ' + year
        return time
      },

      async read () {
        this.progressLoading = true
        const result = await this.apiService.getData(this.$http, `transaction/${this.customer}`)
        this.dataTransaksi = result.data.data
        this.progressLoading = false
        this.alert(result.data.status, result.data.message)
      },

      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },

      async readDetailTransaksi () {
        this.progressLoading = true
        this.loadingButton = true
        const result = await this.apiService.getData(this.$http, `detailTransaction/${this.form.id}`)
        this.dataDetailTransaksi = result.data.data
        this.progressLoading = false
        this.loadingButton = false
      },

      dialogOpen (item) {
        this.form.id = item.id
        this.form.customer = item.name
        this.form.city = item.city
        this.form.address = item.address
        this.form.status = item.status
        this.form.deliveryDate = item.delivery_date
        this.form.arrivedDate = item.arrived_date
        this.form.subTotal = item.subtotal_price
        this.form.tax = item.tax
        this.form.shippingCost = item.shipping_cost
        this.form.grandTotalPrice = item.grand_total_price
        this.form.message = item.message
        this.form.receipt = item.receipt_of_payment
        this.form.bank = `${item.bank_name} - ${item.account_name}`
        this.form.time = item.created_at

        this.dialog = true
        this.readDetailTransaksi()
      },

      dialogClose () {
        this.dialog = false
        Object.keys(this.form).forEach(key => {
          this.form[key] = null
        })
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },

      colorStatus (value) {
        if (value === 'pending') {
          return 'orange'
        } else if (value === 'success') {
          return 'green'
        } else {
          return 'red'
        }
      },

      async setForm (action) {
        this.loadingButton = true
        const transaction = new FormData()

        action === 'Batal' ? transaction.append('transaction_status_id', 7) : transaction.append('transaction_status_id', 6)
        const result = await this.apiService.storeData(this.$http, `transaction/${this.form.id}`, transaction)

        this.loadingButton = false
        this.alert(result.data.status, result.data.message)
        this.read()
        this.dialogClose()
      },

      showcheck (value) {
        const a = new Date(value)
        const yearA = a.getFullYear() * 365
        const monthA = (a.getMonth() + 1) * 30
        const dateA = a.getDate()
        const timeA = yearA + (monthA + 1) + dateA + 2

        const b = new Date()
        const yearB = b.getFullYear() * 365
        const monthB = (b.getMonth() + 1) * 30
        const dateB = b.getDate()
        const timeB = yearB + monthB + dateB

        if (timeA > timeB) {
          return true
        }
        return false
      },
    },
  }
</script>
