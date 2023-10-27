import { api } from "~/trpc/server";
import { type UserType } from "~/schema/user";
import Image from "next/image";
export default async function Home() {
  const users = await api.user.getAll.query();
  const testUser = {
    name:"Евгения Савченко",
    phone:"+7 (918) 078-17-05",
    email:"yysavchenk@mail.ru"
  } as UserType;
  
  if (!users) {
    return <div>Loading...</div>;
  }

  const users2 = [testUser, ...users];

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="mx-20 mt-16 flex h-full w-full flex-col gap-8">
        <Search />
        <div className="grid grid-cols-3 gap-x-[25px] gap-y-6">
          {users2.map((user) => (
            <UserCard key={user.name} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative w-full">
      <input className="h-12 w-full rounded-3xl border border-[#D4DEFE] text-4xl" />
      <div className="absolute right-[26px] top-[14px] aspect-square">
        <Image
          src="/search.svg"
          alt="search-icon"
          width={19.61}
          height={19.61}
        />
      </div>
    </div>
  );
}

// box-shadow: 0px 0px 20px 0px #0000001A;

function UserCard({ name, phone, email }: UserType) {
  return (
    <div className="flex aspect-square h-full max-h-[314px] w-full max-w-[357px] flex-col gap-6 rounded-2xl p-6 shadow-[0_0_20px_0_#0000001A]">
      <div className="text-2xl">{name}</div>
      <div className="grid grid-cols-[auto_1fr] place-items-center gap-x-[14px] gap-y-3 text-sm text-[#8189A3]">
        <Image src="/phone.svg" alt="phone-icon" width={14} height={24} />
        <div className="w-full">{phone}</div>
        <Image src="/email.svg" alt="email-icon" width={24} height={14} />
        <div className="w-full">{email}</div>
      </div>
    </div>
  );
}
