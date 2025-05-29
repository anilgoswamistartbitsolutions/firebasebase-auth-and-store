"use client";
import { HeroUIProvider } from "@heroui/react";

const HeroUIProviderCu = ({ children }) => {
  return <HeroUIProvider> {children}</HeroUIProvider>;
};

export default HeroUIProviderCu;
