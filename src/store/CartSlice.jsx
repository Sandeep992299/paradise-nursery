import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 1. addItem() - Adds item to cart
        addItem(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice += action.payload.price;
            } else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    quantity: 1,
                    totalPrice: action.payload.price,
                });
            }
            state.totalQuantity += 1;
            state.totalAmount += action.payload.price;
        },

        // 2. removeItem() - Removes item from cart
        removeItem(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.id !== action.payload);
            }
        },

        // 3. updateQuantity() - Updates quantity of an item
        updateQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                const difference = action.payload.quantity - item.quantity;
                item.quantity = action.payload.quantity;
                item.totalPrice = item.price * item.quantity;
                state.totalQuantity += difference;
                state.totalAmount += difference * item.price;
            }
        },

        // Additional helper reducers (optional but useful)
        increaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                item.totalPrice += item.price;
                state.totalQuantity += 1;
                state.totalAmount += item.price;
            }
        },

        decreaseQuantity(state, action) {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice -= item.price;
                state.totalQuantity -= 1;
                state.totalAmount -= item.price;
            } else if (item && item.quantity === 1) {
                state.totalQuantity -= 1;
                state.totalAmount -= item.price;
                state.items = state.items.filter(i => i.id !== action.payload);
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

// Export all actions
export const { 
    addItem, 
    removeItem, 
    updateQuantity, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
