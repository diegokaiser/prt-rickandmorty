import axios from 'axios'

const baseAPI = axios.create({
  baseURL: '//rickandmortyapi.com/api'
})

export const getCharacters = async (page) => {
  const res = await baseAPI.get(`/character/?page=${page}`)
  return res.data
}

export const getCharacter = async (id) => {
  const res = await baseAPI.get(`/character/${id}`)
  return res.data
}

export const getLocations = async (page) => {
  const res = await baseAPI.get(`/location/?page=${page}`)
  return res.data
}

export const getLocation = async (id) => {
  const res = await baseAPI.get(`/location/${id}`)
  return res.data
}

export const getEpisodes = async (page) => {
  const res = await baseAPI.get(`/episode?page=${page}`)
  return res.data
}

export const getEpisode = async (id) => {
  const res = await baseAPI.get(`/episode/${id}`)
  return res.data
}