import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize empty cart
  },
  reducers: {
    addItem: (state, action) => {
      /*
       * Add product item to cart.
       * If product is not in the cart then add 1.
       * If product exist in the cart increase quantity by 1.
       * */
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      /*
       * Remove item from cart.
       * Remove taget item by filter out matched item
       * Update cart state with new filtered array as new state
       * */
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      /*
       * Update product quantity.
       * Account for both increment and decrement.
       * If action type is `inc` increase amount by 1.
       * If action type is `dec` decrease amount by 1.
       * If aciton type is `dec` and current amount is 0, then exit.
       * */
      const { type, name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        switch (type) {
          case ('inc'):
            itemToUpdate.quantity++;
            break;
          case ('dec'):
            if (quantity <= 0) {
              break;
            }

            itemToUpdate.quantity--;
            break;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
