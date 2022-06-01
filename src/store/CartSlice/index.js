import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartIsFilled: 0,
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          nome: newItem.nome,
          foto: newItem.foto,
          descricao: newItem.descricao,
          preco: newItem.preco,
          qtd_minima: newItem.qtd_minima,
          quantidadePedida: newItem.quantidadePedida,
          valorTotal: newItem.valorTotal,
        });
      }
      /*else {
          existingItem?.quantidadePedida++
        existingItem.valorTotal = Number(existingItem.valorTotal) + Number(newItem.price),
        }*/
    },

    getCartTotal: (state) => {
      let { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.totalAmount += itemTotal;
          cartTotal.totalQuantity += amount;
          return cartTotal;
        },
        { totalAmount: 0, totalQuantity: 0 }
      );

      state.totalAmount = parseInt(totalAmount.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    updateQuantity(action, state) {
      const { indexItem, value } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === indexItem
      );

      if (existingItem) {
        state.cardItems.map((item) => ({
          ...item,
          quantidadePedida:
            item.id === indexItem ? value : item.quantidadePedida,
          valorTotal: item.id === indexItem ? value * item.preco : item.preco,
        }));
      }
    },

    removeItem(state, action) {
      const indexItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === indexItem
      );

      if (existingItem) {
        for (var i = state.cardItems.length - 1; i >= 0; --i) {
          if (state.cardItems[i].id === indexItem) {
            state.cardItems.splice(i, 1);
          }
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
