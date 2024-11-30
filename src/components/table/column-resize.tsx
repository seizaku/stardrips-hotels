/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Header } from "@tanstack/react-table";

export const ColumnResize = ({ header }: { header: Header<any, unknown> }) => {
  if (header.column.getCanResize() === false) return <></>;

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute top-0 right-0 cursor-col-resize w-px h-full bg-muted hover:bg-muted hover:w-2`,
        style: {
          userSelect: "none",
          touchAction: "none",
        },
      }}
    />
  );
};
