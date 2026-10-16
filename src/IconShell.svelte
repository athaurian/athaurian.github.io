<script>
  let { size, viewBox, children } = $props()
</script>

<svg
  width={size}
  height={size}
  viewBox={viewBox}
  fill="currentColor"
  aria-hidden="true"
  focusable="false"
>
  {@render children?.()}
</svg>
