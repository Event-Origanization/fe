export const formatDate = (date: string, locale: string = 'vi', includeTime: boolean = false) => {
  if (!date) return ''
  const loc = locale === 'vi' ? 'vi-VN' : locale === 'zh' ? 'zh-CN' : 'en-US'

  if (includeTime) {
    return new Date(date).toLocaleString(loc, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return new Date(date).toLocaleDateString(loc)
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

export const obfuscateCurrency = (amount: number) => {
  if (!amount) return '0 ₫'
  const formatted = new Intl.NumberFormat('vi-VN').format(amount)
  // Replace all digits except the very first one with 'x'
  let firstDigitSeen = false
  const obfuscated = formatted.replace(/\d/g, (match) => {
    if (!firstDigitSeen) {
      firstDigitSeen = true
      return match
    }
    return 'x'
  })
  return `${obfuscated} ₫`
}
