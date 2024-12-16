import { type Hotel } from "~/server/api/routers/hotel-metrics/router";
import type { Column, Row, Table } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { TableStore } from "~/features/hotel-metrics/stores/table-store";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";

type CellEdit = {
  initialValue: string | boolean;
  row: Row<Hotel>;
  column: Column<Hotel>;
  table: Table<Hotel>;
  input: "text" | "number" | "date" | "checkbox";
};

export const CellEdit = ({ initialValue, input }: CellEdit) => {
  const { register, getValues } = useForm();
  const tableStore = TableStore();

  if (input == "checkbox") {
    return (
      <div className="flex flex-col p-0">
        <span className="hidden">{getValues("input")}</span>
        <Checkbox
          defaultChecked={Boolean(initialValue)}
          {...register("input")}
          disabled={tableStore.loading}
        ></Checkbox>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-0">
      <span className="hidden">{getValues("input")}</span>
      <Input
        type={input}
        {...register("input")}
        defaultValue={initialValue as string}
        disabled={tableStore.loading}
      />
    </div>
  );
};
