"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header({ settings }) {
  const { siteTitle, mainHeadingMenu, subTitle = [] } = settings;

  const [mobileOpen, setMobileOpen] = useState(false);
  const detailsRefs = useRef([]);

  useEffect(() => {
    // Close all other <details> when one is opened
    detailsRefs.current.forEach((el, idx) => {
      if (el) {
        el.addEventListener("toggle", () => {
          if (el.open) {
            detailsRefs.current.forEach((other, i) => {
              if (i !== idx && other) other.open = false;
            });
          }
        });
      }
    });
  }, []);

  return (
    <header className={`${mobileOpen ? "headingOpen" : ""} site-header`}>
      <div className="heading-left">
        <div className="site-branding">
          <Link href="/">
            <h1>{siteTitle}</h1>
          </Link>
          <div className="subTitle">
            <span>{subTitle}</span>
          </div>

          <button
            className={`hamburger ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav
          className={`main-heading-menu ${
            mobileOpen ? "openMenu" : "collapsed"
          }`}
        >
          {mainHeadingMenu.map((item, index) => {
            if (item._type === "page") {
              return (
                <li key={item._id || item.slug?.current}>
                  <Link href={`/${item.slug?.current}`}>{item.title}</Link>
                </li>
              );
            }

            if (item._type === "category") {
              return (
                <li key={item._id || item.slug?.current}>
                  <Link href={`/projects/${item.slug?.current}`}>{item.title}</Link>
                </li>
              );
            }

            return null;
          })}
        </nav>
      </div>
    </header>
  );
}
