"use client";
import { Loader2Icon } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ImageMagnifier } from "./image-magnifier";
import { cn } from "~/lib/utils";
import { ImageStore } from "~/features/promotions/stores/promo-store";

export const ImageModal = ({ children }: { children: ReactNode }) => {
  const { selectedId, data } = ImageStore();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "scroll-container my-4 max-h-[720px] overflow-y-scroll rounded-xl p-0 sm:max-w-lg",
          !selectedId && "h-[720px]",
        )}
      >
        <DialogTitle className="hidden"></DialogTitle>
        {selectedId ? (
          <ImageMagnifier
            src={data?.[selectedId] ?? ""}
            width={510}
            height={10000}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon className="h-12 w-12 animate-spin duration-300" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
