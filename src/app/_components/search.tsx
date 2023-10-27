"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search(props: { initValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(props.initValue ?? "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasOnlySpaces = query.replace(/\s/g, "").length === 0;

    if (!query.length || hasOnlySpaces) {
      router.push("/");
      return;
    }

    router.push(`/?term=${query}`);
  };

  return (
    <form className="relative w-full" onSubmit={onSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 w-full rounded-3xl border border-[#D4DEFE] px-4 text-center text-3xl outline-[#D4DEFE]"
      />
      <button
        type="submit"
        className="absolute right-[26px] top-[14px] aspect-square"
      >
        <Image
          src="/search.svg"
          alt="search-icon"
          width={19.61}
          height={19.61}
        />
      </button>
    </form>
  );
}
