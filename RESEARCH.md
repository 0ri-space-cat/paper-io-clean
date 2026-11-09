# Research handoff

## Reference target

- Paper.io 2 for iOS, version 4.41.0 (user-provided target).
- Priority: high-fidelity behavior and presentation; no advertising.
- Startup artwork and extra-mechanics changes are deferred.

## Prior chat reports (not equivalent to inspected artifacts)

- A prototype called Paper Web Lab v3 was described as having touch controls, territory capture, opponents, a 60 Hz fixed simulation step, PWA caching, and a gallery for 40 ASTC textures.
- The same chat acknowledged that original game logic had not been transferred, capture and opponents were approximate, and iPhone behavior and ASTC decoding were not verified.
- The archive itself is not available here, so none of those implementation claims have been verified against its files.

## Direct IPA inspection (2026-11-09)

- The IPA at `/Users/ori.space.cat/Downloads/Paper.io 2_4.41.0_ios_decrypted.ipa` is readable as an iOS ZIP archive.
- `Info.plist` confirms bundle ID `io.voodoo.paper2`, marketing version `4.41.0`, build `18485`, and minimum iOS `15.0`.
- The Unity app has `Data/Managed/Metadata/global-metadata.dat` (17,823,516 bytes), `Data/data.unity3d`, and a UnityFramework binary (186,479,328 bytes). This is a native Unity/IL2CPP build; the IPA does not provide portable C# source to plug into a web page.
- Addressables catalog and local iOS bundles are present. Readable bundle names include `scene_gameplay_scenes_all`, `gameplay_assets_all`, `feature_gameplaymechanics_assets_all`, and `scene_main_scenes_all`.
- Unity asset inspection found gameplay scene objects including `GameplayController`, `GameplayMechanicsController`, `GameplayBordersController`, `Player`, `Bots`, `Paint`, `Trail`, `Camera`, `RetractingTrailController`, and `BlinkingTrailController`.
- Gameplay assets include named trail renderers and visual states such as `MainTrail`, `Trail_InZone`, `Trail_InPlayerZone`, `Actor_Trail`, `FX_CutTrail_Glowy_V3`, and several bot movement/zone-closing animations. These establish relevant asset concepts, not exact rules or timings.
- The package includes numerous advertising SDK frameworks and ad-oriented assets. The web port requirement remains ad-free; these SDKs are not dependencies for the port.
- Unity Data bundles and metadata were extracted only to the ignored local path `private-reference/ipa-extract/`. No original binary or extracted game asset is intended for GitHub.

### Limits of this inspection

The version and asset inventory are directly verified. The scan has not yet established exact board dimensions, movement rates, collision tolerances, capture algorithm, bot decision rules, or complete play-screen visuals. Native IL2CPP behavior is compiled into the application binary; metadata names and scene assets are evidence for targeted reverse engineering, not source-level behavioral proof.

## Materials previously reported but still unavailable

- The referenced conversation text is available through the Codex thread history.
- The gameplay recording and previous Web Lab ZIP archives are not available at their former `/mnt/data` paths in this workspace.
- The IPA is available separately at the path above; it has been inspected and its Unity Data extracted locally.
- The GitHub repository was empty at clone time.

## Verification plan

1. Map gameplay-critical scene objects, serialized components, references, animations, and asset dependencies from the private bundles.
2. Identify relevant IL2CPP classes and methods from metadata and native binary where feasible; keep decompiled or derived private data local.
3. Obtain a gameplay recording or run the original on an iPhone. Measure camera behavior, speed, turn response, trail collision, capture, percentages, bot decisions, animation timing, and audio cues.
4. Build an evidence-backed behavior and visual specification. Mark each item confirmed, inferred, or unknown.
5. Only after the specification is sufficient, implement the port and compare it interaction-by-interaction and frame-by-frame on iPhone Safari. Do not present an approximation as a playable build.
6. Keep original copyrighted files out of the public repository and public hosting.

## Open constraints

An independently implemented web port does not reuse Unity's proprietary runtime or game logic. Exact reproduction cannot be claimed until it has been measured against the original. Target version 4.41.0 is now confirmed from the IPA metadata.
