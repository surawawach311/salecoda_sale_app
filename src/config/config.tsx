import Constants from 'expo-constants'

export const APP_ENV = Constants.manifest.extra.environment
export const APP_NAME = Constants.manifest.name
export const APP_VERSION = Constants.manifest.version
export const API_URL = Constants.manifest.extra.apiUrl

export const BASE_URL_SOHEE = `${API_URL}/sohee`
export const BASE_URL_POPORING = `${API_URL}/poporing`
export const BASE_URL_DARK_FRAME = `${API_URL}/dark_frame`
export const BASE_URL_WHISPER = `${API_URL}/whisper`
export const BASE_URL_DEVILING = `${API_URL}`
export const BASE_URL_NPC = `${API_URL}/npc`
export const BASE_URL_KEY_OF_UNDERGROUND = `${API_URL}/key_of_underground/v1`
