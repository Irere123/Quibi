import { useMutation } from "react-query";
import { wsMutation } from "../modules/ws/createWebSocket";

export const useTypeSafeMutation = () => {
  return useMutation(wsMutation);
};
