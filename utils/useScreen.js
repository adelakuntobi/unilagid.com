import { useMediaQuery } from "react-responsive";

export default function useScreen() {
    return {
      isMobilePortrait: useMediaQuery({
        query: `(min-width: 320px) and (max-width: 480px)`,
      }),
      isMobileLandscape: useMediaQuery({
        query: `(min-width: 481px) and (max-width: 767px)`,
      }),
      isMediumPortrait: useMediaQuery({
        query: `(min-width: 768px) and (max-width: 1024px)`,
      }),
      isMediumLandscape: useMediaQuery({
        query: `(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)`,
      }),
      isLargeDesktop: useMediaQuery({
        query: `(min-width: 1025px) and (max-width: 1280px)`,
      }),
      isXLargeDesktop: useMediaQuery({ query: `(min-width: 1281px)` }),
    };
  }