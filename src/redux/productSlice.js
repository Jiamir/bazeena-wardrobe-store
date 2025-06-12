import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Orange Blossom",
      price: 6100,
      image: "/assets/clothing11a.jpg",
      description: "Bright festive orange outfit",
    },
    {
      id: 2,
      name: "Plum Dusk",
      price: 7300,
      image: "/assets/clothing12a.jpg",
      description: "Deep plum traditional wear",
    },
    {
      id: 3,
      name: "Black Mirage",
      price: 8400,
      image: "/assets/clothing13a.jpg",
      description: "Elegant black evening dress",
    },
    {
      id: 4,
      name: "Ocean Blues",
      price: 5700,
      image: "/assets/clothing14a.jpg",
      description: "Cool blue beachwear suit",
    },
    {
      id: 5,
      name: "Green Meadow",
      price: 6800,
      image: "/assets/clothing21a.jpg",
      description: "Soft green floral design",
    },
    {
      id: 6,
      name: "Maroon Velvet",
      price: 7900,
      image: "/assets/clothing22a.jpg",
      description: "Rich maroon velvet touch",
    },
    {
      id: 7,
      name: "White Pearl",
      price: 4800,
      image: "/assets/clothing23a.jpg",
      description: "Pure white elegant look",
    },
    {
      id: 8,
      name: "Crimson Ember",
      price: 9000,
      image: "/assets/clothing24a.jpg",
      description: "Fiery red festive dress",
    },
    {
      id: 9,
      name: "Pink Dust",
      price: 4550,
      image: "/assets/clothing31a.jpg",
      description: "Light pink casual wear",
    },
    {
      id: 10,
      name: "Sea Mint",
      price: 8600,
      image: "/assets/clothing32a.jpg",
      description: "Fresh minty cool tones",
    },
    {
      id: 11,
      name: "Zinc Charm",
      price: 4950,
      image: "/assets/clothing33a.jpg",
      description: "Grey zinc stylish design",
    },
    {
      id: 12,
      name: "Royal Glow",
      price: 8750,
      image: "/assets/clothing34a.jpg",
      description: "Golden glow formal wear",
    },
    {
      id: 13,
      name: "Light Rose",
      price: 4600,
      image: "/assets/clothing41a.jpg",
      description: "Soft rose daywear dress",
    },
    {
      id: 14,
      name: "Navy Frost",
      price: 5350,
      image: "/assets/clothing42a.jpg",
      description: "Cool navy formal outfit",
    },
    {
      id: 15,
      name: "Peach Bloom",
      price: 9150,
      image: "/assets/clothing43a.jpg",
      description: "Bright peach festive suit",
    },
    {
      id: 16,
      name: "Offwhite Silk",
      price: 7000,
      image: "/assets/clothing44a.jpg",
      description: "Silky offwhite wedding wear",
    },
  ],
  searchTerm: "",
};


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action) => {
        state.products.push(action.payload);
      },
      prepare: (product) => {
        let imageURL = product.image;

        if (product.image instanceof File) {
          imageURL = URL.createObjectURL(product.image);
        }

        return {
          payload: {
            id: nanoid(),
            ...product,
            image: imageURL,
            description: product.description || "",
          },
        };
      },
    },

    editProduct: (state, action) => {
      const { id, name, price, image, description } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        const updatedImage =
          image instanceof File ? URL.createObjectURL(image) : image;

        state.products[index] = {
          ...state.products[index],
          name,
          price,
          image: updatedImage,
          description,
        };
      }
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    sortProducts: (state, action) => {
      const type = action.payload;
      switch (type) {
        case "low-to-high":
          state.products.sort((a, b) => a.price - b.price);
          break;
        case "high-to-low":
          state.products.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          state.products.sort((a, b) => b.id - a.id);
          break;
        case "oldest":
          state.products.sort((a, b) => a.id - b.id);
          break;
        default:
          break;
      }
    },
    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  toggleFavorite,
  editProduct,
  sortProducts,
  searchProducts,
} = productSlice.actions;

export default productSlice.reducer;
