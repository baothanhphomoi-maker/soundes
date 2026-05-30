const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryId: string;
  categorySlug: string;
  image: string;
  timestamp: string;
  createdAt: number;
  views: number;
  author: string;
  isBreaking?: boolean;
  tags?: string[];
}

/**
 * Fetch all articles from database
 */
export async function fetchArticles(limit: number = 50): Promise<Article[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/articles?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data: Article[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Fetch articles by category
 */
export async function fetchArticlesByCategory(
  categorySlug: string,
  limit: number = 20
): Promise<Article[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/articles?category=${encodeURIComponent(categorySlug)}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles by category');
    }

    const data: Article[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

/**
 * Track article view - gọi khi người dùng click vào bài viết
 */
export async function trackArticleView(articleId: string): Promise<{ success: boolean; views_count: number }> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/track-view`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article_id: articleId }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to track view');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error tracking article view:', error);
    return { success: false, views_count: 0 };
  }
}

/**
 * Format views count
 */
export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k`;
  }
  return views.toString();
}

/**
 * Track radio episode listen - gọi khi người dùng click vào phát nhạc
 */
export async function trackRadioListen(episodeId: string): Promise<{ success: boolean; listen_count: number }> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/track-radio-listen`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ episode_id: episodeId }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to track radio listen');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error tracking radio listen:', error);
    return { success: false, listen_count: 0 };
  }
}

/**
 * Fetch radio episodes listen counts from database
 */
export async function fetchRadioListenCounts(): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/radio-episodes`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch radio listen counts');
    }

    const data: Record<string, number> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching radio listen counts:', error);
    return {};
  }
}
