const { SlashCommandBuilder } = require("discord.js");
const convert = require("color-convert");
const fs = require("fs");
const { loadData, saveData } = require("../utils.js");
const { CSS_COLOR_NAMES } = require("../utils.js");
const { basename } = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createrole")
    .setDescription("Erstellt eine benutzerdefinierte Rolle")
    .addStringOption((option) =>
      option.setName("name").setDescription("Name der Rolle").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Farbe der Rolle")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("mentionable")
        .setDescription("Ob die Rolle erwähnbar ist")
        .setRequired(false)
    ),
  /**
   * Executes the createRole command.
   * @param {Interaction} interaction - The interaction object.
   * @returns {Promise<void>}
   */
  async execute(interaction) {
    // Acknowledge the interaction
    await interaction.deferReply();

    const name = interaction.options.getString("name");

    if (name.toLowerCase().includes ("steini")) {
      await interaction.user.send("Nein. Du dummer Bastard.");
      return;
    }

    const color = interaction.options.getString("color");

    const mentionable = interaction.options.getBoolean("mentionable") || false;

    // Get the guild from the interaction
    const guild = interaction.guild;

    // Create the role
    const role = await guild.roles.create({
      name: name,
      color: color,
      mentionable: mentionable,
    });
    let Data = loadData();
    Data.push({
      id: role.id,
      name: role.name,
    });
    saveData(Data);

    // Send a follow-up message
    interaction.followUp(`Die Rolle ${role} wurde erstellt.`);
    return;
  },
};
