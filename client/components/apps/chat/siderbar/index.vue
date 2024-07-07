<template>
  <!-- 宽度66px -->
  <div
    class="w-[66px] h-full flex flex-col select-none dark:bg-[#262626] bg-[#e4e4e5]"
  >
    <!-- 顶部空余 h-7 -->
    <div class="w-full h-7"></div>
    <div class="my-4 flex-center" @click="userProfileHandle(true)">
      <img :src="userInfo.avatar" width="35px" alt="qqavatar" height="35px" />
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

  <!-- 个人资料 -->
  <Dialog
    v-model:visible="showUserProfile"
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
            class="btn btn-ghost btn-sm px-0"
            @click="userProfileHandle(false)"
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
              <!-- 头像 -->
              <div class="w-24 h-24 rounded relative">
                <!-- 上传 -->
                <FileUpload
                  v-show="isEdit"
                  :pt="persets.fileupload"
                  :auto="true"
                  ref="fileupload"
                  accept="image/*"
                  :url="uploadUrl"
                  @beforeSend="beforeSend($event)"
                  @select="select"
                  @upload="upload"
                  :maxFileSize="1000000"
                  class="w-24 h-24 rounded-full bg-pink-500 absolute top-0 left-0 z-10 opacity-0"
                >
                </FileUpload>
                <!-- 显示 -->
                <img
                  :src="userInfo.avatar"
                  class="w-24 h-24 absolute top-0 left-0"
                />
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
              <div class="h-[50px] overflow-visible">
                <textarea
                  ref="textareaRef"
                  v-model="userInfo.signature"
                  class="w-full mb-4 rounded-md row-span-2 textarea-ghost p-1 resize-none"
                  placeholder="点击这里输入签名"
                  v-if="isEdit"
                ></textarea>
                <div
                  ref="divRef"
                  class="mb-4 p-1 rounded-md w-[260px] line-clamp-2"
                  @click="editSignature"
                  v-if="!isEdit"
                >
                  <div class="text-ellipsis w-[260px] line-clamp-2">
                    {{ userInfo.signature }}
                  </div>
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

  <!-- 音视频 -->
  <Video />
  <!-- <GroupVideo /> -->
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import TopIcon from "./topIcon.vue";
import BottomIcon from "./bottomIcon.vue";
import Video from "../chatWindow/video.vue";
// import GroupVideo from "../chatWindow/groupVideo.vue";
import persets from "~/config/persets";
import { useThemeStore } from "~/store/theme";
import { useUserStore } from "~/store/user";
import { useChatListStore } from "~/store/chatList";
import type { FileUploadBeforeSendEvent } from "primevue/fileupload";
import { imgUpload } from "~/utils/upload";
import type { UpdateUserInfoDate } from "~/api/user/types";
import { updateUserInfo } from "~/api/user";
// import { UpdateUserInfoDate } from "~/api/user/types";
const themeStore = useThemeStore();
const userStore = useUserStore();
const chatListStore = useChatListStore();

let bg = themeStore.dark ? "bg-[#262626] " : "bg-[#e4e4e5]";

// 是否在编辑状态
let isEdit = ref<boolean>(false);

let showUserProfile = ref<boolean>(false);

let userInfo = reactive({
  username: userStore.username,
  nickname: userStore.nickname,
  signature: userStore.signature,
  avatar: userStore.avatar,
});

// 签名div和textarea相互覆盖
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const divRef = ref<HTMLDivElement | null>(null);
const editSignature = () => {
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

const userProfileHandle = (value: boolean) => {
  if (value) {
    showUserProfile.value = value;
  } else {
    showUserProfile.value = false;
    isEdit.value = false;
    userInfo.nickname = userStore.nickname;
    userInfo.signature = userStore.signature;
    userInfo.avatar = userStore.avatar;
  }
};

// FIXME: 删掉
// const openUserProfile = () => {
//   userProfile.value = true;
// };

// const closeUserProfile = () => {
//   userProfile.value = false;
//   isEdit.value = false;
//   userInfo.nickname = userStore.nickname;
//   userInfo.signature = userStore.signature;
// };

// 保存
const savaUserInfo = () => {
  isEdit.value = !isEdit.value;
  // editSignature();
  userStore.updateNickname(userInfo.nickname);
  userStore.updateSignature(userInfo.signature);
  userStore.updateAvatar(userInfo.avatar);
  const updateUserInfoDate: UpdateUserInfoDate = {
    id: userStore.id,
    nickname: userInfo.nickname,
    signature: userInfo.signature,
    avatar: userInfo.avatar,
  };
  // TODO:更新是否让别人强制更新？？
  updateUserInfo(updateUserInfoDate);
  userProfileHandle(false);
};

// 上传文件

interface File {
  size: number;
  type: string;
  name: string;
  objectURL: string;
  fileObject: object;
}
let fileObject: any = null;

const file = reactive<File>({} as File);
const uploadUrl = `${useRuntimeConfig().public.apiBase}/img/get-sts-identity`;

// 给url的默认行为添加请求头
const beforeSend = ($event: FileUploadBeforeSendEvent) => {
  console.log("beforeSend", $event);
  const userAuth = useCookie("token");
  if (userAuth.value) {
    $event.xhr.setRequestHeader("Authorization", `Bearer ${userAuth.value}`);
  }
};
// 在select时候获取file对象
const select = ($event: any) => {
  console.log("选中文件时打印", $event);
  if ($event.files.length === 0) {
    useNuxtApp().$toast.add({
      severity: "warn",
      detail: "只支持上传 jpg、jpeg、png、gif 格式的图片111111111",
      life: 3000,
    });
    return;
  }
  const fileTemp = $event.files[0];
  console.log("文件的大小是", $event.files[0].size);
  file.size = fileTemp.size;
  file.type = fileTemp.type;
  file.name = fileTemp.name;
  file.objectURL = fileTemp.objectURL;

  // 假设 opt.file 是一个 Blob 对象
  const blob = file.objectURL;

  // 将 Blob 对象转换为 File 对象
  file.fileObject = new File([blob], file.name);

  fileObject = $event.files[0];
};
// 有个autoFocus的提醒
const upload = async ($event: any) => {
  console.log("上传文件", $event);
  let stsResult = $event.xhr.response;
  stsResult = JSON.parse(stsResult);
  if (stsResult.code !== 200)
    return useNuxtApp().$toast.add({
      severity: "warn",
      summary: "Warn",
      detail: "STS获取失败",
      life: 3000,
    });
  const path = await imgUpload({
    file,
    sts: stsResult.data.stsToken.Credentials,
    fileObject,
  });

  userInfo.avatar = path;
  return false;

  useNuxtApp().$toast.add({
    severity: "success",
    summary: "Success",
    detail: "文件上传中。。",
    life: 3000,
  });

  // const path = await imgUpload(file);
  // console.log("我要看结果", path);

  // 阻止组件默认行为
  return false;
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
