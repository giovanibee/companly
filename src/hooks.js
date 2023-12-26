import { useQuery } from 'react-query'

const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndWppZW5jc3V5aXhnYmRvdmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODcxMzgsImV4cCI6MjAxODM2MzEzOH0.1eeef9EESk_nJes-mmygJAykJahFS1YjLtM2CCqKAxU'

export const defaultList = ['?', '?', '?', '?', '?', '?', '?', '?', '?']

export function useTitle(companies) {
  return useQuery({
    queryKey: ['title'],
    queryFn: async () => {
      try {
        if (!companies) return defaultList
        const response = await fetch(
          'https://igujiencsuyixgbdovik.supabase.co/functions/v1/companly', {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${PUBLIC_KEY}`
            },
            body: JSON.stringify(companies),
            cache: "no-cache",
            method: "POST"
          }
        )
        if (!response) return defaultList
        const title = await response.json()
        if (!title) return defaultList
        const length = title.length
        console.log(title)
        if (length === 9) {
          return title.split('')
        } else if (length < 9) {
          const filler = Array(9 - length).fill(' ')
          return [...filler, ...title]
        }
        return title.split('').slice(0, 9)
      } catch (e) {
        console.error(e)
        return 'Companly'
      } 
    }
  })
}
