<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarStore.sidebarUnfoldable"
    :visible="sidebarStore.sidebarVisible"
    @visible-change="(event) => sidebarStore.updateSidebarVisible(event)"
  >
    <CSidebarBrand>
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand>
    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="sidebarStore.toggleUnfoldable()"
    />
  </CSidebar>
</template>

<script setup>
import { useSidebarStore } from '../../store/sidebar'
import { AppSidebarNav } from './AppSidebarNav.js'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '../../assets/brand/sygnet'

const sidebarStore = useSidebarStore()
</script>
