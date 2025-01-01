<script lang="ts">
  import HTMLSubmit from "@components/form/HTMLSubmit.svelte";
  import { shift } from "@lib/database/schema";
  import { fmtShift } from "@lib/utils";

  interface Props {
    year: number;
    month: number;
    day: string;
    employee_id: string;
    shifts: (typeof shift.$inferSelect)[];
  }

  const props: Props = $props();
</script>

<dialog id="modify_schedule" class="rounded-xl">
  <div class="p-4">
    <div class="flex flex-col gap-8">
      <form method="POST" action="/api/schedule">
        <div class="flex flex-col gap-4">
          <select name="shift_id" class="bg-slate-200 px-4 py-2" required>
            <option value="-1">None</option>
            {#each props.shifts as shift}
              <option value={shift.id}>
                {#if shift.label}
                  {shift.label}
                {:else}
                  {fmtShift(shift.start)} - {fmtShift(shift.end)}
                {/if}
              </option>
            {/each}
          </select>
          <input name="employee_id" value={props.employee_id} hidden />
          <input name="year" value={props.year} hidden />
          <input name="month" value={props.month} hidden />
          <input name="day" value={props.day} hidden />

          <HTMLSubmit label="Add" class="col-span-2" />
        </div>
      </form>
    </div>
  </div>
</dialog>
