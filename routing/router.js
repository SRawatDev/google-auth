const router=require("express").Router()
const auth=require("../middleware/auth")
const controller=require("../controller/controller")
router.get("/auth/google",controller.authenticateGoogle)
router.get("/auth/google/callback",controller.authenticateGoogleCallback)
router.get("/auth/google/failure",controller.googleAuthFailure)
router.get("/auth/protected",auth,controller.protectedRoute)
router.get("/trans",controller.translator)
// router.get(('/auth/logout', controller.logout))
router.get(('/', controller.home))

module.exports=router