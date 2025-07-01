import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import API from "../api/api.js";

const useAuthStore = create(
  persist(
    (set, get) => ({
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

      // New logout function
      logout: async () => {
        try {
          set({ loading: true, error: null });
          
          // If you have a logout API endpoint, call it here
          // await API.post("/auth/logout", {}, { withCredentials: true });
          
          // Clear user state
          set({ 
            user: null, 
            error: null, 
            successMessage: "Logged out successfully",
            loading: false 
          });
          
          // Clear any additional localStorage items if needed
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userEmail');
          
          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Logout failed",
            loading: false
          });
          return false;
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
          set({
            error: err.response?.data?.message || "Password Reset Failed !",
          });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      clearMessages: () => set({ error: null, successMessage: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;
