export interface artworkData {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  credit_line: string;
  publication_history: string;
  exhibition_history: string;
  provenance_text: string;
  image_id: string;
}

export interface searchArtworkDataResponse {
  _score: number;
  thumbnail: {
    alt_text: string;
    width: number;
    lqip: string;
    height: number;
  };
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  timestamp: string;
}

export interface searchArtworkResponse {
  preference?: string;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
  data: searchArtworkDataResponse[];
  info: {
    license_text: string;
    license_links: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface multipleArtwork {
  preference?: string;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
  };
  data: artworkData[];
  info: {
    license_text: string;
    license_links: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface artwork {
  data: artworkData;
  info: {
    license_text: string;
    license_links: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
}

export interface DialogData{
  title: string,
  message: string[],
  dangerButton?: string,
  neutralButton?: string,
  successButton?: string
}