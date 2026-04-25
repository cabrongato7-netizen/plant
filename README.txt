# Plant & Tree Disease Scanner

A Progressive Web App (PWA) for detecting crop diseases and identifying tree species features, running entirely offline via TensorFlow.js in the browser.

## Getting Started

1. **Serve the app locally**
   You can use any basic local web server from the project root. For example:
   - Python 3: `python -m http.server 8080`
   - Node.js: `npx http-server`
   Then open `http://localhost:8080` in your browser.

2. **Model Setup (Crucial Step)**
   Because TensorFlow.js model CDNs often expire or change, you must download the primary disease detection model manually for production use.
   
   - Download a TensorFlow.js PlantVillage model (e.g., from Greenathon-Plant-AI or Hugging Face Models).
   - Create a folder named: `public/models/plant-disease/`
   - Place `model.json` and all associated `.bin` weight files inside this directory.
   - The app will attempt to load: `./models/plant-disease/model.json`. By default, the app provides a fallback demo behavior if the model is not found.

3. **Tree Model Demo & On-Device Training**
   The primary tree model attempts to use TensorFlow Hub. However, because compiling an exhaustive global tree model is impractical for the web, we've included an **On-Device Training Feature**.
   - You can enter a custom tree name (e.g., "My Backyard Oak").
   - Click "Learn" while the camera is focused on the leaves.
   - The app uses K-Nearest Neighbors (KNN) via MobileNet embeddings to instantly learn your custom categories without needing any servers!

4. **Testing Offline PWA**
   - **Android (Chrome)**: Visit the site, tap the three-dot menu, and select "Install app". Put your phone in Airplane Mode and open the installed app. All UI, inference, and history logs will continue to work perfectly.
   - **iOS (Safari)**: Visit the site, tap the "Share" icon on the bottom nav, and select "Add to Home Screen". Note: Safari PWA features are heavily reliant on iOS versions 16.4+.
