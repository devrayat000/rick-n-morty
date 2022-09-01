import { LoadingOverlay } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { usePreloadedQuery, loadQuery, fetchQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import { createWiredServerContext } from "relay-nextjs/wired/context";
import { graphql } from "relay-runtime";
import { getClientEnvironment } from "~/lib/relay_client_environment";
import type { Id_EpisodeByIdQuery } from "~/queries/__generated__/Id_EpisodeByIdQuery.graphql";
import { Id_EpisodesIdQuery } from "~/queries/__generated__/Id_EpisodesIdQuery.graphql";

const EpisodeQuery = graphql`
  query Id_EpisodeByIdQuery($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      created
    }
  }
`;

const EpisodesIdQuery = graphql`
  query Id_EpisodesIdQuery {
    episodes {
      results {
        id
      }
    }
  }
`;
const EpisodeDetailsPage: NextPage<RelayProps<{}, Id_EpisodeByIdQuery>> = ({
  preloadedQuery,
}) => {
  const query = usePreloadedQuery(EpisodeQuery, preloadedQuery);
  if (query.episode == null) return null;

  return (
    <div>
      <pre>{JSON.stringify(query.episode, null, 2)}</pre>
    </div>
  );
};

export default EpisodeDetailsPage;

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
  const { createServerEnvironment } = await import(
    "~/lib/server/relay_server_environment"
  );
  const env = createServerEnvironment();
  const data = await fetchQuery<Id_EpisodesIdQuery>(
    env,
    EpisodesIdQuery,
    {}
  ).toPromise();

  return {
    paths: data?.episodes?.results?.map((r) => ({
      params: { id: r?.id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { createServerEnvironment } = await import(
    "~/lib/server/relay_server_environment"
  );
  const env = createServerEnvironment();
  const variables = ctx.params!;
  const preloadedQuery = loadQuery(env, EpisodeQuery, variables);

  return {
    props: {
      __wired__server__context: createWiredServerContext({
        query: EpisodeQuery,
        variables,
        preloadedQuery: preloadedQuery,
      }),
    },
  };
};

// export default withRelay(EpisodeDetailsPage, EpisodeQuery, {
//   // Fallback to render while the page is loading.
//   // This property is optional.
//   fallback: <LoadingOverlay visible />,
//   // Create a Relay environment on the client-side.
//   // Note: This function must always return the same value.
//   createClientEnvironment: () => getClientEnvironment()!,
//   // to this function.
//   createServerEnvironment: async (ctx) => {
//     const { createServerEnvironment } = await import(
//       "~/lib/server/relay_server_environment"
//     );
//     return createServerEnvironment();
//   },
//   //   fetchPolicy: "store-or-network",
// });
