import { AnchorProvider, Program } from "@project-serum/anchor";
import React, { useContext, useMemo } from "react";
import { programID } from "../../config/globalVariables";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MaiusProgramLibrary } from "../../config/maius_program_library";
import idl from "../../config/idl.json";
import { useRouter } from "next/router";
import { Center, Container, Loader } from "@mantine/core";

interface ProgramContextState {
  program: Program<MaiusProgramLibrary>;
  merchantWalletAddress: string;
}

const ProgramContext = React.createContext<ProgramContextState | undefined>(
  undefined
);

const routing = (merchantWallet: string) => ({
  home: "/",
  config: "/config",
  merchant: {
    home: `/merchant/${merchantWallet}`,
    config: `/merchant/${merchantWallet}/config`,
    customers: {
      list: `/merchant/${merchantWallet}/customers`,
      create: `/merchant/${merchantWallet}/customers/create`,
      detail: (customerAccountAddress: string) => ({
        edit: `/merchant/${merchantWallet}/customers/${customerAccountAddress}/edit`,
      }),
    },
    products: {
      list: `/merchant/${merchantWallet}/products`,
      create: `/merchant/${merchantWallet}/products/create`,
      edit: (product_count_index) =>
        `/merchant/${merchantWallet}/products/${product_count_index}`,
    },
    pricing: {
      list: `/merchant/${merchantWallet}/pricing`,
    },
    payment_links: {
      list: `/merchant/${merchantWallet}/payment-links`,
      create: `/merchant/${merchantWallet}/payment-links/create`,
    },
  },
});

interface ProgramProviderProps {
  children: React.ReactNode;
}
export const ProgramProvider: React.FunctionComponent<ProgramProviderProps> = ({
  children,
}: ProgramProviderProps) => {
  const router = useRouter();
  const merchantWalletAddress = router?.query?.merchantWalletAddress;
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "processed",
  });

  const program = new Program(idl, programID, provider);

  const routes = useMemo(() => {
    if (merchantWalletAddress) {
      return routing(merchantWalletAddress as string);
    }
    if (wallet?.adapter?.publicKey) {
      return routing(wallet?.adapter?.publicKey?.toBase58());
    }
    return routing("-1");
  }, [wallet?.adapter?.publicKey, merchantWalletAddress]);

  if (router.pathname !== "/" && !wallet?.adapter?.publicKey?.toBase58()) {
    return (
      <Container className="p-4">
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <ProgramContext.Provider value={{ program, routes, merchantWalletAddress }}>
      {children}
    </ProgramContext.Provider>
  );
};

export function useProgram(): ProgramContextState {
  const context = useContext<any>(ProgramContext);

  if (!context) {
    console.log(
      "Chưa bọc App vào trong cái CartProvider thì chưa dùng được nha.."
    );
  }
  return context;
}
