import { app } from "electron";

export const isMac = process.platform === "darwin";
export const isWin = process.platform === "win32";
export const isLinux =
  process.platform !== "darwin" && process.platform !== "win32";
