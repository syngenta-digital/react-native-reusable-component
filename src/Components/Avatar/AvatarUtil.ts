// Returns first letter of first and last word
export const returnInitial = (name: string) => {
  return name
    .match(/(\b\S)?/g)
    .join('')
    .match(/(^\S|\S$)?/g)
    .join('')
    .toUpperCase()
}
