# 🚀 Neva Development Gelişmiş Satış Botu

Bu proje, Discord Slash Komut sistemi ile geliştirilmiş **Neva Development tarafından tasarlanmış gelişmiş ürün satış botu altyapısıdır**.  
Ürün ekleme, stok yönetimi, sipariş alma, bakiye sistemi, kampanya desteği ve daha fazlasını içerir.

---

## 🚀 Özellikler

- 🛒 **Ürün Sistemi** – Ürün ekleme, silme, listeleme  
- 📦 **Stok Yönetimi** – Gerçek stoklardan teslimat  
- 💰 **Bakiye Sistemi** – Kullanıcıların bakiyesinden otomatik ücret kesimi  
- 🎁 **Kampanya Desteği** – Ürünlerde indirimli kampanyalar oluşturma  
- 📄 **Sipariş Takibi** – Kullanıcı bazlı sipariş geçmişi  
- 📊 **İstatistik & Raporlama** – Bot ve satış performansı  
- ⚙️ **Gelişmiş Yardım Sistemi** – Select Menu ile kategori bazlı yardım paneli  
- 🔒 **Yetkilendirme & Log** – Ayarlanabilir log kanalı ve yetkili sistemleri  

---

## 📂 Kurulum

> ⚠️ Node.js v16.9+ veya v18 önerilir.  
> **CroxyDB** (basit veritabanı) kullanılmaktadır.

### 1. Gerekli modülleri yükleyin:

```bash
npm install
```

# 2. Config.json Dosyasını Doldurun
```json
{
  "token": "BOT_TOKENİNİZ"
}
```

# 3. Botu Başlatın
```bash
node index.js
```

# 🔧 Dosya Yapısı
```
📁 commands/        → Slash komut dosyaları
📁 events/          → Bot olay dinleyicileri (interactionCreate, ready vs.)
📁 croxydb/            → Stok ve ürün verileri (CroxyDB tarafından oluşturulur)
📄 index.js         → Ana bot başlatıcısı
```

# 💻 Geliştirici
Bu altyapı Neva Development tarafından geliştirilmiştir.
Projeyi beğendiyseniz ⭐ vererek destek olabilirsiniz!

# 📜 Lisans
MIT Lisansı – Tamamen açık kaynak ve özelleştirilebilir.

# 📞 İletişim
Projeyle ilgili sorunlar veya öneriler için lütfen [Discord](discord.gg/altyapi) sunucumuza katılın veya bizimle iletişime geçin.
