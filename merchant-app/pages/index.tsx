import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "../src/provider/ProgramProvider";

const Homepage = () => {
  const wallet = useWallet();
  const router = useRouter();
  const { routes } = useProgram();

  useEffect(() => {
    if (wallet?.connected) {
      router.replace(routes.merchant.home);
    }
  }, [wallet?.connected]);

  return <></>;
};

export default Homepage;
