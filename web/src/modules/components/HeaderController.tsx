import React from "react";
import Header from "next/head";
import { NextPage } from "next";

export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "We are Quibi we make the communication and collaboration easy...",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? <title>{title} | Quibi</title> : <title>Quibi</title>}
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`Quibi, ${additionalKeywords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "Quibi"} />
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="Quibi" />
          <meta name="og:image" content={embed.image} />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};
