<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<body>
    <h1>🚀 API Gestion des Produits et Achats 🛍️</h1>
    <p>Bienvenue dans ce projet d'API 🏗️ qui permet de gérer des utilisateurs 👤, des produits 🛒 et des achats 💳, le tout avec une authentification sécurisée 🔐 !</p>

   <h2>✨ Fonctionnalités</h2>
    <ul>
        <li>🔑 Authentification avec JWT</li>
        <li>🛍️ Gestion des produits (ajout, suppression, mise à jour)</li>
        <li>💰 Gestion des achats avec mise à jour automatique du stock</li>
        <li>❌ Annulation des achats avec restauration du stock</li>
        <li>⚡ Sécurisation des routes avec AuthGuard</li>
    </ul>

  <h2>🛠️ Installation</h2>
  <pre><code>git clone https://github.com/ton-repo.git
cd ton-repo
npm install</code></pre>

  <h2>🚀 Lancer l'application</h2>
    <pre><code>npm run start</code></pre>

  <h2>📡 Endpoints API Principaux</h2>
    <h3>👤 Utilisateurs</h3>
    <ul>
        <li><code>POST /auth/signup</code> - Inscription</li>
        <li><code>POST /auth/signin</code> - Connexion</li>
        <li><code>GET /users/me</code> - Récupérer ses infos</li>
  </ul>
    
  <h3>🛒 Produits</h3>
    <ul>
        <li><code>POST /products</code> - Ajouter un produit</li>
        <li><code>GET /products</code> - Voir tous les produits</li>
        <li><code>DELETE /products/:id</code> - Supprimer un produit</li>
    </ul>
    
  <h3>💳 Achats</h3>
    <ul>
        <li><code>POST /purchase/:productId</code> - Acheter un produit</li>
        <li><code>DELETE /purchase/:id</code> - Annuler un achat</li>
    </ul>

  <h2>🎉 Félicitations !</h2>
    <p>Ton API est prête à être utilisée 🚀🔥 ! Amuse-toi bien à tester et améliorer ton projet 😃 !</p>
</body>
