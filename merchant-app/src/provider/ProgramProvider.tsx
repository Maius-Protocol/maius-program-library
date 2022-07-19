import { Program, AnchorProvider } from "@project-serum/anchor";
import React from "react";
import { useContext } from "react";
import { opts, programID } from "../../config/globalVariables";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MaiusProgramLibrary } from "../../config/maius_program_library";
import idl from "../../config/idl.json";

interface ProgramContextState {
  program: Program<MaiusProgramLibrary>;
}

const ProgramContext = React.createContext<ProgramContextState | undefined>(
  undefined
);
interface ProgramProviderProps {
  children: React.ReactNode;
}
export const ProgramProvider: React.FunctionComponent<ProgramProviderProps> = ({
  children,
}: ProgramProviderProps) => {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });
  const program = new Program(idl, programID, provider);
  return (
    <ProgramContext.Provider value={{ program }}>
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
