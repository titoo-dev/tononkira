import { DynamicLoader } from "./dynamic-loader";

export function GlobalLoading(props: LoaderProps) {
  return <DynamicLoader {...props} />;
}

export type LoaderProps = React.ComponentProps<typeof DynamicLoader>;
