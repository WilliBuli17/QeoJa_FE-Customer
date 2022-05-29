<template>
  <v-container
    id="transaksi-view"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <material-card
          icon="mdi-credit-card-settings-outline"
          icon-small
          title="Transaksi"
          color="primary"
        />
      </v-col>
    </v-row>

    <snackalertbar
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

  export default {
    name: 'TransaksiView',

    // props: {
    // },

    data: () => ({
      apiService: new ApiService(),
      color: null,
      title: null,
      subtitle: null,
      snackbar: false,
      multiLine: true,
    }),

    // computed: {
    // },

    // mounted () {
    // },

    // methods: {
    // },
  }
</script>
