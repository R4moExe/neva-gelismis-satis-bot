const { PermissionsBitField, EmbedBuilder, Client, Partials } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const db = require("croxydb");
const config = require("./config.json");

const client = new Client({
    intents: Object.values(Discord.IntentsBitField.Flags),
    partials: Object.values(Partials)
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");

readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push(props);

    console.log(chalk.red`[COMMAND]` + ` ${props.name} komutu yüklendi.`);
});

readdirSync('./events').forEach(e => {
    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args);
    });

    console.log(chalk.blue`[EVENT]` + ` ${name} eventi yüklendi.`);
});

client.login(config.TOKEN);

process.on("unhandledRejection", async (e) => {
    return console.log(chalk.red(`Bir hata oluştu\n${e}`));
});