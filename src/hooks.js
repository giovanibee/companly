import { useMutation } from 'react-query'

export const defaultList = ['?', '?', '?', '?', '?', '?', '?', '?', '?']

export function useTitle() {
  return useMutation({
    mutationKey: ['title'],
    mutationFn: async (companies) => {
      try {
        if (!companies) return { title: defaultList, companies }
        const response = await fetch(
          'https://igujiencsuyixgbdovik.supabase.co/functions/v1/companly', {
            headers: {
              Accept: 'application/json'
            },
            body: JSON.stringify(companies),
            cache: "no-cache",
            method: "POST"
          }
        )
        if (!response) return { title: defaultList, companies }
        const title = await response.json()
        if (!title) return { title: defaultList, companies }
        const length = title.length
        if (length === 9) {
          return{ title: title.split(''), companies }
        } else if (length < 9) {
          const filler = Array(9 - length).fill(' ')
          return { title: [...filler, ...title], companies }
        }
        return { title: title.split('').slice(0, 9), companies }
      } catch (e) {
        return { title: 'Companly', companies }
      } 
    }
  })
}
