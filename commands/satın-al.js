const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "satın-al",
  description: "Bir ürün satın alır, stoktan teslim eder ve ücret kesilir.",
  type: 1,
  options: [
    {
      name: "ürün",
      description: "Satın alınacak ürünün ismi",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const isim = interaction.options.getString("ürün").toLowerCase();
    const user = interaction.user;
    const userId = user.id;

    const urunler = db.get("urunler") || [];
    const urun = urunler.find(u => u.isim === isim);

    if (!urun) {
      return interaction.reply({
        content: "❌ Bu isimde bir ürün bulunamadı.",
        ephemeral: true,
      });
    }

    const kampanya = db.get(`kampanya_${isim}`);
    const simdi = Date.now();
    let fiyat;

    if (kampanya && kampanya.bitis > simdi) {
      fiyat = kampanya.indirimliFiyat;
    } else {
      fiyat = urun.fiyat;
    }

    const stok = db.get(`stok_${isim}`) || [];

    if (stok.length === 0) {
      return interaction.reply({
        content: "❌ Bu ürün şu anda stokta yok.",
        ephemeral: true,
      });
    }

    const bakiye = db.get(`bakiye_${userId}`) || 0;
    if (bakiye < fiyat) {
      return interaction.reply({
        content: `❌ Yetersiz bakiye.\n💸 Gerekli: \`${fiyat}₺\`, Mevcut: \`${bakiye}₺\``,
        ephemeral: true,
      });
    }

    db.subtract(`bakiye_${userId}`, fiyat);

    const teslimVerisi = stok.shift();
    db.set(`stok_${isim}`, stok);

    const siparisID = `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
    const siparisData = {
      id: siparisID,
      kullanici: userId,
      urun: isim,
      teslim: teslimVerisi,
      tarih: new Date().toLocaleString("tr-TR"),
      durum: "Teslim Edildi"
    };

    const mevcut = db.get("siparisler") || [];
    mevcut.push(siparisData);
    db.set("siparisler", mevcut);

    const embed = new EmbedBuilder()
      .setTitle("🛒 Satın Alma Başarılı")
      .setDescription(`**${isim}** ürünü başarıyla satın alındı.\n📦 Sipariş ID: \`${siparisID}\`\n💰 Ücret: \`${fiyat}₺\``)
      .addFields({ name: "🎁 Teslim Verisi", value: `\`${teslimVerisi}\`` })
      .setColor("Green")
      .setFooter({ text: "Sipariş durumu: Teslim Edildi" });

    try {
      await user.send({ embeds: [embed] });
      await interaction.reply({ content: "✅ Sipariş oluşturuldu. Teslimat DM üzerinden gönderildi.", ephemeral: true });
    } catch {
      await interaction.reply({ content: "✅ Sipariş oluşturuldu ancak DM gönderilemedi. Teslimat burada:", embeds: [embed], ephemeral: true });
    }
  },
};