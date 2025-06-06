---
layout: post
title: "hello world"
date: 2025-06-02 08:00:00 -0800
---

## Welcome, ment!

[ment is live on the App Store!](https://apps.apple.com/us/app/ment-private-ai-chat/id6742768917?mt=12)

Download now in order to access your own free efficient, private, and completely local chat application!  
This has been something a long time in the making, and it feels amazing to finally be able to get it out there!

The initial release ended up needing a bit more love than expected before it launched, and it feels like a better experience for it.

## Why ment?

### Become your own LLM provider!

Open-source models have been making great strides catching up to leading closed-source models; one great example being [Deep Seek's r1](https://huggingface.co/mlx-community/DeepSeek-R1-0528-4bit) released earlier this year, which is able to compete with OpenAI's leading o-series model at the time.  
With that being said, being able to experiment with the massive variety of available open-source LLMs is not an easy thing for most people to do on their own computer.

<br />
That is why we made ment. 

<br />
AI should be easily available for everyone to use, with data that's under their own control, an experience that is user-friendly, and efficient generation.

## What is ment?

ment is a localized AI platform that's entirely written in Swift and targeted at Apple devices. By leveraging specific ecosystem features such as unified hardware, Metal shaders, and MLX, we are able to provide users with some of the most efficient LLM generation available on consumer hardware, in a package that takes all of the headache out of managing & serving weights while remaining simple to use and understand.  
<br />
Today we are excited to say that our [desktop application is available on the App Store](https://apps.apple.com/us/app/ment-private-ai-chat/id6742768917?mt=12)!

<br />
The launch version of the app has a great foundation that we will begin building from:
* **Model Management:** download LLMs from Hugging Face & manage a library of models
* **Conversational Tools:** features you've come to expect from AI application chat interfaces, including the ability to branch conversations to explore and compare different responses!
* **Customizable Assistant Profiles:** manage the personality(/personalities) of the assistant(/s) working with you

(Personally, we've been enjoying using `Meta-Llama-3.1-8B-Instruct-4bit` as our daily driver in the app, and falling back on `CodeLlama-13b-Instruct-hf-4bit-MLX` with a custom profile for handling development-focused questions.)

<br />
But the launch is just the beginning...

## Just Over the Horizon
Over the next few weeks, our first update to the app will be rolling out, with the first few features continuing the momentum we have gained coming into the app's launch.

One of the long-term goals for this app is to turn it into the best approach anyone can use to serve models from a Mac. From there, we can really begin to open it up.

<br />
While the exact release roadmap is always subject to change, the outline for what order to expect new features includes:

<br />
#### Next few weeks:
* **Performance Tuning Pass:** MLX-Swift has the potential to spit out tokens faster than a winning slot machine, but the speed we're hitting in the launch version of the app didn't quite hit the mark. This task will be a recurring one that we periodically take swings at, but we expect to see significant gains made by this first update.
* **New Model Picker:** The current solution for how to download new models works but is clunky enough to look intimidating. The envisioned solution here involves a menu with pre-populated options freshly fetched from Hugging Face which the user can choose from to download & store models.

<br />
#### Down the Road
* **Tool Support:** An extendable tool framework to be used by the active LLM, designed to be easily built out to eventually represent any task a user could want their assistant to perform
* **API:** After the rest of the app's core experience is complete, we can begin opening up our extremely efficient model generation through an API so that it can be called and used just like an endpoint from any other AI big dog.
* **Voice Mode:** Being able to chat with an AI as though it was on a phone call is just too good of a feature not to implement.
* **Vision Pro & iOS Support:** Slated to take place after API tooling is in place, this one is exciting enough to deserve its own post.

<br />
## That's all Folks!
In conclusion, ment is free, the base product is going to stay free, and I hope anyone reading this with an M-series Mac gives it a shot!  
If it's great, but you still have product suggestions, <a href="https://x.com/ment_tools" target="blank">reach out</a>! The goal is to make the most efficient compute possible in the most user-friendly package there is.