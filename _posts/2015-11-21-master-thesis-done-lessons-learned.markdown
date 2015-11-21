---
layout: post
title: Master thesis done - lessons learned
#hn: http://news.ycombinator.com/item?id=5017893
---

I graduated from Aarhus University with a degree in Computer Science this june. Now, I'm finally getting around to publishing my code (as I linked in my thesis). I thought that I would give a quick summary of the process of writing my thesis as well. You can find my thesis and the code I developed for my thesis <a href="./../../BIS/index.html">here</a>. The title of my thesis is Orthogonal Range Searching in 2D with Ball Inheritance and my advisor was <a href="http://cs.au.dk/~larsen/">Kasper Green Larsen</a>.

Before I started writing my thesis, I followed a course called Master Thesis Preparation by <a href="http://cs.au.dk/~danvy/">Olivier Danvy</a>. He has advised for quite a few PhD students so far, so he certainly has a good experience with it. The course consisted of a lot of good tips, tricks and good stories (which is his modus operandi). One of the few things which really stuck with me was to remember an advisor has a limited amount of time for you and it is your responsibility to use it as best as possible. My advisor was awesome enough to read some of what I had written each time we met. And in order to maximize what I got from this, I always compiled a 'diff-version' of my thesis for him. A 'diff-version' was made using `latexdiff`. Each time I handed something in, I saved the latex files for that version. Next time I handed something in, I would then run `latexdiff` on the current version and what I handed in last time. With this it was easy to see what was removed, what was added and what was the same as last time he read it. This worked out pretty good.

My thesis was half theoretical and half practical. So while I had to write some code and analyze some results, the actual written thesis was still the main focus. And we all know that writing code is funnier than writing a thesis. So I forced myself to write the draft for the introduction chapter and another chapter before I started coding. This way I did not get lost in just having fun coding and postpone the writing for later (where 'later' might too late).

To conclude, remember to:
 * Find tools to streamline your process.
 * Use the time of your advisor as best as possible. Invest some time to prepare for your meetings.
 * Focus on the important aspects of your thesis, and don't get lost in what is interesting or fun.
 * Find yourself a book on writing. 

