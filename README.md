# コーディングベース
作業フォルダはsrc以下です。
dist以下のファイルはタスク実行で生成されるので基本的に触る必要はありません。

## できること
- pugからhtmlを生成
- sassのコンパイル（+ベンダープレフィックスの自動付与）
- ES2015の文法で書いたjsのトランスパイル（Babel）
- jsのバンドル（webpack）
- ローカルサーバー起動+ライブプレビュー（Browsersync）

## フォルダ構成
```
.
├── dist
├── index.html                   : ページ一覧
└── src
    ├── assets
    │   ├── images               : CSSで使用する画像を格納
    │   ├── js
    │   │   ├── entry.js
    │   │   ├── import           : importするjsを格納
    │   │   │   ├── common.js    : 共通系の関数を定義
    │   │   │   ├── component.js : 「コンポーネント（.c-）」レイヤーのjsを定義
    │   │   │   ├── global.js    : import以下のjs間で参照できる変数・関数を定義（「g」オブジェクトとして参照）
    │   │   │   ├── other.js     : その他パーツのjsを定義
    │   │   │   └── project.js   : 「プロジェクト（.p-）」レイヤーのjsを定義
    │   │   └── vendor           : プラグインjsを格納
    │   └── scss
    │       ├── _f_base.scss     : ベースCSS
    │       ├── _f_mv.scss       : mixinおよび変数を定義
    │       ├── _f_reset.scss    : リセットCSS
    │       ├── _keyframes.scss  : keyframesを定義
    │       ├── _l_footer.scss   : フッターのスタイルを定義
    │       ├── _l_header.scss   : ヘッダーのスタイルを定義
    │       ├── _l_other.scss    : その他「レイアウト（.l-）」レイヤーのスタイルを定義
    │       ├── _o_component.scss: 「コンポーネント（.c-）」レイヤーのスタイルを定義
    │       ├── _o_other.scss    : その他パーツのスタイルを定義
    │       ├── _o_project.scss  : 「プロジェクト（.p-）」レイヤーのスタイルを定義
    │       ├── _o_utility.scss  : 「ユーティリティ（.u-）」レイヤーのスタイルを定義
    │       ├── _pg.scss         : 「ページ（.pg-）」レイヤーのスタイルを定義
    │       ├── style.scss       : 各scssをimport
    │       └── vendor           : プラグインCSSを格納
    ├── images                   : ページ（コンテンツ）の画像を格納
    └── inc
        ├── _footer.pug          : フッター
        ├── _head.pug            : head内要素
        ├── _header.pug          : ヘッダー
        ├── _layout.pug          : ページの雛形
        ├── _mixin.pug           : mixinを定義
        └── _vars.pug            : 共通変数を定義
```

## コマンド
### npm start
gulpのデフォルトタスクを実行

### npm run gulp build
ビルド（リリース時はgulpfile.js内のmodeを'production'に変えるか、オプション指定'--mode prod'で実行してください）

## gulpに関する注意点
gulpの監視対象ファイルはgulpタスク起動時点で存在しているファイルです。  
ファイルの追加・更新が反映されない場合、Ctrl+Cでタスクを停止し、再度タスクを起動してください。

## コーディングに関して
coding.mdを参照ください。
