<template>
  <footer class="grey lighten-2 py-16">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <v-avatar
            class="mb-6"
            tile
            size="48"
          >
            <img
              src="../assets/logo.png"
              alt=""
            >
          </v-avatar>

          <h5 class="mb-6 font-weight-regular footer-color ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida.
            Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
          </h5>
        </v-col>

        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <h2 class="f-600 mb-4">
            About Us
          </h2>

          <div class="d-flex flex-column">
            <a
              text
              dark
              to=""
              class="footer-link"
            >
              Careers
            </a>
            <a
              text
              dark
              to=""
              class="footer-link"
            >
              Our Stores
            </a>
            <a
              text
              dark
              to=""
              class="footer-link"
            >
              Our Cares
            </a>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="6"
          lg="4"
        >
          <h2 class="f-600 mb-4">
            Contact Us
          </h2>

          <div class="d-flex flex-column">
            <p class="mb-3 footer-color">
              Jalalabad 20/1, Shah Farid Road Sylhet,
            </p>

            <p class="mb-3 footer-color">
              Email: uilib@gmail.com
            </p>

            <p class="mb-6 footer-color">
              Phone: +880 1123 456 780
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

<style lang="scss" scoped>
.footer-color{
    color: #4B566B;
}
.footer-link{
    text-decoration: none;
    color: #4B566B !important;
    margin-bottom: 12px;
    &:hover {
        color: #D23F57 !important;
    }
}
</style>
