/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type ColumnDef } from "@tanstack/react-table";
import { type Listing } from "~/server/api/routers/listings/router";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "status",
    header: () => {
      return <>Track Status</>;
    },
    minSize: 400,
  },
  {
    accessorKey: "hotel_name",
    header: () => {
      return <>Sheet Name</>;
    },
    minSize: 400,
  },
  {
    accessorKey: "label",
    header: () => {
      return <>Booking.com Name</>;
    },
    minSize: 400,
  },
  {
    accessorKey: "placeId",
  },
  {
    accessorKey: "city",
  },
  {
    accessorKey: "country",
  },
  {
    accessorKey: "group_name",
  },
  {
    accessorKey: "group_type",
  },
  {
    accessorKey: "rooms",
  },
  {
    accessorKey: "rating",
  },
  {
    accessorKey: "photos",
    cell: ({ cell }) => {
      return (
        <ol>
          {JSON.parse(cell.getValue() as string)?.map(
            (text: string, index: number) => (
              <li key={text}>
                <a className="text-blue-500 hover:text-blue-400" href={text}>
                  Photo {index + 1}
                </a>
              </li>
            ),
          )}
        </ol>
      );
    },
    sortingFn: "alphanumeric",
    minSize: 400,
  },
  {
    accessorKey: "features",
    cell: ({ cell }) => {
      return (
        <ol className="list-disc">
          {JSON.parse(cell.getValue() as string)?.map(
            (text: string, index: number) => (
              <li key={`${text}-${index}`}>{text}</li>
            ),
          )}
        </ol>
      );
    },
    sortingFn: "alphanumeric",
    minSize: 400,
  },
  {
    accessorKey: "reviews",
    cell: ({ cell }) => {
      return (
        <ul>
          {(
            JSON.parse(cell.getValue() as string) as {
              category: string;
              rating: number;
            }[]
          ).map((feature) => (
            <li
              key={`${feature.category}-${feature.rating}`}
            >{`${feature.category}: ${feature.rating}`}</li>
          ))}
        </ul>
      );
    },
    sortingFn: "alphanumeric",
    minSize: 150,
  },
  {
    accessorKey: "fine_print",
    cell: ({ cell }) => {
      return (
        <ol className="list-disc">
          {JSON.parse(cell.getValue() as string)?.map((text: string) => (
            <li key={text}>{text}</li>
          ))}
        </ol>
      );
    },
    sortingFn: "alphanumeric",
    minSize: 1000,
  },
  {
    accessorKey: "latitude",
  },
  {
    accessorKey: "longitude",
  },
  {
    accessorKey: "email_subscribed",
    minSize: 400,
  },
  {
    accessorKey: "hotel_email_accounts",
    minSize: 400,
  },
  {
    accessorKey: "website",
    cell: ({ cell }) => {
      return (
        <a
          className="text-blue-500 hover:text-blue-400"
          href={cell.getValue() as string}
        >
          {cell.getValue() as string}
        </a>
      );
    },
    sortingFn: "alphanumeric",
    minSize: 400,
  },
];
