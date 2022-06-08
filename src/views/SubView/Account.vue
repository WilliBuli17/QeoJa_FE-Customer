<template>
  <v-container
    id="account-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <app-material-card-component
          icon="mdi-account"
          icon-small
          title="Account"
          color="primary"
        >
          <v-form
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
                  <app-text-input-component
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
                  <app-text-input-component
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
                  <app-text-input-component
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
                  <app-text-input-component
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
                  <app-text-input-component
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
                class="font-weight-medium"
                text
                :loading="loadingButton"
                @click="setForm()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </app-material-card-component>
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
</template>

<script>
  import ApiService from '../../service/ApiService'
  import AppSnackBarComponent from '../../components/AppSnackBarComponent'
  import AppMaterialCardComponent from '../../components/AppMaterialCardComponent'
  import AppTextInputComponent from '../../components/AppTextInputComponent'

  export default {
    name: 'AccountView',

    components: {
      AppSnackBarComponent,
      AppMaterialCardComponent,
      AppTextInputComponent,
    },

    props: {
      dataCustomer: Object,
      selectedFile: File,
    },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
      checkbox: false,
      form: {
        id: null,
        email: null,
        name: null,
        phone: null,
        password: null,
        confirmPassword: null,
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
        v => (v && v.length >= 8) || 'Password Minimal 8 Karakter',
      ],
      confirmPasswordRules: {
        match (pass, v) {
          return (v && v === pass) || 'Confirmasi Password Tidak Sama'
        },
      },
      show: false,
      loadingButton: false,
    }),

    mounted () {
      this.form.id = this.dataCustomer.id
      this.form.email = this.dataCustomer.email
      this.form.name = this.dataCustomer.name
      this.form.phone = this.dataCustomer.phone
    },

    methods: {
      alert (status, message) {
        this.color = status === 'success' ? 'success' : 'error'
        this.title = status
        this.subtitle = message
        this.snackbar = true
      },

      async setForm () {
        if (this.$refs.form.validate()) {
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

          const result = await this.apiService.storeData(this.$http, `customer/${this.form.id}`, customer)

          this.loadingButton = false
          this.alert(result.data.status, result.data.message)
          this.$emit('clicked', null)
        }
      },

      check (e) {
        if (e !== true) {
          this.form.password = null
          this.form.confirmPassword = null
        }
      },
    },
  }
</script>
