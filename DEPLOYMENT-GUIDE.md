# 🚀 ALMAAS QURAN ACADEMY - DEPLOYMENT GUIDE

## ❌ 404 Error Fix Karne Ke Liye:

### Problem:
Aapne shayad seedhe `.jsx` file upload ki hai, isliye 404 error aa raha hai.

### Solution:
Ye **proper React project structure** use karo!

---

## 🎯 METHOD 1: NETLIFY (EASIEST - RECOMMENDED)

### Step 1: Prepare Files
1. Download ye sara folder: `almaas-deployment-package`
2. Apne computer pe extract karo

### Step 2: Deploy on Netlify
1. ✅ Go to: https://app.netlify.com
2. ✅ Sign up (free account)
3. ✅ Click "Add new site" → "Deploy manually"
4. ✅ **Drag and drop** ye pura folder
5. ✅ Wait 30 seconds
6. ✅ Done! Live website mil jayegi

### Build Settings (Agar manually set karne ho):
- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Node version**: 18

---

## 🎯 METHOD 2: VERCEL (AUTOMATIC DEPLOYMENT)

### Step 1: Upload to GitHub
1. ✅ Create GitHub account (github.com)
2. ✅ Create new repository
3. ✅ Upload `almaas-deployment-package` folder
4. ✅ Commit and push

### Step 2: Connect Vercel
1. ✅ Go to: https://vercel.com
2. ✅ Sign up with GitHub
3. ✅ Click "Import Project"
4. ✅ Select your repository
5. ✅ Click "Deploy"
6. ✅ Done! Auto-deploy hoga

---

## 🎯 METHOD 3: SINGLE HTML FILE (SIMPLEST)

Agar aap **bina build ke** seedha HTML deploy karna chahte ho:

### Option A: 000webhost / InfinityFree
1. ✅ Create account on 000webhost.com
2. ✅ Get free hosting
3. ✅ Upload `index.html` and `src/App.js`
4. ✅ Access via your domain
5. ✅ Done!

### Option B: GitHub Pages
1. ✅ Create GitHub repository
2. ✅ Upload `index.html` only
3. ✅ Go to Settings → Pages
4. ✅ Enable GitHub Pages
5. ✅ Access via username.github.io/repo-name

---

## 📂 Files Structure:

```
almaas-deployment-package/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component
│   └── index.js            # Entry point
├── package.json            # Dependencies
├── vercel.json            # Vercel config
├── .gitignore             # Git ignore
├── README.md              # Documentation
└── DEPLOYMENT-GUIDE.md    # This file
```

---

## 🔥 QUICK FIX FOR 404:

### If using Netlify:
Add `_redirects` file:
```
/*    /index.html   200
```

### If using Vercel:
Already included in `vercel.json` ✅

### If using Apache/cPanel:
Add `.htaccess`:
```
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## ✅ After Deployment Checklist:

- [ ] Website loads properly
- [ ] Images showing (Unsplash + GitHub logo)
- [ ] Animations working (rotating taglines)
- [ ] Forms working (contact form)
- [ ] Mobile responsive
- [ ] All pages accessible (Home, Courses, etc.)

---

## 🆘 Still Getting 404?

### Common Issues:

1. **Wrong build directory**
   - Solution: Set publish directory to `build`

2. **Missing index.html**
   - Solution: Run `npm run build` first

3. **React Router issue**
   - Solution: Already fixed in vercel.json

4. **Wrong file uploaded**
   - Solution: Upload complete folder, not just .jsx

---

## 📞 Need Help?

Contact: +92 315 2267416

---

**Recommendation**: Use **Netlify** - sabse easy hai! 🎯
Just drag & drop entire folder and it works!
