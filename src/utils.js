import moment from 'moment'

export const getRepoName = (url) => {
  const split = url.split("/")
  return split[split.length - 1]
}

export const getOwnerName = (url) => {
  const split = url.split("/")
  return split[split.length - 2]
}

export const formatCreatedDate = (d) => {
  return moment(d).format('DD/MM/YYYY');
}

export const formatUpdatedDate = (d) => {
  return moment(d).fromNow();
}

export const isValidAuthKey = (authKey) => {
  return authKey !== "" && authKey !== undefined
}