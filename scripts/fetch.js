import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser();

// 購読したいフィードのリスト
const feeds = [
  // === AI系 ===
  {
    name: 'OpenAI News',
    url: 'https://openai.com/news/rss.xml',
    category: 'AI'
  },
  {
    name: 'Anthropic',
    url: 'https://www.anthropic.com/rss.xml',
    category: 'AI'
  },
  {
    name: 'Google DeepMind',
    url: 'https://deepmind.com/blog/feed/basic/',
    category: 'AI'
  },
  {
    name: 'One Useful Thing',
    url: 'https://www.oneusefulthing.org/feed',
    category: 'AI'
  },
  {
    name: 'Simon Willison',
    url: 'https://simonwillison.net/atom/everything/',
    category: 'AI'
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    category: 'AI'
  },
  {
    name: 'Zenn AI',
    url: 'https://zenn.dev/topics/ai/feed',
    category: 'AI'
  },

  // === 個人開発・インディーハッカー系 ===
  {
    name: 'Indie Hackers',
    url: 'https://ihrss.io/frontpage.xml',
    category: 'IndieHacker'
  },
  {
    name: 'Product Hunt',
    url: 'https://www.producthunt.com/feed',
    category: 'IndieHacker'
  },
  {
    name: 'Pieter Levels',
    url: 'https://levels.io/rss/',
    category: 'IndieHacker'
  },
  {
    name: 'The Bootstrapped Founder',
    url: 'https://thebootstrappedfounder.com/feed/',
    category: 'IndieHacker'
  },
  {
    name: 'Zenn 個人開発',
    url: 'https://zenn.dev/topics/%E5%80%8B%E4%BA%BA%E9%96%8B%E7%99%BA/feed',
    category: 'IndieHacker'
  },
  {
    name: 'Qiita 個人開発',
    url: 'https://qiita.com/tags/%E5%80%8B%E4%BA%BA%E9%96%8B%E7%99%BA/feed',
    category: 'IndieHacker'
  },

  // === Tech全般 ===
  {
    name: 'Hacker News',
    url: 'https://hnrss.org/frontpage',
    category: 'Tech'
  },
  {
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    category: 'Tech'
  }

  // ここに追加のフィードを入れられます
];

async function fetchAllFeeds() {
  console.log('📡 フィードを取得中...');

  const allItems = [];

  for (const feed of feeds) {
    try {
      console.log(`  → ${feed.name} を取得中...`);
      const parsed = await parser.parseURL(feed.url);

      const items = parsed.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        contentSnippet: item.contentSnippet?.slice(0, 200) || '',
        source: feed.name,
        category: feed.category
      }));

      allItems.push(...items);
    } catch (error) {
      console.error(`  ❌ ${feed.name} の取得に失敗:`, error.message);
    }
  }

  // 日付順にソート（新しい順）
  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // JSONファイルとして保存
  const outputPath = path.join(__dirname, '..', 'public', 'feeds.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    lastUpdated: new Date().toISOString(),
    items: allItems
  }, null, 2));

  console.log(`\n✅ ${allItems.length}件の記事を取得しました`);
  console.log(`💾 保存先: ${outputPath}`);
}

fetchAllFeeds().catch(console.error);
