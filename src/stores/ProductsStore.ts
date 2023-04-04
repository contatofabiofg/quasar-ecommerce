import { defineStore } from 'pinia'
import { IProduct } from 'src/types/IProduct'
import { api } from 'src/boot/axios'

export const useProductsStore = defineStore('productStore', {
  state: () => ({
    products: [] as IProduct[],
    allProducts: [] as IProduct[],
  }),
  getters: {
    getProducts: (state) => state.products,
    getAllProducts: (state) => state.allProducts,
  },

  actions: {
    async syncProducts() {
      let response: [] = []

      await api.get('/products').then((obj) => {
        response = obj.data.map((element: IProduct) => {
          if (Math.floor(Math.random() * 10) >= 5) {
            element.discount = true
          }
          element.qtd = 1
          return element
        })
      })

      this.allProducts = response
      this.products = response
    },

    changeCategory(ctgr: string): void {
      if (ctgr != 'all') {
        const list: unknown = this.allProducts.filter(
          (element) => element.category == ctgr
        )
        this.products = list as IProduct[]
      } else {
        this.products = { ...this.allProducts }
      }
    },

    searchProduct(text: string) {
      const list: unknown = this.allProducts.filter((element) =>
        element.title.toLowerCase().includes(text.toLowerCase())
      )
      this.products = list as IProduct[]
    },
  },
})
