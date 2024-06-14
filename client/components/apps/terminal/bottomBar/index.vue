<template>
  <div class="flex p-1 space-x-2">
    <div class="flex items-center justify-center text-[#dba4a2]">
      <svg
        class="mx-1 icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3363"
        id="mx_n_1687598905384"
        width="16"
        height="16"
      >
        <path
          d="M170.666667 85.333333l213.333333 0 85.333333 128 384 0q52.992 0 90.496 37.504t37.504 90.496l0 469.333333q0 52.992-37.504 90.496t-90.496 37.504l-682.666667 0q-52.992 0-90.496-37.504t-37.504-90.496l0-597.333333q0-52.992 37.504-90.496t90.496-37.504zM423.68 298.666667l-82.346667-128-170.666667 0q-17.664 0-30.165333 12.501333t-12.501333 30.165333l0 597.333333q0 17.664 12.501333 30.165333t30.165333 12.501333l682.666667 0q17.664 0 30.165333-12.501333t12.501333-30.165333l0-469.333333q0-17.664-12.501333-30.165333t-30.165333-12.501333l-429.653333 0z"
          p-id="3364"
          fill="#dba4a2"
        ></path>
      </svg>
      <span class="">~</span>
      <p>{{ props.dir }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ dir?: string }>();
</script>

<style scoped></style>
