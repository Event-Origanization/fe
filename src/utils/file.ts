/**
 * Chuyển đổi File sang Base64 Data URL
 * @param file Đối tượng File
 * @returns Promise chứa chuỗi Base64
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target?.result as string)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}

/**
 * Kiểm tra dung lượng file
 * @param file Đối tượng File
 * @param maxSizeMB Dung lượng tối đa (MB)
 * @returns boolean
 */
export const checkFileSize = (file: File, maxSizeMB: number): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024
}
