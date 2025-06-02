---
layout: post
title: "hello world"
date: 2025-06-02 08:00:00 -0800
---

# Welcome, ment!

ment is live on the App Store!

Download now in order to access your own efficient, private, and completely local chatt application!
this has been something a long time in the making, and it feels amazing to finally be able to get it out there!

The initial release ended up needing a bit more love than initially expected before it could be launched, and it feels like a better experience for it.

## Why ment?

### What if you were able to become your own llm-provider?

Open source models have been making great strides catching up to leading closed source models, with one great example being Deep Seek's r1 released earlier this year being able to compete with OpenAI's leading o-series model at the time.
With that being said, being able to experiement with the massive variety of available open source llms is something that's not an easy thing for most anyone to do on their computer.

That is why we made ment. 
AI should be easily available for everyone to use, with data that's under their own control, an experience that is user friendly, and efficient generation.

## What is ment?

ment is a localized AI platform that's entirely written in Swift, and targeted at Apple devices. By leveraging specific ecosystem features such as unified hardware, metal shaders, and MLX, we are going to be able to provide users with some of the most efficient llm generation available on consumer hardware, in a package that takes all of the headache of managing & serving weights away while being simple to use and understand.

Today we are excited to say that our [desktop application is available on the app store](https://apps.apple.com/us/app/ment-private-ai-chat/id6742768917?mt=12)!
Out of the gate the launch-version of the app has a great foundation that we will begin building from:
* **Model Management:** download LLMs from huggingface & manage a library of models
* **Conversational Tools:** features you'd come to expect from chat-interfaces with AI applications
* **Customizable Assistant Profiles:** manage the personality(/personalities) of the assistant(/s) working with you

Personally, we've been enjoying using `Meta-Llama-3.1-8B-Instruct-4bit` as our daily-driver in the app, and falling back on `CodeLlama-13b-Instruct-hf-4bit-MLX` with a custom profile for handling development-focused questions.

But the launch is just the beginning...

## Just Over the Horizon
Over the next few weeks, our first update to the app will roll out, with the first few features continuing the momentum we have gained coming into the app's launch.
One of the long-term goals for this app is to turn it into the best way anyone can serve models directly on their Mac; from there we can really begin to open it up.

While the exact timelines are always subject to change, the outline for what to expect soon in the future includes:
* **Performance Tuning Pass:** MLX-Swift can potentially spit out tokens faster than a winning slot-machine, but the speed we're hitting in the launch version of the app didn't quite hit the mark. This will be a reocurring-task that we periodically take swings at, but we expect to see significant gains made by the time the first update hits.
* **New Model Picker:** The current solution for how to download new models works, but is clunky enough to look intimidating. The envisioned solution here involves a menu with pre-populated options that the user can choose from in order to download & store models.
* **Tool Support:** An extendable framework of tools to be used by the activated LLM, which can not only be easily built-out to tackle every use case one could want performed by their Assistant
* **API:** After the rest of the core of the app's experience is complete, then we can begin rolling out our extremely efficient model-generation through an API so that it can be called and used just like an endpoint from any other big-dog in AI.
* **Voice Mode:** I mean, come on, being able to chat with an AI as though it was on a phone call is just too good of a feature to not.
* **Vision Pro & iOS Support:** Slated to take place after API tooling is in place, this one is exciting enough to need its own post.