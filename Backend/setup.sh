#!/bin/bash

echo "🚀 Setting up HuntDesk..."

# Create venv with current Python (make sure you ran: pyenv local 3.11.9)
python -m venv venv

# Activate
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install exact versions that work with Python 3.11
pip install -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "👉 Next steps:"
echo "   1. Copy .env.example to .env"
echo "   2. Fill in your DATABASE_URL and GEMINI_API_KEY"
echo "   3. Run: source venv/bin/activate"
echo "   4. Run: python -m uvicorn app.main:app --reload"
