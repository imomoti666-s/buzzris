# バズリス v0.27.8 静的カード監査

- カード総数: **46**
- ID重複: **0**
- 必須定義・基礎式エラー: **0**
- 長い名称などの監視対象: **19**
- 基礎スコア式登録数: **22**

## 優先修正
- 静的検査では致命的エラーなし。

## 可読性監視
- fan_thanks: 長い名称「フォロワー感謝文」(8文字)
- flame_condenser: 長い名称「炎上コンデンサー」(8文字)
- fan_seed: 長い名称「固定ファンの芽生え」(9文字)
- algorithm_learning: 長い名称「アルゴリズム学習」(8文字)
- grantz_05_kind_reply_chain: 長い名称「やさしい返信連鎖」(8文字)
- grantz_07_profile_polish: 長い名称「プロフィール整備」(8文字)
- idea_notebook: cannotText未設定
- quick_meme: cannotText未設定
- reuse_rejected_idea: cannotText未設定
- masterpiece_post: cannotText未設定
- idea_chain: cannotText未設定
- midnight_inspiration: cannotText未設定
- polite_reply: cannotText未設定
- fire_extinguish_line: cannotText未設定
- official_statement: cannotText未設定
- honest_addendum: cannotText未設定
- build_trust: cannotText未設定
- safe_signal_boost: 長い名称「安全圏からの拡散」(8文字)
- safe_signal_boost: cannotText未設定

## 全カード

