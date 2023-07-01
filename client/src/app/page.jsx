import Companies from "@/components/pages/home/Companies";
import Everything from "@/components/pages/home/Everything";
import FiverrBusiness from "@/components/pages/home/FiverrBusiness";
import HeroBanner from "@/components/pages/home/HeroBanner";
import JoinFiverr from "@/components/pages/home/JoinFiverr";
import PopularServices from "@/components/pages/home/PopularServices";
import Services from "@/components/pages/home/Services";
// import Image from "next/image";

// import { useStateProvider } from "@/context/StateContext";

export default function Home() {
  // const [{ showLoginModal, showSignupModal }] = useStateProvider();

  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      <JoinFiverr />
    </div>
  );
}
