export default (context, inject) => {
  inject('date', (date) => {
    let newDate = ''
    if (date) {
      const myDate = date.split('T')
      const dd = myDate[0].split('-')[2]
      const mm = myDate[0].split('-')[1]
      const yyyy = myDate[0].split('-')[0]
      const hh = myDate[1].split('-')[0]
      newDate = `${mm}/${dd}/${yyyy} ${hh}`
    }
    return newDate
  })
}
