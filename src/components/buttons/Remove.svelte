<script lang="ts">
  import * as m from "@paraglide/messages";

  interface Props {
    class?: string;
  }

  const props: Props = $props();
</script>

<button class={["bg-red-500 text-white text-sm px-2 py-1 rounded-xl hover:bg-opacity-75 transition-colors", props.class]}>{m.remove()}</button>
