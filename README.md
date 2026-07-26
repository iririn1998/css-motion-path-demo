# CSS Motion Path Demo

CSS Motion Path（`offset-*` プロパティ群）を学ぶためのデモプロジェクトです。
SVG で描いた円形のコースに沿って、車（`Car` コンポーネント）が走り続けるアニメーションを実装しています。

- デモ本体: [`src/components/MotionPathDemo/index.tsx`](src/components/MotionPathDemo/index.tsx)
- スタイル: [`src/components/MotionPathDemo/index.module.css`](src/components/MotionPathDemo/index.module.css)

## 起動方法

```bash
npm install
npm run dev
```

---

# CSS Motion Path とは

**CSS Motion Path** は、要素を「任意の経路（パス）に沿って」移動・回転させるための CSS 仕様です（[MDN: CSS モーションパス](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_motion_path)）。

従来、曲線に沿った移動を CSS だけで実現するのは困難で、以下のような手段しかありませんでした。

- `transform: translate()` を `@keyframes` で細かく刻む（近似にしかならない）
- SMIL（SVG の `<animateMotion>`）を使う（SVG 限定・非推奨傾向）
- JavaScript ライブラリ（GSAP の MotionPathPlugin など）を使う

Motion Path を使うと、**SVG のパスデータをそのまま CSS に渡して**、ブラウザネイティブのアニメーションとして経路移動を実現できます。GPU 合成が効くため、パフォーマンス面でも有利です。

## プロパティ一覧

| プロパティ | 役割 |
| --- | --- |
| `offset-path` | 移動する経路そのものを定義する |
| `offset-distance` | 経路上のどの位置にいるか（始点からの距離）を指定する |
| `offset-rotate` | 経路上での要素の向き（回転）を制御する |
| `offset-anchor` | 要素のどの点をパス上に乗せるかを指定する |
| `offset-position` | パスの開始位置（`ray()` などで使用）を指定する |
| `offset` | 上記をまとめて指定するショートハンド |

### 1. `offset-path` — 経路の定義

移動経路を指定します。指定した瞬間、要素はパスの始点に「吸い付き」ます。

```css
/* SVG パスデータをそのまま指定（最もよく使う） */
offset-path: path("M 400,75 A 150,150 0 1,1 400,375 A 150,150 0 1,1 400,75 Z");

/* 基本図形関数も使える */
offset-path: circle(150px at center);
offset-path: inset(10% round 20px);
offset-path: polygon(0 0, 100% 0, 100% 100%);

/* 角度と距離で直線を定義する ray() */
offset-path: ray(45deg closest-side);

/* SVG 内の要素を参照 */
offset-path: url(#my-path);

/* 参照ボックスを基準にした周回（パディングボックスの外周など） */
offset-path: border-box;
```

> **注意:** `path()` の座標は**要素の座標系の原点（包含ブロックの左上）基準の絶対座標**です。パーセンテージは使えず、レスポンシブにしづらいのが弱点です。このデモでは SVG の `viewBox` 内に要素を置くことで、SVG のスケーリングに追従させています。

### 2. `offset-distance` — 経路上の位置

パスの始点からどれだけ進んだかを指定します。**アニメーションさせるのは通常このプロパティ**です。

```css
offset-distance: 0%;    /* パスの始点 */
offset-distance: 50%;   /* パスの中間地点 */
offset-distance: 100%;  /* パスの終点 */
offset-distance: 120px; /* 長さでの指定も可能 */
```

`@keyframes` で `0%` → `100%` を変化させると、要素がパスを一周します。

```css
@keyframes drive {
  0%   { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```

### 3. `offset-rotate` — 進行方向への回転

経路上での要素の向きを制御します。

```css
offset-rotate: auto;         /* 進行方向を向く（デフォルト）。車や飛行機に最適 */
offset-rotate: reverse;      /* 進行方向の逆を向く（auto 180deg と同じ） */
offset-rotate: 0deg;         /* 回転しない（常に同じ向き）。人のアイコンなどに */
offset-rotate: auto 90deg;   /* 進行方向 + 90度のオフセット */
```

このデモの車は `offset-rotate: auto` により、円周のカーブに合わせて常に進行方向を向きます。

### 4. `offset-anchor` — パスに乗せる「点」の指定

デフォルトでは要素の中心（`transform-origin` 相当、通常 `50% 50%`）がパス上に乗ります。別の点を乗せたい場合に使います。

```css
offset-anchor: center;      /* デフォルト相当 */
offset-anchor: bottom left; /* 左下の角がパス上をなぞる */
offset-anchor: 50% 100%;    /* 下辺の中央 */
```

> **ブラウザ対応の注意:** `offset-anchor` は Safari で長らく未対応でした。このデモでは互換性のため `offset-anchor` を使わず、SVG の `<g transform="translate(-30, -13)">` で車のサイズ（60×26）の半分だけずらして中心をアンカー点に合わせています。

### 5. `offset-position` — パスの開始位置

`ray()` のようにパス自体が位置を持たない場合の始点や、`url()` 参照時の初期位置を指定します。

```css
offset-position: auto;      /* 要素本来の位置から開始 */
offset-position: 50% 50%;   /* 包含ブロックの中央から開始 */
```

