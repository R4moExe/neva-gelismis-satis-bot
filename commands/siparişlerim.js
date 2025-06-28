const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "siparişlerim",
  description: "Kendi siparişlerinizi listeler.",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    const userId = interaction.user.id;

    const siparisler = db.get(`siparisler_${userId}`) || [];

    if (siparisler.length === 0) {
      return interaction.reply({ content: "📦 Henüz bir siparişiniz bulunmamaktadır.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username} - Siparişlerim`)
      .setColor("Blue");

    siparisler.forEach(siparis => {
      embed.addFields({
        name: `Sipariş ID: ${siparis.id}`,
        value:
          `**Ürün:** ${siparis.urun}\n` +
          `**Durum:** ${siparis.durum}\n` +
          `**Tarih:** ${siparis.tarih}\n` +
          `**Teslimat:** \`${siparis.teslim}\``
      });
    });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};