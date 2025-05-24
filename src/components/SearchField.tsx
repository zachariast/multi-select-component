import type { FC } from "react";

interface Props {
  query: string;
}

export const SearchField: FC<Props> = ({ query }) => {
  return (
    <>
      <input
        type="text"
        placeholder={'Placeholder text'}
        value={query}
        onChange={() => { }}
      />
    </>
  );
}