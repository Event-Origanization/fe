/**
 * Chuyển đổi chuỗi văn bản thành slug hợp lệ
 * @param text Chuỗi cần chuyển đổi
 * @returns Slug hoàn thiện
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Tách các ký tự dấu thành các ký tự riêng biệt
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, '-') // Thay khoảnh trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ nhiều gạch ngang liên tiếp
    .replace(/^-+|-+$/g, '') // Loại bỏ gạch ngang ở đầu và cuối
}
