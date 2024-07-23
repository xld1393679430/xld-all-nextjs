export function ssrI18n(key, lang) {
	return Object.keys(lang).reduce((keySet, locale) => {
		keySet[locale] = lang[locale][key]
		return keySet
	}, {})
}