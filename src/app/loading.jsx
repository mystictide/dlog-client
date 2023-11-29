export default async function Loading() {
  return (
    <div id="root">
      <div className="overlay"></div>
      <div className="main-container">
        <div className="loading">
          <div className="loader">Loading...</div>
        </div>
      </div>
    </div>
  );
}
