# My RSS Feed

YouTubeやXのタイムラインから解放されつつ、AI関連・個人開発界隈の情報をキャッチアップするための個人用RSSリーダーです。

## 特徴

- サーバー不要（GitHub Actions + GitHub Pages で完結）
- 運用コストゼロ
- カスタマイズ可能なフィードリスト
- カテゴリーフィルター機能
- 毎日自動更新

## セットアップ

### 1. リポジトリの準備

```bash
# 依存パッケージをインストール
npm install

# ローカルでフィードを取得してテスト
npm run fetch-feeds

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:4321` を開いて確認してください。

### 2. GitHub Pagesの設定

1. このリポジトリをGitHubにプッシュ
2. リポジトリの Settings → Pages に移動
3. Source を「GitHub Actions」に設定
4. `astro.config.mjs` の `site` と `base` を自分の情報に書き換える：

```javascript
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/YOUR_REPO_NAME',
});
```

### 3. フィードのカスタマイズ

`scripts/fetch.js` の `feeds` 配列を編集して、購読したいフィードを追加・削除できます：

```javascript
const feeds = [
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'AI'
  },
  // ここに追加...
];
```

### 4. 更新頻度の変更

`.github/workflows/fetch-feeds.yml` の `cron` を編集：

```yaml
schedule:
  - cron: '0 */6 * * *'  # 6時間ごと
  - cron: '0 0 * * *'    # 毎日0時（デフォルト）
  - cron: '0 0 * * 1'    # 毎週月曜日
```

## 使い方

デプロイ後、`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` にアクセスするだけ！

- カテゴリーボタンでフィルタリングできます
- リンクをクリックすると別タブで記事が開きます
- 毎日自動的に最新の記事が更新されます

## フィード追加のヒント

### RSSフィードの見つけ方

1. **ブログ系**: だいたい `/feed`, `/rss`, `/atom.xml` で見つかります
2. **YouTube**: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`
3. **Zenn**: `https://zenn.dev/ユーザー名/feed`
4. **note**: `https://note.com/ユーザー名/rss`

### おすすめのフィード（AI・個人開発系）

- Hacker News: `https://hnrss.org/frontpage`
- Google AI Blog: `https://blog.research.google/atom.xml`
- Hugging Face: `https://huggingface.co/blog/feed.xml`
- TechCrunch: `https://techcrunch.com/feed/`

## トラブルシューティング

### フィードが表示されない

1. `npm run fetch-feeds` をローカルで実行してエラーを確認
2. `public/feeds.json` が生成されているか確認
3. GitHub Actionsのログを確認

### デプロイが失敗する

1. GitHub Pages の設定が「GitHub Actions」になっているか確認
2. リポジトリの Settings → Actions → General で「Read and write permissions」が有効になっているか確認

## ライセンス

MIT
