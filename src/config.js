export const SITE_NAME = process.env.REACT_APP_SITE_NAME || 'TheDailyPost'

const _parts = SITE_NAME.split(/(?=[A-Z])/)
export const SITE_NAME_START = process.env.REACT_APP_SITE_NAME_START || _parts.slice(0, -1).join('')
export const SITE_NAME_END = process.env.REACT_APP_SITE_NAME_END || _parts.at(-1)
