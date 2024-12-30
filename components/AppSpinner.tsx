import React from "react";
import { styled, Spinner, SpinnerProps } from "tamagui";

const StyledSpinner = styled(Spinner, {
  color: "$gray10",
});

export type AppSpinnerProps = SpinnerProps;

export function AppSpinner({ ...props }: AppSpinnerProps) {
  return <StyledSpinner {...props} />;
}
