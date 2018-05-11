# コーディングベース

作業フォルダはsrcです。  
dist以下のファイルはタスク実行で生成されるので基本的に触る必要はありません。

## できること
- pugからhtmlを生成
- sassのコンパイル（+ベンダープレフィックスの自動付与）
- ES2015の文法で書いたjsのトランスパイル（Babel）
- jsのバンドル（webpack）
- ローカルサーバー起動+ライブプレビュー（Browsersync）

## コマンド

### npm start
gulpのデフォルトタスクを実行

### npm run gulp build
ビルド（リリース時はgulpfile.js内のmodeを'production'に変えて実行してください）

### npm run gulp copyImage
src以下のimagesフォルダに入っているファイルをdist以下にコピー（もちろん監視中は自動実行）
