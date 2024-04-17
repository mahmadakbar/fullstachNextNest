const alphaSpaces = /^[a-zA-Z ]*$/
const alphaNumeric = /^[a-zA-Z0-9]*$/
const phonePattern = /^[0-9 ()+-]+$/
const numericPattern = /^[0-9]*$/
const passwordPattern = /^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/
const brandFilterSearchPattern = /[^a-zA-Z0-9 ]/gi
const alphaInputPattern = /[^a-zA-Z ]/gi
const notSpaceOnlyPattern = /^(?!\s+$).*/ // dissalow space only
const domainPattern = /^[a-z-]+$/
const spaceAtBeginning = /^(?!\s)[a-zA-Z0-9_\s-]*$/ // dissalow space at beginning
const emailPattern =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const pageWithlist = /^(Home|Details|Profile)/

export {
  alphaSpaces,
  phonePattern,
  passwordPattern,
  brandFilterSearchPattern,
  alphaInputPattern,
  alphaNumeric,
  numericPattern,
  notSpaceOnlyPattern,
  domainPattern,
  spaceAtBeginning,
  emailPattern,
  pageWithlist,
}
