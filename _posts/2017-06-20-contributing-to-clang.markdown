---
layout: post
title: Contributing to Clang
---


A year or so ago I started contributing code to Clang. For those of you who doesn't know what [Clang](http://clang.llvm.org/) is; it is a C and C++ front-end for LLVM. In short, a C++ compiler. I have mostly been doing work on [Clang-Tidy](http://clang.llvm.org/extra/clang-tidy/) which is a Clang-based C++ linter. It can help you find errors, enforce coding guidelines or modernize your project. it is a very helpful tool which can be an effective part of your tool chain. It is also very easy to extend Clang-Tidy with your own checks - and it also easy to have this code accepted into the official Clang project. 

So if you are looking for a fun open source project to contribute to, look no further. In this post I will quickly explain the few steps you need to follow in order to extend Clang-Tidy and have it accepted into the Clang project.

Get the code!
-------------

First you need to get the source code for the project. The process is described on the [getting started page](http://clang.llvm.org/get_started.html). Clang-Tidy is located in the clang-tools-extra repository. So you will have to check out llvm first, then clang and finally clang-tools-extra. 

Time for some code
------------------
Once you have checked the code out, you want to prepare the project by running CMake to get your build environment up and running. Once you have done that and opened the project, I can recommend that you [read this post](http://clang.llvm.org/extra/clang-tidy/#writing-a-clang-tidy-check) about writing a clang-tidy check. Pay attention to the tools being used. In particular, `add_new_check.py`. Using this tool will create the files you need in the right places and add them to the CMake files of the clang-tools-extra project.

Done coding? Get some comments!
------------------------------
When you are done coding - when you have made your own Clang-tidy check and some tests for it - you are going to put the changes in for code review. This is done by using Phabricator. Take a look at the [LLVM page for Phabricator](http://llvm.org/docs/Phabricator.html) to see how you create a 'Differential' for your patch. If it is your first time creating code for the LLVM project there are bound to be some comments. Just take all the help you can get and be patient.

Closing statement
-----------------
I think the Clang project is super fun to work on. The people I have met through my contributions are super friendly and smart. They are willing to help out a lot. If you want to meet some folk, just drop by the IRC channel. It is at #llvm @ irc.oftc.net. If you want to reach out, my nick is mfrstar.
