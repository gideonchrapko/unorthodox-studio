import { EffectComposer, SSR } from '@react-three/postprocessing'
import { useControls } from 'leva'

export function Effects() {
  return <EffectComposer disableNormalPass>
    <SSR 
      temporalResolve={true} 
      STRETCH_MISSED_RAYS={true}
      USE_MRT={true}
      USE_NORMALMAP={true}
      USE_ROUGHNESSMAP={true}
      ENABLE_JITTERING={true}
      ENABLE_BLUR={true}
      DITHERING={false}
      temporalResolveMix={0.9}
      temporalResolveCorrectionMix={0.4}
      maxSamples={0}
      resolutionScale={1}
      blurMix={0.2}
      blurKernelSize={8}
      blurSharpness={0.5}
      rayStep={0.43}
      intensity={1.5}
      maxRoughness={1}
      jitter={0.1}
      jitterSpread={0.25}
      jitterRough={0.1}
      roughnessFadeOut={1}
      rayFadeOut={0}
      MAX_STEPS={20}
      NUM_BINARY_SEARCH_STEPS={6}
      maxDepthDifference={10}
      maxDepth={1}
      // thickness={3}
      thickness={10}
      ior={1.45}
    />
    </EffectComposer>
}
// export function Effects() {
//   const { enabled, ...props } = useControls({
//     enabled: true,
//     temporalResolve: true,
//     STRETCH_MISSED_RAYS: true,
//     USE_MRT: true,
//     USE_NORMALMAP: true,
//     USE_ROUGHNESSMAP: true,
//     ENABLE_JITTERING: true,
//     ENABLE_BLUR: true,
//     DITHERING: false,
//     temporalResolveMix: { value: 0.9, min: 0, max: 1 },
//     temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
//     maxSamples: { value: 0, min: 0, max: 1 },
//     resolutionScale: { value: 1, min: 0, max: 1 },
//     blurMix: { value: 0.2, min: 0, max: 1 },
//     blurKernelSize: { value: 8, min: 0, max: 8 },
//     blurSharpness: { value: 0.5, min: 0, max: 1 },
//     rayStep: { value: 0.43, min: 0, max: 1 },
//     intensity: { value: 2, min: 0, max: 5 },
//     maxRoughness: { value: 1, min: 0, max: 1 },
//     jitter: { value: 0.3, min: 0, max: 5 },
//     jitterSpread: { value: 0.25, min: 0, max: 1 },
//     jitterRough: { value: 0.1, min: 0, max: 1 },
//     roughnessFadeOut: { value: 1, min: 0, max: 1 },
//     rayFadeOut: { value: 0, min: 0, max: 1 },
//     MAX_STEPS: { value: 20, min: 0, max: 20 },
//     NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
//     maxDepthDifference: { value: 5, min: 0, max: 10 },
//     maxDepth: { value: 1, min: 0, max: 1 },
//     thickness: { value: 3, min: 0, max: 10 },
//     ior: { value: 1.45, min: 0, max: 2 }
//   })
//   return <EffectComposer disableNormalPass>{enabled && <SSR {...props} />}</EffectComposer>
// }