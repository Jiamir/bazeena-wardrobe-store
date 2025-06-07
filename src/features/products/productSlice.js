import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  products: [
    {
      id: '1',
      name: 'Floral Lawn Dress',
      price: '2200',
      image1: '/src/assets/clothing11a.jpg',
      image2: '/src/assets/clothing11b.jpg',
    },
    {
      id: '2',
      name: 'Embroidered Suit',
      price: '3100',
      image1: '/src/assets/clothing21a.jpg',
      image2: '/src/assets/clothing21b.jpg',
    },
  ],
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ id: uuidv4(), ...action.payload })
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload)
    },
    toggleFavorite: (state, action) => {
      const product = state.products.find(p => p.id === action.payload)
      if (product) {
        product.favorite = !product.favorite
      }
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, toggleFavorite } = productSlice.actions
export default productSlice.reducer
