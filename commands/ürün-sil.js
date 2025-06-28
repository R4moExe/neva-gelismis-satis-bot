const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "ürün-sil",
  description: "Belirtilen ürünü siler.",
  type: 1,
  options: [
    {
      name: "isim",
      description: "Silinecek ürünün ismi",
      type: 3, // STRING
      required: true,
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "❌ Bu komutu kullanmak için Yönetici iznine sahip olmalısınız.", ephemeral: true });
    }

    const isim = interaction.options.getString("isim").toLowerCase();

    const urunler = db.get("urunler") || [];

    const urunIndex = urunler.findIndex(u => u.isim === isim);

    if (urunIndex === -1) {
      return interaction.reply({ content: "❌ Bu isimde ürün bulunamadı.", ephemeral: true });
    }

    urunler.splice(urunIndex, 1);

    db.set("urunler", urunler);

    const embed = new EmbedBuilder()
      .setTitle("✅ Ürün Silindi")
      .setDescription(`**${isim}** adlı ürün veritabanından silindi.`)
      .setColor("Red");

    interaction.reply({ embeds: [embed] });
  },
};