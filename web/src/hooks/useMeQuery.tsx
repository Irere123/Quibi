import { useTypeSafeQuery } from "./useTypeSafeQuery";

export const useMeQuery = () => {
  const { data } = useTypeSafeQuery("me");

  return { me: data?.me };
};
