import { useQuery } from 'react-query'

const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndWppZW5jc3V5aXhnYmRvdmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3ODcxMzgsImV4cCI6MjAxODM2MzEzOH0.1eeef9EESk_nJes-mmygJAykJahFS1YjLtM2CCqKAxU'

export function useTitle(companies) {
  return useQuery({
    queryKey: ['title'],
    queryFn: async () => {
      try {
        if (!companies) return 'Companly'
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
        if (!response) return 'Companly'
        return await response.json()
      } catch (e) {
        console.error(e)
        return 'Companly'
      }
    }
  })
}