### 6. `offset` — ショートハンド

```css
/* offset: <position> <path> <distance> <rotate> / <anchor> */
offset: path("M 0,0 C 50,100 100,-50 150,0") 25% auto 90deg;
offset: ray(45deg) 100px / bottom right;
```

---

# このデモの仕組み

## パスデータの共有

デモの肝は、**同じ SVG パスデータ文字列を「見えるコースの描画」と「車の offset-path」の両方に使っている**点です。

```tsx
const PATH_DATA = "M 400,75 A 150,150 0 1,1 400,375 A 150,150 0 1,1 400,75 Z";

// 1. コースとして描画（点線の円）
<path d={PATH_DATA} fill="none" stroke="#999" strokeDasharray="6 6" />

// 2. 車の移動経路として指定
<g style={{ offsetPath: `path('${PATH_DATA}')` }}>
```

これにより「見えている線の上を正確になぞる」ことが保証されます。

## パスデータの読み解き（SVG パス構文）

`M 400,75 A 150,150 0 1,1 400,375 A 150,150 0 1,1 400,75 Z`

| コマンド | 意味 |
| --- | --- |
| `M 400,75` | (400, 75) へペンを移動（Move to）。ここがパスの始点 = `offset-distance: 0%` の位置 |
| `A 150,150 0 1,1 400,375` | 半径 150 の円弧（Arc）で (400, 375) まで描く。`1,1` は「大きい方の弧・時計回り」フラグ |
| `A 150,150 0 1,1 400,75` | 同じく円弧で始点 (400, 75) に戻る |
| `Z` | パスを閉じる（Close path） |

SVG の `A`（円弧）コマンド 1 つでは半円までしか表現できないため、**半円 2 つをつないで完全な円**を作っています。中心 (400, 225)・半径 150 の円になります。

## アニメーション定義

```css
.car {
  offset-rotate: auto;                 /* カーブに合わせて車の向きを変える */
  animation: drive 6s linear infinite; /* 6秒で一周、等速、無限ループ */
}

@keyframes drive {
  0%   { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```

`linear` を指定しているのは、周回アニメーションでイージング（`ease` など）がかかると、一周ごとに加減速して不自然になるためです。

## 中心合わせのテクニック

```tsx
<g className={styles.car} style={{ offsetPath: `path('${PATH_DATA}')` }}>
  {/* 車の中心（60x26の半分）をパス上のアンカーに合わせる */}
  <g transform="translate(-30, -13)">
    <Car />
  </g>
</g>
```

`offset-path` はアンカー点（ここでは `<g>` の原点）をパス上に置きます。車の描画は原点から右下方向 60×26 の領域に広がっているため、内側の `<g>` を **(-30, -13) = サイズの半分だけ逆方向に平行移動**して、車の中心がパスをなぞるようにしています（`offset-anchor` の代替）。

---

# 知っておくと良いこと

## `transform` との関係

`offset-*` による変形は、CSS の変形スタックの中で `transform` プロパティの**前**に適用されます。つまり `offset-path` を使いながら `transform: scale(1.2)` などを重ねがけできます。順序のイメージ:

```text
translate → rotate → scale → offset(パス移動+回転) → transform
```

また、`offset-path` を指定した要素は自動的に**スタッキングコンテキストと包含ブロック**を生成します（`transform` と同様）。`position: absolute` の子要素の基準が変わる点に注意してください。

## パフォーマンス

`offset-distance` のアニメーションは `transform` と同様にコンポジタで処理できるため、`left`/`top` をアニメーションするのと違い**リフローを発生させません**。滑らかな 60fps アニメーションが期待できます。

## アクセシビリティ

動きに敏感なユーザーのため、`prefers-reduced-motion` への配慮を検討しましょう。

```css
@media (prefers-reduced-motion: reduce) {
  .car {
    animation: none;
  }
}
```

## ブラウザ対応（2026年時点）

- `offset-path: path()` / `offset-distance` / `offset-rotate`: 全モダンブラウザ対応（Chrome 55+、Firefox 72+、Safari 16+）
- `offset-path` の基本図形（`circle()` 等）・`coord-box`・`ray()`: Chrome 116+、Firefox 122+、Safari 26+ で対応拡大
- `offset-anchor` / `offset-position`: Safari の対応が遅れていた領域（本デモが `translate` で代替している理由）

最新の対応状況は [Can I use: CSS Motion Path](https://caniuse.com/css-motion-paths) を参照してください。

## 参考リンク

- [MDN: CSS Motion Path](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_motion_path)
- [MDN: offset-path](https://developer.mozilla.org/ja/docs/Web/CSS/offset-path)
- [MDN: offset-distance](https://developer.mozilla.org/ja/docs/Web/CSS/offset-distance)
- [MDN: offset-rotate](https://developer.mozilla.org/ja/docs/Web/CSS/offset-rotate)
- [MDN: SVG パス（`d` 属性の構文）](https://developer.mozilla.org/ja/docs/Web/SVG/Tutorial/Paths)

---

# 開発環境

React + TypeScript + Vite（React Compiler 有効）で構築しています。Lint は Oxlint を使用しています。

```bash
npm run dev    # 開発サーバー起動
npm run build  # ビルド
npm run lint   # Lint 実行
```
