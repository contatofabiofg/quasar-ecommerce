import { defineStore } from 'pinia'
import { IProduct } from 'src/types/IProduct'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: [] as IProduct[],
  }),
  getters: {
    state: (state) => state.cart,
  },
  actions: {
    add(item: IProduct): void {
      if (this.cart.find((element) => element.id == item.id)) {
        const element = this.cart.find((element) => element.id == item.id)
        const idx = this.cart.indexOf(element as IProduct)
        if (this.cart[idx] != undefined) {
          this.cart[idx].qtd++
        }
      } else {
        item.index = this.cart.length
        this.cart.push(item)
      }
    },
    increment(index: number): void {
      this.cart[index].qtd++
    },
    decrement(index: number): void {
      if (this.cart[index].qtd === 1) {
        this.cart.splice(index, 1)
      } else {
        this.cart[index].qtd--
      }
    },
  },
})
