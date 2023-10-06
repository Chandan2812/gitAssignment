const mongoose = require("mongoose");

const GitRepoSchema = new mongoose.Schema({
	id: Number,
	name: String,
	html_url: String,
	description: String,
	created_at: Date,
	open_issues: Number,
	watchers: Number,
	owner: Object,
});

const GitRepoModel = mongoose.model("GitRepo", GitRepoSchema);

module.exports = { GitRepoModel };
