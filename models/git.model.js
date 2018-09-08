const mongoose = require('mongoose');
const { userSchema, getUser } = require('./user.model');

const gitSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  git_url: { type: String, required: true },
  license: String,
  language: String,
  issues: Number,
  user: userSchema
});

const Git = mongoose.model('Git', gitSchema);

async function getGits(id) {
  const user = await getUser(id);
  const result = await Git.find({ user: user });
  return result;
}

async function addGit(git, userID) {
  let user = await getUser(userID);
  let newGit = new Git({
    name: git.name,
    git_url: git.git_url,
    license: git.license,
    issues: git.issues,
    language: git.language,
    user: user
  });
  newGit = await newGit.save();
  console.log('git is ' + newGit);
  return newGit;
}

module.exports = { addGit, getGits };
