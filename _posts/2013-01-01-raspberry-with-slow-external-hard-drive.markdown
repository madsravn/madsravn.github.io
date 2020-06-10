---
layout: post
title: Raspberry Pi with slow external hard drive
hn: https://news.ycombinator.com/item?id=5017893
---

On a day like January 1st I mostly like relaxing in front of the TV with some movies or series and I had been looking forward to it. I got a powered USB hub for Christmas since our external hard drive, a Verbatim N446, is USB powered and the Raspberry doesn't provide enough power for it. So we plugged in our new USB hub and plugged the drive to that. Discovery and mounting went fine, but when we started watching something it would take 3 seconds before it would start to buffer - it actually used more time buffered than playing.

A `hdparm -tT /dev/sda` showed some disturbing news:
    /dev/sda:
    Timing cached reads:   160 MB in  2.02 seconds =  79.35 MB/sec
    Timing buffered disk reads:  14 MB in 33.51 seconds = 427.79 kB/sec

No way we could watch a movie with 428 kB/sec. A little internet research showed that our Raspberry Pi atleast treats it's USB ports as a USB hub already and when connecting a new one only the four first ports are given decent speed. Checking `lsusb` I saw it might make sense since the Raspberry had two entries for "USB-2.0 4-Port HUB"

    Bus 001 Device 005: ID 05e3:0608 Genesys Logic, Inc. USB-2.0 4-Port HUB
    Bus 001 Device 006: ID 05e3:0608 Genesys Logic, Inc. USB-2.0 4-Port HUB
    Bus 001 Device 008: ID 18a5:0237 Verbatim, Ltd Portable Harddrive (500 GB)

I found this weird and with a disbelief I tried swapping my external drive to the first port on the hub. `hdparm -tT /dev/sdb` revealed it was working much better now: 
    /dev/sdb:
    Timing cached reads:   154 MB in  2.00 seconds =  77.01 MB/sec
    Timing buffered disk reads:  40 MB in  3.10 seconds =  12.89 MB/sec
an increase in speed with a factor 30 was pretty convincing. I tried comparing this speed to the speed on the Raspberrys SD card

    Timing cached reads:   162 MB in  2.02 seconds =  80.26 MB/sec
    Timing buffered disk reads:  52 MB in  3.03 seconds =  17.17 MB/sec

which shows that now the external drives speed was now close enough to decent speed. Happily we could now lie lifeless on the couch for some hours watching some mindless stuff :)

I hope this can help others to try this simple solution before going the tech-route with installing and configuring a bunch of needless stuff.

Equipment used:

*   Raspberry Pi Model B rev. 2
*   Verbatim N446
*   Trust 7 Port USB2 Powered Hub (HU-5870V)
