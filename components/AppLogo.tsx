// components\AppLogo.tsx

import Image from "next/image";
import { Theme } from "./ThemeSwitcher";

interface AppLogoProps {
  theme: Theme;
}

export default function AppLogo({ theme }: AppLogoProps) {
  const logoSrc =
    theme === "light"
      ? "/assets/logos/hrkc-bookstore-logo-white-bg.png"
      : "/assets/logos/hrkc-bookstore-logo-black-bg.png";

  return (
    <div className="flex items-center">
      <Image src={logoSrc} alt="HRKC Logo" width={100} height={30} />
    </div>
  );
}
