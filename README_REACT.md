# Crypto Price Dashboard - React Version

A beautiful, real-time cryptocurrency price tracker built with React.

## Features

✅ Real-time BTC, ETH, SOL prices from CoinGecko API
✅ 24-hour change tracking with visual indicators
✅ Auto-refresh every 30 seconds
✅ Beautiful gradient design
✅ Responsive mobile-friendly layout
✅ No backend required - pure React frontend

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Favicon (Optional)

1. Place your `favicon.ico` in the `public/` folder
2. Hard refresh browser (Ctrl+Shift+R)

That's it! The favicon link is already in `public/index.html`

### 3. Start Development Server

```bash
npm start
```

Open http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

Creates optimized build in `/build` folder

## Project Structure

```
├── public/
│   ├── index.html          (favicon link already here)
│   └── favicon.ico         (put your icon here)
├── src/
│   ├── App.js              (main component)
│   ├── App.css             (styling)
│   ├── index.js            (entry point)
├── package.json
└── README.md
```

## Docker Deployment

```bash
# Build Docker image
docker build -t crypto-dashboard .

# Run container
docker run -p 3000:3000 crypto-dashboard
```

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## API

Uses free CoinGecko API - no authentication needed:
```
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true
```

## Customization

### Add More Cryptocurrencies

Edit `src/App.js` - modify the dashboard grid:

```jsx
<PriceCard
  name="Ripple"
  symbol="XRP"
  price={cryptoData.XRP.price}
  change={cryptoData.XRP.change}
  color="xrp"
/>
```

Then update the fetch URL and state to include XRP.

### Change Update Interval

In `src/App.js`, change:
```jsx
setInterval(fetchPrices, 30000);  // 30 seconds
// to
setInterval(fetchPrices, 60000);  // 60 seconds
```

### Change Colors

Edit `src/App.css` - modify gradient colors:
```css
.price-card.btc::before {
  background: linear-gradient(90deg, #ff6b35, #ff8c42);
}
```

## Troubleshooting

**Favicon not showing?**
- Make sure `favicon.ico` is in `public/` folder
- Hard refresh browser (Ctrl+Shift+R)
- Check `public/index.html` has the link tag

**API not responding?**
- Check browser console (F12) for CORS errors
- CoinGecko API might be rate limited (unlikely, it's generous)
- Try accessing the API URL directly in browser

**Build errors?**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## License

MIT - Free to use and modify
