import { createSlice } from "@reduxjs/toolkit";

const cartSlice  = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0
    },
    reducers: {
        addProducts: (state, action) => {
            const existingProduct = state.products.find(product => product._id === action.payload._id);
            
            if (existingProduct) {
                // If product exists, just increase its quantity
                existingProduct.quantity += 1;
            } else {
                // If product doesn't exist, add it to the cart
                state.products.push({ ...action.payload, quantity: 1 });
            }
            // Update total quantity and price
            state.totalQuantity += 1;
            state.totalPrice += Number(action.payload.price);
        },
        removeProduct: (state, action) => {
            const productIndex = state.products.findIndex(
                product => product._id === action.payload
            );
            
            if (productIndex !== -1) {
                const product = state.products[productIndex];
                
                if (product.quantity > 1) {
                    // If quantity is more than 1, decrease the quantity
                    product.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= Number(product.price);
                } else {
                    // If quantity is 1, remove the product from the cart
                    state.totalQuantity -= 1;
                    state.totalPrice -= Number(product.price);
                    state.products.splice(productIndex, 1); 
                }
            } else {
                alert('There was an error while removing product');
            }
        },
        updateQuantity: (state, action) => {
            const { _id, quantity } = action.payload;
            const product = state.products.find(product => product._id === _id);
           
            if(product){
                // Adjust total quantity and price based on the new quantity
                const quantityDifference = quantity - product.quantity;
                state.totalQuantity += quantityDifference;
                state.totalPrice += quantityDifference * Number(product.price);
                
                // Update the product's quantity
                product.quantity = quantity;
            }
            else{
                alert('There was an error while updating product quantity');
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }
    }
})

export const { addProducts, removeProduct, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
