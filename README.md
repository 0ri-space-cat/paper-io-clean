# Paper.io 2 web port research

This repository is currently research-only. There is no playable prototype: a rough approximation would not meet the project's requirement for a faithful Paper.io 2 iOS 4.41.0 experience.

## Acceptance target

Do not present a playable web build until the core loop, movement and turning, territory rules, collisions, opponents, original visual assets, skins, animations, audio, and mobile interaction have been mapped against the reference. The finished web app must run reliably in iPhone Safari and contain no advertising.

The original iOS app is a Unity IL2CPP application. This project is an independent web implementation, not the original executable running inside a browser. Reverse engineering and side-by-side validation are required; exact parity must not be claimed without evidence.

## Research status

The IPA's version and bundled Unity scenes/assets have been inspected. Findings, confidence, and unresolved questions are tracked in [RESEARCH.md](RESEARCH.md). The IPA and extracted files stay outside GitHub in an ignored local `private-reference/` directory. Do not add the original app or extracted copyrighted assets to this public repository.

## Reference status

The IPA and a gameplay recording are now available and inspected. The recording supports visual comparison and broad gameplay sequencing, but not exact movement or input-response measurements because no touch indicator is visible. Controlled input runs or live access to the original on an iPhone are still needed to measure exact movement and device-specific behavior.
