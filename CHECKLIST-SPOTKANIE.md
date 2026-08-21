# Checklista spotkania

## 1. Decyzje
- nazwa marki
- domena
- język domyślny: EN
- wersja dodatkowa: PL
- podstrony
- główne CTA
- kolorystyka / styl
- blog tak/nie
- kalendarz tak/nie
- formularz tak/nie
- płatności tak/nie

## 2. Spaceship
- konto klientki
- zakup domeny
- e-mail w domenie, jeśli potrzebny
- domeny NIE przepinamy jeszcze, dopóki Netlify nie ma działającego projektu

## 3. GitHub
- konto klientki
- nowe repo prywatne
- bez README / .gitignore / License
- dodać Ciebie jako Collaborator po Twoim username GitHub
- przyjąć zaproszenie na Twoim koncie

## 4. VS Code
- rozpakować starter
- `npm install`
- `npm run dev`
- dostosować menu
- sprawdzić mobile
- `npm run build`

## 5. Push
- `git init`
- `git add .`
- `git commit -m "Initial website skeleton"`
- `git branch -M main`
- `git remote add origin URL_REPO`
- `git push -u origin main`

## 6. Netlify
- konto klientki
- Add new project
- Import an existing project
- GitHub
- wybrać repo
- branch: main
- build: npm run build
- publish: dist
- deploy
- production: public
- previews: mogą zostać private

## 7. Domena
- Netlify: Domain management -> Production domains -> Add domain
- Spaceship: Advanced DNS
- apex `@` -> Netlify load balancer
- `www` -> nazwa-projektu.netlify.app
- zachować rekordy poczty MX/TXT
