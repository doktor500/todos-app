"use client";

import { Search } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Optional } from "@/modules/domain/utils/optionalUtils";

type Props = {
  onChange: Dispatch<SetStateAction<Optional<string>>>;
};

export const SearchInput = ({ onChange: setSearchTerm }: Props) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex w-80 items-center rounded-lg border border-gray-300 px-5 py-1.5 md:w-96">
      <Search className="mr-2.5 size-4" />
      <input
        type="search"
        placeholder="Search..."
        className="w-full border-0 bg-transparent outline-none"
        onChange={handleInputChange}
      />
    </div>
  );
};
