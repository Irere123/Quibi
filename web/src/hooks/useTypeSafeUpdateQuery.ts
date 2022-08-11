import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useTypeSafeUpdateQuery = () => {
  const client = useQueryClient();
  return useCallback(
    (op: string, fn: (x: any) => any) => {
      client.setQueryData(op, fn as any);
    },
    [client]
  );
};

// queryClient.setQueryData<{ user: BaseUser } | undefined>(
//     auth_query,
//     (x) =>
//       !x
//         ? x
//         : {
//             ...x,
//             user: {
//               ...x.user,
//               ...data,
//               bio: data.bio.trim(),
//               displayName: data.displayName.trim(),
//             },
//           }
//   );
