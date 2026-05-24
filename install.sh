#!/bin/bash

# Security Key API - Installation Script
# أداة تثبيت API مفتاح الأمان

echo "🔐 Security Key API - Installer"
echo "================================="
echo ""

# Check if Node.js is installed
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "👉 Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if Git is installed
echo "✓ Checking Git..."
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "👉 Download from: https://git-scm.com"
    exit 1
fi

echo "✅ Git version: $(git --version)"
echo ""

# Clone repository
echo "📥 Cloning repository..."
if [ ! -d "model-viewer" ]; then
    git clone https://github.com/roomroom568-cell/model-viewer.git
else
    echo "✓ Repository already exists"
fi

cd model-viewer

# Checkout branch
echo "🌿 Switching to security-key-api branch..."
git fetch origin security-key-api
git checkout security-key-api

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation completed!"
echo ""
echo "🚀 To start the API, run:"
echo "   npm start"
echo ""
echo "📚 API will be available at:"
echo "   http://localhost:3000"
echo "   http://localhost:3000/api/docs"
echo ""
