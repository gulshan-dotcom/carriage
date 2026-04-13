"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { DataContext } from "./ToastContext";
import ToastComponent from "./Toast";
import { useUser } from "@/lib/useUser";

const SessionWrapper = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { data, isLoading } = useUser();
  const user = data?.user;

  useEffect(() => {
    if (user) {
      setMessages(user?.messages);
    }
  }, [user]);

  const Toast = {
    show: (message) => {
      setMessages((prev) => [...prev, message]);
    },
  };
  return (
    <SessionProvider>
      <DataContext.Provider
        value={{
          Toast,
        }}>
        <ToastComponent setMessages={setMessages} messages={messages} />
        {children}
      </DataContext.Provider>
    </SessionProvider>
  );
};

export default SessionWrapper;
