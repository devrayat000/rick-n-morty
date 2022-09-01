/**
 * @generated SignedSource<<8ce1602b8eb2f75fbcf3f627e23b4702>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Id_EpisodeByIdQuery$variables = {
  id: string;
};
export type Id_EpisodeByIdQuery$data = {
  readonly episode: {
    readonly air_date: string | null;
    readonly created: string | null;
    readonly id: string | null;
    readonly name: string | null;
  } | null;
};
export type Id_EpisodeByIdQuery = {
  response: Id_EpisodeByIdQuery$data;
  variables: Id_EpisodeByIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Episode",
    "kind": "LinkedField",
    "name": "episode",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "air_date",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "created",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Id_EpisodeByIdQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Id_EpisodeByIdQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0fe52ce9ea5d1c0a30d0a01fc6d7ae98",
    "id": null,
    "metadata": {},
    "name": "Id_EpisodeByIdQuery",
    "operationKind": "query",
    "text": "query Id_EpisodeByIdQuery(\n  $id: ID!\n) {\n  episode(id: $id) {\n    id\n    name\n    air_date\n    created\n  }\n}\n"
  }
};
})();

(node as any).hash = "db1f211827b9b6b7559ed5403f77c4ea";

export default node;
