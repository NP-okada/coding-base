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
    │   │   ├── import           : entry.jsでimportするjsを格納
    │   │   │   ├── common.js    : 共通系の関数を定義
    │   │   │   ├── component.js : コンポーネントレイヤー（.c-）のjsを定義
    │   │   │   ├── global.js    : import以下のjs間で参照できる変数・関数を定義（「g」オブジェクトとして参照）
    │   │   │   ├── module.js    : モジュールレイヤー（.m-）のjsを定義
    │   │   │   └── other.js     : その他パーツのjsを定義
    │   │   └── vendor           : プラグインjsを格納
    │   └── scss
    │       ├── _f_base.scss     : ベースCSS
    │       ├── _f_mv.scss       : mixinおよび変数を定義
    │       ├── _f_reset.scss    : リセットCSS
    │       ├── _l_footer.scss   : フッター
    │       ├── _l_header.scss   : ヘッダー
    │       ├── _l_other.scss    : その他「レイアウト（.l-）」レイヤーのスタイル
    │       ├── _o_component.scss: 「コンポーネント（.c-）」レイヤーのスタイル
    │       ├── _o_module.scss   : 「モジュール（.m-）」レイヤーのスタイル
    │       ├── _o_other.scss    : その他パーツ
    │       ├── _o_utility.scss  : 「ユーティリティ（.u-）」レイヤーのスタイル
    │       ├── _p_page.scss     : 「ページ（.p-）」レイヤーのスタイル
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

## 注意点
gulpの監視対象ファイルはgulpタスク起動時点で存在しているファイルです。ファイルの追加・更新が反映されない場合、Ctrl+Cでタスクを停止し、再度タスクを起動してください。
