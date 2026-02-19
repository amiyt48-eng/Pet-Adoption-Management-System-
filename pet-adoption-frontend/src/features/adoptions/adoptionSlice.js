import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

/* ================= USER - APPLY ================= */
export const applyAdoption = createAsyncThunk(
  "adoptions/apply",
  async (petId, { rejectWithValue }) => {
    try {
      const res = await API.post("/adoptions", { petId });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Application failed"
      );
    }
  }
);

/* ================= USER - MY APPLICATIONS ================= */
export const getMyApplications = createAsyncThunk(
  "adoptions/my",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/adoptions/my");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

/* ================= ADMIN - ALL APPLICATIONS ================= */
export const getAllApplications = createAsyncThunk(
  "adoptions/all",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/adoptions");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all applications"
      );
    }
  }
);

/* ================= ADMIN - UPDATE STATUS ================= */
export const updateApplication = createAsyncThunk(
  "adoptions/update",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/adoptions/${id}`, { status });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );
    }
  }
);

const adoptionSlice = createSlice({
  name: "adoptions",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdoptionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* APPLY */
      .addCase(applyAdoption.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(applyAdoption.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.applications.push(action.payload);
      })
      .addCase(applyAdoption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* MY APPLICATIONS */
      .addCase(getMyApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(getMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ALL APPLICATIONS */
      .addCase(getAllApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(getAllApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* UPDATE STATUS */
      .addCase(updateApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = state.applications.map((app) =>
          app._id === action.payload._id ? action.payload : app
        );
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAdoptionState } = adoptionSlice.actions;
export default adoptionSlice.reducer;
