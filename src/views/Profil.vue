<template>
  <v-container
    id="profil-view"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        class="my-16"
      >
        <v-img
          class="br-10 d-flex cover-img align-end"
          cover
          :src="require('../assets/images/cover-img.png')"
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

                  <v-btn
                    class="avatar-upload-btn"
                    fab
                    small
                  >
                    <v-icon
                      color="primary"
                      size="20"
                    >
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>

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
                  {{ form.name }}
                </h1>
              </div>
            </div>
          </div>
        </v-img>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      class="mb-10 mt-n3"
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
          <v-btn
            dense
            class="mx-3"
            color="primary"
            text
            :input-value="active"
            @click="toggle"
          >
            {{ n.name }}
          </v-btn>
        </v-item>
      </v-item-group>
    </v-row>

    <v-row align="center">
      <v-col>
        <v-window
          v-model="window"
          class="elevation-1"
          vertical
          reverse
        >
          <v-window-item
            v-for="n in length"
            :key="n.id"
          >
            <v-card flat>
              <v-card-text>
                <v-row
                  class="ma-4"
                  align="center"
                >
                  <strong class="text-h5">{{ n.name }}</strong>
                </v-row>
              </v-card-text>

              <v-form
                v-if="n.name === 'Account'"
                ref="form"
                lazy-validation
              >
                <v-card-text
                  class="px-10"
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <text-input
                        v-model="form.name"
                        :rules="nameRules"
                        label="Nama"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                    >
                      <text-input
                        v-model="form.email"
                        :rules="emailRules"
                        label="Email"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                    >
                      <text-input
                        v-model="form.phone"
                        :rules="phoneRules"
                        label="Phone"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-checkbox
                        v-model="checkbox"
                        label="Change Password"
                        color="primary"
                        @change="check($event)"
                      />
                    </v-col>
                  </v-row>

                  <v-row
                    v-if="checkbox === true"
                  >
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                    >
                      <text-input
                        v-model="form.password"
                        :rules="passwordRules"
                        label="Password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      lg="6"
                    >
                      <text-input
                        v-model="form.confirmPassword"
                        :rules="[
                          confirmPasswordRules.match(form.password, form.confirmPassword),
                        ]"
                        label="Confirmasi Password"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />

                  <v-btn
                    color="primary"
                    text
                    :loading="loadingButton"
                    @click="setForm()"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>

              <v-row
                class="ma-4"
              >
                <Alamat v-if="n.name === 'Alamat'" />
                <Transaksi v-if="n.name === 'Transaksi'" />
              </v-row>
            </v-card>
          </v-window-item>
        </v-window>
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
  import TextInput from '../components/TextInput.vue'

  export default {
    name: 'Profil',
    components: { TextInput },
    data: () => ({
      dataCustomer: [],
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      form: {
        email: null,
        name: null,
        phone: null,
        password: null,
        confirmPassword: null,
      },
      editId: null,
      image: null,
      length: [
        {
          id: 0,
          name: 'Account',
        },
        {
          id: 1,
          name: 'Alamat',
        },
        {
          id: 2,
          name: 'Transaksi',
        },
      ],
      window: 0,
      checkbox: false,
      nameRules: [
        v => !!v || 'Nama Harus Diisi',
        v => (v && v.length <= 100) || 'Nama Tidak Boleh Lebih Dari 100 Karakter',
      ],
      emailRules: [
        v => !!v || 'Email Harus Diisi',
        (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Format E-mail Tidak Valid',
      ],
      phoneRules: [
        v => !!v || 'No. Telp. Harus Diisi',
        (v) => !v || /^\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/.test(v) || 'Format No. Telp. Tidak Valid',
      ],
      passwordRules: [
        v => (v && v.length >= 8) || 'Password Minimal 8 Karakter',
      ],
      confirmPasswordRules: {
        match (pass, v) {
          return (v && v === pass) || 'Confirmasi Password Tidak Sama'
        },
      },
      show: false,
      loadingButton: false,

      selectedFile: null,
    }),

    computed: {
      fotoPreview () {
        if (this.selectedFile === null) {
          return this.image
        }
        return URL.createObjectURL(this.selectedFile)
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

      async read () {
        let id
        // let token
        if (sessionStorage.getItem('user')) {
          id = sessionStorage.getItem('user')
          // token = sessionStorage.getItem('token')
        } else {
          id = localStorage.getItem('user')
          // token = sessionStorage.getItem('token')
        }
        const result = await this.apiService.getData(this.$http, `customer/${id}`)
        if (result.data.data) {
          this.form.email = result.data.data[0].email
          this.form.name = result.data.data[0].name
          this.form.phone = result.data.data[0].phone
          this.editId = result.data.data[0].id
          this.image = this.$file + result.data.data[0].picture
        }
        this.alert(result.data.status, result.data.message)
      },

      onFileChanged (e) {
        this.selectedFile = e.target.files[0]
      },

      async setForm () {
        if (this.$refs.form[0].validate()) {
          this.loadingButton = true

          const customer = new FormData()
          customer.append('name', this.form.name)
          customer.append('email', this.form.email)
          customer.append('phone', this.form.phone)

          if (this.form.password) {
            customer.append('password', this.form.password)
          }

          if (this.selectedFile) {
            customer.append('picture', this.selectedFile)
          }

          const result = await this.apiService.storeData(this.$http, `customer/${this.editId}`, customer)

          this.refreshForm()
          this.alert(result.data.status, result.data.message)
        }
      },

      check (e) {
        if (e !== true) {
          this.form.password = null
          this.form.confirmPassword = null
        }
      },

      refreshForm () {
        this.$refs.form[0].reset()
        this.$refs.form[0].resetValidation()
        this.loadingButton = false
        this.selectedFile = null
        this.read()
      },
    },
  }
</script>
