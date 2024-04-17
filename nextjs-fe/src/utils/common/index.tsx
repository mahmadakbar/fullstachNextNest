export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64Data = reader.result?.toString()?.split(',')?.[1] ?? ''
      resolve(base64Data)
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export const base64toUrl = (base64: string) => {
  return `data:image/png;base64,${base64}`
}
