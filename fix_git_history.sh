#!/bin/bash

# This script removes sensitive files from git history

echo "Removing client_secret.json from git history..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch client_secret.json" \
  --prune-empty --tag-name-filter cat -- --all

echo "Removing .env from git history..."
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

echo "Cleaning up..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Done! Now you can push with: git push origin main --force"
