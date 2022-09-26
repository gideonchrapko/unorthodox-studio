import { EffectComposer, SSR } from '@react-three/postprocessing'

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
      intensity={4}
      maxRoughness={1}
      jitter={0.3}
      jitterSpread={0.25}
      jitterRough={0.1}
      roughnessFadeOut={1}
      rayFadeOut={0}
      MAX_STEPS={20}
      NUM_BINARY_SEARCH_STEPS={6}
      maxDepthDifference={5}
      maxDepth={1}
      thickness={3}
      ior={1.45}
    />
    </EffectComposer>
}


// temporalResolve={true} 
// STRETCH_MISSED_RAYS={true}
// USE_MRT={true}
// USE_NORMALMAP={true}
// USE_ROUGHNESSMAP={true}
// ENABLE_JITTERING={true}
// ENABLE_BLUR={true}
// DITHERING={false}
// temporalResolveMix={0.9}
// temporalResolveCorrectionMix={0.4}
// maxSamples={0}
// resolutionScale={1}
// blurMix={0.2}
// blurKernelSize={8}
// blurSharpness={0.5}
// rayStep={0.43}
// intensity={2}
// maxRoughness={1}
// jitter={0.3}
// jitterSpread={0.25}
// jitterRough={0.1}
// roughnessFadeOut={1}
// rayFadeOut={0}
// MAX_STEPS={20}
// NUM_BINARY_SEARCH_STEPS={6}
// maxDepthDifference={5}
// maxDepth={1}
// thickness={3}
// ior={1.45}