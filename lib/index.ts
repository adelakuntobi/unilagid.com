import { connectDB } from "@/utils/connection";
import { User } from "./user";
import { Biometrics } from "./biometrics";
import { Documents } from "./documents";

connectDB();

export { User, Biometrics, Documents };
