import { create } from "zustand";
import { axiosInstance } from "../lib/axiosSetup";
import toast from "react-hot-toast";
import { useAuthStore } from "./userAuthStore";

export const userMessage = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/api/message/users");
      set({ users: res.data.data.allUsers });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Fetch Users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  setSelectedUser: (data) => {
    set({ selectedUser: data });
  },

  getSelectedUserMessage: async (userID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/message/${userID}`);
      set({ messages: res.data.data.messages });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Fetch Messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (text) => {
    const { messages, selectedUser } = get();

    try {
      const res = await axiosInstance.post(
        `/api/message/send/${selectedUser._id}`,
        {
          text: text,
        }
      );
      set({ messages: [...messages, res.data.data.newMessage] });
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Failed to send message";
      toast.error(errMsg);
    }
  },

  subscribeToUser: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (data) => {
      if (data.senderId !== selectedUser?._id) return;

      set({ messages: [...get().messages, data] });
    });
  },

  unsubscribeFromUser: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },
}));
