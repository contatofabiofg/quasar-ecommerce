<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ menuItem?.title }}</q-item-label>
      <div v-for="(item, index) in menuItem?.children" :key="index">
        <q-item clickable @click="menuItem?.linkFunction(item.link)">{{
          item.title
        }}</q-item>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { IMenuItem } from '../../types/IMenuItem'

defineProps({
  menuItem: Object as PropType<IMenuItem>,
})
</script>
