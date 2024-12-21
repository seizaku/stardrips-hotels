"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { api } from "~/trpc/react";

import { useMatchFormStore } from "~/features/match-listings/stores/match-form-store";
import { DialogTitle } from "~/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Input } from "~/components/ui/input";
import { LinkIcon, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

const MatchFormDialog = () => {
  const { selectedId, open, setOpen } = useMatchFormStore();
  const [text, setQuery] = useState("");
  const [query] = useDebounce(text, 200);
  const router = useRouter();

  const { data, refetch, isFetching } = api.hotels.fetchWithQuery.useQuery({ query })
  const [hotels, setHotels] = useState(data);

  const matchListing = api.matchListings.matchListing.useMutation();


  useEffect(() => {
    if (selectedId) {
      toast.success(`Selected: ${selectedId}`);
    }
  }, [selectedId]);

  useEffect(() => {
    if (query.trim() === "") return;
    refetch().then((res) => {
      setHotels(res.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [query]);

  async function handleMatch(email: string, property: string) {
    try {
      await matchListing.mutateAsync({ email, property });
      setOpen(false);
      toast.success("Listing matched!");
    } catch (error) {
      console.error("Failed to match listing:", error);
      toast.error("Failed to match listing.");
    }
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden"></DialogTitle>
        <div className="px-4 flex items-center border-b mt-1.5">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            className="flex h-10 w-full border-0 shadow-none focus-visible:ring-0 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            placeholder="Search hotel..."
          />
        </div>
        <CommandList>
          <CommandEmpty>{isFetching ? "Fetching data.." : "No results found.."}</CommandEmpty>
          <CommandGroup heading="Sheet Listings">
            {hotels?.map((item) => (
              <CommandItem key={item.email}>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-sm">{item.hotel}</h1>
                    <p className="text-muted-foreground">{item.email}</p>
                  </div>
                  <Button
                    disabled={matchListing.isPending}
                    size={"icon"}
                    onClick={() => handleMatch(item.email, selectedId!)}>
                    <LinkIcon />
                  </Button>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { MatchFormDialog };