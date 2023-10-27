import { api } from "~/trpc/server";

export default async function Home() {
  const users = await api.user.getAll.query();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>{JSON.stringify(users)}</div>
  );
}