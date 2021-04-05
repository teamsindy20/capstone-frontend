export const GOOGLE_ANALYTICS_TRACKING_ID = 'G-WZ6C4WQFLS'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function pageview(url: string) {
  window.gtag('config', GOOGLE_ANALYTICS_TRACKING_ID, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function event({ action, category, label, value }: GTagEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
