import Head from "next/head";
import React from "react";

type HeaderControllerProps = {
  title?: string;
};

export const HeaderController: React.FC<HeaderControllerProps> = ({
  title,
}) => {
  return (
    <Head>{title ? <title>{title} - QUIBI</title> : <title>Quibi</title>}</Head>
  );
};
