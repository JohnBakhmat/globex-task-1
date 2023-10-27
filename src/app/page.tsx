import { api } from "~/trpc/server";
import { type UserType } from "~/schema/user";
import Image from "next/image";
import { z } from "zod";
import { Search } from "./_components/search";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = z.string().optional().parse(searchParams.term);
  const users = await api.user.getAll.mutate(query);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-['Proxima Nova'] flex h-screen w-screen bg-white">
      <div className="mx-20 mt-16 flex h-full w-full flex-col gap-8">
        <Search />
        <div className="place-items-center grid grid-cols-3 gap-x-[25px] gap-y-6 2xl:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.name} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
}

// box-shadow: 0px 0px 20px 0px #0000001A;

function UserCard({ name, phone, email }: UserType) {
  return (
    <div className="flex aspect-square h-full max-h-[314px] w-full max-w-[357px] flex-col gap-6 rounded-2xl p-6 shadow-[0_0_20px_0_#0000001A]">
      <div className="text-2xl font-bold">{name}</div>
      <div className="grid grid-cols-[auto_1fr] place-items-center gap-x-[14px] gap-y-3 text-sm text-[#8189A3]">
        <Image src="/phone.svg" alt="phone-icon" width={14} height={24} />
        <div className="w-full">{phone}</div>
        <Image src="/email.svg" alt="email-icon" width={24} height={14} />
        <div className="w-full">{email}</div>
      </div>
    </div>
  );
}
