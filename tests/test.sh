browser=firefox-aurora
cat > one.input << EOF
<h1>Hello World</h1>
<p>Test one. This is the "good" text.</p>
EOF

cat > two.input << EOF
<h1>Goodbye world!</h1>
<p>Test two. This is the "evil" text.</p>
EOF

node ../src/sha1tter-html.js -g one.input -e two.input 

echo "Make sure these are the same:"
sha1sum one.html two.html

echo "Opening both files in browser..."
$browser one.html
$browser two.html

# Clean up
sleep 1
rm one.html two.html one.input two.input
