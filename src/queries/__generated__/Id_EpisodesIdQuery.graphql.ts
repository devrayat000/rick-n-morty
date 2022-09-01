/**
 * @generated SignedSource<<8aa844f7c43453b5cdf78270776bd53f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Id_EpisodesIdQuery$variables = {};
export type Id_EpisodesIdQuery$data = {
  readonly episodes: {
    readonly results: ReadonlyArray<{
      readonly id: string | null;
    } | null> | null;
  } | null;
};
export type Id_EpisodesIdQuery = {
  response: Id_EpisodesIdQuery$data;
  variables: Id_EpisodesIdQuery$variables;
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
    "name": "Id_EpisodesIdQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Id_EpisodesIdQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ad55cf4a671890dd2341683cc5956a07",
    "id": null,
    "metadata": {},
    "name": "Id_EpisodesIdQuery",
    "operationKind": "query",
    "text": "query Id_EpisodesIdQuery {\n  episodes {\n    results {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1faad18bf86eda92765a75a9c83c7f72";

export default node;
