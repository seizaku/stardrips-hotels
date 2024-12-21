import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useMatchFormStore } from "~/features/match-listings/stores/match-form-store";


const MatchButton = ({ value, id }: { value: boolean, id: string }) => {
  const { setOpen, setSelectedId } = useMatchFormStore();
  if (value) {

    return <Button className="w-36"><CheckCircle />Matched</Button>
  } else {
    return <Button
      disabled={!id}
      onClick={() => {
        setSelectedId(id);
        setOpen(true);
      }}
      variant={"outline"}>
      <XCircle />
      Not Matched
    </Button>
  }
}

export { MatchButton };