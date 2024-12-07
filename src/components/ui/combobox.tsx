"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Optional } from "@/modules/domain/utils/optionalUtils";

type Item = {
  value: string;
  label: string;
};

type FilterSelectedHandler = (filter: Optional<string>) => void;

type Props = {
  items: Item[];
  initialSelectedItem?: string;
  onItemSelected: FilterSelectedHandler;
  disabled: boolean;
  className?: string;
};

export const Combobox = (props: Props) => {
  const { items, initialSelectedItem, onItemSelected: setSelectFilter, disabled, className } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialSelectedItem ?? items.at(0)?.value);
  const selectedItem = items.find((item) => item.value === value)?.label;

  const handleOnSelectedItem = (seletecdValue: string) => {
    const newSelectedValue = seletecdValue === value ? undefined : seletecdValue;
    setValue(seletecdValue);
    setSelectFilter(newSelectedValue);
    setOpen(false);
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled} className="disabled:cursor-wait">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between border-none bg-transparent"
          >
            {selectedItem}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-1 w-[102px] p-0">
          <Command>
            {!isMobile && <CommandInput />}
            <CommandList>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={handleOnSelectedItem}>
                    <Check className={cn("mr-1 h-4 w-4", { "opacity-0": value !== item.value })} />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
