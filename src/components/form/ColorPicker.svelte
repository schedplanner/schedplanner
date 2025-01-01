<script lang="ts">
  import { getRandomId } from "@lib/utils";

  import type { ChangeEventHandler } from "svelte/elements";

  interface Props {
    name?: string;
    label?: string;
    required?: boolean;
    class?: string;
    value?: string;
    onchange?: ChangeEventHandler<HTMLInputElement>;
  }

  const props: Props = $props();

  const id = getRandomId("input");
</script>

<div class:list={["h-full flex flex-col", { "justify-end items-end": !props.label }]}>
  <label for={id} class="text-gray-700">
    {props.label}
  </label>
  <input
    {id}
    name={props.name ? props.name : "color"}
    type="color"
    required={props.required}
    value={props.value}
    onchange={props.onchange}
    class:list={["block mt-auto mb-[1px] h-[2.5rem] w-full rounded-md cursor-pointer", props.class]}
  />
</div>
