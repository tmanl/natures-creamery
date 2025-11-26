export const metadata = {
  title: "Nature's Creamery",
  description: "Indulgence without compromise — plant-based spreads and lifestyle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
