# UniMart — Campus Marketplace 

UniMart is a premium, high-fidelity web application prototype built to showcase a secure, campus-focused marketplace business model. Designed specifically to enhance the security of peer-to-peer trades within university communities, UniMart routes transactions through localized, secure channels to completely eliminate student buyer and seller scams.

---

 Core Business & UI Features

### Secure "Buy" & Escrow Flow
The traditional direct chat option between buyers and sellers has been completely removed to prevent off-platform marketplace scams. 
* Tapping the **"Buy"** button opens an integrated, hyper-local checkout drawer.
* Students can choose directly from regional mobile money operators: **MTN Mobile Money**, **Telecel Cash**, and **AT Money**.

###  Centralized Admin Listing Hub
To maintain high listing quality and ensure campus safety, individual sellers do not post directly to a public database.
* The streamlined **"Sell"** tab routes sellers straight to the official **UniMart Administration Hub**.
* Sellers are provided with modern, responsive contact options including direct phone links, a WhatsApp support channel, and official email configurations.

###  Modern & Responsive Design
* Custom-built components adhering strictly to a premium corporate white and signature ocean-blue visual palette.
* Fluid macro-animations on container entry and dynamic micro-interactions (such as clipboard fallback copying indicators) to deliver a native-app feel during pitch presentations.

---

##  Technical Stack

* **Frontend Core:** React (TypeScript / `.tsx`)
* **Build Optimizer:** Vite
* **Utility Styling:** Tailwind CSS
* **Runtime Engine:** Node.js

---

## Future Scalability Roadmap
While this phase functions as a high-fidelity frontend interactive demonstration, the underlying structural architecture is designed to cleanly decouple for full-stack implementation:
1. **Backend Integration:** Migration to a Node.js/Express framework linked to a database (MongoDB/PostgreSQL) to store persistent session states and dynamic product catalogs.
2. **Fintech API Settlement:** Production configurations plan to interface directly with local payment gateway clearers (such as Paystack or Hubtel) to automate escrow deposits, delivery hold-releases, and mobile money pin prompts.
