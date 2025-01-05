import React, { forwardRef } from "react";
import { Input, styled, getTokens, InputProps } from "tamagui";

const appTokens = getTokens();

const StyledInput = styled(Input, {
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: appTokens.color.primary,
  borderRadius: 24,
});

export type AppInputProps = InputProps & {
  ref?: React.RefObject<Input>;
};

const AppInput = forwardRef<Input, AppInputProps>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

export default AppInput;
