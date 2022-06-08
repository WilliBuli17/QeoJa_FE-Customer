<template>
  <div class="box-wrapper">
    <div
      class="box-sidebar border-r"
      :class="{ 'open': isOpen }"
      :style="`background-color: ${(this.$vuetify.theme.dark) ? '#121212' : '#FFFFFF'}`"
    >
      <v-row>
        <h4 class="text-h4 mobile-box-btn-sidebar ms-auto font-weight-medium">
          Filter
        </h4>

        <app-btn-component
          icon
          tile
          class="mobile-box-btn-sidebar ms-auto mt-n3"
          @click="isOpen = false"
        >
          <v-icon color="primary">
            mdi-close
          </v-icon>
        </app-btn-component>
      </v-row>

      <v-divider />

      <slot name="boxSidebar" />
    </div>

    <v-divider
      class="mobile-divider"
      vertical
    />

    <div class="box-content">
      <v-row
        align="end"
        justify="end"
      >
        <app-btn-component
          small
          color="primary"
          class="mobile-box-btn text-capitalize mx-10"
          :class=" isOpen == true ? 'hidden' : 'visible'"
          @click="isOpen = true"
        >
          <v-icon left>
            mdi-filter-outline
          </v-icon>
          <span>Filter</span>
        </app-btn-component>
      </v-row>

      <slot name="boxContent" />
    </div>

    <div
      class="box-overlay"
      :class="{ 'open': isOpen }"
      @click="isOpen = false"
    />
  </div>
</template>

<script>
  import AppBtnComponent from './AppBtnComponent'

  export default {
    name: 'AppBoxComponent',

    components: {
      AppBtnComponent,
    },

    data () {
      return {
        isOpen: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  $sidebarWidth: 300px;

  .mobile-box-btn-sidebar{
      display: none;
      @media (max-width: 1903px){
          display: block;
      }
  }

  .hidden {
      visibility: hidden;
  }

  .visible {
    visibility: visible;
  }

  .box-wrapper {
    display: flex;
    position: relative;
    .box-sidebar {
      width: $sidebarWidth;
      transition: all 0.3s ease-in;
      @media (max-width: 1903px) {
        position: fixed;
        padding: 20px;
        height: 100vh;
        overflow-y: scroll;
        top: 0;
        left: -300px;
        z-index: 10;
        &.open {
          left: 0;
        }
      }
    }

    .box-overlay {
      position: fixed;
      display: none;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 9;
      cursor: pointer;
      &.open {
        display: block;
      }
    }

    .box-content {
      .mobile-box-btn {
        display: none;
        @media (max-width: 1903px){
          display: block;
        }
      }
      // background-color: #E7E0C9;
      width: calc(100% - #{$sidebarWidth});
      @media (max-width: 1903px) {
        width: 100%;
      }
    }
  }

  .mobile-divider {
    display: block;
    @media (max-width: 1903px){
      display: none;
    }
  }
</style>
