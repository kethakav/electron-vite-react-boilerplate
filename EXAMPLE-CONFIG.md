# Example Configuration

This document shows an example of how to configure this boilerplate for a specific application called "TaskMaster".

## 📝 Example: TaskMaster App Configuration

### 1. `package.json`
```json
{
  "name": "taskmaster",
  "version": "1.0.0",
  "description": "A powerful task management application built with Electron",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build && electron-builder",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
  // ... rest of the file remains the same
}
```

### 2. `electron-builder.json`
```json
{
  "$schema": "https://raw.githubusercontent.com/electron-userland/electron-builder/master/packages/app-builder-lib/scheme.json",
  "appId": "com.taskmaster.app",
  "asar": true,
  "productName": "TaskMaster",
  "directories": {
    "output": "release/${version}"
  },
  "files": [
    "dist",
    "dist-electron"
  ],
  "mac": {
    "target": [
      "dmg"
    ],
    "artifactName": "${productName}-Mac-${version}-Installer.${ext}"
  },
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": [
          "x64"
        ]
      }
    ],
    "artifactName": "${productName}-Windows-${version}-Setup.${ext}"
  },
  "nsis": {
    "oneClick": false,
    "perMachine": false,
    "allowToChangeInstallationDirectory": true,
    "deleteAppDataOnUninstall": false
  },
  "publish": {
    "provider": "github",
    "owner": "johndoe",
    "repo": "taskmaster-releases",
    "releaseType": "release"
  }
}
```

### 3. `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/taskmaster-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TaskMaster</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 4. `src/App.tsx` (Main heading only)
```tsx
<h1 className="text-4xl font-bold text-center mb-8 text-primary">TaskMaster</h1>
```

### 5. `electron/main.ts` (Icon configuration)
```ts
win = new BrowserWindow({
  icon: path.join(process.env.VITE_PUBLIC, 'taskmaster-icon.png'),
  title: 'TaskMaster',
  width: 1200,
  height: 800,
  minWidth: 800,
  minHeight: 600,
  webPreferences: {
    preload: path.join(__dirname, 'preload.mjs'),
  },
})
```

## 🎨 Custom Styling Example

### Custom DaisyUI Theme
```css
/* src/App.css */
:root {
  --primary: #2563eb;
  --secondary: #7c3aed;
  --accent: #f59e0b;
  --neutral: #374151;
  --base-100: #ffffff;
  --base-200: #f3f4f6;
  --base-300: #e5e7eb;
  --base-content: #1f2937;
}

/* Custom component styles */
.task-card {
  @apply bg-base-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow;
}

.task-input {
  @apply input input-bordered w-full focus:input-primary;
}
```

## 🔧 Custom Window Configuration

### Advanced Window Settings
```ts
// electron/main.ts
win = new BrowserWindow({
  icon: path.join(process.env.VITE_PUBLIC, 'taskmaster-icon.png'),
  title: 'TaskMaster',
  width: 1400,
  height: 900,
  minWidth: 1000,
  minHeight: 700,
  show: false, // Don't show until ready
  webPreferences: {
    preload: path.join(__dirname, 'preload.mjs'),
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
  },
})

// Show window when ready
win.once('ready-to-show', () => {
  win?.show()
})
```

## 📦 Custom Auto Updater Configuration

### Enhanced Update Logic
```ts
// electron/update.ts
export function update(win: Electron.BrowserWindow) {
  // Check for updates every 4 hours
  setInterval(() => {
    if (app.isPackaged) {
      autoUpdater.checkForUpdates()
    }
  }, 4 * 60 * 60 * 1000)

  // Custom update notifications
  autoUpdater.on('update-available', (arg: UpdateInfo) => {
    win.webContents.send('update-can-available', { 
      update: true, 
      version: app.getVersion(), 
      newVersion: arg?.version,
      releaseNotes: arg?.releaseNotes 
    })
  })
}
```

## 🚀 GitHub Actions Example

### `.github/workflows/release.yml`
```yaml
name: Release TaskMaster

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build and publish
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npm run build
          npx electron-builder --${{ matrix.os }} --publish always
```

## 📋 Complete Setup Checklist for TaskMaster

- [x] Update `package.json` with "taskmaster" name and description
- [x] Configure `electron-builder.json` with app ID "com.taskmaster.app"
- [x] Set product name to "TaskMaster" in electron-builder.json
- [x] Update GitHub owner to "johndoe" and repo to "taskmaster-releases"
- [x] Change title in `index.html` to "TaskMaster"
- [x] Update main heading in `src/App.tsx` to "TaskMaster"
- [x] Replace app icons with TaskMaster branding
- [x] Set up GitHub repository "taskmaster-releases" for releases
- [x] Configure GitHub Actions for automated releases
- [x] Test development build: `npm run dev`
- [x] Test production build: `npm run build`

This example shows how to transform the generic boilerplate into a specific application while maintaining all the functionality and features. 