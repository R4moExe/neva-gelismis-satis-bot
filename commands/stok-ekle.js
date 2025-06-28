const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "stok-ekle",
  description: "Bir ürüne teslim edilecek veri stoğu ekler.",
  type: 1,
  options: [
    {
      name: "ürün",
      description: "Veri eklenecek ürün ismi",
      type: 3,
      required: true,
    },
    {
      name: "veri",
      description: "Ürünün teslim edilecek verisi (örn: kod, hesap vs)",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({
        content: "❌ Bu komutu kullanmak için yönetici iznine sahip olmalısın.",
        ephemeral: true,
      });
    }

    const isim = interaction.options.getString("ürün").toLowerCase();
    const veri = interaction.options.getString("veri");

    const urunler = db.get("urunler") || [];
    const urun = urunler.find(u => u.isim === isim);

    if (!urun) {
      return interaction.reply({
        content: "❌ Bu isimde bir ürün bulunamadı.",
        ephemeral: true,
      });
    }

    const stokKey = `stok_${isim}`;
    const mevcutStok = db.get(stokKey) || [];

    mevcutStok.push(veri);
    db.set(stokKey, mevcutStok);

    const embed = new EmbedBuilder()
      .setTitle("✅ Stok Verisi Eklendi")
      .setDescription(`**${isim}** ürününe yeni bir teslim verisi eklendi.\nToplam stok: **${mevcutStok.length} adet**`)
      .setColor("Green");

    interaction.reply({ embeds: [embed] });
  },
};