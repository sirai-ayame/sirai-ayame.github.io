# sirai-ayame.github.io

このリポジトリでは紫蕾アヤメの個人ページを開発しています。
Astro、TypeScript、MDXで静的なブログを生成し、GitHub Pagesで公開します。

## 必要な環境

- Node.js 24（最低対応バージョンは22.23.4）
- npm

利用するNode.jsのメジャーバージョンは[.node-version](.node-version)にも記載しています。

## セットアップ

依存関係をlockfileどおりにインストールします。

```sh
npm ci
```

## ローカル開発

開発サーバーを起動します。

```sh
npm run dev
```

起動後、通常は以下のURLで確認できます。

- ブログトップ: <http://localhost:4321/blog>
- サンプル記事: <http://localhost:4321/blog/hello/>
- RSS: <http://localhost:4321/rss.xml>

開発サーバーの状態確認と停止には、次のコマンドを使用します。

```sh
npm run dev -- status
npm run dev -- stop
```

## 記事の作成

次のコマンドで`src/content/blog/<slug>.mdx`に下書きを作成します。

```sh
npm run new:post -- mountain-walk "山を歩いた記録"
```

slugには英小文字と数字を使用し、単語はハイフンまたはアンダースコアでつなぎます。同名の記事は上書きされません。

生成されたMDXの`description`と本文を編集し、公開時にfrontmatterの`draft`を`false`へ変更します。production build、RSS、サイトマップには下書きが含まれません。

記事で使用する主なfrontmatterは以下のとおりです。

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `title` | はい | 記事タイトル |
| `description` | はい | 一覧やメタデータに使用する概要 |
| `publishedAt` | はい | 公開日 |
| `updatedAt` | いいえ | 更新日 |
| `draft` | いいえ | `true`の場合はproduction buildから除外 |

## Lint・テスト・型検査

それぞれ個別に実行できます。

```sh
npm run lint
npm test
npm run check
```

- `npm run lint`: AstroとTypeScriptをESLintで静的解析します。
- `npm test`: 記事の抽出・並び順や記事テンプレートの単体テストを実行します。
- `npm run check`: AstroとTypeScriptの型検査を実行します。

## ビルドと生成結果の確認

production用の静的ファイルを`dist/`へ生成します。

```sh
npm run build
```

ビルド結果をローカルサーバーで確認します。

```sh
npm run preview
```

起動後、通常は<http://localhost:4321/blog>で確認できます。

プレビューサーバーの状態確認と停止には、次のコマンドを使用します。

```sh
npm run preview -- status
npm run preview -- stop
```

ルーティング、記事導線、メタデータ、404、RSS、サイトマップまで含めてビルド結果を自動確認する場合は、次を実行します。

```sh
npm run test:site
```

変更をcommitする前の一括確認には、以下を使用できます。

```sh
npm run lint && npm test && npm run check && npm run test:site
```

主な生成物は以下です。

- `dist/index.html`: `/blog`へのリダイレクト
- `dist/blog/index.html`: ブログトップ
- `dist/404.html`: 404ページ
- `dist/rss.xml`: RSSフィード
- `dist/sitemap-index.xml`: サイトマップの索引

## デプロイ

GitHub Actionsの[Deploy to GitHub Pages](.github/workflows/deploy.yml)が、`main`ブランチへのpushを契機に次の処理を行います。

1. Lint、単体テスト、型検査、ビルド統合テスト
2. GitHub Pages用成果物のビルドとアップロード
3. GitHub Pagesへのデプロイ

初回のみ、GitHubのリポジトリ設定で`Settings` → `Pages` → `Build and deployment`のSourceを`GitHub Actions`に設定してください。

検証済みの変更を`main`へpushするとデプロイが始まります。

```sh
git push origin main
```

GitHubの`Actions`タブでワークフローの成功を確認した後、以下を確認します。

- 公開サイト: <https://sirai-ayame.github.io/>
- ブログトップ: <https://sirai-ayame.github.io/blog>
- RSS: <https://sirai-ayame.github.io/rss.xml>
- サイトマップ: <https://sirai-ayame.github.io/sitemap-index.xml>

Pull Requestでは[Verify pull request](.github/workflows/ci.yml)が同じ品質チェックを実行しますが、デプロイは行いません。

