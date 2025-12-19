import { Suspense } from "react";
import CenteredLoader from "./CenteredLoader";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<CenteredLoader />}>{children}</Suspense>;
};

export default SuspenseWrapper;
