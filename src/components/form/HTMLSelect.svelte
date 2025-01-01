<script lang="ts">
  import { getRandomId } from "@lib/utils";

  import type { ChangeEventHandler } from "svelte/elements";

  interface Props {
    class?: string;
    label?: string;
    name?: string;
    required?: boolean;
    onchange?: ChangeEventHandler<HTMLSelectElement>;
    disabled?: boolean;
    children?: any;
  }

  const props: Props = $props();

  const id = getRandomId("input");
</script>

<div class={props.class}>
  <label for={id} class="text-gray-700">{props.label}</label>
  <select
    {id}
    name={props.name}
    required={props.required}
    onchange={props.onchange}
    disabled={props.disabled}
    class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring disabled:opacity-75"
  >
    {@render props.children?.()}
  </select>
</div>
