# Research handoff

## Reference target

- Paper.io 2 for iOS, version 4.41.0 (user-provided target).
- Priority: high-fidelity behavior and presentation; no advertising.
- Startup artwork and extra-mechanics changes are deferred.

## Findings reported by the prior conversation (now partly superseded by direct inspection)

- A prototype called Paper Web Lab v3 reportedly had touch controls, territory capture, opponents, a 60 Hz fixed simulation step, PWA caching, and a gallery for 40 ASTC textures.
- Prior notes explicitly said original game logic had not been transferred, capture and opponents remained approximate, and iPhone behavior and ASTC decoding had not been verified.
- Earlier deliverables were linked as downloadable archives in the former chat. Those archives are not present in this workspace.

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

1. Inspect the Gameplay scene object hierarchy and serialised component fields in the private bundles; use IL2CPP metadata to identify relevant code types and method names.
2. Obtain the gameplay recording when available and measure camera behavior, speed, turn response, trail collision, capture, percentage calculation, and opponent behavior from repeatable observations.
3. Record each observation with a timestamp or reproduction steps and confidence level.
4. Replace the current toy scaffold with modular simulation/rendering based on verified behavior, comparing at matching viewport sizes.
5. Keep original copyrighted files out of the public repository and public hosting.

## Open constraints

An independently implemented web port does not reuse Unity's proprietary runtime or game logic. Exact reproduction cannot be claimed until it has been measured against the original. Target version 4.41.0 is now confirmed from the IPA metadata.
