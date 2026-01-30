---
layout: post
title: "ment is back [remotely]"
date: 2026-01-29 00:00:00 -0800
---

## The gap + where we're at
We owe you an update.

I dropped off the face of the earth after shipping 1.0. Life happened fast (house stuff, a move, a growing family, the whole blur), and ment went quiet.

But we're back and shipping again.

ment is still what it set out to be: local-first AI chat that stays private on your devices. Easy model installs, quick testing, and customizable assistant profiles. Simple app. Serious power.

## The big next release: remote inference
Midway through developing the first update, it became clear we needed a pivot: do one thing well now that unlocks faster releases later. Remote Inference is the first step toward making ment multi-platform.
Remote Inference currently lets you take multiple Macs running ment on the same network and turn one into a host & another into a client.

If you've got a Mac Studio or a beefy desktop that can chew through models, but you prefer to read your tokens from a MacBook Air, this update is for you.

### How it works (host vs client)
- Host Mac: you enable hosting in ment, pick which models are available, and the host does inference. Weights live on the host.
- Client Mac: after pairing with the host for the first time you simply reconnect and chat like normal; ment streams responses back & forth over your LAN.

### Why this matters
- It decouples "what you use" from "what you run": a quiet/light Mac can be your daily driver while the powerful machine does the heavy lifting.
- It's the first step toward making ment feel like an on-device tool that still scales with your own hardware (without turning you into a full-time ops person).

## What's included in this update (ship scope)
This release is about bringing increased stability to ment, and taking the security/privacy of Remote Inference just as seriously as we do any other conversation or message we store.

- Secure device pairing for Remote Inference (so you know exactly what you're connecting to).
- Resilient discovery + host status (so the client can find the host and you can tell when it's actually ready).
- Trustworthy remote model selection (so the client can't be tricked into thinking it's using one model while the host is using another).
- A fair and responsive host (so remote sessions don't turn into runaway work or a janky experience).
- Model integrity checks for downloads (basic "verify what we downloaded" safety: hash/size and provenance guardrails).
- Security baseline hardening (hardened runtime / trimming entitlements where we can, and tightening key handling).
- LAN-only (no cloud required) with end-to-end encryption & authentication after pairing.

Under the hood, remote already has a secure transport and a bounded, versioned protocol. We're building the rest of the product-quality experience around that.

## Readdressing old promises
If you read the June 2025 post, we threw around "over the next few weeks" a bit too freely. Reality check: we shipped 1.0, then life pulled focus, and we didn't earn the right to keep making timeline promises like that.

So here's the reset:

- iOS / Vision / iPad: still on the table, but it's not "just over the horizon" until we pave our way there.
- Performance tuning: still a priority. Remote Inference makes performance even more important, and we'll continually take swings at it as we go.
- Image generation: further down the road than multi-platform ment, but once the remote foundation is stable (and once we can do it in a way that doesn't turn setup into a mess), this is expected to follow on the roadmap.

## Timing + how we'll communicate
The update is coming soon, but isn't imminent ("next few weeks"). I won't be pulling the trigger until I've done my best to break everything and see that:

- Pairing is straightforward and secure.
- Discovery works reliably on a normal home LAN (and host status is obvious when something is wrong).
- Remote sessions are stable, responsive, and don't silently do the wrong thing (model selection, connection, retries).
- We can actually support it without asking you to become tech support for your own computers.

We'll post smaller updates as things land (although I expect the next news update to be an update release announcement).


Thanks for sticking around - reply on <span class="link-coming-soon">bluesky link incoming</span> or email <a href="mailto:contact@ment.tools">contact@ment.tools</a> with anything you want prioritized.
If anyone is interested in potentially testing the next build early via TestFlight, let me know-when I have something worth sharing I'll reach out.
