"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Item = {
  value: string;
  label: string;
};

type FilterSelectedHandler = (filter: Optional<string>) => void;

type Props = {
  items: Item[];
  onItemSelected: FilterSelectedHandler;
};

export const Combobox = ({ items, onItemSelected: setSelectFilter }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(items.at(0)?.value);
  const selectedItem = items.find((item) => item.value === value)?.label;

  const handleOnSelectedItem = (seletecdValue: string) => {
    const newSelectedValue = seletecdValue === value ? items.at(0)?.value : seletecdValue;
    setValue(seletecdValue);
    setSelectFilter(newSelectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-none bg-transparent"
        >
          {selectedItem ?? "Status..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[98px] p-0">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={item.value} value={item.value} onSelect={handleOnSelectedItem}>
                  <Check className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
