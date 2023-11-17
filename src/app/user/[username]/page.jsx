export default function UserProfile({ params }) {
  return <div className="content">{params?.username}</div>;
}
