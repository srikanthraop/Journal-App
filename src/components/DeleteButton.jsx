import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
const DeleteButton = ({
  title = "Delete",
  descriptionTitle = "Are you absolutely sure?",
  descriptionBody = "This action cannot be undone. This will permanently delete this entry.",
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    if (onDelete) {
      onDelete();
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        {/* {title}  */} <MdDeleteOutline />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="font-poppins">
            <AlertDialogTitle>{descriptionTitle}</AlertDialogTitle>
            <AlertDialogDescription>{descriptionBody}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="danger" onClick={handleConfirm}>
                Confirm
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
