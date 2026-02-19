import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// GET ALL PETS
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async () => {
    const res = await API.get("/pets");
    return res.data.pets;
  }
);

// CREATE PET
export const createPet = createAsyncThunk(
  "pets/createPet",
  async (data) => {
    const res = await API.post("/pets", data);
    return res.data;
  }
);

// DELETE PET
export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async (id) => {
    await API.delete(`/pets/${id}`);
    return id;
  }
);

const petSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPets.fulfilled, (state, action) => {
      state.pets = action.payload;
    });

    builder.addCase(createPet.fulfilled, (state, action) => {
      state.pets.push(action.payload);
    });

    builder.addCase(deletePet.fulfilled, (state, action) => {
      state.pets = state.pets.filter(
        (pet) => pet._id !== action.payload
      );
    });
  },
});

export default petSlice.reducer;
