export const HOMEPAGE = "/";
export const LOGIN = "/login";
export const SUCCESS = "/success";
export const ERROR = "/error";
export const CREATECARD = "/";
export const REGISTER = "/register";
export const FORGOT_PIN = "/forgot-pin";
export const RESET_PIN = "/reset-pin";
export const FAQ = "/faq";
export const PRIVACY_POLICY = "/privacy-policy";
export const COOKIE_POLICY = "/cookie-policy";
export const TERMS_OF_SERVICE = "/terms-of-service";
export const LICENSES = "/licenses";
export const LANDING_DEVELOPERS = "/developers";
export const USE_CASES = "/use-cases";
export const CONTACT_US = "/contact";
export const ERROR404 = "/404";

// USER AUTHENTICATED
export const DASHBOARD = "/dashboard";
export const CARDS = DASHBOARD + "/cards";
export const EACH_CARD = DASHBOARD + "/cards/dollar";
export const DEVELOPERS = DASHBOARD + "/developers";
export const TRANSACTIONS = DASHBOARD + "/transactions";
export const SETTINGS = DASHBOARD + "/settings/kyc-information";
export const PROFILE = DASHBOARD + "/user-profile";
export const VIEWCARD = DASHBOARD + "/view-card";
export const PHYSICAL_CARD = DASHBOARD + "/physical-card";
export const CREATE_OTHER_CARD = DASHBOARD + "/create-card/naira";
  
// MOBILE ROUTE
export const USER_SETTINGS_PROFILE = DASHBOARD + "/settings/profile";
export const USER_SETTINGS_SECURITY = DASHBOARD + "/settings/security";
export const USER_SETTINGS_HELP = DASHBOARD + "/settings/support";

// SUPERADMIN AUTHENTICATED
export const SUPERADMIN = "/superadmin";
export const SUPERADMIN_LOGIN = SUPERADMIN + "/login";
export const SUPERADMIN_USERS = SUPERADMIN + "/users";
export const SUPERADMIN_USERS_INACTIVE = SUPERADMIN + "/users/inactive";
export const SUPERADMIN_EACH_USER = SUPERADMIN + "/users/:id";
export const SUPERADMIN_EACH_USER_LOGS = SUPERADMIN + "/users/:id/activity-log";
export const SUPERADMIN_TRANSACTIONS = SUPERADMIN + "/transactionS";
export const SUPERADMIN_EACH_TRANSACTION = SUPERADMIN + "/transactions/:id";
export const SUPERADMIN_DEVELOPERS = SUPERADMIN + "/developers";
export const SUPERADMIN_ADMINS = SUPERADMIN + "/admins";

