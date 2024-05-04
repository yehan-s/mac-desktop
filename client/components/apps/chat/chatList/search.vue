<template>
  <div class="flex w-full p-2 px-4 rounded-lg h-[44px]">
    <div
      class="flex w-full"
      :class="[themeStore.dark ? 'bg-[#1e1e1e]' : 'bg-[#f5f5f5]']"
    >
      <div class="w-[24px] flex-center">
        <img :src="searchImg" height="15" alt="qqavater" />
      </div>

      <div class="flex-1 flex-center mr-2">
        <input
          class="focus:outline-none"
          :class="[
            themeStore.dark ? 'bg-[#1e1e1e] text-[#e9e9e9]' : 'bg-[#f5f5f5]',
          ]"
          type="text"
          placeholder="Search"
        />
      </div>

      <!-- <div
        class="w-[24px]"
        :class="[themeStore.dark ? 'bg-[#1e1e1e]' : 'bg-white']"
      ></div> -->
      <div class="w-[24px] flex-center" @click="addDialog">
        <img :src="addImg" width="15" height="15" alt="qqavater" />
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    maximizable
    header="Search"
    :pt="persets.dialog"
    :draggable="true"
    :closable="true"
  >
    <!-- <template #header> </template> -->
    <template #default>
      <div class="flex p-2">
        <div
          class="mr-8"
          @click="changeSelect"
          :class="{ 'font-bold': selectText }"
        >
          找好友
        </div>
        <div @click="changeSelect" :class="{ 'font-bold': !selectText }">
          找群
        </div>
      </div>
      <div class="p-2 flex justify-between">
        <input
          class="w-4/5 p-2 rounded-lg"
          type="text"
          placeholder="Search"
          v-model="search"
        />
        <button class="btn" @click="searchHandler">查找</button>
      </div>
      <!-- 查找的好友的卡片 -->
      <div class="card card-side bg-base-100 shadow-xl" v-show="searchResult">
        <figure class="w-2/5">
          <img :src="searchResult?.avatar" alt="avatar" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ searchResult?.nickname }}</h2>
          <p>{{ searchResult?.username }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">添加</button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { User } from "@/types/index";
const searchImg = "chat/chatlist/search.svg";
const addImg = "chat/chatlist/add.svg";
import Dialog from "primevue/dialog";
import persets from "~/config/persets";
import { searchUser } from "@/api/search";
import { useThemeStore } from "@/store/theme";
const themeStore = useThemeStore();

let visible = ref(false);

const addDialog = () => {
  visible.value = true;
};

// true为找好友，false为找群
let selectText = ref(true);

const changeSelect = (e: MouseEvent) => {
  (e.target as HTMLElement).innerText === "找好友"
    ? (selectText.value = true)
    : (selectText.value = false);
  // selectText.value = !selectText.value;
};

let search = ref("");
let searchResult = ref<User>();

const searchHandler = async () => {
  searchResult.value = await searchUser(search.value);
  console.log("result", searchResult.value);
  console.log("result111", typeof searchResult.value);
  if (searchResult.value) {
    console.log("有值");
  } else {
    console.log("无值");
  }
};

// dialog的预设
// const persets = reactive();
</script>

<style scoped></style>
