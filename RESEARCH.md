# Research handoff

## Reference target

- Paper.io 2 for iOS, version 4.41.0 (user-provided target).
- Priority: high-fidelity behavior and presentation; no advertising.
- Startup artwork and extra-mechanics changes are deferred.

## Findings reported by the prior conversation (not independently verified here)

- A prototype called Paper Web Lab v3 reportedly had touch controls, territory capture, opponents, a 60 Hz fixed simulation step, PWA caching, and a gallery for 40 ASTC textures.
- Prior notes explicitly said original game logic had not been transferred, capture and opponents remained approximate, and iPhone behavior and ASTC decoding had not been verified.
- Earlier deliverables were linked as downloadable archives in the former chat. Those archives are not present in this workspace.

## Available materials in this workspace

- The referenced conversation text is available through the Codex thread history.
- `/mnt/data` is not mounted in this environment; the IPA, recording, and previous ZIPs are not available at their referenced paths.
- The GitHub repository was empty at clone time.

## Verification plan

1. Obtain access to the original reference recording/build through the existing private workspace handoff.
2. Measure board dimensions, camera behavior, player speed, turn response, trail collision, closure/capture, percentage calculation, and opponent behavior from repeatable observations.
3. Record each observation with a timestamp or reproduction steps and confidence level.
4. Implement behavior in isolated modules and compare side-by-side with the reference at matching viewport sizes.
5. Keep original copyrighted files out of the public repository and public hosting.

## Open constraints

An independently implemented web port does not reuse Unity's proprietary runtime or game logic. Exact reproduction cannot be claimed until it has been measured against the original. The supplied target version is taken from the user's request and has not been checked against the IPA in this environment.
