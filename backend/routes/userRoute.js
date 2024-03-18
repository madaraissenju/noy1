const express = require("express");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  createCustomer,
  updateCustomerDetails,
  otpLogin,
  verifyOpt,
  verifyOtpRegister,
  otpRegister

} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();
//****************** Regiter a user ***************************** */
router.route("/register").post(registerUser);

//otp register using mobile number
router.route("/otpRegister").post(otpRegister);

// verify the otp sent
router.route("/verifyOtpRegister").post(verifyOtpRegister);


//******************************login a user****************************/ 
router.route("/login").post(loginUser);

//otp login
router.route("/otpLogin").post(otpLogin)

//verifying that loginOtp
router.route("/verifyLoginOtp").post(verifyOpt)



//************************************************************ */
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);









router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/createcustomer")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCustomer);

router.put('/admin/customers/:customerId', updateCustomerDetails);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router.route("/admin/login")
  .post(authorizeRoles, loginUser);

module.exports = router;
