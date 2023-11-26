"use server";

export default async function Portfolio() {
  return (
    <ul className="h-list">
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/bKoQwCZ.png")`,
        }}
      >
        <span>Cultured</span>
        <div className="actions">
          <a href="https://cultured.herrguller.cc/" target="_blank">
            Live
          </a>
          <a
            href="https://github.com/mystictide/cultured-client"
            target="_blank"
          >
            Front-end
          </a>
          <a
            href="https://github.com/mystictide/cultured-server"
            target="_blank"
          >
            Back-end
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/pEElGuJ.png")`,
        }}
      >
        <span>Explore Spotify</span>
        <div className="actions">
          <a
            href="https://mystictide.github.io/explore-spotify/"
            target="_blank"
          >
            Live
          </a>
          <a
            href="https://github.com/mystictide/explore-spotify"
            target="_blank"
          >
            Front-end
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/wCzPHmd.png")`,
        }}
      >
        <span>Trainer</span>
        <div className="actions">
          <a href="https://trainer.herrguller.cc/" target="_blank">
            Live
          </a>
          <a
            href="https://github.com/mystictide/trainer-client"
            target="_blank"
          >
            Front-end
          </a>
          <a
            href="https://github.com/mystictide/trainer-server"
            target="_blank"
          >
            Back-end
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/fvMMwjl.png")`,
        }}
      >
        <span>Tester</span>
        <div className="actions">
          <a href="https://tester.herrguller.cc/" target="_blank">
            Live
          </a>
          <a href="https://github.com/mystictide/tester.client" target="_blank">
            Front-end
          </a>
          <a href="https://github.com/mystictide/tester.api" target="_blank">
            Back-end
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/HejkRMo.png")`,
        }}
      >
        <span>Artvee Scraper</span>
        <div className="actions">
          <a
            href="https://github.com/mystictide/artvee-scraper"
            target="_blank"
          >
            Repository
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/tA97XRP.png")`,
        }}
      >
        <span>Twitter Bots</span>
        <div className="actions">
          <a href="https://twitter.com/orpheus_laments" target="_blank">
            Live
          </a>
          <a href="https://github.com/mystictide/poetry-bot" target="_blank">
            Back-end
          </a>
        </div>
      </li>
      <li
        className="project-box"
        style={{
          backgroundImage: `url("https://i.imgur.com/MAZXOwq.png")`,
        }}
      >
        <span>Framer</span>
        <div className="actions">
          <a href="https://github.com/mystictide/framer" target="_blank">
            Repository
          </a>
        </div>
      </li>
    </ul>
  );
}
