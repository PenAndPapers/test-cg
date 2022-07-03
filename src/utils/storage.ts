export const setItemStorage = (key: string, payload: any) => {
  if (key && payload) {
    window.sessionStorage.setItem(key, JSON.stringify(payload))
    return true
  }
  return false
}

export const getItemStorage = (key: string) => {
  if (key) return window.sessionStorage.getItem(key)
  return null
}

export const removeItemStorage = (key: string) => {
  if (key) window.sessionStorage.removeItem(key)
  return true
}