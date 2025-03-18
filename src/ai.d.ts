// 扩展 window.ai
declare global {
  interface Window {
    ai: AI
  }
  let ai: AI
}

interface AI {
  translator: AITranslatorFactory
  languageDetector: AILanguageDetectorFactory
}

interface AITranslatorFactory {
  capabilities: () => Promise<{
    languagePairAvailable: (
      sourceLanguage: string,
      targetLanguage: string,
    ) => 'no' | 'readily' | 'after-download'
    available: 'no' | 'readily' | 'after-download'
  }>
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
  capabilities: () => Promise<{
    languageAvailable: (language: string) => 'no' | 'readily' | 'after-download'
    available: 'no' | 'readily' | 'after-download'
  }>

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
