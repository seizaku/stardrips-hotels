/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { Button } from "./ui/button";
import { SheetIcon } from "lucide-react";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { type Row } from "@tanstack/react-table";

export const ExportCSV = ({ rows }: { rows: Row<any>[] }) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "sample", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const exportExcel = () => {
    const rowData = rows.map((row) => {
      const transformedRow: any = {};
      Object.keys(row.original).forEach((key) => {
        if (key == "from") {
          transformedRow.email =
            typeof row.original[key] === "object"
              ? (row.original[key]?.value ?? "")
              : row.original[key];
        } else {
          transformedRow[key] =
            typeof row.original[key] === "object"
              ? (row.original[key]?.value ?? "")
              : row.original[key];
        }
      });
      return transformedRow;
    });

    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <Button variant={"outline"} onClick={exportExcel}>
      Export to CSV
      <SheetIcon className="h-4 w-4" />
    </Button>
  );
};
