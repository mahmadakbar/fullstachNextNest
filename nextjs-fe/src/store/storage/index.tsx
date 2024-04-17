// store data
export const setItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.setItem(key, JSON.stringify(value))
    return data
  }
}

// get data
export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key)
    return JSON.parse(data as string)
  }
}

// remove data
export const removeItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
