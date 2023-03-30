import axios from "axios";
import { LoginResponse, SignUpInfo } from "../interfaces/Auth";
import { StripeCheckoutResponse } from "../interfaces/Payment";
import { Post } from "../interfaces/Post";
import { UserWithoutSensitiveInfo } from "../interfaces/User";
import { authConfig, domain, withLogs } from "../utils/apiCallsHandler";

const url = `${domain}/api/purchases`;

const createCheckoutSession: (
  post: Post,
  token: string
) => Promise<StripeCheckoutResponse> = async (post, token) => {
  return withLogs(
    axios.post(`${url}/create-checkout-session`, post, authConfig(token)),
    "userDetails"
  );
};

export { createCheckoutSession };
