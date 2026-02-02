import { useState } from "react";

function HomePage() {
  const [hover, setHover] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.card,
          transform: hover ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hover
            ? "0 35px 70px rgba(0,0,0,0.25)"
            : "0 25px 50px rgba(0,0,0,0.15)",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={styles.imageBox}></div>

        <h1 style={styles.title}>EatoEase Restaurant</h1>

        <p style={styles.tagline}>
          Where taste meets smart technology
        </p>

        <p style={styles.content}>
          EatoEase Restaurant offers a modern dining experience with
          freshly prepared meals and smooth service. Quality, hygiene,
          and consistency are at the heart of everything we serve.
        </p>

        <p style={styles.content}>
          Powered by smart restaurant management, we ensure fast
          operations, accurate orders, and a delightful customer
          experience every single day.
        </p>

        <div style={styles.highlight}>
          Fresh Food • Fast Service • Trusted Experience
        </div>
      </div>
    </div>
  );
}

export default HomePage;


const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `
      radial-gradient(circle at top left, #fff1e6, transparent 60%),
      radial-gradient(circle at bottom right, #ffd6b0, transparent 60%),
      linear-gradient(135deg, #ffecd2, #fcb69f)
    `,
  },

  card: {
    background: "#ffffff",
    width: 600,
    padding: 40,
    borderRadius: 22,
    textAlign: "center",
    transition: "all 0.4s ease",
  },

  imageBox: {
    height: 180,
    borderRadius: 16,
    marginBottom: 25,
    backgroundImage:
      "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ff7a18",
    marginBottom: 6,
  },

  tagline: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },

  content: {
    fontSize: 15,
    color: "#555",
    lineHeight: 1.8,
    marginBottom: 16,
  },

  highlight: {
    marginTop: 22,
    paddingTop: 14,
    borderTop: "1px solid #eee",
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    letterSpacing: 1,
  },
};
