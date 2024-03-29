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
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
          "name": "description",
          "type": "string"
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
    },
    {
      "name": "initializePrice",
      "accounts": [
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
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
          "name": "product",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "priceAccount",
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
          "name": "billingScheme",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "unitAmount",
          "type": "u64"
        },
        {
          "name": "interval",
          "type": "string"
        },
        {
          "name": "intervalCount",
          "type": "u8"
        },
        {
          "name": "active",
          "type": "bool"
        },
        {
          "name": "priceType",
          "type": "string"
        },
        {
          "name": "acceptedTokens",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeSubscription",
      "accounts": [
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "merchantWallet",
          "type": "publicKey"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        },
        {
          "name": "lastInvoice",
          "type": "publicKey"
        },
        {
          "name": "currentPeriodEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeSubscriptionItem",
      "accounts": [
        {
          "name": "subscriptionItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "price",
          "type": "publicKey"
        },
        {
          "name": "billThresholds",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeInvoice",
      "accounts": [
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "customerWallet",
          "type": "publicKey"
        },
        {
          "name": "customerAccountAddress",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateInvoice",
      "accounts": [
        {
          "name": "invoiceAccount",
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
          "name": "total",
          "type": "u64"
        },
        {
          "name": "periodEnd",
          "type": "i64"
        },
        {
          "name": "periodStart",
          "type": "i64"
        },
        {
          "name": "paid",
          "type": "bool"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeInvoiceItem",
      "accounts": [
        {
          "name": "invoiceItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "customerAccount",
          "type": "publicKey"
        },
        {
          "name": "price",
          "type": "publicKey"
        },
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeAcceptedTokens",
      "accounts": [
        {
          "name": "acceptedTokensAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tokens",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeCustomerInvoice",
      "accounts": [
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "merchantWallet",
          "type": "publicKey"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "subscribe",
      "accounts": [
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pythPriceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "merchantWithdrawl",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "payment",
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
          "name": "merchantWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "customerWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "acceptedTokens",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "customerInvoice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "invoiceCount",
            "type": "u64"
          }
        ]
      }
    },
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
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "subscriptionCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "customer",
            "type": "publicKey"
          },
          {
            "name": "merchant",
            "type": "publicKey"
          },
          {
            "name": "customerDepositTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "merchantReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "invoiceAccount",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "status",
            "docs": [
              "status\n           0: New\n           1: Shipping\n           2: Delivered"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "invoiceItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "publicKey"
          },
          {
            "name": "quantity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "invoice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "invoiceItemCount",
            "type": "u8"
          },
          {
            "name": "periodEnd",
            "type": "i64"
          },
          {
            "name": "periodStart",
            "type": "i64"
          },
          {
            "name": "paid",
            "type": "bool"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "total",
            "type": "u64"
          },
          {
            "name": "subscriptionAccount",
            "type": "publicKey"
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
      "name": "price",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "billingScheme",
            "type": "string"
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "unitAmount",
            "type": "u64"
          },
          {
            "name": "interval",
            "type": "string"
          },
          {
            "name": "intervalCount",
            "type": "u8"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "priceType",
            "type": "string"
          },
          {
            "name": "acceptedTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "updated",
            "type": "i64"
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
    },
    {
      "name": "subscriptionItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "publicKey"
          },
          {
            "name": "billingThresholds",
            "type": "u64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "quantity",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "subscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchant",
            "type": "publicKey"
          },
          {
            "name": "merchantAccount",
            "type": "publicKey"
          },
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "lastInvoice",
            "type": "publicKey"
          },
          {
            "name": "cancelAt",
            "type": "i64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "currentPeriodEnd",
            "type": "i64"
          },
          {
            "name": "currentPeriodStart",
            "type": "i64"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "subscriptionItemCount",
            "type": "u8"
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
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
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
          "name": "description",
          "type": "string"
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
    },
    {
      "name": "initializePrice",
      "accounts": [
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
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
          "name": "product",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "priceAccount",
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
          "name": "billingScheme",
          "type": "string"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "unitAmount",
          "type": "u64"
        },
        {
          "name": "interval",
          "type": "string"
        },
        {
          "name": "intervalCount",
          "type": "u8"
        },
        {
          "name": "active",
          "type": "bool"
        },
        {
          "name": "priceType",
          "type": "string"
        },
        {
          "name": "acceptedTokens",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeSubscription",
      "accounts": [
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "merchantWallet",
          "type": "publicKey"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        },
        {
          "name": "lastInvoice",
          "type": "publicKey"
        },
        {
          "name": "currentPeriodEnd",
          "type": "i64"
        }
      ]
    },
    {
      "name": "initializeSubscriptionItem",
      "accounts": [
        {
          "name": "subscriptionItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "price",
          "type": "publicKey"
        },
        {
          "name": "billThresholds",
          "type": "u64"
        },
        {
          "name": "quantity",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeInvoice",
      "accounts": [
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "customerWallet",
          "type": "publicKey"
        },
        {
          "name": "customerAccountAddress",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateInvoice",
      "accounts": [
        {
          "name": "invoiceAccount",
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
          "name": "total",
          "type": "u64"
        },
        {
          "name": "periodEnd",
          "type": "i64"
        },
        {
          "name": "periodStart",
          "type": "i64"
        },
        {
          "name": "paid",
          "type": "bool"
        },
        {
          "name": "status",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeInvoiceItem",
      "accounts": [
        {
          "name": "invoiceItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "customerAccount",
          "type": "publicKey"
        },
        {
          "name": "price",
          "type": "publicKey"
        },
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeAcceptedTokens",
      "accounts": [
        {
          "name": "acceptedTokensAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "merchantAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "tokens",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "initializeCustomerInvoice",
      "accounts": [
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
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
          "name": "merchantWallet",
          "type": "publicKey"
        },
        {
          "name": "customerWallet",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "subscribe",
      "accounts": [
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pythPriceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "merchantWithdrawl",
      "accounts": [
        {
          "name": "merchant",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "payment",
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
          "name": "merchantWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "customerWallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "customerInvoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "invoiceItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "subscriptionItemAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "customerDepositTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "merchantReceiveTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "acceptedTokens",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "customerInvoice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "invoiceCount",
            "type": "u64"
          }
        ]
      }
    },
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
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "subscriptionCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "escrowAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "customer",
            "type": "publicKey"
          },
          {
            "name": "merchant",
            "type": "publicKey"
          },
          {
            "name": "customerDepositTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "merchantReceiveTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "invoiceAccount",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "status",
            "docs": [
              "status\n           0: New\n           1: Shipping\n           2: Delivered"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "invoiceItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "publicKey"
          },
          {
            "name": "quantity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "invoice",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "invoiceItemCount",
            "type": "u8"
          },
          {
            "name": "periodEnd",
            "type": "i64"
          },
          {
            "name": "periodStart",
            "type": "i64"
          },
          {
            "name": "paid",
            "type": "bool"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "total",
            "type": "u64"
          },
          {
            "name": "subscriptionAccount",
            "type": "publicKey"
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
      "name": "price",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "product",
            "type": "publicKey"
          },
          {
            "name": "billingScheme",
            "type": "string"
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "unitAmount",
            "type": "u64"
          },
          {
            "name": "interval",
            "type": "string"
          },
          {
            "name": "intervalCount",
            "type": "u8"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "priceType",
            "type": "string"
          },
          {
            "name": "acceptedTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "updated",
            "type": "i64"
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
    },
    {
      "name": "subscriptionItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "publicKey"
          },
          {
            "name": "billingThresholds",
            "type": "u64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "quantity",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "subscription",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "merchant",
            "type": "publicKey"
          },
          {
            "name": "merchantAccount",
            "type": "publicKey"
          },
          {
            "name": "customerAccount",
            "type": "publicKey"
          },
          {
            "name": "lastInvoice",
            "type": "publicKey"
          },
          {
            "name": "cancelAt",
            "type": "i64"
          },
          {
            "name": "created",
            "type": "i64"
          },
          {
            "name": "currentPeriodEnd",
            "type": "i64"
          },
          {
            "name": "currentPeriodStart",
            "type": "i64"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "subscriptionItemCount",
            "type": "u8"
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
