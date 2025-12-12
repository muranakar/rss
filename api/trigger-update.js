// Vercel Edge Function例
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // GitHub Personal Access Tokenを環境変数から取得
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return new Response('GitHub token not configured', { status: 500 });
  }

  try {
    // GitHub Actions workflow_dispatch APIを呼び出し
    const response = await fetch(
      'https://api.github.com/repos/muranakar/rss/actions/workflows/fetch-feeds.yml/dispatches',
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main'
        }),
      }
    );

    if (response.ok) {
      return new Response('Workflow triggered successfully', { status: 200 });
    } else {
      return new Response('Failed to trigger workflow', { status: response.status });
    }
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}