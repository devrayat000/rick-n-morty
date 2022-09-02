import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character';
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>;
  /** The id of the character. */
  id?: Maybe<Scalars['ID']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars['String']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>;
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  species?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FilterEpisode = {
  episode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FilterLocation = {
  dimension?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>;
};

export type Location = {
  __typename?: 'Location';
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>;
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type EpisodeFragFragment = { __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null, created?: string | null };

export type EpisodeCharactersFragFragment = { __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null };

export type LocationFragFragment = { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null, created?: string | null };

export type EpisodePagesQueryVariables = Exact<{ [key: string]: never; }>;


export type EpisodePagesQuery = { __typename?: 'Query', episodes?: { __typename?: 'Episodes', info?: { __typename?: 'Info', pages?: number | null } | null } | null };

export type EpisodesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type EpisodesQuery = { __typename?: 'Query', episodes?: { __typename?: 'Episodes', info?: { __typename?: 'Info', count?: number | null, pages?: number | null } | null, results?: Array<{ __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null, created?: string | null } | null> | null } | null };

export type EpisodeByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EpisodeByIdQuery = { __typename?: 'Query', episode?: { __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null, created?: string | null, characters: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null } | null> } | null };

export type EpisodesIdQueryVariables = Exact<{ [key: string]: never; }>;


export type EpisodesIdQuery = { __typename?: 'Query', episodes?: { __typename?: 'Episodes', results?: Array<{ __typename?: 'Episode', id?: string | null } | null> | null } | null };

export type CharacterPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type CharacterPagesQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', info?: { __typename?: 'Info', pages?: number | null } | null } | null };

export type CharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
}>;


export type CharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', info?: { __typename?: 'Info', count?: number | null, pages?: number | null } | null, results?: Array<{ __typename?: 'Character', id?: string | null, name?: string | null, image?: string | null } | null> | null } | null };

export type CharacterByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CharacterByIdQuery = { __typename?: 'Query', character?: { __typename?: 'Character', status?: string | null, species?: string | null, type?: string | null, gender?: string | null, created?: string | null, id?: string | null, name?: string | null, image?: string | null, origin?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null, created?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null, created?: string | null } | null, episode: Array<{ __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null, created?: string | null } | null> } | null };

export type CharactersIdQueryVariables = Exact<{ [key: string]: never; }>;


export type CharactersIdQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', results?: Array<{ __typename?: 'Character', id?: string | null } | null> | null } | null };

export const EpisodeFragFragmentDoc = /*#__PURE__*/ gql`
    fragment EpisodeFrag on Episode {
  id
  name
  air_date
  episode
  created
}
    `;
export const EpisodeCharactersFragFragmentDoc = /*#__PURE__*/ gql`
    fragment EpisodeCharactersFrag on Character {
  id
  name
  image
}
    `;
export const LocationFragFragmentDoc = /*#__PURE__*/ gql`
    fragment LocationFrag on Location {
  id
  name
  type
  dimension
  created
}
    `;
export const EpisodePagesDocument = /*#__PURE__*/ gql`
    query EpisodePages {
  episodes {
    info {
      pages
    }
  }
}
    `;
export const EpisodesDocument = /*#__PURE__*/ gql`
    query Episodes($page: Int = 1) {
  episodes(page: $page) {
    info {
      count
      pages
    }
    results {
      ...EpisodeFrag
    }
  }
}
    ${EpisodeFragFragmentDoc}`;
export const EpisodeByIdDocument = /*#__PURE__*/ gql`
    query EpisodeById($id: ID!) {
  episode(id: $id) {
    ...EpisodeFrag
    characters {
      ...EpisodeCharactersFrag
    }
  }
}
    ${EpisodeFragFragmentDoc}
${EpisodeCharactersFragFragmentDoc}`;
export const EpisodesIdDocument = /*#__PURE__*/ gql`
    query EpisodesId {
  episodes {
    results {
      id
    }
  }
}
    `;
export const CharacterPagesDocument = /*#__PURE__*/ gql`
    query CharacterPages {
  characters {
    info {
      pages
    }
  }
}
    `;
export const CharactersDocument = /*#__PURE__*/ gql`
    query Characters($page: Int = 1) {
  characters(page: $page) {
    info {
      count
      pages
    }
    results {
      ...EpisodeCharactersFrag
    }
  }
}
    ${EpisodeCharactersFragFragmentDoc}`;
export const CharacterByIdDocument = /*#__PURE__*/ gql`
    query CharacterById($id: ID!) {
  character(id: $id) {
    ...EpisodeCharactersFrag
    status
    species
    type
    gender
    created
    origin {
      ...LocationFrag
    }
    location {
      ...LocationFrag
    }
    episode {
      ...EpisodeFrag
    }
  }
}
    ${EpisodeCharactersFragFragmentDoc}
${LocationFragFragmentDoc}
${EpisodeFragFragmentDoc}`;
export const CharactersIdDocument = /*#__PURE__*/ gql`
    query CharactersId {
  characters {
    results {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    EpisodePages(variables?: EpisodePagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EpisodePagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EpisodePagesQuery>(EpisodePagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EpisodePages', 'query');
    },
    Episodes(variables?: EpisodesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EpisodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EpisodesQuery>(EpisodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Episodes', 'query');
    },
    EpisodeById(variables: EpisodeByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EpisodeByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EpisodeByIdQuery>(EpisodeByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EpisodeById', 'query');
    },
    EpisodesId(variables?: EpisodesIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EpisodesIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EpisodesIdQuery>(EpisodesIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EpisodesId', 'query');
    },
    CharacterPages(variables?: CharacterPagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CharacterPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CharacterPagesQuery>(CharacterPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CharacterPages', 'query');
    },
    Characters(variables?: CharactersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CharactersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CharactersQuery>(CharactersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Characters', 'query');
    },
    CharacterById(variables: CharacterByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CharacterByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CharacterByIdQuery>(CharacterByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CharacterById', 'query');
    },
    CharactersId(variables?: CharactersIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CharactersIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CharactersIdQuery>(CharactersIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CharactersId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;