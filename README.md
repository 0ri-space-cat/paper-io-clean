# Paper.io 2 web research port

An ad-free browser implementation project targeting the gameplay and presentation of Paper.io 2 for iOS 4.41.0. This repository contains only original implementation code and research notes. It does not contain the original app, extracted assets, or gameplay recording.

## Current status

The repository was empty when this work began. The previous conversation described a Web Lab v3 prototype, Unity asset extraction, and a gameplay recording, but those archives and attachments are not available in this workspace. No prior implementation or extracted materials have therefore been copied or independently verified.

An original browser implementation can reproduce observed behavior, but cannot run the proprietary Unity app or its original game logic as-is. Fidelity must be established by comparing measured behavior and visuals against an accessible reference build and recording. The first implementation milestones are the board model, movement, trail closure/capture, collision rules, opponent behavior, and responsive rendering. Advertising is out of scope.

## Run

Open `index.html` in a modern browser. For local development, serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Private reference materials

Keep the IPA, extracted copyrighted assets, and gameplay recording outside this public repository. Store them in a private local reference directory and use them only for comparison. Do not enable public hosting for a build that includes extracted original assets.

## Evidence

See [RESEARCH.md](RESEARCH.md) for what is known from the prior conversation and what still needs direct verification.
