import create from "zustand";
import { z } from "zod";

const MobileDeviceStoreValidator = z.object({
  isMobileDevice: z.boolean(),
  setIsMobileDevice: z.function().args(z.boolean()).returns(z.void()),
});

type MobileDeviceStoreValidatorType = z.infer<
  typeof MobileDeviceStoreValidator
>;

export const useMobileDeviceStore = create<MobileDeviceStoreValidatorType>(
  (set) => ({
    isMobileDevice: false,
    setIsMobileDevice: (updatedState) =>
      set((state) => ({
        isMobileDevice: (state.isMobileDevice = updatedState),
      })),
  })
);
