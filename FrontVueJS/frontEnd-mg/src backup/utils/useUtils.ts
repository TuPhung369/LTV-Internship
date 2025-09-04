import { h } from 'vue'

import WordIcon from '@/assets/images/icons/icons8-microsoft-word.svg'
import PdfIcon from '@/assets/images/icons/icons8-pdf-document.svg'
import PowerpointIcon from '@/assets/images/icons/icons8-microsoft-powerpoint.svg'

export const fileExtensionDetector = (fileTpCd?: string): { Icon?: string; alt?: string } => {
  if (['doc', 'docx'].some((exe) => fileTpCd?.includes(exe))) {
    return { Icon: WordIcon, alt: 'Word' }
  }
  if (['ppt', 'pptx'].some((exe) => fileTpCd?.includes(exe))) {
    return { Icon: PowerpointIcon, alt: 'Powerpoint' }
  }
  return { Icon: PdfIcon, alt: 'Pdf' }
}

export const FileExtensionIcon = (fileTpCd?: string, classStyle?: string) => {
  const { Icon, alt } = fileExtensionDetector(fileTpCd)
  return h('img', {
    class: classStyle,
    width: 21,
    height: 21,
    alt: alt,
    src: Icon,
  })
}
