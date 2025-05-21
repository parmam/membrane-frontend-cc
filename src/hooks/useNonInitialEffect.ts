import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 *
 * @example
 * ```
 *  useNonInitialEffect(()=>{
 *      alert("Dependency changed!");
 * },[dependency]);
 * ```
 */
export const useNonInitialEffect = (effect: EffectCallback, deps: DependencyList = []): void => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: ReturnType<EffectCallback> = undefined;

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    return effectReturns;
  }, [effect, ...deps]);
};

export default useNonInitialEffect;
