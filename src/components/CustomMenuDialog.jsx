import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const CustomMenuDialog = ({
  selectedItem,
  onClose,
  attachedMedia,
  onAttach,
}) => {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAttach({
      ...attachedMedia,
      [selectedItem.toLowerCase()]: inputValue,
    });
    onClose();
  }

  return (
    <Dialog open={!!selectedItem} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Add ${selectedItem}`}</DialogTitle>
          <DialogDescription>
            {selectedItem === "Game" &&
              "Add a link to a game that influenced your feelings."}
            {selectedItem === "Song" && "Add a link to a song that moved you."}
            {selectedItem === "Movie" &&
              "Add a link to a movie that resonated with you."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label
            htmlFor="mediaLink"
            className="text-left"
          >{`${selectedItem} Link`}</Label>
          <Input
            id="mediaLink"
            placeholder={`Enter ${selectedItem.toLowerCase()} URL`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomMenuDialog;
