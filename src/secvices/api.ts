import { getSdk } from "~/graphql/generic";

export default getSdk<RequestInit, unknown>((query, variables, opts) =>
  fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    ...opts,
  })
    .then((r) => r.json())
    .then((r) => r.data)
);
