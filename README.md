# Arslan Hukuk Bürosu Web Sitesi

Modern, profesyonel ve responsive tasarıma sahip hukuk bürosu web sitesi. Ahmet ve Mehmet Arslan kardeşlerin hukuk bürosu için özel olarak tasarlanmıştır.

## 🎯 Özellikler

### Tasarım ve Kullanıcı Deneyimi
- **Modern ve Profesyonel Tasarım**: Hukuk sektörüne uygun ciddi ve güvenilir görünüm
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm (mobil, tablet, masaüstü)
- **Smooth Animasyonlar**: Sayfa geçişleri ve element animasyonları
- **Parallax Efektleri**: Hero section'da derinlik hissi
- **Hover Efektleri**: İnteraktif kullanıcı deneyimi

### Teknik Özellikler
- **HTML5**: Semantik ve SEO dostu yapı
- **CSS3**: Modern CSS özellikleri (Grid, Flexbox, Animations)
- **JavaScript (ES6+)**: Modern JavaScript ile interaktif özellikler
- **PHP**: Form işleme ve e-posta gönderimi
- **Font Awesome**: Profesyonel ikonlar
- **Google Fonts**: Playfair Display ve Inter fontları

### İçerik Bölümleri
1. **Hero Section**: Etkileyici giriş sayfası
2. **Hakkımızda**: Büro tanıtımı ve özellikler
3. **Avukatlar**: Her avukatın detaylı profili
4. **Hizmetler**: 6 farklı hukuk alanı
5. **İletişim**: Form ve iletişim bilgileri
6. **Footer**: Detaylı bilgiler ve linkler

## 🚀 Kurulum

### Gereksinimler
- Web sunucusu (Apache, Nginx)
- PHP 7.4 veya üzeri
- Modern web tarayıcısı

### Kurulum Adımları
1. Dosyaları web sunucunuza yükleyin
2. `php/contact.php` dosyasındaki e-posta adreslerini güncelleyin
3. Web sunucunuzda PHP mail fonksiyonunun aktif olduğundan emin olun
4. Sitenizi test edin

### E-posta Ayarları
`php/contact.php` dosyasında aşağıdaki e-posta adreslerini güncelleyin:
```php
$to = 'info@arslanhukuk.com'; // Ana e-posta
$additionalEmails[] = 'ahmet@arslanhukuk.com'; // Ahmet Arslan
$additionalEmails[] = 'mehmet@arslanhukuk.com'; // Mehmet Arslan
```

## 📁 Dosya Yapısı

```
arslan_hukuk/
├── index.html          # Ana sayfa
├── css/
│   └── style.css       # Ana stil dosyası
├── js/
│   └── script.js       # JavaScript fonksiyonları
├── php/
│   └── contact.php     # Form işleme
├── images/             # Görseller (opsiyonel)
└── README.md           # Bu dosya
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renk**: #1e3c72 (Koyu Mavi)
- **İkincil Renk**: #2a5298 (Mavi)
- **Vurgu Renk**: #FFD700 (Altın)
- **Arka Plan**: #f8f9fa (Açık Gri)
- **Metin**: #333 (Koyu Gri)

### Tipografi
- **Başlıklar**: Playfair Display (Serif)
- **Metin**: Inter (Sans-serif)

### Responsive Breakpoint'ler
- **Mobil**: < 768px
- **Tablet**: 768px - 1024px
- **Masaüstü**: > 1024px

## 🔧 Özelleştirme

### İçerik Güncelleme
1. **Avukat Bilgileri**: `index.html` dosyasında lawyer-card bölümlerini güncelleyin
2. **Hizmetler**: Services section'da hizmet kartlarını düzenleyin
3. **İletişim Bilgileri**: Contact section'da telefon, e-posta ve adres bilgilerini güncelleyin

### Stil Değişiklikleri
1. **Renkler**: `css/style.css` dosyasında CSS değişkenlerini güncelleyin
2. **Fontlar**: Google Fonts linkini değiştirin
3. **Animasyonlar**: CSS animation değerlerini ayarlayın

## 📱 Mobil Uyumluluk

Site tamamen responsive tasarıma sahiptir:
- Mobil cihazlarda hamburger menü
- Touch-friendly butonlar
- Optimize edilmiş görüntü boyutları
- Mobil-first yaklaşım

## 📧 İletişim Formu

Form özellikleri:
- **Validasyon**: JavaScript ve PHP tarafında çift validasyon
- **Güvenlik**: XSS ve CSRF koruması
- **E-posta Gönderimi**: Otomatik e-posta gönderimi
- **Loglama**: Form gönderimlerinin kaydı
- **Hizmet Bazlı Yönlendirme**: Hizmet alanına göre ilgili avukata e-posta

## 🔒 Güvenlik

- Input sanitization
- CSRF koruması
- E-posta validasyonu
- Dosya upload koruması
- XSS koruması

## 📈 SEO Optimizasyonu

- Semantik HTML5 yapısı
- Meta etiketleri
- Alt etiketleri
- Hızlı yükleme
- Mobile-friendly tasarım
- Structured data hazır

## 🚀 Performans

- Optimize edilmiş CSS ve JavaScript
- Lazy loading hazır
- Minified dosyalar için hazır yapı
- CDN kullanımı (Font Awesome, Google Fonts)

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Dosya izinlerini kontrol edin
2. PHP mail fonksiyonunun aktif olduğundan emin olun
3. Web sunucu loglarını kontrol edin

## 📄 Lisans

Bu proje özel olarak Arslan Hukuk Bürosu için geliştirilmiştir.

---

**Geliştirici**: Modern Web Teknolojileri ile profesyonel hukuk bürosu web sitesi
**Versiyon**: 2.0
**Son Güncelleme**: 2025 