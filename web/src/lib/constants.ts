export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = !__prod__
  ? "http://localhost:4001"
  : "https://api-neox-next.herokuapp.com";

export const linkRegex2 = /(https?:\/\/[^\s]+)/g;
export const linkRegex3 = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
export const linkRegex =
  /(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;
export const codeBlockRegex = /`([^`]*)`/g;
