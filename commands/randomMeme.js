const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randommeme")
    .setDescription("Sends a random meme"),
  async execute(interaction) {
    await interaction.deferReply();

    const channelId = interaction.channelId;
    if (channelId === "1169696989605269685" || channelId === "1170048000073142292") {
      const meme = await getMeme();

      const embed = new EmbedBuilder()
        .setTitle(meme.title)
        .setURL(meme.postLink)
        .setImage(meme.image)
        .setFooter({
          text: `👍 ${meme.upvotes} `,
        });
      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply("Das ist kein Scheiß botspam channel du keck, lern mal zu lesen.");
    }
  },
};

async function getMeme() {
  const meme = await axios.get("https://meme-api.com/gimme");
  return {
    title: meme.data.title,
    image: meme.data.url,
    postLink: meme.data.postLink,
    upvotes: meme.data.ups,
  };
}
