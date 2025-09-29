export const downloadUrl = async (url: string) => {
  try {
    const link = document.createElement('a')
    link.href = url
    const filename = url.split('/').pop() ?? 'report.csv'
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading the file', error)
  }
}
