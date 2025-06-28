const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "bakiye",
  description: "Mevcut bakiyenizi gösterir.",
  type: 1,

  run: async (client, interaction) => {
    const user = interaction.user;
    const bakiye = db.get(`bakiye_${user.id}`) || 0;

    const embed = new EmbedBuilder()
      .setTitle("💰 Bakiyeniz")
      .setDescription(`📛 Kullanıcı: <@${user.id}>\n💸 Mevcut Bakiye: \`${bakiye}₺\``)
      .setColor("Gold")
      .setFooter({ text: "Bakiye sistemi" });

    interaction.reply({ embeds: [embed] });
  },
};