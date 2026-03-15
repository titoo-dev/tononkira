"use client";

import { formatDistanceToNow } from "date-fns";

export function RelativeTime({ date }: { date: Date | string }) {
  return <>{formatDistanceToNow(new Date(date))} ago</>;
}
