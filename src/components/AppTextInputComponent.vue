<template>
  <v-text-field
    :color="color"
    :label="label"
    required
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'AppTextInputComponent',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      label: String,
    },
  }
</script>
