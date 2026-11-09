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
- An exploratory v39-aware parse reports 23,447 type definitions, 152,290 methods, and 222 images. It resolves version-39 variable-width type indexes using a candidate type-count threshold of 100,000; that candidate has not been validated against the native registration table. A stock Il2CppDumper release rejected v39, and a v39-aware fork reached a duplicate-index parse error on this build.
- Method and type names expose the game architecture: `PlayerBase`, `PlayerSpeedModel`, `GenericPlayer`, `GenericZone`, `ZoneUtils`, `GameplayController`, `RetractingTrailController`, `GameplayBordersController`, and bot controllers.
- `PlayerSpeedModel` has distinct base linear/angular speeds, linear multipliers, additive speed, and speed caps; angular speed also receives AI/target-distance inputs. `GameplayController` has camera size limits and methods to set speed values and update the local player's base speed.
- `GenericPlayer` declares `FixedUpdate`, `UpdateRigidBodyDeterministically`, `UpdateMovement`, and own/enemy zone entry/exit handling. `GenericZone` declares `CloseLoop`, trail preparation/merge, zone validation and processing, and creation of zone points. `ZoneUtils` includes territory retention, contour normalization, seam-pocket removal, and building enclosed landing zones.
- `PlayerBase` includes a hit-circle radius, trail-collider buffer capacity, trail thickness, and trail-mask length. These are named fields; their actual runtime values and the code paths that consume them are not yet established.
- Bot architecture includes `AbstractBotsController`, `DefaultBotsController`, `AdaptiveBotsController`, and AI controllers using behavior-tree/state-based strategies. This rules out treating a few random-moving bots as representative parity.
- The gameplay scene's serialized camera is orthographic with size `20.0`; the scene also contains separate gameplay and main cameras. Scene trail renderers serialize lifetimes of `1.0` and `1.5` seconds. These are scene defaults only and do not establish the live camera zoom or full trail behavior.
- A scene playground collider serializes a five-point normalized polygon. Because its runtime transforms/scale are not yet resolved, it does not establish the final board outline or dimensions.
- The package includes numerous advertising SDK frameworks and ad-oriented assets. The web port requirement remains ad-free; these SDKs are not dependencies for the port.
- Unity Data bundles and metadata were extracted only to the ignored local path `private-reference/ipa-extract/`. No original binary or extracted game asset is intended for GitHub.

### Limits of this inspection

The IPA version, bundle inventory, and existence of named types/methods are directly verified. The scan has not yet established exact board dimensions, live movement rates, collision tolerances, the exact capture implementation, bot decision rules, skin/animation timing, or complete gameplay visuals. Native IL2CPP behavior is compiled into the application binary; metadata names and scene assets are useful architecture evidence, not source-level behavioral proof. A v39-aware metadata parse needs validation against the binary's registration tables before relying on serialized method/field indexes or generating code.

## Materials previously reported but still unavailable

- The referenced conversation text is available through the Codex thread history.
- The gameplay recording and previous Web Lab ZIP archives are not available at their former `/mnt/data` paths in this workspace.
- The IPA is available separately at the path above; it has been inspected and its Unity Data extracted locally.
- The GitHub repository was empty at clone time.

## Verification plan

1. Validate v39 metadata parsing against IL2CPP registration structures in the arm64 Mach-O and map method names to native functions.
2. Map gameplay-critical scene object hierarchies, serialized components, references, runtime config/Addressables, skins, animation clips, and dependencies from the private bundles.
3. Obtain a gameplay recording or run the original on an iPhone. Measure camera behavior, speed and turn response, trail collision, capture, percentages, bot decisions, animation timing, and audio cues.
4. Build an evidence-backed behavior and visual specification. Mark each item confirmed, inferred, or unknown; include numeric values and repeatable observations wherever possible.
5. Only after the specification is sufficient, implement the port and compare it interaction-by-interaction and frame-by-frame on iPhone Safari. Do not present an approximation as a playable build.
6. Keep original copyrighted files out of the public repository and public hosting.

## Product gate

The earlier toy browser scaffold has been removed from the repository. No playable web build should be added until the project has an evidence-backed parity specification for the requested mechanics, original visual presentation, skins, animations, and movement. A reference recording or live iPhone access remains unavailable in this workspace, so real-time behavior and device quality cannot currently be validated.

## Open constraints

An independently implemented web port does not reuse Unity's proprietary runtime or game logic. Exact reproduction cannot be claimed until it has been measured against the original. Target version 4.41.0 is now confirmed from the IPA metadata.
