import type { IllustrationKey } from "@/lib/config";
import { Condenser } from "./condenser";
import { Ductwork } from "./ductwork";
import { Furnace } from "./furnace";
import { HeatPump } from "./heat-pump";

export const illustrations: Record<IllustrationKey, () => React.JSX.Element> = {
  condenser: Condenser,
  "heat-pump": HeatPump,
  furnace: Furnace,
  ductwork: Ductwork,
};
