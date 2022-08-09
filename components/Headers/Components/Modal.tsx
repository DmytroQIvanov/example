import React from "react";
import { createPortal } from "react-dom";

export const HeaderModal = ({
  isOpen,
  coverApp,
  close,
  children,
  inputRef,
}: {
  isOpen: boolean;
  coverApp: boolean;
  close: () => void;
  children: React.ReactNode;
  inputRef: React.MutableRefObject<any>;
}) => {
  if (!isOpen) return null;
  const ModalDom = (
    <>
      <div
        style={{
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: "100",
          backgroundColor: "rgba(136,136,136,0.09)",
        }}
        onClick={close}
      />

      <div
        style={{
          position: "fixed",
          // @ts-ignore
          left: inputRef?.current?.getClientRects()[0].x,
          zIndex: "1000",
          // @ts-ignore
          top: inputRef?.current?.getClientRects()[0].y,
          display: "block",
          // overflowY: "scroll",
          // overflowX: "auto",
        }}
      >
        {children}
      </div>
    </>
  );
  if (!coverApp) return ModalDom;

  const target = document.body;
  return createPortal(ModalDom, target);
};
