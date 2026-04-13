import React from "react";

const Toast = ({ messages, setMessages }) => {
  return (
    <div
      id="instructionToast"
      className={`toast ${messages.length > 0 && "show"}`}>
      <p className="toast-text" id="toastMessage">
        {[messages[0]]}
      </p>
      <button
        id="closeToast"
        onClick={() => setMessages(messages.filter((_, index) => index != 0))}
        className="toast-close-btn">
        <span className="material-symbols-rounded" style={{ fontSize: "20px" }}>
          close
        </span>
      </button>
    </div>
  );
};

export default Toast;
