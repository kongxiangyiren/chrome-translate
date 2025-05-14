// 扩展 window.ai
declare global {
  interface Window {
    LanguageDetector: AILanguageDetectorFactory
    Translator: AITranslatorFactory
  }
  let LanguageDetector: AILanguageDetectorFactory
  let Translator: AITranslatorFactory
}

interface AITranslatorFactory {
  availability: ({
    sourceLanguage: string,
    targetLanguage: string,
  }) => Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>
  create: (option: {
    sourceLanguage: string
    targetLanguage: string
    monitor?: (m: {
      addEventListener: (type: string, e: (e: { loaded: number; total: number }) => void) => void
    }) => void
  }) => Promise<{
    translate: (text: string) => Promise<string>
    destroy: () => Promise<void>
  }>
}

interface AILanguageDetectorFactory {
  availability: () => Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>

  create: (option?: {
    monitor?: (m: {
      addEventListener: (type: string, e: (e: { loaded: number; total: number }) => void) => void
    }) => void
  }) => Promise<{
    detect: (text: string) => Promise<
      Array<{
        detectedLanguage: string
        confidence: number
      }>
    >
    ready: Promise<void>
    destroy: () => Promise<void>
  }>
}

export {}
