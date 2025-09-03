import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  // use clientId for client side usage
  clientId: "c6e76d66b5da380cc43f71089110b72e",
  // use secretKey for server side usage
  secretKey: "HYP...blqA", // replace this with full secret key
});
export default client;
