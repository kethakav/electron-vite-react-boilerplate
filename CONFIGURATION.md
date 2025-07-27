# Configuration Guide

This document lists all the files you need to modify when using this boilerplate for your project.

## 🔧 Required Changes

### 1. `package.json`
**What to change:**
- `name`: Your app name
- `version`: Starting version (e.g., "1.0.0")
- `description`: Your app description

**Example:**
```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "A fantastic Electron application"
}
```

### 2. `electron-builder.json`
**What to change:**
- `appId`: Your app's unique identifier (e.g., "com.yourcompany.yourapp")
- `productName`: Display name for your app
- `publish.owner`: Your GitHub username
- `publish.repo`: Your GitHub repository name

**Example:**
```json
{
  "appId": "com.mycompany.myapp",
  "productName": "My Awesome App",
  "publish": {
    "provider": "github",
    "owner": "yourusername",
    "repo": "my-app-releases"
  }
}
```

### 3. `index.html`
**What to change:**
- `<title>`: Your app name

**Example:**
```html
<title>My Awesome App</title>
```

### 4. `src/App.tsx`
**What to change:**
- App title in the main heading
- Any branding or company-specific content

**Example:**
```tsx
<h1 className="text-4xl font-bold text-center mb-8 text-primary">My Awesome App</h1>
```

### 5. `electron/main.ts`
**What to change:**
- Window icon path (if you have a custom icon)
- Window title (optional)

**Example:**
```ts
icon: path.join(process.env.VITE_PUBLIC, 'my-app-icon.png'),
```

## 🎨 Optional Changes

### 1. App Icons
Replace the default icons in the `public/` directory:
- `vite.svg` → Your app icon
- `electron-vite.svg` → Alternative icon (optional)

### 2. Window Configuration
Modify `electron/main.ts` to customize the window appearance:

```ts
win = new BrowserWindow({
  width: 1200,           // Window width
  height: 800,           // Window height
  minWidth: 800,         // Minimum width
  minHeight: 600,        // Minimum height
  titleBarStyle: 'default', // Window title bar style
  // ... other options
})
```

### 3. Auto Updater Configuration
Modify `electron/update.ts` to customize update behavior:

```ts
// Check for updates on app start
autoUpdater.checkForUpdatesAndNotify()

// Custom update intervals
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60 * 60 * 1000) // Check every hour
```

### 4. Styling and Theming
- Modify `src/App.css` for custom styles
- Update DaisyUI theme in your CSS files
- Add custom Tailwind CSS classes

## 🚀 Quick Setup Checklist

- [ ] Update `package.json` with your app details
- [ ] Configure `electron-builder.json` with your GitHub details
- [ ] Change the app title in `index.html`
- [ ] Update the main heading in `src/App.tsx`
- [ ] Replace app icons in `public/` directory
- [ ] Set up GitHub repository for releases
- [ ] Configure GitHub Actions (optional)
- [ ] Set up release system (see RELEASE-GUIDE.md)
- [ ] Test the development build: `npm run dev`
- [ ] Test the production build: `npm run build`

## 📝 Notes

- The auto-updater requires a GitHub repository for releases
- Make sure your GitHub repository has the correct permissions for releases
- The `GH_TOKEN` secret needs to be configured in your GitHub repository settings
- All file paths and imports are already configured correctly
- The TypeScript configuration is optimized for this setup

## 🔗 Related Documentation

- [Electron Builder Configuration](https://www.electron.build/configuration/configuration)
- [DaisyUI Theming](https://daisyui.com/docs/themes/)
- [Vite Configuration](https://vitejs.dev/config/)
- [GitHub Actions for Electron](https://www.electron.build/auto-update) 