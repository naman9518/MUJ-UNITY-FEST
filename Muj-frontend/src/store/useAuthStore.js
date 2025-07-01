import { create } from "zustand";
import axios from "axios";
import API from "../api/api.js";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  successMessage: null,

  sendOtp: async (universityEmail) => {
    try {
      set({ loading: true, error: null, successMessage: null });
      const { data } = await API.post("/auth/sendotp", { universityEmail });
      set({ successMessage: data.message });
    } catch (error) {
      set({ error: error.response?.data?.message || "OTP request failed" });
    } finally {
      set({ loading: false });
    }
  },

  signupUser: async (formData) => {
    try {
      set({ loading: true, error: null, successMessage: null });
      const { data } = await API.post("/auth/signup", formData);
      set({ successMessage: data.messsage });
      return { success: true, message: data.message };
    } catch (err) {
      set({ error: err.response?.data?.message || "Signup failed" });
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const { data } = await API.post(
        "/auth/signin",
        {
          universityEmail: email,
          password,
        },
        { withCredentials: true }
      );
      set({ user: data.userInfo, successMessage: data.message });
      
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  sendResetOtp: async ({ email }) => {
    set({ error: null, loading: true });
    try {
      const { data } = await API.post("/auth/resetpassword", {
        universityEmail: email,
      });
      set({ successMessage: data.message });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || "OTP not sent !" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  verifyResetPassword: async (resetData) => {
    set({ error: null, loading: true });
    try {
      const { data } = await API.put("/auth/newpassword", resetData);
      set({ successMessage: data.message });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || "Password Reset Failed !" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await API.post("/auth/signout", {}, { withCredentials: true });
      set({ user: null, successMessage: "Logged out successfully" });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Logout failed",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clearMessages: () => set({ error: null, successMessage: null }),
}));

export default useAuthStore;
