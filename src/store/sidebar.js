import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    sidebarVisible: '',
    sidebarUnfoldable: false
  }),
  getters: {},
  actions: {
    toggleSidebar () {
      this.sidebarVisible = !this.sidebarVisible
    },
    toggleUnfoldable () {
      this.sidebarUnfoldable = !this.sidebarUnfoldable
    },
    updateSidebarVisible (value) {
      this.sidebarVisible = value
    }
  }
})
