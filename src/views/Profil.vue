<template>
  <v-container
    id="profil-view"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        class="mb-10"
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
                      src="../assets/images/faces/big-avatar.png"
                      alt=""
                    >
                  </v-avatar>
                  <v-btn
                    class="avatar-upload-btn"
                    fab

                    dark
                    small
                    color="grey lighten-4"
                  >
                    <v-icon
                      color="secondary"
                      dark
                      size="20"
                    >
                      mdi-camera
                    </v-icon>
                  </v-btn>
                  <input
                    id="avatarUpload"
                    class="d-none"
                    type="file"
                  >
                </div>

              </label>
              <div>
                <h2 class="white--text text-md-left text-center mt-10">
                  Abriella Bond
                </h2>
              </div>
            </div>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ProfilView',

    data: () => ({
      page: 1,
    }),
  }
</script>
