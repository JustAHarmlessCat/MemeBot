const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randommeme')
        .setDescription('Sends a random meme'),
    async execute(interaction) {
        await interaction.deferReply();
        
        const meme = await getMeme();
        
        const embed = new EmbedBuilder()

            .setTitle(meme.title)
            .setURL(meme.postLink)
            .setImage(meme.image)
            .setFooter({
                text: `👍 ${meme.upvotes} `
            });
        await interaction.editReply({ embeds: [embed] });
    }
}




async function getMeme() {
    const meme = await axios.get("https://meme-api.com/gimme")
    return {
        title: meme.data.title,
        image: meme.data.url,
        postLink: meme.data.postLink,
        upvotes: meme.data.ups,
    }
}