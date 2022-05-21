import Discord from "discord.js";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const client = new Discord.Client();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
	if (msg.content === "dad") {
		fetch("https://www.reddit.com/r/dadjokes/hot.json")
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				//const channel = client.channels.cache.get("976833534725591042");
				const jokeData =
					json.data.children[
						Math.floor(Math.random() * json.data.children.length)
					];
				console.log(jokeData.data.selftext);
				const embed = new Discord.MessageEmbed()
					.setTitle(jokeData.data.title)
					.setColor("#FFFF00")
					.setDescription(`*${jokeData.data.selftext}*`)
					.setImage(
						"https://preview.redd.it/bgbn91rcj0g51.gif?format=mp4&s=c093cdd91f994b869036b87ae14d58567c26c218"
					);
				console.log(embed);
				msg.channel.send(embed);
				//msg.reply(jokeData.data.title);
			});
		// 	const exampleEmbed = new Discord.MessageEmbed()
		// 		.setColor("#0099ff")
		// 		.setTitle("Some title")
		// 		.setURL("https://discord.js.org/")
		// 		.setAuthor({
		// 			name: "Some name",
		// 			iconURL: "https://i.imgur.com/AfFp7pu.png",
		// 			url: "https://discord.js.org",
		// 		})
		// 		.setDescription("Some description here")
		// 		.setThumbnail("https://i.imgur.com/AfFp7pu.png")
		// 		.addFields(
		// 			{ name: "Regular field title", value: "Some value here" },
		// 			{ name: "\u200B", value: "\u200B" },
		// 			{ name: "Inline field title", value: "Some value here", inline: true },
		// 			{ name: "Inline field title", value: "Some value here", inline: true }
		// 		)
		// 		.addField("Inline field title", "Some value here", true)
		// 		.setImage("https://i.imgur.com/AfFp7pu.png")
		// 		.setTimestamp()
		// 		.setFooter({
		// 			text: "Some footer text here",
		// 			iconURL: "https://i.imgur.com/AfFp7pu.png",
		// 		});

		// 	msg.channel.send({ embed: [exampleEmbed] });
	}
});

client.login(process.env.TOKEN);
