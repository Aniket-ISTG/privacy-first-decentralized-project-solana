/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/storage_program.json`.
 */
export type StorageProgram = {
  "address": "HDQ8cAj8LyKD4KgveWrokYyBi76XQJgvMD1BoCy9YHc8",
  "metadata": {
    "name": "storageProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addEntry",
      "discriminator": [
        170,
        45,
        66,
        212,
        251,
        230,
        45,
        38
      ],
      "accounts": [
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": "string"
        },
        {
          "name": "encryptedAesKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "getEntries",
      "discriminator": [
        87,
        205,
        146,
        55,
        191,
        39,
        159,
        242
      ],
      "accounts": [
        {
          "name": "storage",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        }
      ],
      "args": [],
      "returns": {
        "vec": {
          "defined": {
            "name": "fileEntry"
          }
        }
      }
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "storageAccount",
      "discriminator": [
        41,
        48,
        231,
        194,
        22,
        77,
        205,
        235
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "maxFilesReached",
      "msg": "Maximum file limit reached"
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    }
  ],
  "types": [
    {
      "name": "fileEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "encryptedAesKey",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "storageAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "files",
            "type": {
              "vec": {
                "defined": {
                  "name": "fileEntry"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
