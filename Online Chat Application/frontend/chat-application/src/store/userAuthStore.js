import { create } from "zustand";
import { axiosInstance } from "../lib/axiosSetup";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  userAuth: null,
  isLogedIN: null,
  isSignedIN: null,
  isSigningIN: false,
  onlineUsers: [],
  socket: null,

  isChecking: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ userAuth: res.data.user });

      get().connectSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isChecking: false });
    }
  },

  signIN: async (data) => {
    set({ isSigningIN: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ userAuth: res.data.data });
      
      toast.success("Successfully LoggedIN");

      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isSigningIN: false });
    }
  },

  signUP: async(data)=>{
    set({ isSigningIN: true });

    try {
      const res = await axiosInstance.post("/api/auth/signup", data);
      set({ userAuth: res.data.data });
      
      toast.success("Successfully LoggedIN");

      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "SignUP failed");
    } finally {
      set({ isSigningIN: false });
    }

  },

  logOUT: async () => {
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      set({ userAuth: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  },

  connectSocket: () => {
    const { userAuth } = get();

    if (!userAuth || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userID: userAuth._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userids) => {
      set({ onlineUsers: userids });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
