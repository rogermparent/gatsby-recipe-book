import React from "react";

export const Metadata = ({ title }) => {
  return (
    <>
      <html lang="en" />
      <title>{title || "Gatsby Recipe Book"}</title>
    </>
  );
};
