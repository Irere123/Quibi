import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactChild } from "react";
import { useTypeSafePrefetch } from "../hooks/useTypeSafePrefetch";

type Prefetch = ReturnType<typeof useTypeSafePrefetch>;

type Handler = typeof handlers;

const handlers = {
  profile: ({ username }: { username: string }) => ({
    href: "/u/[username]",
    as: `/u/${username}`,
    onClick: (prefetch: Prefetch) =>
      prefetch("get_user_profile", { userIdOrUsername: username }),
  }),
};

type ValueOf<T> = T[keyof T];
type DifferentProps = {
  [K in keyof Handler]: {
    route: K;
    data: Parameters<Handler[K]>[0];
    children?: ReactChild;
  };
};

export const ApiPreloadLink: React.FC<ValueOf<DifferentProps>> = ({
  children,
  route,
  data,
}) => {
  const prefetch = useTypeSafePrefetch();

  const { as, href, onClick } = handlers[route](data as any);

  return (
    <Link href={href} as={as}>
      <a onClick={() => onClick(prefetch)}>{children}</a>
    </Link>
  );
};

export const usePreloadPush = () => {
  const { push } = useRouter();
  const prefetch = useTypeSafePrefetch();
  return ({ route, data }: ValueOf<DifferentProps>) => {
    const { as, href, onClick } = handlers[route](data as any);
    onClick(prefetch);
    push(href, as);
  };
};
