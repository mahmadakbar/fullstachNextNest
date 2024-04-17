import IconSearch from "@assets/icons/iconSearch";
import React from "react";

interface SearchBarProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({
  onSubmit,
  ...props
}: Readonly<SearchBarProps>) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex item-center w-full mt-10 px-6 py-3 border border-violet-950"
      {...props}
    >
      <input
        type="text"
        placeholder="Search User"
        className="rounded-xl px-7 py-2 flex-1"
      />
      <button type="submit" className="bg-[#BFF4FD] px-7 py-2 rounded-xl ml-4">
        <IconSearch />
      </button>
    </form>
  );
}
