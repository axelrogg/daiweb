import { Resend } from "resend";
import environment from "../environment";

const emailService = new Resend(environment.EMAIL_SERVICE_API_KEY);
export default emailService;
