import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface PaginationDatatable {
  maxSize?: number;
}

const PaginationDataTable = ({ maxSize }: PaginationDatatable) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);
  const [value] = useDebounce(page, 100);

  const limit = parseInt(searchParams.get("limit") ?? "100");
  const maxPage = Math.ceil((maxSize && maxSize / limit) ?? 0);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams = new URLSearchParams({
      ...currentParams,
      page: value.toString(),
    });

    router.push(`${window.location.origin}/${pathname}?${updatedParams.toString()}`);
  }, [value])

  return <>
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex w-full max-w-lg items-center gap-2 text-sm text-muted-foreground">
        Page
        <Input
          min={1}
          max={maxPage}
          type="number"
          className="w-16"
          defaultValue={searchParams.get("page") ?? value}
          onChange={(e) => {
            const value = parseInt(e.currentTarget.value);
            if (value > maxPage) return;
            setPage(value);
          }}
        />
        of {maxPage}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => prev - 1)}
          disabled={page == 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => prev + 1)}
          disabled={page == maxPage}
        >
          Next
        </Button>
      </div>
    </div></>;
};

export { PaginationDataTable };
