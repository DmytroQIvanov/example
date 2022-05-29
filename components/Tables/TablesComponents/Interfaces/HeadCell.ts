import React from "react";

export interface HeadCell<IColumns> {
  id: keyof IColumns;
  label: string;
  secondLabel?: string;
  numeric?: boolean;
  width?: string;
}
