"use client";

import { useSyncExternalStore } from "react";
import { modeFor } from "./config";
import { thermostat } from "./thermostat-store";

export function useSetpoint() {
  return useSyncExternalStore(thermostat.subscribe, thermostat.get, thermostat.getServer);
}

export function useMode() {
  return modeFor(useSetpoint());
}
