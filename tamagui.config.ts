import { config, tokens } from "@tamagui/config/v3";
// import * as themes from './theme-output';
import { createTamagui, createTokens } from "tamagui"; // or '@tamagui/core'

const appTokens = createTokens({
  ...tokens,
  color: {
    primary: "#0A0A0A",
    secondary: "$gray6",
    tertiary: "#FFFFFF",
  },
});

const appConfig = createTamagui({
  ...config,
  tokens: appTokens,
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
