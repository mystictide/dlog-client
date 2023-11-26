"use server";

export default async function UserProfile({ params }) {
  return <div className="content">{params?.username}</div>;
}
