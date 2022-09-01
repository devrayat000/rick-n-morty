/**
 * @generated SignedSource<<08387470388442ea221f6e968f8d4f1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type episodes_EpisodesQuery$variables = {};
export type episodes_EpisodesQuery$data = {
  readonly episodes: {
    readonly info: {
      readonly count: number | null;
    } | null;
    readonly results: ReadonlyArray<{
      readonly created: string | null;
      readonly id: string | null;
      readonly name: string | null;
    } | null> | null;
  } | null;
};
export type episodes_EpisodesQuery = {
  response: episodes_EpisodesQuery$data;
  variables: episodes_EpisodesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Episodes",
    "kind": "LinkedField",
    "name": "episodes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Info",
        "kind": "LinkedField",
        "name": "info",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Episode",
        "kind": "LinkedField",
        "name": "results",
        "plural": true,
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
            "name": "created",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "episodes_EpisodesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "episodes_EpisodesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c9804e1ce9b7872608022683997b471e",
    "id": null,
    "metadata": {},
    "name": "episodes_EpisodesQuery",
    "operationKind": "query",
    "text": "query episodes_EpisodesQuery {\n  episodes {\n    info {\n      count\n    }\n    results {\n      id\n      name\n      created\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d3ad01c57d99062cb69d7a9167f7101";

export default node;
