<template>
  <q-list>
    <q-item-label header class="text-h5"> Carrinho </q-item-label>

    <CartItem
      v-for="(item, index) in cartItens"
      :key="index"
      :cartItem="{ ...item, index }"
    />

    <div class="total q-pa-lg shadow-1 absolute">
      <span class="text-h5"
        >Total: R${{ total().toFixed(2).replace('.', ',') }}</span
      >
    </div>
  </q-list>
</template>
<script setup lang="ts">
import { ComputedRef, computed } from 'vue'
import CartItem from 'src/components/CartItem/CartItem.vue'
import { ICartItem } from 'src/types/ICartItem'
import { useCartStore } from 'src/stores/cartStore'

const store = useCartStore()

const cartItens: ComputedRef<ICartItem[]> = computed(() => {
  return store.state as ICartItem[]
})

function total() {
  return cartItens.value.reduce((total, item) => {
    let parcial = item.price * item.qtd

    return total + parcial
  }, 0)
}
</script>
<style scoped>
.total {
  right: 20px;
  bottom: 20px;
}
</style>
