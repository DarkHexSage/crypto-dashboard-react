import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState({
    BTC: { price: 0, change: 0 },
    ETH: { price: 0, change: 0 },
    SOL: { price: 0, change: 0 },
    lastUpdate: null
  });
  const [isConnected, setIsConnected] = useState(false);

  // Fetch crypto prices from API
  const fetchPrices = async () => {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true';
      const response = await fetch(url);
      const data = await response.json();

      setCryptoData({
        BTC: {
          price: data.bitcoin.usd,
          change: data.bitcoin.usd_24h_change
        },
        ETH: {
          price: data.ethereum.usd,
          change: data.ethereum.usd_24h_change
        },
        SOL: {
          price: data.solana.usd,
          change: data.solana.usd_24h_change
        },
        lastUpdate: new Date().toLocaleString()
      });
      setIsConnected(true);
      console.log('✅ Prices updated');
    } catch (error) {
      console.error('❌ Error fetching prices:', error);
      setIsConnected(false);
    }
  };

  // Fetch prices on component mount
  useEffect(() => {
    fetchPrices();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return Math.abs(value).toFixed(2) + '%';
  };

  const logoMap = {
    BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    SOL: 'https://cryptologos.cc/logos/solana-sol-logo.svg'
  };

  const PriceCard = ({ name, symbol, price, change, color }) => (
    <div className={`price-card ${color}`}>
      <div className="card-header">
        <div className="crypto-name">
          <h2>{name}</h2>
          <span className="crypto-symbol">{symbol}</span>
        </div>
        <div className="icon">
          <img
            src={logoMap[symbol] || `https://cryptologos.cc/logos/${symbol.toLowerCase()}-${symbol.toLowerCase()}-logo.svg`}
            alt={`${name} Logo`}
          />
        </div>
      </div>

      <div className="price">{formatCurrency(price)}</div>

      <div className={`change ${change >= 0 ? 'positive' : 'negative'}`}>
        <span className="change-symbol">{change >= 0 ? '↑' : '↓'}</span>
        <span>{formatPercent(change)}</span>
      </div>

      <div className="divider"></div>

      <div className="stats">
        <div className="stat">
          <div className="stat-label">24h Change</div>
          <div className="stat-value">{formatPercent(change)}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Status</div>
          <div className="stat-value" style={{ color: isConnected ? '#10b981' : '#ef4444' }}>
            {isConnected ? 'Live' : 'Offline'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <h1>MARKET MONITOR</h1>
        <p>Cryptocurrency Price Tracking Dashboard</p>
        <div className="last-update">
          <span className={`refresh-dot ${!isConnected ? 'offline' : ''}`}></span>
          Last Updated: <span>{cryptoData.lastUpdate || 'Connecting...'}</span>
        </div>
      </div>

      <div className="refresh-indicator">
        <span className={`refresh-dot ${!isConnected ? 'offline' : ''}`}></span>
        <span className={`status-text ${isConnected ? 'live' : 'offline'}`}>
          {isConnected ? 'Real-time data Live | Updates every 30 seconds' : 'Not Live | Waiting for connection...'}
        </span>
      </div>

      <div className="dashboard">
        <PriceCard
          name="Bitcoin"
          symbol="BTC"
          price={cryptoData.BTC.price}
          change={cryptoData.BTC.change}
          color="btc"
        />
        <PriceCard
          name="Ethereum"
          symbol="ETH"
          price={cryptoData.ETH.price}
          change={cryptoData.ETH.change}
          color="eth"
        />
        <PriceCard
          name="Solana"
          symbol="SOL"
          price={cryptoData.SOL.price}
          change={cryptoData.SOL.change}
          color="sol"
        />
      </div>

      <div className="footer">
        <p>Professional Cryptocurrency Market Data</p>
        <p>Powered by Real-time Exchange APIs | Enterprise Grade Monitoring</p>
      </div>
    </div>
  );
}

export default App;
