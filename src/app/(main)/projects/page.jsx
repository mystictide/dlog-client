import SetTheme from "@/components/server/settings/setTheme";

export default function Projects() {
  return (
    <div className="content-wrapper">
      <div className="projects"></div>
      <footer className="theme">
        <SetTheme />
      </footer>
    </div>
  );
}
