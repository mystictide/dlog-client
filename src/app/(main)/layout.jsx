import "../../assets/css/resume.scss";

export default async function RootLayout({ children }) {
  return (
    <div id="root">
      <div className="overlay"></div>
      <div className="main-container">{children}</div>
    </div>
  );
}
