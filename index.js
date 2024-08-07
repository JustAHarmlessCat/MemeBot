const {
  Client,
  GatewayIntentBits,
  Collection,
  PermissionsBitField,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const axios = require("axios");
const clc = require("cli-color");
const { CSS_COLOR_NAMES, messageCount } = require("./utils");

let gameExists = false;
let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

let apiSecret;
let lastUpdated = 0;

const badwordsObject = require("badwords/object");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  commandFiles.forEach((file) => {
    const command = require(`./commands/${file}`);
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      console.log(
        clc.greenBright(`[INFO] Loaded command ${command.data.name}`),
      );
    }
  });

  client.application.commands.set(
    client.commands.map((command) => command.data),
  );
  console.log(`[INFO] Registered ${client.commands.size} commands`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(clc.redBright(error));
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  messageCount(message);
  const content = message.content.toLowerCase();

  if (
    content.includes("holstein") ||
    content.includes("holstein kiel") ||
    content.includes("kiel")
  ) {
    message.react("<:HolsteinKiel:1218309138090688653>");
  }

  apiSecret = await updateSecret();

  const roleId = "1161302831962275962";
  if (message.member.roles.cache.has(roleId)) {
    message.react("🐒");
  }

  if (message.author.id === "825026353258299393") {
    message.react("🍅");
  }

  // Check if the message contains any bad words
  const badWords = Object.keys(badwordsObject);
  const hasBadWord = badWords.some((word) => content.includes(word));

  // Check if the message contains any of the specified names
  const names = ["obamna", "obama", "floppa"];
  const name = names.find((name) => content.toLowerCase().includes(name));

  // If the message contains a bad word or a specified name, handle it
  if (hasBadWord || name) {
    // If the name is 'floppa', reply with these messages
    if (name === "floppa") {
      ["im better", "im smarter", "im stronger"].forEach((m) =>
        message.reply(m),
      );
    }
    // If the name is 'obamna' or 'obama', translate the message and check for bad words
    else if (name) {
      const newSecret = await updateSecret();
      if (newSecret) {
        apiSecret = newSecret;
      }

      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: message.content,
          source: "de",
          target: "en",
          secret: apiSecret,
          api_key: "",
        }),
        headers: {
          "Content-Type": "application/json",
          Origin: "https://libretranslate.com",
        },
      });

      const resJson = await res.json();
      const translatedText = resJson.translatedText;

      // If the translated text contains a bad word, reply with this message
      if (
        translatedText &&
        badWords.some((word) => translatedText.toLowerCase().includes(word))
      ) {
        Array(5)
          .fill("du dummer nuttensohn")
          .forEach((m) => message.reply(m));
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

async function getApiSecret() {
  const res = await axios.get(
    "https://de.libretranslate.com/js/app.js?v=1.5.2",
  );
  const file = res.data;
  // get line 44 of the file
  const line = file.split("\n")[43]; //apiSecret: "L7ILCBK"
  const code = line.split(":")[1].replaceAll('"', "").replaceAll(" ", "");
  return code;
}

async function updateSecret() {
  if (Date.now() - lastUpdated < 1000 * 60 * 60) {
    return;
  } else {
    console.log(clc.cyanBright("[INFO] Secret Updated!"));
    apiSecret = await getApiSecret();
    lastUpdated = Date.now();
    return apiSecret;
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isAutocomplete()) return;
  const focused = interaction.options.getFocused(true).value;

  // filter css base names by the focused value
  const filtered = CSS_COLOR_NAMES.filter((color) => {
    if (color.name.toLowerCase().includes(focused.toLowerCase())) {
      return true;
    }
  });

  // only return a max of 25 results
  const sliced = filtered.slice(0, 25);

  interaction.respond(
    sliced.map((color) => {
      return {
        name: color.name,
        value: color.color,
      };
    }),
  );
});

module.exports = {
  gameExists,
  gameBoard,
};
