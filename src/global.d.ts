declare module 'svelte-tippy' {
  type Tippy = (
    element: HTMLElement | SVGElement,
    props?: TippyProps
  ) => TippyReturn

  export const tippy: Tippy
}
