import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base: '/YOUR_REPO_NAME',
  // GitHub Pagesにデプロイする場合は上記を設定してください
  // ローカル開発時はコメントアウトでOK
});
