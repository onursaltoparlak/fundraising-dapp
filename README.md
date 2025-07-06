# 🎭 Revive the Grand Stage

[theater](https://github.com/user-attachments/assets/07897e11-c17f-4069-9c6f-6a107f540147)


A fundraising DApp built on the Stacks blockchain to support the restoration of a historic community theater — preserving culture, history, and local talent through Web3.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Stacks](https://img.shields.io/badge/built%20with-Stacks-blueviolet)

---

## 🌟 Project Description

**Revive the Grand Stage** is a fully decentralized fundraising platform developed to restore a historic community theater built in 1924. Leveraging the [Hiro Platform Fundraising Template](https://github.com/hirosystems/platform-template-fundraising-dapp), this DApp allows users to donate STX tokens, sponsor individual seats, explore restoration plans, and support upcoming performances through an immersive Web3 experience.

> 🏛️ *"Help us restore our historic community theater — a beacon of culture, memory, and performance. Join us in bringing back the stage lights, one seat at a time."*

---

## 🔗 Live Demo

🚧 Coming soon…

## 📁 Repository

[GitHub Repository](https://github.com/onursaltoparlak/fundraising-dapp)

---

## 🛠 Technologies Used

- 🟣 Stacks Blockchain
- 🧠 Clarity Smart Contracts
- ⚛️ Next.js / React
- 🎨 Tailwind CSS
- 🔐 Hiro Wallet Integration
- 🗺️ React Simple Maps (for seat map)
- 📅 FullCalendar.js
- 🖼️ Swiper.js (carousel & gallery)

---

## ✨ Key Features

- 🎯 **Custom Campaign Setup**  
  90-day fundraising campaign targeting 50,000 STX with historic storytelling and clear milestone breakdowns.
  
- 🪑 **Seat Sponsorship Map**  
  Users can sponsor individual seats and be part of the legacy.

- 📅 **Performance Calendar**  
  View upcoming shows and events at the theater.

- 🌟 **Artist Profiles Carousel**  
  Highlighting the bios and talents of local performers.

- 🖼️ **Photo Gallery Slider**  
  Showcasing the restoration process and historical theater imagery.

- 📢 **Custom Sharing & Feedback Messages**  
  Shareable donation message + personalized success confirmations.

---

## 📜 Smart Contracts

- `funding-contract.clar` – Manages campaign creation, donations, progress tracking, and fund withdrawals.

> 💡 *No modifications were made to smart contract logic – all enhancements are on the frontend layer.*

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js ≥ 18
- npm or pnpm
- Git
- Hiro Wallet (testnet setup)

### 🔧 Installation

```
git clone https://github.com/onursaltoparlak/fundraising-dapp.git
cd fundraising-dapp
pnpm install
pnpm dev
🧪 Usage
Open the app in your browser at http://localhost:3000

Connect your Hiro Wallet (Testnet)

Explore the campaign details

Sponsor a seat or donate any amount of STX

Browse the calendar, artist profiles, and restoration updates

📄 Smart Contract Documentation
funding-contract.clar:

create-campaign – Initializes a new campaign

donate – Accepts STX donations

withdraw – Allows creator to withdraw funds post-campaign

get-campaign-details – Returns details for UI rendering

📦 Deployment
🧪 Testnet
Install Clarinet

Deploy contract locally via Clarinet

Use Hiro Testnet Wallet to interact with the DApp

clarinet test
clarinet deploy
🌐 Mainnet
Switch Hiro Wallet to Mainnet

Deploy contract using stx-cli or Explorer

Update frontend .env with mainnet contract address

🧪 Testing
clarinet test
Use Clarinet to run all unit tests for smart contracts.

🤝 Contributing
We welcome contributions from the community! Please:

Fork this repo

Create a new branch (feature/your-feature)

Submit a PR with a clear explanation

⚖️ License
This project is licensed under the MIT License.
See the LICENSE file for more info.

📬 Contact / Support
For issues or questions:

🐦 Twitter: @onursal_toparlak

✉️ Email: onursal.toparlak.5@gmail.com

🙏 Acknowledgments
Built on Hiro Platform Template

Special thanks to the Stacks ecosystem and community

Icons by FontAwesome

Images by local theater archives
