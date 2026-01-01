<template>
  <div class="translate h-full">
    <div class="top mt-10 text-center">
      <h1>chrome翻译</h1>
      <h4 class="text-gray-500">方便 / 易用 / 快捷</h4>
    </div>

    <div class="translate-box container mx-auto mt-5">
      <div class="select-box">
        <el-select class="w-30!" v-model="from" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>

        <el-select class="ml-3 w-30!" v-model="to" placeholder="Select">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>

        <el-button class="ml-3" type="primary" @click="translate" :loading="loading">
          翻译
        </el-button>
      </div>

      <div class="translate-content mt-3">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              :disabled="loading"
              v-model="textarea"
              :rows="15"
              type="textarea"
              placeholder="输入文本内容"
            />
          </el-col>

          <el-col :span="12">
            <div class="results">
              <el-input
                v-model="textarea2"
                :rows="15"
                type="textarea"
                placeholder="译文"
                :readonly="true"
                :disabled="loading"
              />
              <el-icon @click="copy"><CopyDocument /></el-icon>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="提示" width="750">
      <div>
        <div>如果当前浏览器不支持翻译，请通过以下步骤开启翻译功能</div>
        <h2 class="mt-5 text-base">Chrome</h2>
        <ul>
          <li>
            <a href="https://www.google.cn/chrome/" target="_blank">1、下载最新Chrome浏览器</a>
          </li>

          <li>2、访问 chrome://on-device-translation-internals/ 以手动安装和卸载语言包。</li>
          <li>3、重启浏览器。</li>
        </ul>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleClose">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { CopyDocument } from '@element-plus/icons-vue';
  import {
    ElButton,
    ElCol,
    ElDialog,
    ElIcon,
    ElInput,
    ElMessage,
    ElOption,
    ElRow,
    ElSelect
  } from 'element-plus';
  import { ref } from 'vue';
  const from = ref<language | 'auto'>('auto');
  const to = ref<language>('zh');

  // chrome://on-device-translation-internals/
  type language =
    | 'en'
    | 'es'
    | 'ja'
    | 'ar'
    | 'bn'
    | 'de'
    | 'fr'
    | 'hi'
    | 'it'
    | 'ko'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'th'
    | 'tr'
    | 'vi'
    | 'zh'
    | 'zh-Hant'
    | 'bg'
    | 'cs'
    | 'da'
    | 'el'
    | 'fi'
    | 'hr'
    | 'hu'
    | 'id'
    | 'iw'
    | 'lt'
    | 'no'
    | 'ro'
    | 'sk'
    | 'sl'
    | 'sv'
    | 'uk';

  const options: Array<{
    label: string;
    value: language | 'auto';
    disabled?: boolean;
  }> = [
    {
      label: '自动检测',
      value: 'auto'
    },
    {
      label: '中文',
      value: 'zh'
    },
    {
      label: '繁体中文',
      value: 'zh-Hant'
    },
    {
      label: '英语',
      value: 'en'
    },
    {
      label: '西班牙语',
      value: 'es'
    },
    {
      label: '日语',
      value: 'ja'
    },
    {
      label: '阿拉伯语',
      value: 'ar'
    },
    {
      label: '孟加拉语',
      value: 'bn'
    },
    {
      label: '德语',
      value: 'de'
    },
    {
      label: '法语',
      value: 'fr'
    },
    {
      label: '印地语',
      value: 'hi'
    },
    {
      label: '意大利语',
      value: 'it'
    },
    {
      label: '韩语',
      value: 'ko'
    },
    {
      label: '荷兰语',
      value: 'nl'
    },
    {
      label: '波兰语',
      value: 'pl'
    },
    {
      label: '葡萄牙语',
      value: 'pt'
    },
    {
      label: '俄语',
      value: 'ru'
    },
    {
      label: '泰语',
      value: 'th'
    },
    {
      label: '土耳其语',
      value: 'tr'
    },
    {
      label: '越南语',
      value: 'vi'
    },

    {
      label: '保加利亚语',
      value: 'bg'
    },
    {
      label: '捷克语',
      value: 'cs'
    },
    {
      label: '丹麦语',
      value: 'da'
    },
    {
      label: '希腊语',
      value: 'el'
    },
    {
      label: '芬兰语',
      value: 'fi'
    },
    {
      label: '克罗地亚语',
      value: 'hr'
    },
    {
      label: '匈牙利语',
      value: 'hu'
    },
    {
      label: '印度尼西亚语',
      value: 'id'
    },
    {
      label: '爱沙尼亚语',
      value: 'iw'
    },
    {
      label: '立陶宛语',
      value: 'lt'
    },
    {
      label: '挪威语',
      value: 'no'
    },
    {
      label: '罗马尼亚语',
      value: 'ro'
    },
    {
      label: '斯洛文尼亚语',
      value: 'sl'
    },
    {
      label: '瑞典语',
      value: 'sv'
    },
    {
      label: '乌克兰语',
      value: 'uk'
    }
  ];

  const options2 = options.filter(item => item.value !== 'auto');

  const textarea = ref('');
  const textarea2 = ref('');
  const loading = ref(false);
  const dialogVisible = ref(localStorage.getItem('dialog') !== 'false');

  // 获取query参数
  const query = window.location.search;
  const params = new URLSearchParams(query);
  const text = params.get('text');

  if (text) {
    textarea.value = text;
    // 删除query参数
    window.history.replaceState({}, '', window.location.pathname);
  }

  function handleClose() {
    localStorage.setItem('dialog', 'false');
    dialogVisible.value = false;
    loading.value = false;
    textarea.value = '';
    textarea2.value = '';
  }

  async function translate() {
    loading.value = true;

    textarea2.value = '';

    console.log(to.value, from.value, textarea.value);

    if (!('LanguageDetector' in window) || !('Translator' in window)) {
      // The Language Detector API is available.
      return (
        (dialogVisible.value = true),
        localStorage.removeItem('dialog'),
        (loading.value = false)
      );
    }

    if (!textarea.value) {
      return ((textarea2.value = ''), (loading.value = false));
    }

    let result = '';
    if (from.value === 'auto') {
      let detector;
      const languageDetectorCapabilities = await LanguageDetector.availability();
      const canDetect = languageDetectorCapabilities;
      console.log(canDetect);

      if (canDetect === 'unavailable') {
        // The language detector isn't usable.
        return (
          (dialogVisible.value = true),
          localStorage.removeItem('dialog'),
          (loading.value = false)
        );
      }

      if (canDetect === 'available') {
        // The language detector can immediately be used.
        detector = await LanguageDetector.create();
      } else {
        // The language detector can be used after model download.
        detector = await LanguageDetector.create({
          signal: AbortSignal.timeout(30 * 1000),
          monitor(m) {
            m.addEventListener('downloadprogress', e => {
              console.log(`Downloaded ${e.loaded * 100}%`);
            });
          }
        }).catch(e => {
          ElMessage.error('自动检测失败,请手动选择语言');
          textarea2.value = '';
          loading.value = false;
          throw e;
        });
      }

      const results = await detector.detect(textarea.value);

      console.log(results);

      if (results[0] && results[0].detectedLanguage) {
        result = results[0]?.detectedLanguage;
      } else {
        ElMessage.error('自动检测失败,请手动选择语言');
        textarea2.value = '';
        loading.value = false;
        return;
      }
      console.log(result);

      detector.destroy();
    }

    if (from.value === to.value || result === to.value) {
      return ((textarea2.value = textarea.value), (loading.value = false));
    }

    console.log(result, from.value, to.value);

    const canTranslator = await Translator.availability({
      sourceLanguage: from.value === 'auto' ? result : from.value,
      targetLanguage: to.value
    });
    let translator;

    console.log(canTranslator);

    if (canTranslator === 'unavailable') {
      // The language detector isn't usable.
      return (
        (dialogVisible.value = true),
        localStorage.removeItem('dialog'),
        (loading.value = false)
      );
    }

    if (canTranslator === 'available') {
      translator = await Translator.create({
        sourceLanguage: from.value === 'auto' ? result : from.value,
        targetLanguage: to.value
      });
    } else {
      translator = await Translator.create({
        signal: AbortSignal.timeout(30 * 1000),
        sourceLanguage: from.value === 'auto' ? result : from.value,
        targetLanguage: to.value,
        monitor(m) {
          m.addEventListener('downloadprogress', e => {
            console.log(`Downloaded ${e.loaded * 100}%`);
          });
        }
      }).catch(e => {
        ElMessage.error('创建翻译器失败');
        textarea2.value = '';
        loading.value = false;
        dialogVisible.value = true;
        throw e;
      });
    }
    const stream = translator.translateStreaming(textarea.value);
    // @ts-expect-error 忽略错误
    for await (const chunk of stream) {
      textarea2.value += chunk;
    }
    console.log(translator);
    translator.destroy();
    loading.value = false;
  }

  function copy() {
    navigator.clipboard.writeText(textarea2.value);
  }
</script>

<style scoped>
  .results {
    position: relative;
  }

  .results .el-icon {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .results:hover .el-icon {
    display: block;
  }
</style>
