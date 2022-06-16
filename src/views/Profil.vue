<template>
  <div>
    <app-header-component
      :data-customer="dataCustomer"
    />

    <v-container
      id="profil-view"
      tag="section"
    >
      <v-row>
        <v-col
          cols="12"
          class="mt-16 mb-10"
        >
          <v-img
            class="br-10 d-flex cover-img align-end"
            cover
            :src="require('../assets/header-bg 2.png')"
            gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,0)"
          >
            <div class="d-flex justify-center justify-md-space-between align-center mx-10 cover-image-content ">
              <div class="d-md-flex d-block align-center text-md-left text-center flex-wrap">
                <label
                  for="avatarUpload"
                  class="me-4"
                >
                  <div class="avatar-upload">
                    <v-avatar size="200">
                      <img
                        :src="fotoPreview"
                        alt=""
                      >
                    </v-avatar>

                    <app-btn-component
                      class="avatar-upload-btn"
                      fab
                      small
                    >
                      <v-icon
                        size="20"
                      >
                        mdi-pencil-outline
                      </v-icon>
                    </app-btn-component>

                    <input
                      id="avatarUpload"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      @change="onFileChanged"
                    >
                  </div>
                </label>

                <div>
                  <h1 class="white--text text-md-left text-center mt-10">
                    {{ dataCustomer.name }}
                  </h1>
                </div>
              </div>
            </div>
          </v-img>
        </v-col>
      </v-row>

      <v-row
        justify="center"
      >
        <v-item-group
          v-model="window"
          mandatory
        >
          <v-item
            v-for="n in length"
            :key="`btn-${n.id}`"
            v-slot="{ active, toggle }"
          >
            <app-btn-component
              :active-class="($vuetify.theme.dark) ? 'bg-active' : 'bg-active-light'"
              class="mx-3 font-weight-medium"
              text
              :input-value="active"
              @click="toggle"
            >
              {{ n.name }}
            </app-btn-component>
          </v-item>
        </v-item-group>
      </v-row>

      <v-row
        class="mb-10"
      >
        <v-col>
          <v-window
            v-model="window"
            vertical
            reverse
          >
            <v-window-item
              v-for="n in length"
              :key="n.id"
            >
              <account
                v-if="n.name === 'Akun' && dataCustomer.name !== null"
                :data-customer="dataCustomer"
                :selected-file="selectedFile"
                @clicked="resetForm"
              />

              <alamat
                v-else-if="n.name === 'Alamat' && dataCustomer.name !== null && dataKota.length > 0"
                :customer="dataCustomer.id"
                :data-kota="dataKota"
              />

              <riwayat-transaksi
                v-else-if="n.name === 'Riwayat Transaksi' && dataCustomer.name !== null && dataKota.length > 0"
                :customer="dataCustomer.id"
              />

              <div v-else>
                <app-progress-loading-component />
              </div>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>

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
  import ApiService from '../service/ApiService'
  import Account from './SubView/Account'
  import Alamat from './SubView/Alamat'
  import RiwayatTransaksi from './SubView/RiwayatTransaksi'
  import AppBtnComponent from '../components/AppBtnComponent'
  import AppProgressLoadingComponent from '../components/AppProgressLoadingComponent'
  import AppSnackBarComponent from '../components/AppSnackBarComponent'
  import AppHeaderComponent from '../components/AppHeaderComponent'
  import AppFooterComponent from '../components/AppFooterComponent'

  export default {
    name: 'ProfilView',

    components: {
      Account,
      Alamat,
      RiwayatTransaksi,
      AppBtnComponent,
      AppProgressLoadingComponent,
      AppSnackBarComponent,
      AppHeaderComponent,
      AppFooterComponent,
    },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      dataCustomer: {
        id: null,
        email: null,
        name: null,
        phone: null,
        picture: null,
      },
      length: [
        {
          id: 0,
          name: 'Akun',
        },
        {
          id: 1,
          name: 'Alamat',
        },
        {
          id: 2,
          name: 'Riwayat Transaksi',
        },
      ],
      window: 0,
      selectedFile: null,
      dataKota: [],
    }),

    computed: {
      fotoPreview () {
        if (this.selectedFile === null && this.dataCustomer.picture) {
          return this.$file + this.dataCustomer.picture
        } else if (this.selectedFile !== null) {
          return URL.createObjectURL(this.selectedFile)
        }

        return null
      },
    },

    mounted () {
      this.read()
      this.readCity()
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      async read () {
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

        this.alert(result.data.status, result.data.message)
      },

      onFileChanged (e) {
        this.selectedFile = e.target.files[0]
      },

      resetForm () {
        Object.keys(this.dataCustomer).forEach(key => {
          this.dataCustomer[key] = null
        })
        this.read()
        this.selectedFile = null
      },

      async readCity () {
        const result = await this.apiService.getData(this.$http, 'city')
        this.dataKota = result.data.data
      },
    },
  }
</script>

<style lang="scss" scoped>
.bg-active-light {
  color : #9C27b0 !important;
}
.bg-active {
  color : #c761da !important;
}
</style>
