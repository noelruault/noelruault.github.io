#!/usr/bin/env bash
# Every local file the page and the README point at must exist. A rename that leaves a dead download link is invisible otherwise: the page still loads and only the button 404s.
set -euo pipefail

cd "$(dirname "$0")"
status=0

while read -r file ref; do
  [ -e "$ref" ] || { echo "missing: $ref (referenced by $file)"; status=1; }
done < <(
  grep -oE '(href|src)="[^":]+\.(pdf|css|js|png|jpg|svg|ico)"' index.html \
    | sed -E 's/.*"(.*)"/index.html \1/'
  grep -oE 'pdf: "[^"]+\.pdf"' index.html | sed -E 's/.*"(.*)"/index.html \1/'
  grep -oE '\.\./[A-Za-z0-9._-]+\.pdf' README.md | sed -E 's|\.\./(.*)|README.md \1|'
)

[ "$status" -eq 0 ] && echo "all local references resolve"
exit "$status"
