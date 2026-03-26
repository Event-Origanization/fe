/**
 * Convert an object to FormData
 * @param obj - Plain object
 * @returns FormData
 */
export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) return

    // If it's a File, append it directly
    if (value instanceof File) {
      formData.append(key, value)
    } 
    // Special case for 'image' field which might be a File or already a URL
    else if (key === 'image' && value instanceof File) {
      formData.append(key, value)
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item)
        } else if (typeof item === 'object') {
          formData.append(`${key}[${index}]`, JSON.stringify(item))
        } else {
          formData.append(`${key}[]`, item)
        }
      })
    }
    // Handle nested objects
    else if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value))
    }
    // Handle primitive values
    else {
      formData.append(key, value)
    }
  })

  return formData
}
