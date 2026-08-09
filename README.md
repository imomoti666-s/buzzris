# バズリス v0.30.0 GITHUB REBUILD

BuzzrisのGitHub正本。外部ランタイムへ依存しない、単一HTML中心の静的PWAです。

## v0.30.0

- 新キャラクター「灰鳴兄弟」を追加
- 無名の配信者・imomoti・灰鳴兄弟に固有カードを各5枚（計15枚）追加
- 各キャラの固有カード2枚を標準デッキへ追加
- 残り3枚をキャラ片2 / 3 / 5で恒久解放できるように変更
- 灰鳴兄弟の兄札・弟札交互コンボ「足跡」を追加
- 「信頼の積み上げ」の毎ターン🛡️+1が実際に発動しない問題を修正
- セーブ形式を30へ移行し、v0.27.8以前のセーブを自動修復

## ローカル起動

Node.js 20以降を推奨します。最初に開発用テスト依存を取得します。

```bash
npm ci
npm test
npm run build
npm run serve
```

`http://localhost:4173` を開くとプレイできます。

## 構成

- `index.html` — ゲーム本体
- `assets/imomoti.png` — キャラクター画像（HTML内の重複埋め込みから分離）
- `icons/` — 「スマホを操作するimomoti」のPWAアイコン（192 / 512 / maskable）
- `manifest.webmanifest` — PWAメタデータ
- `service-worker.js` — オフラインキャッシュ
- `CARD_AUDIT_v0_30_0.md` — 61枚・固有カード・セーブschemaの監査記録
- `tests/smoke.mjs` — カード・キャラ・灰鳴コンボの静的/動作スモークテスト
- `scripts/build.mjs` — `dist/`生成
- `.github/workflows/ci.yml` — Private Actions上のテスト・ビルド

GitHub Pagesは自動公開しません。リポジトリとActions artifactはPrivate設定を前提にしています。

## ホーム画面への追加

HTTPSで公開したURLをAndroid版Chromeで開き、メニューから「アプリをインストール」または「ホーム画面に追加」を選びます。インストール後は「スマホを操作するimomoti」のアイコンで、アドレスバーのない単独画面として起動します。
