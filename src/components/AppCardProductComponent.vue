<template>
  <v-card
    elevation="0"
    outlined
    class="br-10 o-hidden"
  >
    <div class="position-relative pb-2">
      <v-img
        height="250"
        class="btr-10"
        :src="this.$file + cardSection.picture"
      />
    </div>

    <div class="px-4 d-flex justify-space-between align-center">
      <v-spacer />
      <span class="py-2 d-inline-block text-truncate text-16">Rp. {{ formatExample(cardSection.price) }}</span>
    </div>

    <div class="px-4 pt-2 d-flex justify-space-between align-center">
      <span class="d-inline-block text-truncate me-3 f-600 text-18 card-title">{{ cardSection.name }}</span>
    </div>

    <div
      class="white--text mb-n5"
    >
      <slot name="userButtonCard" />
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'AppCardProductComponent',

    props: {
      cardSection: Object,
    },

    methods: {
      formatExample (value) {
        const val = (value / 1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
    },
  }
</script>

<style lang="scss" scoped>
    .card-title {
        flex: 1 1 auto;
        max-width: 100%;
    }
    .card-rating {
        flex: 0 0 auto;
    }
    .b-none {
        border: none !important;
    }
    btr-10 {
        border-top-left-radius: 10px !important;
        border-top-right-radius: 10px !important;
    }
</style>
