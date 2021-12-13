---
layout: post
title: Using liquid-rust with serde
---

I have been running Jekyll for 9 years now. I wrote about it [in this post](first-post.html). At this point, my needs and patience have outgrown Jekyll. There is a few features that I miss and there is some annoyance that comes with running Ruby, I feel. 

I have decided to write my own static site generator. I need something that I control - something that bends to my will. But because I am lazy, I will keep the content structure of Jekyll. This way I can just run my new static site generator on the exact same content that I already have. It means that I have to use markdown for my content and it means that I have to use liquid as my templating system. And I have no problem with this.

It was easy to find a markdown compiler for the project. I chose pulldown-cmark. It seems easy to use and passes all the compilations of my current markdown files. After looking for a good liquid crate, I fell upon [liquid-rust](https://github.com/cobalt-org/liquid-rust). It seems to be written for cobalt, which is a static site generator written in Rust. And it was damn easy to get started on. Until I hit my first speed bump. How do I put non-trivial objects into the templating engine? 

I have this piece liquid code in my html for my posts:

    <section class="content">
      <ul class="listing">
        {% for post in site.posts %}
        <li>
           <a href="{{ post.url }}">{{ post.title }}</a> <span class="left">{{ post.date | date: "%B %e, %Y" }}</span>
           <hr>
        </li>
        {% endfor %}
      </ul>
    </section>

Problem was just that all the examples I could find showed how to inject a very simple structure into the templating engine. The example is showed below and is showing to how put in a primitive type.

    let template = liquid::ParserBuilder::with_stdlib()
      .build().unwrap()
      .parse("Liquid! {{num | minus: 2}}").unwrap();

    let mut globals = liquid::object!({
      "num": 4f64
    });

    let output = template.render(&globals).unwrap();
    assert_eq!(output, "Liquid! 2".to_string());

My goal is just to inject a complex type which holds a list of `post` and where each post object holds `url`, `title` and `date`. I scoured the internet for a way of doing this and came up empty. I found the author of the crate was on the official Rust Discord and I introduced myself and my problem. And he showed me the simple solution. Use serde. 

    use serde::{Serialize, Deserialize};

    #[derive(Serialize, Deserialize, Debug)]
    struct Post {
      title: String,
      url: String,
      date: String,
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct Posts {
      posts: Vec<Post>,
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct Globals {
      site: Posts,
    }

And now with complex data structure described in serde, it was as easy as creating the objects and using them as input to the templating engine:


    let site = Globals {
        site: p3
    };

    let index = fs::read_to_string("_build/index.html").expect("Should be able to read the index file");
    let template = liquid::ParserBuilder::with_stdlib()
           .build().unwrap()
           .parse(&index).unwrap();
    let globals = liquid::to_object(&site).expect("Should be able to parse");
        
    let output = template.render(&globals).unwrap();
    println!("index: {}", output);

It took me some time to find the solution - or find the person who could give me the solution. But now that it is here, it seems so easy. And with with that, I can finalize my static site generator. 
