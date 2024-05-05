<template>
  <div class="w-[66px] h-full flex flex-col select-none">
    <!-- 顶部空余 h-7 -->
    <div class="w-full h-7"></div>
    <div class="my-4 flex-center" @click="openUserProfile">
      <img :src="props.avatar" width="35px" alt="qqavatar" height="35px" />
    </div>
    <div class="flex flex-col h-[160px] p-3 space-y-2">
      <TopIcon name="message" :onClick="chatListStore.setListType" />
      <TopIcon name="friend" :onClick="chatListStore.setListType" />
      <!-- <TopIcon name="friend" :onclick="chatListStore.setListType" /> -->
      <TopIcon name="qqspace" />
    </div>
    <div class="flex-1 w-full"></div>
    <div class="flex flex-col h-[160px] p-3 space-y-2 mb-3">
      <BottomIcon name="email" />
      <BottomIcon name="collect" />
      <BottomIcon name="menu" />
    </div>
  </div>
  <Dialog
    v-model:visible="userProfile"
    modal
    :pt="persets.dialog"
    :draggable="true"
    :closable="false"
  >
    <template #header>
      <div class="w-full flex justify-between items-center">
        <div class="font-bold">个人资料</div>
        <!-- 关闭按钮 -->
        <div>
          <button
            class="btn btn-ghost btn-sm"
            @click="closeUserProfile"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </template>
    <template #default>
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="card-actions justify-end"></div>
          <!-- 头像 昵称 签名 -->
          <div class="flex border-b-2 pb-2 mb-2">
            <div class="avatar mr-6">
              <div class="w-24 h-24 rounded">
                <img :src="userInfo.avatar" />
              </div>
            </div>
            <div>
              <!-- <div class="card-title mb-4">夜寒</div> -->
              <!-- 换成input -->
              <input
                type="text"
                class="card-title mb-2 h-[40px] rounded-md p-1"
                v-model="userInfo.nickname"
                :disabled="!isEdit"
              />

              <!-- 签名div和textarea相互覆盖 -->
              <!-- 单独textarea无法实现多行省略 -->
              <div class="h-[50px]">
                <textarea
                  ref="textareaRef"
                  v-model="userInfo.signature"
                  class="hidden w-full mb-4 rounded-md row-span-2 textarea-ghost p-1 resize-none"
                ></textarea>
                <div
                  ref="divRef"
                  class="line-clamp-2 mb-4 p-1 rounded-md"
                  @click="updateSignature"
                >
                  {{ userInfo.signature }}
                </div>
              </div>
            </div>
          </div>
          <!-- 资料 -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <span>账号</span>
              <input
                type="text"
                placeholder="-"
                class="input input-ghost w-5/6 border-0 input-sm"
                disabled
                v-model="userInfo.username"
              />
            </div>
            <div class="flex justify-between items-center mb-1">
              <span>创建时间</span>
              <input
                type="text"
                placeholder="-"
                class="input input-ghost w-5/6 border-0 input-sm"
                disabled
              />
            </div>
          </div>
          <div class="flex items-center">
            <button class="btn btn-sm" @click="isEdit = !isEdit" v-if="!isEdit">
              编辑
            </button>
            <button class="btn btn-sm" @click="savaUserInfo" v-else>
              保存
            </button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import TopIcon from "./topIcon.vue";
import BottomIcon from "./bottomIcon.vue";
import persets from "~/config/persets";
import { useThemeStore } from "~/store/theme";
import { useUserStore } from "~/store/user";
import { useChatListStore } from "~/store/chatList";
const themeStore = useThemeStore();
const userStore = useUserStore();
const chatListStore = useChatListStore();

const demo = () => {
  console.log("demo");
};

let props = defineProps<{
  avatar: string;
}>();
let bg = themeStore.dark ? "bg-[#262626] " : "bg-[#e4e4e5]";

// 是否在编辑状态
let isEdit = ref<boolean>(false);

let userProfile = ref<boolean>(false);
let userInfo = reactive({
  username: "yehan",
  nickname: "夜寒",
  signature: "随性的，我们唱起歌随性的，我们唱起歌随性的",
  avatar:
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
});

// 签名div和textarea相互覆盖
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const divRef = ref<HTMLDivElement | null>(null);
const updateSignature = () => {
  if (textareaRef.value || divRef.value) {
    if (!isEdit.value) {
      textareaRef.value?.classList.add("hidden");
      divRef.value?.classList.remove("hidden");
    } else {
      textareaRef.value?.classList.remove("hidden");
      divRef.value?.classList.add("hidden");
      nextTick(() => {
        textareaRef.value?.focus();
      });
    }
  }
};

const openUserProfile = () => {
  userProfile.value = true;
};

const closeUserProfile = () => {
  userProfile.value = false;
  isEdit.value = false;
  userInfo.nickname = userStore.nickname;
  userInfo.signature = userStore.signature;
};

const savaUserInfo = () => {
  isEdit.value = !isEdit.value;
  updateSignature();
  userStore.updateNickname(userInfo.nickname);
  userStore.updateSignature(userInfo.signature);
};
</script>

<style scoped>
.line-clamp-2 {
  /* display: -webkit-box; */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
