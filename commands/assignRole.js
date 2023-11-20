const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  CommandInteraction,
  GuildMember,
  Role,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("assignrole")
    .setDescription("Vergibt eine Rolle an einen User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Der User dem die Rolle gegeben werden soll")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Die Rolle die vergeben werden soll")
        .setRequired(true)
    ),

  async execute(interaction = new CommandInteraction()) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    if (
      interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      const member = interaction.guild.members.cache.get(user.id);
      await member.roles.add(role);
      await interaction.reply({
        content: `Rolle ${role.name} wurde an ${user.username} vergeben. (Admin)`,
        ephemeral: true,
      });
      return;
    }
    const roles = JSON.parse(fs.readFileSync("roles.json", "utf-8"));

    if (!interaction.member.permissions.has("MANAGE_ROLES")) {
      const member = interaction.guild.members.cache.get(user.id);
      if (!role) {
        await interaction.reply({
          content: `Diese Rolle ist keine Customrole daher darf sie nicht vergeben werden`,
          ephemeral: true,
        });
        return;
      }
    }

    await member.roles.add(role);
    await interaction.reply({
      content: `Rolle ${role.name} wurde an ${user.username} vergeben.`,
      ephemeral: true,
    });
  },
};
