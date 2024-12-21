import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "./ui/select";
import { Rows2Icon } from "lucide-react";

const SearchDataTable = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(searchParams.get("query") ?? "");
  const [limit, setLimit] = useState(100);
  const [textValue] = useDebounce(text, 200);
  const [limitValue] = useDebounce(limit, 200);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());

    const updatedParams = new URLSearchParams({
      ...currentParams,
      query: textValue,
      limit: limitValue.toString(),
    });

    router.push(`${window.location.origin}/${pathname}?${updatedParams.toString()}`);
  }, [textValue, limitValue]);

  return (
    <>
      <Input
        type="text"
        className="w-96"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search values"
      />
      <Select
        onValueChange={(value: string) => setLimit(parseInt(value))}
        value={limitValue.toString()}
      >
        <SelectTrigger className="hidden w-fit md:flex">
          <Rows2Icon className="h-4 w-4" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Max Rows</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="40">40</SelectItem>
            <SelectItem value="60">60</SelectItem>
            <SelectItem value="80">80</SelectItem>
            <SelectItem value="100">100</SelectItem>
            <SelectItem value="200">200</SelectItem>
            <SelectItem value="300">300</SelectItem>
            <SelectItem value="400">400</SelectItem>
            <SelectItem value="500">500</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select ></>
  );
};

export { SearchDataTable };
