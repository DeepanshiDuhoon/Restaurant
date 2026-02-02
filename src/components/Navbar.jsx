import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 30px",
      background: "#222",
      color: "white",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
    },

    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#ff7a18",
      textDecoration: "none",
    },

    links: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },

    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "15px",
    },
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        EatoEase
      </Link>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>
    </nav>
  );
}
