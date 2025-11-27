export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: "#FAF5E6",
        color: "#2E2E2E",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
        Nature&apos;s Creamery
      </h1>
      <p style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
        Your website is now running on Next.js & Vercel.
      </p>
    </main>
  );
}
