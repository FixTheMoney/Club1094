import "./globals.css";

export const metadata = {
  title: "My Dashboard",
  description: "Personal hub and business metrics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
