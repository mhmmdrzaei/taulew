import Image from "next/image";
import { PortableText } from "next-sanity";
import React from "react";

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
<p>all work © Tau Lewis {currentYear}.</p>
    </footer>
  );
}
