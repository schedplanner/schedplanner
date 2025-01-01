<script lang="ts">
  import { getRandomId } from "@lib/utils";

  import type { ChangeEventHandler, HTMLInputTypeAttribute } from "svelte/elements";

  interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    label?: string;
    required?: boolean;
    class?: string;
    onchange?: ChangeEventHandler<HTMLInputElement>;
    value?: string;
    autocomplete?: AutoFill;
    disabled?: boolean;
  }

  const props: Props = $props();

  const id = getRandomId("input");
</script>

<div class={props.class}>
  <label for={id} class="text-gray-700">{props.label}</label>
  <input
    {id}
    name={props.name}
    placeholder={props.placeholder}
    type={props.type}
    required={props.required}
    onchange={props.onchange}
    value={props.value}
    autocomplete={props.autocomplete}
    disabled={props.disabled}
    class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring disabled:opacity-75"
  />
</div>
