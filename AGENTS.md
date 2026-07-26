# AI Agent Guidelines (`AGENTS.md`)

## 規約・ガイドライン (Coding Guidelines)

### コンポーネント構成ルール

コンポーネントを作成・編集して作業を行う際は、**コンポーネント名のフォルダを作成し、その配下に `index` ファイル（`index.tsx` や `index.css` など）を作成**して作業を行ってください。

```text
src/components/
└── ComponentName/
    ├── index.tsx
    └── index.css (必要に応じて)
```

### CSS 設計ルール（RSCSS）

CSS は [RSCSS](https://rscss.io/) に遵守して記述してください。

- **Component**: 2 単語以上をハイフンで繋いだクラス名にする（例: `.search-form`, `.motion-path`）
- **Element**: コンポーネント内の要素は 1 単語のクラス名にし、直下セレクタ `>` で指定する（例: `.search-form > .field`）。複数単語が必要な場合はハイフンを使わず連結する（例: `.firstname`）
- **Variant**: バリエーションはハイフン始まりのクラス名にする（例: `.-small`, `.-active`）
- **Helper**: ヘルパークラスはアンダースコア始まりにする（例: `._unmargin`）
- ネストは深くしすぎない（Element のネストは 1 階層まで）。タグセレクタではなくクラスセレクタを使う

CSS Modules を使用する場合の補足:

- Element / Variant のクラス名参照は `styles['field']` や `styles['-small']` のようにブラケット記法で行う（ハイフン始まりのクラス名はドット記法で参照できないため）
