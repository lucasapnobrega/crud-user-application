export const convertDate = (date: string) => {
  const [day, month, year] = date.split("/")

  const formattedDay = day.toString().padStart(2, "0")
  const formattedMonth = month.toString().padStart(2, "0")

  return `${formattedDay}/${formattedMonth}/${year}`
}