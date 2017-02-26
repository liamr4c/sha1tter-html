# sha1tter-html
With google's anouncement of a sha-1 collision, one can craft same-hashed pdf/jpeg hybids. However, I don't grok pdf enough to make a tool for that, so I made one for a much less strict format: **HTML**. It's not very impressive, but it works and I think its cool.

## Usage
In **zsh** (for `<()` thing), you can run:

	node src/sha1tter-html.js -g <(echo "Good") -e <(echo "Evil") -o good.html -t evil.html

Will make the slightly-malformed files good.html and evil.html that have the same sha1 hashes!

	5d95a97c568fed1ef48ff13edccada351cc01abd  good.html
	5d95a97c568fed1ef48ff13edccada351cc01abd  evil.html

When opened, good.html will display "Good" and evil will display "Evil".

## How it works
Embedded javascript will check the header and set the body to the input html based on a perticular character that is different in the header.

## With complex files (with javascript, etc.)
There are currently many problems with more complex inputs. With the defualt template, javascript in the input is not run. There is, however, a template in `tests/nontrivial` that somewhat works (warpwallet works, keeweb doesn't). With that, there is a problem where the pdf junk that the collision uses is visible.
