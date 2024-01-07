import { JSXElementConstructor, ReactElement } from "react";
import { atom } from "recoil";

export const modalComponentAtom = atom<ReactElement<any, string | JSXElementConstructor<any>>>({
  key: "modalComponent",
  default: null,
});

export const isModalOpenAtom = atom({
  key: "isModalOpen",
  default: false,
});
