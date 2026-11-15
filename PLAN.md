# 実装方針

## 基盤

- Astro の静的出力を使い、TypeScript は strict 設定にする。
- ブログ記事は Astro Content Collections の `src/content/blog` に MDX で配置する。
- 記事メタデータは `title`, `description`, `publishedAt` を必須とし、`updatedAt`, `draft` を任意とする。
- 公開記事一覧は公開日の降順にし、production build では下書きを除外する。
- `/` は `/blog` へ静的にリダイレクトする。
- 共通レイアウトとスタイルは依存を増やさず Astro/CSS で実装する。
- 共通レイアウトで canonical URL、Open Graph、Twitter Card のメタデータを出力する。
- Astro 公式統合でサイトマップを生成し、公開記事のみを RSS に含める。

## 検証

- Vitest で一覧の抽出・並び順をテストする。
- `astro check` で Astro と TypeScript の型検査を行う。
- `astro build` で静的生成を確認する。

## デプロイ

- GitHub Actions で GitHub Pages 向け成果物をビルド・デプロイする。
- main ブランチへの push 時にテストと型検査を通し、Astro 公式 Action で成果物を作成して Pages に配備する。
- Node.js 24 を CI の実行環境とする。
