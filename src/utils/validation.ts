/**
 * Common validation utilities for the frontend (Vue)
 * Replicated from backend validation.ts for consistency
 */

/**
 * Validate email format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email là bắt buộc' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Định dạng email không hợp lệ' };
  }
  return { isValid: true };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password) {
    return { isValid: false, error: 'Mật khẩu là bắt buộc' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Mật khẩu phải dài ít nhất 8 ký tự' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Mật khẩu phải chứa ít nhất một chữ cái thường' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Mật khẩu phải chứa ít nhất một chữ số' };
  }
  
  return { isValid: true };
}

/**
 * Validate string field
 */
export function validateStringField(value: string | undefined, fieldName: string, required: boolean = true): { 
  isValid: boolean; 
  value?: string; 
  error?: string 
} {
  if (required && (!value || typeof value !== 'string' || value.trim().length === 0)) {
    return { isValid: false, error: `${fieldName} là bắt buộc` };
  }
  
  return { isValid: true, value: value?.trim() };
}

/**
 * Validate numeric field
 */
export function validateNumericField(value: number | string | unknown | undefined | null, fieldName: string, min: number = 0): { 
  isValid: boolean; 
  value?: number; 
  error?: string 
} {
  if (value === undefined || value === null || value === '') {
    return { isValid: false, error: `${fieldName} là bắt buộc` };
  }
  
  const numericValue = parseFloat(value as string);
  if (isNaN(numericValue)) {
    return { isValid: false, error: `${fieldName} không hợp lệ` };
  }
  
  if (numericValue < min) {
    return { isValid: false, error: `${fieldName} phải lớn hơn hoặc bằng ${min}` };
  }
  
  return { isValid: true, value: numericValue };
}

/**
 * Validate URL format
 */
export function validateUrl(url: string | undefined): { isValid: boolean; error?: string } {
  if (!url) return { isValid: true };
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Định dạng URL không hợp lệ' };
  }
}

/**
 * Validate slug format
 */
export function validateSlug(slug: string): { isValid: boolean; error?: string } {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slug || !slugRegex.test(slug)) {
    return { isValid: false, error: 'Định dạng slug không hợp lệ. Chỉ sử dụng chữ cái thường, số và dấu gạch ngang' };
  }
  return { isValid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  const phoneRegex = /^[0-9+ ]{10,15}$/;
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Số điện thoại là bắt buộc' };
  }
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Số điện thoại không hợp lệ' };
  }
  return { isValid: true };
}
