const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "sipariş-bilgi",
  description: "Belirtilen sipariş ID'sinin detaylarını gösterir.",
  type: 1,
  options: [
    {
      name: "sipariş_id",
      description: "Gösterilecek siparişin ID'si",
      type: 3, // STRING
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const siparisId = interaction.options.getString("sipariş_id");
    const userId = interaction.user.id;

    const siparisler = db.get(`siparisler_${userId}`) || [];

    const siparis = siparisler.find(s => s.id === siparisId);

    if (!siparis) {
      return interaction.reply({ content: "❌ Bu ID ile size ait bir sipariş bulunamadı.", ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle(`📦 Sipariş Bilgisi - ${siparis.id}`)
      .addFields(
        { name: "Ürün", value: siparis.urun, inline: true },
        { name: "Durum", value: siparis.durum, inline: true },
        { name: "Tarih", value: siparis.tarih, inline: true },
        { name: "Teslimat Verisi", value: `\`${siparis.teslim}\`` }
      )
      .setColor("Green");

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};