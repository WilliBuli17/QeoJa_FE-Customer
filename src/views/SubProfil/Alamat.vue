<template>
  <v-container
    id="alamat-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <app-material-card-component
          icon="mdi-google-maps"
          icon-small
          title="Alamat"
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

            <v-col
              class="px-7 text-right"
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <app-btn-component
                medium
                :class="$vuetify.breakpoint.mdAndUp ? 'mt-4' : 'mt-n10'"
                rel="noopener noreferrer"
                :width="widthBtn"
                @click="dialogOpen('Tambah', null)"
              >
                <span>Tambah Data</span>
              </app-btn-component>
            </v-col>
          </v-row>

          <div v-if="progressLoading">
            <app-progress-loading-component />
          </div>

          <v-data-table
            v-else
            :headers="headers"
            :items="dataAlamat"
            :search="search"
          >
            <template v-slot:[`item.index`]="{ item }">
              {{ dataAlamat.indexOf(item) + 1 }}
            </template>

            <template v-slot:[`item.address`]="{ item }">
              {{ compresString(item.address) }}
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <app-btn-component
                small
                elevation="5"
                class="ma-2 green accent-4"
                rel="noopener noreferrer"
                @click="dialogOpen('Ubah', item)"
              >
                <v-icon left>
                  mdi-pencil-outline
                </v-icon>
                <span>Ubah</span>
              </app-btn-component>

              <app-btn-component
                small
                elevation="5"
                class="ma-2 red accent-3"
                rel="noopener noreferrer"
                @click="dialogOpen('Hapus', item)"
              >
                <v-icon left>
                  mdi-delete-variant
                </v-icon>
                <span>Hapus</span>
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
                {{ action }} Alamat
              </div>
            </div>
          </template>

          <v-form
            ref="form"
            lazy-validation
          >
            <v-card-text
              v-if="action === 'Hapus'"
            >
              Apakah Anda Yakin Ingin Menghapus Data Alamat {{ form.address }}?
            </v-card-text>

            <v-card-text
              v-else
            >
              <app-text-input-component
                v-model="form.address"
                :rules="addressRules"
                label="Alamat Lengkap"
              />

              <app-text-autocomplete-component
                v-model="form.city"
                :items="dataKota"
                item-text="name"
                item-value="id"
                :rules="cityRules"
                label="Kota"
              />
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                text
                :loading="loadingButton"
                @click="dialogClose"
              >
                Batal
              </v-btn>

              <v-btn
                color="primary"
                text
                :loading="loadingButton"
                @click="setForm"
              >
                {{ action }}
              </v-btn>
            </v-card-actions>
          </v-form>
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
</template>

<script>
  import AppBtnComponent from '../../components/AppBtnComponent'
  import AppProgressLoadingComponent from '../../components/AppProgressLoadingComponent'
  import AppSearchComponent from '../../components/AppSearchComponent'
  import AppSnackBarComponent from '../../components/AppSnackBarComponent'
  import AppTextAutocompleteComponent from '../../components/AppTextAutocompleteComponent'
  import AppTextInputComponent from '../../components/AppTextInputComponent'
  import ApiService from '../../service/ApiService'

  export default {
    name: 'AlamatView',

    components: {
      AppSearchComponent,
      AppProgressLoadingComponent,
      AppSnackBarComponent,
      AppBtnComponent,
      AppTextInputComponent,
      AppTextAutocompleteComponent,
    },

    props: {
      customer: Number,
      dataKota: Array,
    },

    data: () => ({
      dialog: false,
      action: null,
      form: {
        id: null,
        address: null,
        city: null,
      },
      addressRules: [
        v => !!v || 'Alamat Lengkap Harus Diisi',
      ],
      cityRules: [
        v => !!v || 'Kota Harus Diisi',
      ],
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      headers: [
        {
          text: 'No',
          value: 'index',
          align: 'start',
          sortable: false,
          class: 'primary--text',
        },
        {
          text: 'Alamat',
          value: 'address',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Kota',
          value: 'city',
          align: 'start',
          sortable: true,
          class: 'primary--text',
        },
        {
          text: 'Action',
          value: 'actions',
          align: 'end',
          sortable: true,
          class: 'primary--text',
        },
      ],
      dataAlamat: [],
      search: null,
      progressLoading: false,
      loadingButton: false,
    }),

    computed: {
      widthBtn () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '100%'
          case 'sm': return '100%'
          case 'md': return '40%'
          case 'lg': return '25%'
          case 'xl': return '15%'
          default : return '100%'
        }
      },

      widthDialog () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '100%'
          case 'sm': return '90%'
          case 'md': return '80%'
          case 'lg': return '70%'
          case 'xl': return '60%'
          default : return '100%'
        }
      },
    },

    mounted () {
      this.read()
    },

    methods: {
      dialogOpen (action, item) {
        if (action === 'Ubah' || action === 'Hapus') {
          this.form.id = item.id
          this.form.address = item.address
          this.form.city = item.city_id
        }
        this.action = action
        this.dialog = true
      },

      dialogClose () {
        this.dialog = false
        Object.keys(this.form).forEach(key => {
          this.form[key] = null
        })
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.loadingButton = false
      },

      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      async setForm () {
        let result

        if (this.action === 'Hapus') {
          this.loadingButton = true
          result = await this.apiService.deleteData(this.$http, `address/${this.form.id}`)

          this.alert(result.data.status, result.data.message)
          this.read()
          this.dialogClose()
        } else if (this.$refs.form.validate()) {
          this.loadingButton = true
          if (this.action === 'Tambah') {
            const alamat = new FormData()
            alamat.append('address', this.form.address)
            alamat.append('customer_id', this.customer)
            alamat.append('city_id', this.form.city)
            result = await this.apiService.storeData(this.$http, 'address', alamat)
          } else if (this.action === 'Ubah') {
            const newData = {
              address: this.form.address,
              customer_id: this.customer,
              city_id: this.form.city,
            }
            result = await this.apiService.updateData(this.$http, `address/${this.form.id}`, newData)
          }

          this.alert(result.data.status, result.data.message)
          this.read()
          this.dialogClose()
        }
      },

      async read () {
        this.progressLoading = true
        const result = await this.apiService.getData(this.$http, `address/${this.customer}`)
        this.dataAlamat = result.data.data
        this.progressLoading = false
        this.alert(result.data.status, result.data.message)
      },

      compresString (string) {
        const length = 20
        const trimmedString = string.length > length ? string.substring(0, length - 3) + '...' : string

        return trimmedString
      },
    },
  }
</script>
