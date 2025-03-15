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

## Description

Voici les méthodes que tu dois implémenter dans tes services pour bien gérer les utilisateurs, les produits et les achats :

1. Service Utilisateur (UsersService)
Créer un utilisateur
Récupérer un utilisateur par ID
Récupérer tous les utilisateurs
Mettre à jour un utilisateur
Supprimer un utilisateur
Récupérer les produits vendus par un utilisateur
Récupérer les produits achetés par un utilisateur
2. Service Produit (ProductsService)
Créer un produit
Récupérer un produit par ID
Récupérer tous les produits
Mettre à jour un produit
Supprimer un produit
Récupérer le vendeur d’un produit
Récupérer les acheteurs d’un produit
3. Service Achat (PurchasesService)
Créer un achat (lier un utilisateur et un produit)
Récupérer un achat par ID
Récupérer tous les achats
Récupérer les produits achetés par un utilisateur
Récupérer les utilisateurs ayant acheté un produit
💡 Bonus (Facultatif mais utile)

Filtrer les produits par prix, catégorie, stock, etc.
Pagination et tri des utilisateurs et des produits
Gestion des transactions pour éviter les erreurs de paiement
Tu as maintenant une structure claire pour tes services ! 🚀
