export type MaiusProgramLibrary = {
  "version": "0.1.0",
  "name": "maius_program_library",
  "instructions": [
    {
      "name": "initializeMerchant",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisCustomer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateMerchant",
      "accounts": [
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "logoUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeProduct",
      "accounts": [
        {
          "name": "productAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sku",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "defaultPrice",
          "type": "publicKey"
        },
        {
          "name": "unitLabel",
          "type": "string"
        },
        {
          "name": "images",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "updateProduct",
      "accounts": [
        {
          "name": "productAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "defaultPrice",
          "type": "publicKey"
        },
        {
          "name": "unitLabel",
          "type": "string"
        },
        {
          "name": "images",
          "type": {
            "vec": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "customer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "prevCustomerKey",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "merchant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchantWalletAddress",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "logoUrl",
            "type": "string"
          },
          {
            "name": "productCount",
            "type": "u64"
          },
          {
            "name": "currentCustomerKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "sku",
            "type": "string"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "defaultPrice",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "unitLabel",
            "type": "string"
          },
          {
            "name": "priceCount",
            "type": "u64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "updated",
            "type": "i64"
          },
          {
            "name": "images",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidDescLen",
      "msg": "Invalid length of description."
    }
  ]
};

export const IDL: MaiusProgramLibrary = {
  "version": "0.1.0",
  "name": "maius_program_library",
  "instructions": [
    {
      "name": "initializeMerchant",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "genesisCustomer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateMerchant",
      "accounts": [
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "logoUrl",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteCustomer",
      "accounts": [
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeProduct",
      "accounts": [
        {
          "name": "productAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "sku",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "defaultPrice",
          "type": "publicKey"
        },
        {
          "name": "unitLabel",
          "type": "string"
        },
        {
          "name": "images",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "updateProduct",
      "accounts": [
        {
          "name": "productAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "defaultPrice",
          "type": "publicKey"
        },
        {
          "name": "unitLabel",
          "type": "string"
        },
        {
          "name": "images",
          "type": {
            "vec": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "customer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "prevCustomerKey",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "merchant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchantWalletAddress",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "logoUrl",
            "type": "string"
          },
          {
            "name": "productCount",
            "type": "u64"
          },
          {
            "name": "currentCustomerKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "sku",
            "type": "string"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "defaultPrice",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "unitLabel",
            "type": "string"
          },
          {
            "name": "priceCount",
            "type": "u64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "updated",
            "type": "i64"
          },
          {
            "name": "images",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidDescLen",
      "msg": "Invalid length of description."
    }
  ]
};
