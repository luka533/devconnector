const request = require("request");

const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const AppError = require("../util/AppError");
const catchAsync = require("../util/catchAsync");
const Post = require("../models/postModel");

exports.getAllProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find().populate({
    path: "user",
    select: "name avatar",
  });

  res.status(200).json({
    status: "success",
    results: profiles.length,
    data: {
      profiles,
    },
  });
});

exports.getGithubProfile = catchAsync(async (req, res, next) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };

  const data = request(options, (err, response, body) => {
    if (err) return next(new AppError(err.message, response.statusCode));
    if (response.statusCode !== 200)
      return next(new AppError("Profile not found", response.statusCode));
    res.status(200).json({ status: "success", data: JSON.parse(body) });
  });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user }).populate({
    path: "user",
    select: "name avatar",
  });

  // if (!profile)
  //   return res.status(200).json({
  //     status: "success",
  //     message: "You have no Profile. Do you want to create one?",
  //   });

  res.status(200).json({
    status: "success",
    data: { profile },
  });
});

exports.createProfile = catchAsync(async (req, res, next) => {
  // destructure the request
  const {
    status,
    skills,
    website,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    // rest might be location and so on
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user,
    website: website,
    ...rest,
  };

  if (status) profileFields.status = status;

  if (skills) {
    profileFields.skills = Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => skill.trim());
  }

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };
  profileFields.social = socialFields;

  // if no profile foudn creates one and else updates (because of upsert: true)
  const profile = await Profile.findOneAndUpdate(
    { user: req.user },
    { $set: profileFields },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true },
  );

  // console.log(profile);

  res.status(200).json({ status: "success" });
});

exports.getProfileByUserId = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({
    path: "user",
    select: "name avatar",
  });

  if (!profile) return next(new AppError("User does not have a profile!", 400));

  res.status(200).json({
    status: "success",
    data: {
      profile,
    },
  });
});

exports.deleteProfile = catchAsync(async (req, res, next) => {
  // delete all user posts
  await Post.deleteMany({ user: req.user });
  await Profile.findOneAndDelete({ user: req.user });
  await User.findOneAndDelete({ _id: req.user });

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(204).json({ status: "success" });
});

exports.addExperience = catchAsync(async (req, res, next) => {
  const { title, company, from, location, to, current, description } =
    req.body || {};

  if (!title || !company || !from)
    return next(
      new AppError("Exprience must have a title, company and from date", 400),
    );

  const newExp = { title, company, from, location, to, current, description };

  const profile = await Profile.findOne({ user: req.user });

  profile.experience.unshift(newExp);

  await profile.save();

  res.status(200).json({
    status: "success",
    data: {
      profile,
    },
  });
});

exports.deleteExperience = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user });
  profile.experience = profile.experience.filter(
    (exp) => exp._id.toString() !== req.params.expId,
  );
  await profile.save();

  res.status(200).json({
    status: "success",
    data: {
      profile,
    },
  });
});

exports.addEducation = catchAsync(async (req, res, next) => {
  const {
    school,
    degree,
    from,
    fieldofstudy,
    location,
    to,
    current,
    description,
  } = req.body || {};

  if (!school || !degree || !from || !fieldofstudy)
    return next(
      new AppError("Education must have a title, company and from date", 400),
    );

  const newEdu = {
    school,
    degree,
    from,
    fieldofstudy,
    location,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user });

  profile.education.unshift(newEdu);

  await profile.save();

  res.status(200).json({
    status: "success",
    data: {
      profile,
    },
  });
});

exports.deleteEducation = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user });
  profile.education = profile.education.filter(
    (ed) => ed._id.toString() !== req.params.eduId,
  );

  await profile.save();

  res.status(200).json({
    status: "success",
    data: {
      profile,
    },
  });
});
