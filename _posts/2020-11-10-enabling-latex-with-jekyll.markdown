---
layout: post
title: Enabling LaTeX rendering with jekyll
---

I was looking for a good way render some LaTeX math while writing blog posts with jekyll. I couldn't find a jekyll plugin which would allow me to inline LaTeX equation and have them rendered client-side. I ended up finding [mathjax.org](https://www.mathjax.org/). It is an easy solution - it is as simple as adding these two lines to my layout document:

    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

After adding these two lines it gets as simple as just writing your LaTeX equation within `$$...$$`. It's pretty straight forward plug'n'play compared to some other solutions. And it also works just as well for other blog solutions and static site generators. It was just jekyll I was looking for a solution for.

As an example, here is a rendered equation from my thesis: `$$\sum\limits_{i=1}^{\lg_B \lg n} \frac{\lg n}{B^i} \cdot \mathcal{O}(B^i) = \mathcal{O}(\lg n \cdot \lg_B \lg n)$$` 


$$\sum\limits_{i=1}^{\lg_B \lg n} \frac{\lg n}{B^i} \cdot \mathcal{O}(B^i) = \mathcal{O}(\lg n \cdot \lg_B \lg n)$$

