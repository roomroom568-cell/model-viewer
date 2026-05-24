# تحميل API مفتاح الأمان على Vercel

## 🚀 الخطوات السريعة:

### الخطوة 1️⃣: ادخل إلى Vercel
👉 https://vercel.com

### الخطوة 2️⃣: سجل دخول
- اضغط "Sign Up"
- اختر "Continue with GitHub"
- وافق على التطبيق

### الخطوة 3️⃣: استيراد المشروع
1. اضغط "New Project"
2. اختر "Import Git Repository"
3. ابحث عن `roomroom568-cell/model-viewer`
4. اختره واضغط "Import"

### الخطوة 4️⃣: التكوين
- **Project Name**: `security-key-api` (أي اسم تريد)
- **Framework**: None
- اضغط "Deploy" ✅

---

## ✅ تم!

سيعطيك Vercel رابط مثل:
```
https://security-key-api-xxxxx.vercel.app
```

---

## 📚 استخدام الـ API:

### 1️⃣ إنشاء مفتاح أمان:
```bash
curl https://security-key-api-xxxxx.vercel.app/api/generate-key?length=32
```

### 2️⃣ إنشاء JWT Token:
```bash
curl -X POST https://security-key-api-xxxxx.vercel.app/api/generate-jwt \
  -H "Content-Type: application/json" \
  -d '{
    "payload": {"userId": 123},
    "secret": "my-secret-key"
  }'
```

### 3️⃣ تشفير البيانات:
```bash
curl -X POST https://security-key-api-xxxxx.vercel.app/api/encrypt \
  -H "Content-Type: application/json" \
  -d '{
    "data": {"email": "user@example.com"},
    "key": "encryption-key-here"
  }'
```

---

## 🔗 الـ Endpoints الكاملة:

| الطريقة | المسار | الوصف |
|-------|--------|-------|
| GET | `/api/generate-key` | إنشاء مفتاح أمان |
| GET | `/api/generate-apikey` | إنشاء API Key |
| POST | `/api/hash` | تشفير مفتاح |
| POST | `/api/generate-jwt` | إنشاء JWT |
| POST | `/api/verify-jwt` | التحقق من JWT |
| POST | `/api/encrypt` | تشفير البيانات |
| POST | `/api/decrypt` | فك التشفير |
| GET | `/api/docs` | التوثيق |

---

## 💡 مثال في JavaScript:

```javascript
// إنشاء مفتاح
const response = await fetch('https://security-key-api-xxxxx.vercel.app/api/generate-key?length=32');
const data = await response.json();
console.log(data.key);

// تشفير بيانات
const encrypted = await fetch('https://security-key-api-xxxxx.vercel.app/api/encrypt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: { email: 'user@example.com' },
    key: 'my-encryption-key'
  })
});
const result = await encrypted.json();
console.log(result.encrypted);
```

---

## ❓ المساعدة:

- **Vercel Docs**: https://vercel.com/docs
- **GitHub**: https://github.com/roomroom568-cell/model-viewer
- **API Docs**: `https://your-domain/api/docs`

---

**تم! 🎉 API مفتاح الأمان جاهز للاستخدام!**