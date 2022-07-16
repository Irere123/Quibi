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
  description = "Quibi, an open world for you to communicate, collaborate and manage. Now you can share skills and learn new skills easily than ever",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? (
        <title>{title} | Quibi</title>
      ) : (
        <title>Quibi - Open world</title>
      )}
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`Quibi, ${additionalKeywords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "Quibi - Open world"} />
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="Quibi - Open world" />
          <meta name="og:image" content={embed.image} />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};
