import "../assets/css/app.scss";

export const metadata = {
  title: {
    default: "FRKN",
    template: "%s / FRKN",
  },
  description: "Just a blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
