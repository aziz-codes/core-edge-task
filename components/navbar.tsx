import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = () => {
  return (
    <div className="h-12 flex items-center justify-end px-4 border-b shadow-xs ">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
