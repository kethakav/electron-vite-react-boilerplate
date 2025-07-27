# Release Guide

This guide explains how to set up and use the automated release system for your Electron application.

## 🎯 Overview

This boilerplate includes a GitHub Actions workflow that automatically builds and publishes releases when you push a version tag. The workflow:

- Triggers on tags matching `v*` pattern (e.g., `v1.0.0`, `v1.0.1`)
- Builds the application for Windows
- Creates an installer
- Publishes to a separate release repository
- Enables auto-updates for users

## 📋 Prerequisites

### 1. GitHub Personal Access Token

Create a token with the following permissions:
- `repo` (Full control of private repositories)
- `workflow` (Update GitHub Action workflows)

**Steps:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select the required permissions
4. Copy the token (you'll need it for the next step)

### 2. Repository Secret

Add your token as a repository secret:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `RELEASE_PUSH_TOKEN`
4. Value: Your GitHub token from step 1
5. Click "Add secret"

### 3. Release Repository

Create a separate repository for releases (e.g., `your-app-releases`):

1. Create a new repository on GitHub
2. Make it public (required for electron-updater)
3. Note the repository name for configuration

## ⚙️ Configuration

### 1. Update `electron-builder.json`

```json
{
  "publish": {
    "provider": "github",
    "owner": "yourusername",
    "repo": "your-app-releases"
  }
}
```

**Replace:**
- `yourusername` with your GitHub username
- `your-app-releases` with your release repository name

### 2. Update `package.json`

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "Your app description"
}
```

## 🚀 Release Process

### Step 1: Update Version

Choose your version bump type:

```bash
# Patch version (1.0.0 → 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 → 1.1.0) - New features
npm version minor

# Major version (1.0.0 → 2.0.0) - Breaking changes
npm version major
```

This automatically:
- Updates the version in `package.json`
- Creates a git commit with the version change
- Creates a git tag

### Step 2: Push Changes

```bash
# Push the version commit
git push origin main

# Push the tag (this triggers the GitHub Action)
git push origin v1.0.1
```

### Step 3: Monitor the Build

1. Go to your repository → Actions tab
2. You'll see a new workflow run triggered by the tag
3. Click on it to monitor the build progress
4. The workflow will:
   - Install dependencies
   - Build the application
   - Create Windows installer
   - Publish to your release repository

## 📦 Release Artifacts

After a successful build, you'll find in your release repository:

- **Windows Installer**: `Your App Name-Windows-1.0.1-Setup.exe`
- **Block Map**: For efficient updates
- **Latest.yml**: Auto-updater metadata

## 🔄 Auto-Updates

Once published, users with your app will:

1. **Receive update notifications** - When they check for updates
2. **Download automatically** - With progress tracking
3. **Install seamlessly** - When ready

## 🛠️ Troubleshooting

### Common Issues

#### 1. Workflow Not Triggering
- **Check tag format**: Must match `v*` pattern (e.g., `v1.0.0`)
- **Verify tag push**: `git push origin v1.0.1`
- **Check Actions tab**: Should show a new workflow run

#### 2. Build Failures
- **Check Node.js version**: Workflow uses Node.js 20
- **Verify dependencies**: Run `npm install` locally first
- **Check logs**: Detailed error messages in Actions tab

#### 3. Publishing Failures
- **Verify token**: Ensure `RELEASE_PUSH_TOKEN` is set correctly
- **Check permissions**: Token needs `repo` access
- **Verify repository**: Release repo must exist and be public

#### 4. Auto-Updater Issues
- **Check repository**: Release repo must be public
- **Verify configuration**: `electron-builder.json` publish settings
- **Test locally**: Build and test the app locally first

### Debugging Steps

1. **Local Build Test**
   ```bash
   npm run build
   ```

2. **Check Workflow Logs**
   - Go to Actions tab
   - Click on failed workflow
   - Check each step's logs

3. **Verify Configuration**
   ```bash
   # Check if build works locally
   npm run build
   
   # Check electron-builder configuration
   npx electron-builder --help
   ```

## 📈 Advanced Configuration

### Multi-Platform Builds

To build for multiple platforms, modify `.github/workflows/build-publish.yml`:

```yaml
- name: Build and publish with electron-builder
  env:
    GH_TOKEN: ${{ secrets.RELEASE_PUSH_TOKEN }}
  run: |
    npx electron-builder --win --mac --linux --publish always
```

### Custom Build Options

Add build options to `electron-builder.json`:

```json
{
  "win": {
    "target": ["nsis", "portable"]
  },
  "mac": {
    "target": ["dmg", "zip"]
  },
  "linux": {
    "target": ["AppImage", "deb"]
  }
}
```

### Release Notes

Add release notes by creating a GitHub release:

1. Go to your repository → Releases
2. Click "Create a new release"
3. Select the tag you just pushed
4. Add release notes
5. Publish the release

## 🔗 Related Documentation

- [Electron Builder Documentation](https://www.electron.build/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Auto Updater Documentation](https://www.electron.build/auto-update)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 🎉 Success!

Once set up correctly, you'll have a fully automated release pipeline that:

- ✅ Builds your app automatically
- ✅ Creates installers for distribution
- ✅ Publishes to a release repository
- ✅ Enables auto-updates for users
- ✅ Maintains version history

This makes it easy to maintain and update your Electron application! 🚀 