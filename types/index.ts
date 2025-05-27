export interface UserPreferences {
  scenario: string
  gender: string
  style: string
  weather: string
  temperature: number
}

export interface OutfitItem {
  top: string
  bottom: string
  shoes: string
  accessories: string
}

export interface Outfit {
  title: string
  items: OutfitItem
  concept: string
}

export interface OutfitResponse {
  outfits: Outfit[]
  blessing: string
  rawContent?: string
}
