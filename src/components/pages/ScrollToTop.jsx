import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

 useEffect(() => {
  const navbar = document.querySelector("nav");
  const offset = navbar ? navbar.offsetHeight+450 : 0;
  window.scrollTo({ top: offset, behavior: "smooth" });
}, [pathname]);

  return null;
}