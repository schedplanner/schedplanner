<script lang="ts">
  interface Props {
    class?: string;
    disabled?: boolean;
    label?: string;
  }

  const props: Props = $props();
</script>

<div class={["flex justify-center sm:justify-end", props.class]}>
  <button
    class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md enabled:hover:bg-gray-600 focus:outline-none enabled:focus:bg-gray-600 disabled:opacity-75"
    type="submit"
    disabled={props.disabled}
  >
    {props.label}
  </button>
</div>
