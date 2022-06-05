import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  cartItems: [],
  cartPostItems: [],
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

      let currentTotal = state.cartItems.map((item) => {
        return item.valorTotal;
      });

      state.totalAmount = currentTotal.reduce(
        (prev, current) => prev + current
      );

      let currentQuantity = state.cartItems.map((item) => {
        return item.quantidadePedida;
      });

      state.totalQuantity = currentQuantity.reduce(
        (prev, current) => prev + current
      );
    },

    addPostItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartPostItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartPostItems.push({
          id: newItem.id,
          nome: newItem.nome,
          foto: newItem.foto,
          descricao: newItem.descricao,
          preco: newItem.preco,
          qtd_minima: newItem.qtd_minima,
        });
      }
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

    decrementQuantity(action, state) {
      const indexItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === indexItem
      );

      if (existingItem) {
        state.cardItems.map((item) => ({
          ...item,
          quantidadePedida:
            item.id === indexItem &&
            item.quantidadePedida.reduce((accumulator) => accumulator - 1),
          valorTotal:
            item.id === indexItem
              ? item.quantidadePedida * item.preco
              : item.preco,
        }));
      }
    },

    increaseQuantity(action, state) {
      const indexItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === indexItem
      );

      if (existingItem) {
        state.cardItems.map((item) => ({
          ...item,
          quantidadePedida:
            item.id === indexItem &&
            item.quantidadePedida.reduce((accumulator) => accumulator + 1),
          valorTotal:
            item.id === indexItem
              ? item.quantidadePedida * item.preco
              : item.preco,
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

    clearCart: () => INITIAL_STATE,
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
