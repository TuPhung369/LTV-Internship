export const uploadFile = async (presignedUrl: string, file: File): Promise<any> => {
  return fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type ?? 'text/plain' },
    body: file,
  })
}
