<template>
  <v-snackbar
    :color="color"
    timeout="3000"
    bottom
    center
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span
      class="text-uppercase text-h5 font-weight-medium"
      v-text="title"
    /> —
    <span
      class="text-h5 font-weight-normal"
      v-text="subtitle"
    />
  </v-snackbar>
</template>

<script>
  export default {
    name: 'AppSnackBarComponent',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      label: String,
      title: String,
      subtitle: String,
    },
  }
</script>