| ID | カード名 | コスト | 効果 | 基礎式 |
|---|---|---:|---|---|
| `casual_post` | 💬 何気ない投稿 | 1 | 👍 +120 | 登録済 |
| `self_deprecate` | 🥲 軽い自虐 | 1 | 👍 +80 / 🤝 +1 | 登録済 |
| `creative_wip` | 🎨 創作進捗 | 1 | 👍 +100 / 🤝毎 +60 | 登録済 |
| `midnight_truth` | 🌙 深夜の本音 | 1 | 📣 +0.4 / 🔥 +1 | 直接スコアなし |
| `food_pic` | 🍔 飯テロ画像 | 1 | 👍 +160 / 次👍 +80 | 登録済 |
| `quote_boost` | 🔁 引用で伸びる | 1 | 枚数×140👍 | 登録済 |
| `rage_bait` | 😈 逆張りコメント | 2 | 👍 +400 / 🔥 +2 | 登録済 |
| `fan_thanks` | 🙏 フォロワー感謝文 | 1 | 現👍15% / 🤝 +1 | 登録済 |
| `algorithm_wave` | 📡 おすすめ欄の波 | 2 | 📣×350 / 🔥で+350 / 📣+0.1 | 登録済 |
| `locked_account` | 🔒 鍵アカの漏れ声 | 1 | 🤝 +2 / 🔥3で+900 | 登録済 |
| `viral_combo` | ✨ 妙に刺さる一言 | 1 | 👍 +200 / 🤝3で📣 | 登録済 |
| `black_history` | 🗂️ 黒歴史再掲 | 1 | 🔥×300👍 / 🔥 +1 | 登録済 |
| `spark_quote` | 🔥 火種の引用 | 0 | 🤝-1 / 🔥+2 / 1ドロー | 直接スコアなし |
| `excuse_calm` | 💧 鎮火の言い訳 | 0 | 🔥-1 / 🤝+2 / 1ドロー | 直接スコアなし |
| `empathy_booster` | 🤝 共感ブースター | 2 | 🤝半減 / 次効果×2 | 直接スコアなし |
| `flame_condenser` | 📣 炎上コンデンサー | 0 | 🔥3以上 / 🔥全消費 / 次👍+150/🔥 | 直接スコアなし |
| `empathy_advance` | 📆 共感の前借り | 0 | 🤝-1 / 1ドロー / 次T⚡+1 | 直接スコアなし |
| `fan_seed` | 🌱 固定ファンの芽生え | 2 | 1回限り / 🤝+2 / 毎T🤝+1 | 直接スコアなし |
| `flame_cheat` | 🦶 炎上踏み倒し | 0 | 🔥-1 / 次⚡0 | 直接スコアなし |
| `auto_flame_seed` | 🌋 火種の自動生成 | 2 | 1回限り / 🔥+1 / 毎T🔥+1 | 直接スコアなし |
| `regular_fans` | 👥 常連ファンの輪 | 1 | 1回限り / 毎T🤝+1 | 直接スコアなし |
| `burning_notifications` | 🔔 燃える通知設定 | 1 | 1回限り / 毎T🔥+1 | 直接スコアなし |
| `algorithm_learning` | 📈 アルゴリズム学習 | 1 | 1回限り / 📣+0.2 / 毎T📣+0.1 | 直接スコアなし |
| `echo_post` | 🔊 残響する投稿 | 1 | 1回限り / 毎T👍=目標2% | 直接スコアなし |
| `grantz_01_silent_heat` | 🫧 沈黙の熱量 | 1 | 🤝2以上 / 📣+0.3 / 1ドロー | 直接スコアなし |
| `grantz_02_spicy_clip` | ✂️ 辛口切り抜き | 1 | 🔥2以上 / 👍+500 / 🔥+1 | 登録済 |
| `grantz_03_fan_art_storm` | 🖼️ ファンアート嵐 | 2 | 🤝3以上 / 👍+900 / 🤝+1 | 登録済 |
| `grantz_04_dirty_trend` | 🕳️ 汚れたトレンド | 0 | 🔥3以上 / 🔥-2 / 📣+0.7 | 直接スコアなし |
| `grantz_05_kind_reply_chain` | 💌 やさしい返信連鎖 | 1 | 🤝+1 / 🤝分👍 | 登録済 |
| `grantz_06_comment_riot` | 💥 コメント欄暴動 | 1 | 🔥4以上 / 👍+1200 / 🔥半減 | 登録済 |
| `grantz_07_profile_polish` | 🪪 プロフィール整備 | 1 | 1回限り / 🤝+2 / 📣+0.2 | 直接スコアなし |
| `grantz_08_shadowban_break` | 🚪 シャドバン突破 | 2 | 📣1.5以上 / 👍+700 / 2ドロー | 登録済 |
| `grantz_09_secret_post` | 🗝️ 秘密の投稿 | 0 | 🤝1🔥1 / 両方-1 / 次👍+400 | 直接スコアなし |
| `grantz_10_last_push` | 👑 最後のひと押し | 2 | 👍+現10% / 📣+0.2 | 登録済 |
| `idea_notebook` | 💡 ネタ帳を開く | 1 | 💡+2 / 1ドロー | 直接スコアなし |
| `quick_meme` | 💡 即席ミーム | 0 | 💡1消費 / 👍+220 / 🤝か🔥+1 | 登録済 |
| `reuse_rejected_idea` | 🗂️ 没ネタ再利用 | 0 | 💡1消費 / 捨札1枚回収 | 直接スコアなし |
| `masterpiece_post` | 🎯 渾身の投稿 | 2 | 💡3消費 / 👍+950 | 登録済 |
| `idea_chain` | 🔗 ネタの連鎖反応 | 1 | 💡2消費 / 2ドロー / 次👍+180 | 直接スコアなし |
| `midnight_inspiration` | 🌙 深夜のひらめき | 1 | 💡+1 / 📣+0.2 / 🔥2以上で💡+2 | 直接スコアなし |
| `polite_reply` | 🛡️ 丁寧な返信 | 1 | 🛡️+2 / 🤝+1 | 直接スコアなし |
| `fire_extinguish_line` | 💧 火消しの一文 | 1 | 🛡️1消費 / 🔥-2 / 👍+300 / 🛡️+1 | 登録済 |
| `official_statement` | 📜 公式声明 | 2 | 🛡️2消費 / 🔥を0 / 🔥×120👍 / 次炎上-25% | 登録済 |
| `honest_addendum` | 📝 誠実な追記 | 1 | 🛡️+1 / 次に増える🔥を2軽減 / 1ドロー | 直接スコアなし |
| `build_trust` | 🏛️ 信頼の積み上げ | 2 | 1回限り / 🛡️+3 / 毎T🛡️+1 | 直接スコアなし |
| `safe_signal_boost` | 🛡️ 安全圏からの拡散 | 2 | 🛡️3消費 / 👍+650 / 📣+0.2 / 🔥0なら👍+400 | 登録済 |
