<script>
  import { VHover, VListItem } from 'vuetify/lib'

  export default {
    name: 'AppBarItemComponent',

    render (h) {
      return h(VHover, {
        scopedSlots: {
          default: ({ hover }) => {
            return h(VListItem, {
              attrs: this.$attrs,
              class: {
                'black--text': !hover,
                'white--text primary': hover,
              },
              props: {
                activeClass: '',
                dark: hover,
                link: true,
                ...this.$attrs,
              },
            }, this.$slots.default)
          },
        },
      })
    },
  }
</script>
