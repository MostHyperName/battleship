import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Battle The Ship</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
