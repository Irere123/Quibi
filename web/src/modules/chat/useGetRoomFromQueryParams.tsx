import { useRouter } from "next/router";
import { useEffect } from "react";
import { validate as uuidValidate } from "uuid";
import { useTypeSafeQuery } from "../../hooks/useTypeSafeQuery";
import { isServer } from "../../lib/isServer";
import { showErrorToast } from "../../lib/showErrorToast";

export const useGetRoomFromQueryParams = () => {
  const { query, push } = useRouter();
  const roomId = typeof query.id === "string" ? query.id : "";
  const { data, isLoading } = useTypeSafeQuery(
    ["getRoomInfo", roomId || ""],
    {
      enabled: uuidValidate(roomId) && !isServer,
      refetchOnMount: "always",
    },
    [roomId]
  );

  const errMsg = data && "error" in data ? data.error : "";
  const noData = !data;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (noData) {
      push("/dash");
      return;
    }
    if (errMsg) {
      console.log(errMsg, isLoading);
      showErrorToast(errMsg);
      push("/dash");
    }
  }, [noData, errMsg, isLoading, push]);

  return { data, isLoading };
};
