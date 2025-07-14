# 🌱 Oikos – Liquidity Pool for Education in Latin America

Oikos is a decentralized web3 application built on the Stellar blockchain. Its mission is to enable students across Latin America to access microloans for their education, while allowing investors to contribute to a shared liquidity pool and earn sustainable returns.

💡 "We fund futures through education."

---

## ✨ Features

- 🧑‍🎓 Students can request educational microloans.
- 💰 Investors can contribute to a shared liquidity pool.
- 🔐 Secure wallet login using Stellar wallets like Freighter and Lobstr.
- 📊 Transparent dashboard of active pools, contributions and loan status.
- ⚙️ Smart contract (Soroban) powered logic to manage deposits and loans.

---

## 🛠️ Tech Stack

- Frontend: React + TailwindCSS
- Wallet Integration: Stellar Freighter, StellarKit
- Smart Contracts: Soroban (Rust)
- Network: Stellar Futurenet
- Tools: Cursor (for local development and contract deployment)

---

## 🚀 How It Works

1. Investors connect their Stellar wallet and deposit USDC/XLM into the pool.
2. A Soroban smart contract manages the pool and mints LP tokens to investors.
3. Students request loans directly from the app.
4. Loans are disbursed and repayments tracked on-chain.
5. Investors can redeem rewards over time based on pool returns.

---

## 🔧 Development

Clone the repo:

```bash
git clone https://github.com/ManuelJG1999/Oikos.git
cd Oikos

npm install

if some issues are faced, try:
npm install --legacy-peer-deps

npm run dev

