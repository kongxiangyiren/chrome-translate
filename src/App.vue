<template>
  <div class="translate h-full">
    <div class="top text-center mt-10">
      <h1>chrome翻译</h1>
      <h4 class="text-gray-500">方便 / 易用 / 快捷</h4>
    </div>

    <div class="translate-box container mx-auto mt-5">
      <div class="select-box">
        <el-select class="!w-30" v-model="from" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>

        <el-select class="ml-3 !w-30" v-model="to" placeholder="Select">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>

        <el-button class="ml-3" type="primary" @click="translate" :loading="loading"
          >翻译</el-button
        >
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
            <el-input
              v-model="textarea2"
              :rows="15"
              type="textarea"
              placeholder="译文"
              :disabled="true"
            />
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="提示" width="750">
      <div>
        <div>如果当前浏览器不支持翻译，请通过以下步骤开启翻译功能</div>
        <ul>
          <li>
            <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank"
              >1、下载最新Chrome浏览器</a
            >
          </li>
          <li>
            2、打开 chrome://flags/#translation-api 将 Experimental translation API 改为 Enabled
            without language pack limit
          </li>
          <li>
            3、打开 chrome://flags/#language-detection-api 将 Language detection web platform API
            改为 Enabled
          </li>
          <li>4、访问 chrome://on-device-translation-internals/ 以手动安装和卸载语言包。</li>
          <li>5、重启浏览器。</li>
        </ul>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleClose"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect, ElOption, ElButton, ElRow, ElCol, ElInput, ElDialog } from 'element-plus'
const from = ref<language | 'auto'>('auto')
const to = ref<language>('zh')

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
  | 'uk'

const options: Array<{
  label: string
  value: language | 'auto'
  disabled?: boolean
}> = [
  {
    label: '自动检测',
    value: 'auto',
  },
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: '繁体中文',
    value: 'zh-Hant',
  },
  {
    label: '英语',
    value: 'en',
  },
  {
    label: '西班牙语',
    value: 'es',
  },
  {
    label: '日语',
    value: 'ja',
  },
  {
    label: '阿拉伯语',
    value: 'ar',
  },
  {
    label: '孟加拉语',
    value: 'bn',
  },
  {
    label: '德语',
    value: 'de',
  },
  {
    label: '法语',
    value: 'fr',
  },
  {
    label: '印地语',
    value: 'hi',
  },
  {
    label: '意大利语',
    value: 'it',
  },
  {
    label: '韩语',
    value: 'ko',
  },
  {
    label: '荷兰语',
    value: 'nl',
  },
  {
    label: '波兰语',
    value: 'pl',
  },
  {
    label: '葡萄牙语',
    value: 'pt',
  },
  {
    label: '俄语',
    value: 'ru',
  },
  {
    label: '泰语',
    value: 'th',
  },
  {
    label: '土耳其语',
    value: 'tr',
  },
  {
    label: '越南语',
    value: 'vi',
  },

  {
    label: '保加利亚语',
    value: 'bg',
  },
  {
    label: '捷克语',
    value: 'cs',
  },
  {
    label: '丹麦语',
    value: 'da',
  },
  {
    label: '希腊语',
    value: 'el',
  },
  {
    label: '芬兰语',
    value: 'fi',
  },
  {
    label: '克罗地亚语',
    value: 'hr',
  },
  {
    label: '匈牙利语',
    value: 'hu',
  },
  {
    label: '印度尼西亚语',
    value: 'id',
  },
  {
    label: '爱沙尼亚语',
    value: 'iw',
  },
  {
    label: '立陶宛语',
    value: 'lt',
  },
  {
    label: '挪威语',
    value: 'no',
  },
  {
    label: '罗马尼亚语',
    value: 'ro',
  },
  {
    label: '斯洛文尼亚语',
    value: 'sl',
  },
  {
    label: '瑞典语',
    value: 'sv',
  },
  {
    label: '乌克兰语',
    value: 'uk',
  },
]

const options2 = options.filter((item) => item.value !== 'auto')

const textarea = ref('')
const textarea2 = ref('')
const loading = ref(false)
const dialogVisible = ref(localStorage.getItem('dialog') !== 'false')

function handleClose() {
  localStorage.setItem('dialog', 'false')
  dialogVisible.value = false
  loading.value = false
  textarea.value = ''
  textarea2.value = ''
}

async function translate() {
  loading.value = true
  console.log(to.value, from.value, textarea.value)

  if (!('ai' in window) || !('languageDetector' in window.ai) || !('translator' in window.ai)) {
    // The Language Detector API is available.
    return (dialogVisible.value = true), localStorage.removeItem('dialog')
  }

  if (!textarea.value) {
    return (textarea2.value = '')
  }
  let result = ''
  if (from.value === 'auto') {
    let detector
    const languageDetectorCapabilities = await ai.languageDetector.capabilities()
    const canDetect = languageDetectorCapabilities.available
    console.log(canDetect)

    if (canDetect === 'no') {
      // The language detector isn't usable.
      return (dialogVisible.value = true), localStorage.removeItem('dialog')
    }

    if (canDetect === 'readily') {
      // The language detector can immediately be used.
      detector = await self.ai.languageDetector.create()
    } else {
      // The language detector can be used after model download.
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
          })
        },
      })
      await detector.ready
    }

    const results = await detector.detect(textarea.value)

    result = results[0].detectedLanguage

    await detector.destroy()
  }

  if (from.value === to.value || result === to.value) {
    textarea2.value = textarea.value
    return
  }

  console.log(result, from.value, to.value)

  const translatorCapabilities = await self.ai.translator.capabilities()
  const canTranslator = translatorCapabilities.languagePairAvailable(
    from.value === 'auto' ? result : from.value,
    to.value,
  )
  let translator

  console.log(canTranslator)

  if (canTranslator === 'no') {
    // The language detector isn't usable.
    return (dialogVisible.value = true), localStorage.removeItem('dialog')
  }

  if (canTranslator === 'readily') {
    translator = await self.ai.translator.create({
      sourceLanguage: from.value === 'auto' ? result : from.value,
      targetLanguage: to.value,
    })
  } else {
    translator = await self.ai.translator.create({
      sourceLanguage: from.value === 'auto' ? result : from.value,
      targetLanguage: to.value,
      monitor(m) {
        m.addEventListener('downloadprogress', (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
        })
      },
    })
  }

  textarea2.value = await translator.translate(textarea.value)
  console.log(translator)
  await translator.destroy()
  loading.value = false
}
</script>

<style scoped></style>
