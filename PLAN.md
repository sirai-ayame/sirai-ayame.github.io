# 実装方針

## 基盤

- Astro の静的出力を使い、TypeScript は strict 設定にする。
- ローカルと CI は Node.js 24 を標準とし、依存関係の最低要件として Node.js 22.23.4 以上を要求する。
- `package-lock.json` は CI の npm による厳格な整合性検証を通る状態で commit する。
- ブログ記事は Astro Content Collections の `src/content/blog/<slug>/index.mdx` に配置し、記事固有の画像・動画なども同じディレクトリにまとめる。
- 記事内の画像は MDX から相対パスで参照し、動画などは import したURLをHTML要素に渡す。記事本文の画像・動画は表示領域を超えないようにする。
- `npm run new:post -- <slug> "記事タイトル"` で、既存ファイルを上書きせず `src/content/blog/<slug>/index.mdx` に下書きを作成できるようにする。
- VS Code のタスクから記事作成、開発サーバー起動、一括検証、ビルド、本番プレビューを実行できるようにする。
- 記事メタデータは `title`, `description`, `publishedAt` を必須とし、`updatedAt`, `draft` を任意とする。
- 公開記事一覧は公開日の降順にし、production build では下書きを除外する。
- `/` は `/blog` へ静的にリダイレクトする。
- 共通レイアウトとスタイルは依存を増やさず Astro/CSS で実装する。
- キーボード利用者向けに本文へのスキップリンクと視認できるフォーカス表示を設ける。
- 記事には公開日を表示し、`updatedAt` がある場合は更新日と更新日時メタデータも出力する。
- 共通レイアウトで canonical URL、Open Graph、Twitter Card のメタデータを出力する。
- Astro 公式統合でサイトマップを生成し、公開記事のみを RSS に含める。
- 存在しないパスにはブログトップへの導線を持つ静的 404 ページを返す。
- 共通ヘッダーにプロフィール画像、サイト名、GitHub・X へのリンクを配置する。
- CSS の `prefers-color-scheme` でブラウザ設定に追従し、ライト・ダーク両配色を提供する。
- 記事本文には一覧へ戻るリンクを置き、一覧と記事で読みやすいタイポグラフィを使い分ける。

## 検証

- 開発・記事作成・検証・ビルド・デプロイの手順と確認先は README.md に集約する。
- Vitest で一覧の抽出・並び順をテストする。
- ESLint の推奨ルールと Astro / TypeScript 向けルールで静的解析する。
- `astro check` で Astro と TypeScript の型検査を行う。
- `astro build` で静的生成を確認する。
- 生成後の HTML / XML を統合テストし、ルーティング、記事導線、メタデータ、404、RSS、サイトマップを検証する。
- `npm run verify` で Lint、単体テスト、型検査、ビルド統合テストを一括実行する。

## デプロイ

- GitHub Actions で GitHub Pages 向け成果物をビルド・デプロイする。
- main ブランチへの push 時にテストと型検査を通し、Astro 公式 Action で成果物を作成して Pages に配備する。
- デプロイ用ビルドでは Astro のキャッシュを利用しつつ、Content Layer のキャッシュを再生成して記事の移動・削除前のパスを持ち越さない。
- Pull Request では Lint、テスト、型検査、静的ビルドを実行し、デプロイは行わない。
- Node.js 24 を CI の実行環境とする。
