const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "ürün-bilgi",
  description: "Belirtilen ürünün bilgilerini gösterir.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Ürün ismi",
      type: 3, // STRING
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const isim = interaction.options.getString("isim").toLowerCase();

    const urunler = db.get("urunler") || [];
    const urun = urunler.find(u => u.isim === isim);

    if (!urun) {
      return interaction.reply({ content: "❌ Bu isimde ürün bulunamadı.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`📦 Ürün Bilgisi: ${urun.isim}`)
      .addFields(
        { name: "Fiyat", value: urun.fiyat.toString(), inline: true },
        { name: "Stok", value: urun.stok.toString(), inline: true }
      )
      .setColor("Blue");

    interaction.reply({ embeds: [embed] });
  },
};