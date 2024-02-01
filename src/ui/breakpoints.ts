const Breakpoints = ["--bp-768"] as const;
type BreakpointNames = (typeof Breakpoints)[number];

function getBreakpointValue(breakpointName: BreakpointNames): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(breakpointName)
    .trim();

  if (!value) {
    throw new Error(`CSS variable ${breakpointName} is not defined.`);
  }

  return value;
}

export const isDesktopQuery = `(min-width: ${getBreakpointValue("--bp-768")})`;
