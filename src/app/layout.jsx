export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: "FRKN",
    template: "%s / FRKN",
  },
  description: "Just a blog",
  keywords:
    "web development, coding, programming, personal blog, tech trends, music, films, podcasts, memes",
  author: "Furkan Güler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
