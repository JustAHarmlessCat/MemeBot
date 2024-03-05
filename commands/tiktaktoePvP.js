const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { gameExists, gameBoard } = require("..");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tiktaktoepvp')
    .setDescription("Play a game of Tik Tak Toe with a friend!"),
  async execute(interaction = new CommandInteraction()) {
    const embed = new EmbedBuilder()
      .setTitle('Tik Tak Toe PvP')
      .setDescription(JSON.stringify(gameBoard))
      if(gameExists) {
    await interaction.editReply({ embeds: [embed] });
    return;
      }
      await interaction.reply({ embeds: [embed] });
    return;
  },
};