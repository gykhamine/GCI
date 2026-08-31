# Gykhamine Services Corporation — Site vitrine

Branche entreprise de **GCI (Gykhamine Concept Investigation)**, intégrée au site principal.
Site statique (HTML / CSS / JS vanilla, aucune dépendance build).

## Structure

```
gsc/
├── index.html      # Accueil (hero + 8 services + mission + CTA)
├── services.html    # Détail des 8 services
├── about.html       # À propos / mission / valeurs / chiffres clés
└── assets/
    ├── css/style.css
    └── js/main.js
```

## Intégration au site GCI

- Le logo et le favicon utilisent le vrai logo du groupe : `../statics/3.png`.
- Le lien « Contact » renvoie vers la vraie page de contact du site : `../ct.html`
  (WhatsApp, e-mail, GitHub, localisation) — il n'y a plus de formulaire ni de
  coordonnées fictives ici.
- Chaque page a un lien « ← Groupe GCI » dans la navbar vers `../1.html`.
- Le site principal (nav de `1.html`, `cours.html`, `ct.html`, `at/cv.html`, `sd/*.html`)
  pointe désormais vers `gsc/index.html` via l'entrée « Gykhamine Services ».
- Accessible aussi depuis le README racine du dépôt (bouton « Services »).

## Couleurs

Variables en haut de `assets/css/style.css` :
```css
--primary: #e23b2b;
--primary-2: #ff7a18;
```

Made in République du Congo — © 2026 Gykhamine Services Corporation, une entité du groupe GCI.
