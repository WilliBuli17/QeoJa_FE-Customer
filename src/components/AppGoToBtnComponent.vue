<template>
  <app-btn-component
    v-scroll="onScroll"
    :class="offsetTop >= 200 ? 'd-block' : 'd-none'"
    small
    fixed
    bottom
    right
    fab
    dark
    @click="$vuetify.goTo(0)"
  >
    <v-icon dark>
      mdi-chevron-up
    </v-icon>
  </app-btn-component>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'

  export default {
    name: 'AppGoToBtnComponent',

    components: {
      AppBtnComponent,
    },

    data () {
      return {
        offsetTop: 0,
      }
    },

    methods: {
      onScroll (e) {
        this.offsetTop = window.pageYOffset
      },
    },
  }
</script>
