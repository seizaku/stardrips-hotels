"use client"
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";

const Watch = () => {
  const watch = api.pubSub.watchGmail.useMutation();

  return (
    <Button
      onClick={() => {
        watch.mutate();
        toast.success("Watching for new emails");
      }}
    >
      Watch
    </Button>
  );
};

export { Watch };
