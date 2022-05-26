<template>
  <v-container
    class="fill-height hero-section"
    fluid
  >
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="10"
      >
        <v-expand-transition>
          <v-card
            v-show="expand"
            class="elevation-6"
          >
            <v-row
              class="fill-height px-3"
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                md="6"
              >
                <v-card-text class="mt-12">
                  <h1
                    class="text-center"
                  >
                    Log in
                  </h1>

                  <v-row
                    align="center"
                    justify="center"
                  >
                    <v-col
                      class="mt-16"
                      cols="12"
                      sm="8"
                    >
                      <v-form
                        ref="formLogin"
                        lazy-validation
                      >
                        <TextInput
                          v-model="formLogin.email"
                          :rules="emailRules"
                          label="Email"
                        />

                        <TextInput
                          v-model="formLogin.password"
                          :rules="passwordRules"
                          label="Password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                        />

                        <v-row>
                          <v-col
                            cols="12"
                            sm="7"
                          >
                            <v-checkbox
                              v-model="checkbox"
                              label="Selalu Log In"
                              class="mt-n1"
                              color="primary"
                            />
                          </v-col>
                        </v-row>

                        <v-btn
                          color="primary"
                          dark
                          block
                          :loading="loadingButton"
                          @click="setForm('Login')"
                        >
                          Log in
                        </v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="primary"
              >
                <div style="  text-align: center; padding: 150px 0;">
                  <v-card-text class="white--text">
                    <v-avatar
                      class="mb-6"
                      tile
                      size="80"
                    >
                      <img
                        src="../assets/logo.png"
                        alt=""
                      >
                    </v-avatar>

                    <h1 class="text-center ">
                      Belum Punya Akun?
                    </h1>

                    <h4
                      class="text-center mt-3 font-weight-light"
                    >
                      Klik Register untuk mendaftarkan<br> akun Anda di sistem kami
                    </h4>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      outlined
                      dark
                      @click="expand = !expand"
                    >
                      Register
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>

        <v-expand-transition>
          <v-card
            v-show="expand === false"
            class="elevation-6"
          >
            <v-row
              class="fill-height px-3"
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                md="6"
                class="primary"
              >
                <div style="  text-align: center; padding: 150px 0;">
                  <v-card-text class="white--text">
                    <v-avatar
                      class="mb-6"
                      tile
                      size="80"
                    >
                      <img
                        src="../assets/logo.png"
                        alt=""
                      >
                    </v-avatar>

                    <h1 class="text-center ">
                      Sudah Punya Akun?
                    </h1>

                    <h4
                      class="text-center mt-3 font-weight-light"
                    >
                      Klik Log In untuk untuk masuk<br> dengan akun terdaftar Anda
                    </h4>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn
                      outlined
                      dark
                      @click="expand = !expand"
                    >
                      Log in
                    </v-btn>
                  </div>
                </div>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-card-text>
                  <h1
                    class="text-center"
                  >
                    Register
                  </h1>

                  <v-row
                    align="center"
                    justify="center"
                  >
                    <v-col
                      class="mt-16"
                      cols="12"
                      sm="8"
                    >
                      <v-form
                        ref="form"
                        lazy-validation
                      >
                        <TextInput
                          v-model="form.name"
                          :rules="nameRules"
                          label="Name"
                        />

                        <TextInput
                          v-model="form.email"
                          :rules="emailRules"
                          label="Email"
                        />

                        <TextInput
                          v-model="form.phone"
                          :rules="phoneRules"
                          label="Phone"
                        />

                        <TextInput
                          v-model="form.password"
                          :rules="passwordRules"
                          label="Password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                        />

                        <v-btn
                          class="mt-16"
                          color="primary"
                          dark
                          block
                          :loading="loadingButton"
                          @click="setForm('Register')"
                        >
                          Sign up
                        </v-btn>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>
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
    name: 'Login',

    data: () => ({
      expand: true,
      form: {
        name: null,
        email: null,
        phone: null,
        password: null,
      },
      formLogin: {
        email: null,
        password: null,
      },
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
        v => !!v || 'Password Harus Diisi',
        v => (v && v.length >= 8) || 'Password 8 Karakter',
      ],
      show: false,
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      loadingButton: false,
      checkbox: false,
    }),

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      async setForm (actions) {
        let result

        // localStorage.removeItem('user')
        // localStorage.removeItem('token')

        // console.log(localStorage.getItem('user'))
        // console.log(localStorage.getItem('token'))
        // console.log(sessionStorage.getItem('user'))
        // console.log(sessionStorage.getItem('token'))

        if (actions === 'Register') {
          if (this.$refs.form.validate()) {
            this.loadingButton = true

            const customer = new FormData()
            customer.append('name', this.form.name)
            customer.append('email', this.form.email)
            customer.append('phone', this.form.phone)
            customer.append('password', this.form.password)

            result = await this.apiService.storeData(this.$http, 'customer', customer)

            this.alert(result.data.status, result.data.message)
            this.refreshForm()
          }
        } else {
          if (this.$refs.formLogin.validate()) {
            this.loadingButton = true

            const customer = new FormData()
            customer.append('email', this.formLogin.email)
            customer.append('password', this.formLogin.password)

            result = await this.apiService.storeData(this.$http, 'login', customer)

            if (result.data.status === 'success') {
              if (this.checkbox === true) {
                localStorage.setItem('user', result.data.data)
                localStorage.setItem('token', result.data.access_token)
              } else {
                sessionStorage.setItem('user', result.data.data)
                sessionStorage.setItem('token', result.data.access_token)
              }
            }

            this.alert(result.data.status, result.data.message)
            this.refreshFormLogin()
          }
        }
      },

      refreshForm () {
        Object.keys(this.form).forEach(key => {
          this.form[key] = null
        })
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.loadingButton = false
      },

      refreshFormLogin () {
        Object.keys(this.formLogin).forEach(key => {
          this.formLogin[key] = null
        })
        this.$refs.formLogin.reset()
        this.$refs.formLogin.resetValidation()
        this.loadingButton = false
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
