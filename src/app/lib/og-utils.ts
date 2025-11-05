import { NextRequest } from 'next/server';

/**
 * Generates an Open Graph image URL with the given title and description
 * @param title The title to display on the image
 * @param description The description to display on the image
 * @param baseUrl Optional base URL (defaults to process.env.NEXT_PUBLIC_SITE_URL or 'https://www.ignitefoundation.us')
 * @returns Full URL to the generated OG image
 */
export function generateOGImageUrl(
  title: string,
  description: string,
  baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us'
): string {
  const url = new URL('/api/og', baseUrl);
  url.searchParams.set('title', encodeURIComponent(title));
  url.searchParams.set('description', encodeURIComponent(description));
  return url.toString();
}

/**
 * Gets the base URL for the current environment
 * @param req Optional NextRequest object to get the host from
 * @returns The base URL (e.g., 'https://www.ignitefoundation.us')
 */
export function getBaseUrl(req?: NextRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req ? req.headers.get('host') : '';
  return `${protocol}://${host}`;
}

/**
 * Extracts the path from a URL
 * @param url The URL to extract the path from
 * @returns The path (e.g., '/about' from 'https://example.com/about')
 */
export function getPathFromUrl(url: string): string {
  try {
    const { pathname } = new URL(url);
    return pathname;
  } catch (e) {
    return url;
  }
}
