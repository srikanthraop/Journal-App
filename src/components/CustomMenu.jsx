import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoAdd } from "react-icons/io5";

const CustomMenu = ({ onSelect }) => {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md bg-slate-50 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-gray-300">
          <IoAdd className="h-5 w-5 text-slate-900" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 w-48 rounded-md bg-white p-2 shadow-lg">
          <DropdownMenuLabel className="mb-1 text-sm text-gray-500">
            What Made You Feel?
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 border-gray-200" />
          <DropdownMenuItem
            className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onSelect("Game");
            }}
          >
            Game
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onSelect("Song");
            }}
          >
            Song
          </DropdownMenuItem>
          <DropdownMenuItem
            className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onSelect("Movie");
            }}
          >
            Movie
          </DropdownMenuItem>

          <DropdownMenuItem
            className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onSelect("Excerpt");
            }}
          >
            Excerpt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomMenu;
