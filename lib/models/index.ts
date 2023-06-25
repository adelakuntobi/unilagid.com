import { connectDB } from "@/utils/connection";
import { User } from "./user";
import { Biometrics } from "./biometrics";
import { Documents } from "./documents";
import { Admins } from "./admins";

connectDB();

export { User, Biometrics, Documents, Admins };
