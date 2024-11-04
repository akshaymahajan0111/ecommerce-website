import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "cart/createOrder",
  async (orders) => {
    const response = await createOrder(orders);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

// export const selectItems = (state) => state.cart.items;

export default orderSlice.reducer;
