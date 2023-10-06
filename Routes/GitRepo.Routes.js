const axios = require("axios");
const { GitRepoModel } = require("../Models/GitRepo.Model");
const GitRepoRouter = require("express").Router();

GitRepoRouter.post("/", async (req, res) => {
	const { url } = req.body;
	try {
		const GitDetails = await axios.get(url);

		// console.log(GitDetails);
		for (let GitDetail of GitDetails.data) {
			const {
				id,
				name,
				html_url,
				description,
				created_at,
				open_issues,
				watchers,
				owner: {
					id: ownerId,
					avatar_url,
					html_url: ownerHtmlUrl,
					type,
					site_admin,
				},
			} = GitDetail;

			const data = {
				id,
				name,
				html_url,
				description,
				created_at,
				open_issues,
				watchers,
				owner: {
					id: ownerId,
					avatar_url,
					html_url: ownerHtmlUrl,
					type,
					site_admin,
				},
			};
			const isExist = await GitRepoModel.findOne({ id });

			if (!isExist) {
				const newData = new GitRepoModel(data);
				await newData.save();
			} else {
				const updateData = GitRepoModel.updateOne({ id }, data);
			}
		}
		return res
			.status(200)
			.json({ msg: "Data Created Successfully!!!", response: true });

	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: error.message,
		});
	}
});

GitRepoRouter.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const data = await GitRepoModel.findOne({ id });

		if (data) {
			res
				.status(200)
				.json({ data, msg: "Data Fetched Successfully!!!", response: true });
		} else {
			res.status(404).json({ msg: "Data Not Found!!!", response: false });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: error.message,
		});
	}
});
module.exports = { GitRepoRouter };
