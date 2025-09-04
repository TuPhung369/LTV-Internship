const MAX_BYTES = 1024

export const readFile = async (file: File): Promise<string> => {
  const slice = file.slice(0, MAX_BYTES)
  const buffer = await slice.arrayBuffer()
  const data = new Uint8Array(buffer)

  const textDecoder = new TextDecoder()
  const decodedText = textDecoder.decode(data)
  return decodedText
}

export const downloadFile = (url: string, fileName: string) => {
  const link = document.createElement('a')
  if (link.download !== undefined) {
    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    link.setAttribute('target', '_blank')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
