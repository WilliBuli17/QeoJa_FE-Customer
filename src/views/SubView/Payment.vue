<template>
  <div>
    <v-card>
      <app-material-card-component
        icon="mdi-credit-card-settings-outline"
        icon-small
        title="Pembayaran Transaksi"
        color="primary"
      />

      <div v-if="progressLoading">
        <app-progress-loading-component />
      </div>

      <v-card-text v-else>
        <p class="text-h5">
          Untuk melakukan pemesanan, silakan membayar ke rekening berikut untuk menyelesaikan transaksi.
        </p>

        <v-row
          class="px-5 mb-n5"
        >
          <v-col cols="6">
            <p class="text-h5">
              Bank
            </p>
          </v-col>

          <v-col cols="6">
            <p class="text-h5">
              {{ form.bank_name }}
            </p>
          </v-col>
        </v-row>

        <v-row
          class="px-5 my-n5"
        >
          <v-col cols="6">
            <p class="text-h5">
              Nama Akun
            </p>
          </v-col>

          <v-col cols="6">
            <p class="text-h5">
              {{ form.account_name }}
            </p>
          </v-col>
        </v-row>

        <v-row
          class="px-5 my-n5"
        >
          <v-col cols="6">
            <p class="text-h5">
              Nomor Rekening
            </p>
          </v-col>

          <v-col cols="6">
            <p class="text-h5">
              {{ form.account_number }}
            </p>
          </v-col>
        </v-row>

        <v-row
          class="px-5 mt-n5"
        >
          <v-col cols="6">
            <p class="text-h5">
              Nominal
            </p>
          </v-col>

          <v-col cols="6">
            <p class="text-h5">
              Rp. {{ formatExample(nominal) }}
            </p>
          </v-col>
        </v-row>

        <p class="text-h5">
          Jika tidak menyelesaikan transaksi, maka transaksi ini akan batal pada {{ timeConverter() }}. Jangan lupa untuk menyertakan resi pembayaran.
        </p>

        <v-file-input
          v-model="pic"
          label="Resi"
          accept=" image/png, image/jpeg, image/jpg"
          prepend-icon=""
          class="px-5"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          class="font-weight-medium"
          text
          :loading="loadingButton"
          @click="setForm"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>

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
  import AppMaterialCardComponent from '../../components/AppMaterialCardComponent'
  import AppProgressLoadingComponent from '../../components/AppProgressLoadingComponent'
  import AppSnackBarComponent from '../../components/AppSnackBarComponent'
  import ApiService from '../../service/ApiService'

  export default {
    name: 'PaymentView',

    components: {
      AppMaterialCardComponent,
      AppProgressLoadingComponent,
      AppSnackBarComponent,
    },

    props: {
      bank: Number,
      nominal: Number,
      transaction: Number,
    },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      progressLoading: false,
      form: {
        bank_name: null,
        account_name: null,
        account_number: null,
      },
      loadingButton: false,
      pic: null,
    }),

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

      async read () {
        this.progressLoading = true
        const result = await this.apiService.getData(this.$http, `bankPayment/${this.bank}`)

        if (result.data.status === 'success') {
          this.form.bank_name = result.data.data.bank_name
          this.form.account_name = result.data.data.account_name
          this.form.account_number = result.data.data.account_number
        }

        this.progressLoading = false
        this.alert(result.data.status, result.data.message)
      },

      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')

        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },

      async setForm () {
        this.loadingButton = true
        if (this.pic) {
          const transaction = new FormData()
          transaction.append('receipt_of_payment', this.pic)
          await this.apiService.storeData(this.$http, `transaction/${this.transaction}`, transaction)
        }
        this.$router.push('/')
        this.loadingButton = false
      },

      timeConverter () {
        const a = new Date()
        a.setDate(a.getDate() + 2)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const year = a.getFullYear()
        const month = months[a.getMonth()]
        const date = a.getDate()
        const time = date + ' ' + month + ' ' + year
        return time
      },
    },
  }
</script>
