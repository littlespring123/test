<template>
  总共{{ listDic.length }}条,成功{{ addSuccess }}条
  <button @click="add(0)" class="add">添加</button>
  <div class="search">
    <input oninput="searchWord(event)" placeholder="请输入检索词" type="text" />
  </div>

  <div v-for="item in showList" class="list" :key="item.id">
    <div class="item">
      <div class="left">
        <span>简体中文:{{ item['zhCN'] }}</span>
        <span>英语: {{ item['en'] }}</span>
        <span>日语: {{ item['ja'] }}</span>
      </div>
      <div class="right">+</div>

      <div class="tags">
        <div v-for="tag in item.tags" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getListApi, addApi } from '@/api/other';
let listDic = ref([]);
let showList = [];
const getDic = () => {
  // 创建一个 XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();

  // 配置请求
  xhr.open('GET', 'https://dataset.genshin-dictionary.com/words.json ', true); // 第三个参数表示是否异步

  // 设置请求头（可选）
  // xhr.setRequestHeader('Content-Type', 'application/json');

  // 监听请求状态变化
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // 请求成功，处理响应数据
        listDic.value = JSON.parse(xhr.responseText);
      } else {
        // 请求失败，处理错误信息
        alert('Error: ' + xhr.status);
        console.error('Error: ' + xhr.status);
      }
    }
  };

  // 发送请求
  xhr.send();
};

const searchWord = (e) => {
  let word = event.target.value;
  showList.value = [];
  if (!word) return;
  let reWord = new RegExp(word, 'g');
  listDic.value.forEach((item) => {
    if (item['en']?.match(reWord) || item['zhCN']?.match(reWord) || item['id']?.match(reWord))
      showList.value.push(item);
  });
};

getDic();

const addSuccess = ref(0);
let stopCount = ref(0);
const add = async (i) => {
  if (i >= listDic.length) return;
  stopCount.value++;
  let curItem = listDic.value[i];
  let curTag = null;
  curItem?.tags &&
    curItem.tags.length > 0 &&
    curItem.tags.forEach((item) => {
      curTag += item + ',';
    });
  console.log('curItem', curItem, { ...curItem });
  const res = await addApi({ ...curItem, tags: curTag });
  try {
    if (res) {
      addSuccess.value = addSuccess.value + 1;
      if (stopCount.value > 200) {
        stopCount.value = 0;
        setTimeout(() => {
          add(i + 1);
        }, 1000);
      } else {
        add(i + 1);
      }
    } else {
      add(i + 1);
    }
  } catch (error) {
    add(i + 1);
  }
};
</script>
<style scoped lang="scss">
.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* flex-direction: column; */
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;

  .left {
    flex-direction: column;

    display: flex;
    flex-wrap: wrap;
  }

  .right {
    cursor: pointer;
    height: fit-content;
    margin: auto 0;
    width: 10%;
    text-align: center;
    background-color: lightgreen;
    transition: scale 0.6s ease;
  }
  .right:hover {
    scale: 1.1;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;

    .tag {
      padding: 2px 5px;
      border: 1px solid green;
      border-radius: 5px;
      color: green;
      font-size: 12px;
    }
  }
}

.item:hover {
  transition: box-shadow 0.5s;
  box-shadow: 5px 5px 5px 4px rgba(252, 169, 169, 0.6);
}
</style>
