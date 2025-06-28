const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "kampanya",
  description: "Belirli bir üründe kampanya başlatır.",
  type: 1,
  options: [
    {
      name: "ürün",
      description: "Kampanya yapılacak ürünün adı",
      type: 3,
      required: true
    },
    {
      name: "indirimli_fiyat",
      description: "Yeni indirimli fiyat",
      type: 4,
      required: true
    },
    {
      name: "süre",
      description: "Kampanyanın süresi (saat cinsinden)",
      type: 4,
      required: true
    }
  ],

  run: async (client, interaction) => {
    const isim = interaction.options.getString("ürün").toLowerCase();
    const indirimliFiyat = interaction.options.getInteger("indirimli_fiyat");
    const sure = interaction.options.getInteger("süre");

    const urunler = db.get("urunler") || [];
    const urun = urunler.find(u => u.isim === isim);

    if (!urun) {
      return interaction.reply({
        content: "❌ Bu isimde bir ürün bulunamadı.",
        ephemeral: true
      });
    }

    const bitisZamani = Date.now() + sure * 60 * 60 * 1000;
    db.set(`kampanya_${isim}`, {
      indirimliFiyat,
      bitis: bitisZamani
    });

    const embed = new EmbedBuilder()
      .setTitle("🎉 Kampanya Başlatıldı")
      .setDescription(`**${isim}** ürünü için kampanya başlatıldı!`)
      .addFields(
        { name: "💸 Yeni Fiyat", value: `${indirimliFiyat}₺`, inline: true },
        { name: "⏳ Süre", value: `${sure} saat`, inline: true }
      )
      .setColor("Green")
      .setFooter({ text: "Kampanya sistemi aktif" });

    interaction.reply({ embeds: [embed] });
  }
};