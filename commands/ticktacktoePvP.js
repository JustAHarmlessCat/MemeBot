const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Tick Tack Toe PvP")
    .setDescription("Play a game of Tick Tack Toe with a friend!"),
  async execute(interaction = new CommandInteraction()) {
    await interaction.reply("This command is not yet implemented");
    return;
  },
};
