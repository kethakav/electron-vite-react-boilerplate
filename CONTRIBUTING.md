# Contributing to Electron Vite React Boilerplate

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** - Your issue might already be reported
2. **Check the documentation** - The answer might be in the README or configuration guides
3. **Provide detailed information** - Include:
   - Operating system and version
   - Node.js version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

We welcome feature suggestions! Please:

1. **Describe the feature** - What problem does it solve?
2. **Provide use cases** - How would users benefit?
3. **Consider implementation** - Is it within the scope of a boilerplate?

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/amazing-feature`
3. **Make your changes** - Follow the coding standards below
4. **Test your changes** - Ensure everything still works
5. **Update documentation** - If needed
6. **Submit a pull request** - With a clear description

## 📋 Development Guidelines

### Code Standards

- **TypeScript** - Use strict typing
- **ESLint** - Follow the existing configuration
- **Prettier** - Maintain consistent formatting
- **Comments** - Add comments for complex logic
- **Documentation** - Update docs for new features

### Testing

Before submitting:

1. **Run the development server** - `npm run dev`
2. **Test the build process** - `npm run build`
3. **Check linting** - `npm run lint`
4. **Test on different platforms** - If possible

### Commit Messages

Use conventional commit format:

```
type(scope): description

feat: add new auto-updater configuration
fix: resolve TypeScript compilation error
docs: update configuration guide
style: format code with prettier
refactor: simplify component structure
test: add unit tests for utils
chore: update dependencies
```

## 🏗️ Project Structure

```
├── electron/                 # Main process files
├── src/                     # React application
├── public/                  # Static assets
├── docs/                    # Documentation assets
├── .github/                 # GitHub Actions
├── README.md               # Main documentation
├── CONFIGURATION.md        # Setup guide
├── EXAMPLE-CONFIG.md       # Usage examples
└── CHANGELOG.md           # Version history
```

## 🚀 Quick Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/electron-vite-react-boilerplate.git
   cd electron-vite-react-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Make your changes**

5. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

## 📝 Documentation

When contributing, please:

- **Update README.md** - If adding new features
- **Update CONFIGURATION.md** - If changing configuration
- **Add examples** - In EXAMPLE-CONFIG.md if relevant
- **Update CHANGELOG.md** - For new releases

## 🎯 Areas for Contribution

### High Priority
- **Bug fixes** - Critical issues
- **Security updates** - Dependency vulnerabilities
- **Documentation improvements** - Clarity and completeness

### Medium Priority
- **Feature enhancements** - New capabilities
- **Performance improvements** - Build speed, bundle size
- **Developer experience** - Better tooling, debugging

### Low Priority
- **Cosmetic changes** - UI improvements
- **Additional examples** - More use cases
- **Alternative configurations** - Different setups

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and ideas
- **Documentation** - Check README and configuration guides first

## 🙏 Recognition

Contributors will be:

- **Listed in CHANGELOG.md** - For significant contributions
- **Mentioned in releases** - For major features
- **Added to contributors** - If desired

Thank you for contributing to the Electron development community! 🚀 