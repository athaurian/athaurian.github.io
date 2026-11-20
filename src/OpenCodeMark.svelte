<script>
  import IconShell from './IconShell.svelte'

  let { size = 17 } = $props()
</script>

<IconShell {size} viewBox="0 0 24 24">
  <path d="M22 24H2V0h20zM17 4.8H7v14.4h10z" />
</IconShell>
