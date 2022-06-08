<template>
  <footer :class="(this.$vuetify.theme.dark) ? '#121212' : '#FFFFFF'">
    <v-container class="py-16">
      <v-divider />

      <v-row>
        <v-col
          cols="12"
          lg="4"
        >
          <v-avatar
            tile
            size="100"
          >
            <img
              src="../assets/logo.png"
              alt=""
            >
          </v-avatar>

          <h5 class="mb-6 font-weight-regular">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida.
            Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
          </h5>
        </v-col>

        <v-col
          cols="12"
          lg="4"
        />

        <v-col
          class="mt-5"
          cols="12"
          md="6"
          lg="4"
        >
          <h2 class="f-600 mb-4">
            Kontak kami
          </h2>

          <div class="d-flex flex-column">
            <p class="mb-3">
              Alak, Kota Kupang, NTT.
            </p>

            <p class="mb-3">
              Email: qeoja@mail.com
            </p>

            <p class="mb-6">
              Phone: (021) 123456789
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  }
</script>
