import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useTypeSafePrefetch } from "../hooks/useTypeSafePrefetch";

type Prefetch = ReturnType<typeof useTypeSafePrefetch>;

const handlers = {
  profile: ({ username }: { username: string }) => ({
    href: "/u/[username]",
    as: `/u/${username}`,
    onClick: (prefetch: Prefetch) => prefetch("getUserProfile", [username]),
  }),
};

type Handler = typeof handlers;

type ValueOf<T> = T[keyof T];
type DifferentProps = {
  [K in keyof Handler]: {
    route: K;
    data: Parameters<Handler[K]>[0];
    children?: React.ReactNode;
  };
};

// the purpose of this component is to start the query to the api before navigating to the page
// this will result in less loading time for the user
export const ApiPreloadLink: React.FC<ValueOf<DifferentProps>> = ({
  children,
  route,
  data,
  ...props
}) => {
  const prefetch = useTypeSafePrefetch();

  const { as, href, onClick } = handlers[route](data as any);

  return (
    <Link href={href} as={as}>
      <a {...props} onClick={() => onClick(prefetch)}>
        {children}
      </a>
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
