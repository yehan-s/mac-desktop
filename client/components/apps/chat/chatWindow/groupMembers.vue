<!-- 成员列表 -->
<template>
  <div class="flex flex-col flex-1 w-full" >
    <header class="flex p-1">
      <div>群成员</div>
      <div class="flex-1"></div>
      <div class="mr-2">🔍</div>
    </header>
    <div
      class="flex-flex-1 w-full overflow-y-scroll chatlist overflow-x:hidden scroll-smooth px-1"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <p>Jack</p>
      <p>Marry</p>
      <p>Rose</p>
    </div>
  </div>
</template>

<script setup>
const onMouseEnter = (event) => {
  event.currentTarget.classList.remove("chatlist");
  event.currentTarget.classList.add("chatlist_");
};
const onMouseLeave = (event) => {
  event.currentTarget.classList.remove("chatlist_");
  event.currentTarget.classList.add("chatlist");
};
</script>

<style scoped></style>
