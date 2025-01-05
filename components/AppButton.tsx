import { tokens } from "@tamagui/config/v3";
import React, { forwardRef } from "react";
import {
  Button,
  ButtonProps,
  styled,
  Text,
  getTokens,
  Spinner,
  XStack,
} from "tamagui";

const appTokens = getTokens();
const StyledButton = styled(Button, {
  variants: {
    buttonSize: {
      small: {
        fontSize: "$5",
      },
      medium: {
        fontSize: "$6",
      },
      large: {
        fontSize: "$7",
      },
    },
    priority: {
      primary: {
        backgroundColor: appTokens.color.primary,
        pressStyle: {
          backgroundColor: appTokens.color.primary,
        },
      },
      secondary: {
        backgroundColor: appTokens.color.secondary,
        borderWidth: 1,
        borderColor: appTokens.color.secondary,
        pressStyle: {
          backgroundColor: appTokens.color.secondary,
          borderWidth: 1,
          borderColor: appTokens.color.secondary,
        },
      },
      tertiary: {
        backgroundColor: appTokens.color.tertiary,
        borderWidth: 1,
        borderColor: appTokens.color.tertiary,
        pressStyle: {
          backgroundColor: appTokens.color.tertiary,
          borderWidth: 1,
          borderColor: appTokens.color.tertiary,
        },
      },
    },
  },
});

const StyledButtonText = styled(Text, {
  variants: {
    textSize: {
      small: {
        fontSize: "$4",
      },
      medium: {
        fontSize: "$6",
      },
      large: {
        fontSize: "$7",
      },
    },
    priority: {
      primary: {
        color: "#fff",
      },
      secondary: {
        color: "#0a0a0a",
      },
      tertiary: {
        color: "#0a0a0a",
      },
    },
  },
});

const StyledButtonSpinner = styled(Spinner, {
  variants: {
    priority: {
      primary: {
        color: "#fff",
      },
      secondary: {
        color: "#0a0a0a",
      },
      tertiary: {
        color: "#0a0a0a",
      },
    },
  },
});

export type AppButtonProps = ButtonProps & {
  priority?: "primary" | "secondary" | "tertiary";
  buttonSize?: "small" | "medium" | "large";
  loading?: boolean;
};

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (props, ref) => {
    // export function AppButton({
    //   priority = "secondary",
    //   buttonSize = "medium",
    //   loading = false,
    //   unstyled,
    //   disabled,
    //   ...props
    // }: AppButtonProps) {
    const {
      priority = "secondary",
      buttonSize = "medium",
      loading = false,
      unstyled,
      disabled,
    } = props;
    return (
      <StyledButton
        ref={ref}
        unstyled={unstyled}
        padding={!unstyled && 8}
        priority={unstyled ? undefined : priority}
        noTextWrap
        disabled={disabled || loading}
        size={Number(tokens.size.$true)}
        {...props}
      >
        <XStack gap={8} alignItems="center">
          {loading && <StyledButtonSpinner size="small" priority={priority} />}
          {props.children && (
            <StyledButtonText priority={priority} textSize={buttonSize}>
              {props.children}
            </StyledButtonText>
          )}
        </XStack>
      </StyledButton>
    );
  },
);

export default AppButton;
