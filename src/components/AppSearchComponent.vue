<template>
  <v-text-field
    placeholder="Search"
    color="primary"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-slot:append-outer
    >
      <app-btn-component
        class="mt-n1"
        fab
        small
        elevation="2"
        height="35"
        width="35"
      >
        <v-icon>mdi-magnify</v-icon>
      </app-btn-component>
    </template>
  </v-text-field>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'

  export default {
    name: 'AppSearchComponent',

    components: {
      AppBtnComponent,
    },
  }
</script>
