export function stopEnterPropagation(e: React.KeyboardEvent<HTMLElement>) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length === 11) {
    return (
      phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7, 4)
    )
  } else if (phoneNumber.length === 10) {
    return (
      phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4)
    )
  } else {
    return phoneNumber
  }
}
