const express = require("express");
const router = express.Router();
const User = require("../models/Employee");
//const uploader = require("../helpers/multer");

isAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user.status === "Active") {
    next();
  } else {
    res.redirect("/auth/login");
  }
}


// router.get("/", isAuth, async (req, res) => {
//   const { _id } = req.user;
//   console.log(req.user)
//   const profile = await User.findById({ _id })
//     res.render("profile", {  });
// });

router.get("/", isAuth, async (req, res) => {
  const  user  = await User.findById(req.user._id).populate('profile')
  console.log(user);
   
  res.render("profile",  {user} );
});

router.get("/:id", isAuth, async (req, res) => {
  const { id: _id } = req.params;
  //QUitar property.find y usar user
  const profile = await User.findById(_id)
    res.render("profile", {profile});
})

router.get("/:id/edit", isAuth, (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render("profile-form", { user });
    })
    .catch(err => {
      res.render("profile-form", { err });
    });
});

// router.post("/:id/edit", isAuth, uploader.single("image"), (req, res) => {
//   const { id: _id } = req.params;
//   const { email } = req.user;
//   const image = req.file ? req.file.url : undefined;
//   const user = image ? { ...req.body, image } : req.body;
//   User.findOneAndUpdate({ _id, email }, { $set: user })
//     .then(() => {
//       res.redirect("/profile");
//     })
//     .catch(err => {
//       res.render("profile-form", { err });
//     });
// });

module.exports = router;
