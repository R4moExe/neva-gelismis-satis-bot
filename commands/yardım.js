const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");

module.exports = {
  name: "yardım",
  description: "Bot hakkında bilgi alabilir ve tüm komutları görüntüleyebilirsiniz.",
  type: 1,

  run: async (client, interaction) => {
    const mainEmbed = new EmbedBuilder()
      .setTitle("🤖 Neva Development Satış Botu Yardım Menüsü")
      .setDescription("Bu bot ürün, sipariş, stok, kampanya, bakiye ve daha fazlasını yönetmek için geliştirilmiştir.\n\n📂 Aşağıdan bir kategori seçerek detaylı komut listesine ulaşabilirsiniz.")
      .addFields(
        { name: "👤 Bot Sahibi", value: `<@1165634730755112982>` },
        { name: "📆 Başlangıç Tarihi", value: client.readyAt.toLocaleString("tr-TR") },
        { name: "📦 Toplam Komut", value: `${client.commands.size}` }
      )
      .setColor("Blue");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("yardim_menu")
      .setPlaceholder("Bir kategori seçin")
      .addOptions([
        { label: "📓 Log & Ayar", value: "ayar" },
        { label: "💰 Ürün & Stok", value: "urun" },
        { label: "🛒 Sipariş", value: "siparis" },
        { label: "📊 Raporlama", value: "rapor" },
        { label: "🎁 Kampanya", value: "kampanya" },
        { label: "💳 Bakiye", value: "bakiye" },
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    const reply = await interaction.reply({ embeds: [mainEmbed], components: [row] });

    const collector = reply.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 60000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: "Bu menüyü sadece komutu kullanan kişi kullanabilir.", ephemeral: true });

      let embed = new EmbedBuilder().setColor("Blurple");

      switch (i.values[0]) {
        case "ayar":
          embed.setTitle("📓 Log & Ayar Komutları")
            .setDescription("`/log-kanal-ayarla`, `/ping`, `/yardım`");
          break;

        case "urun":
          embed.setTitle("💰 Ürün & Stok Komutları")
            .setDescription("`/ürün-ekle`, `/ürün-sil`, `/ürün-liste`, `/stok-güncelle`, `/stok-kontrol`, `/stok-dışa-aktar`, `/fiyat-güncelle`, `/stok-ekle`");
          break;

        case "siparis":
          embed.setTitle("🛒 Sipariş Komutları")
            .setDescription("`/satın-al`, `/siparişlerim`, `/sipariş-bilgi`");
          break;

        case "rapor":
          embed.setTitle("📊 Raporlama & Bilgi Komutları")
            .setDescription("`/istatistik`, `/bot-bilgi`");
          break;

        case "kampanya":
          embed.setTitle("🎁 Kampanya & Kupon Komutları")
            .setDescription("`/kampanya`");
          break;

        case "bakiye":
          embed.setTitle("💳 Bakiye Komutları")
            .setDescription("`/bakiye`, `/bakiye-ekle`, `/bakiye-sil`");
          break;

        default:
          embed.setDescription("⚠️ Bilinmeyen kategori.");
      }

      await i.update({ embeds: [embed], components: [row] });
    });

    collector.on("end", () => {
      reply.edit({ components: [] }).catch(() => {});
    });
  },
};
