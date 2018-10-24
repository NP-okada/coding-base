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

## gulpに関する注意点
gulpの監視対象ファイルはgulpタスク起動時点で存在しているファイルです。  
ファイルの追加・更新が反映されない場合、Ctrl+Cでタスクを停止し、再度タスクを起動してください。

## コーディングに関して
### class命名規則
MindBEMding（参考：<http://blog.ruedap.com/2013/10/29/block-element-modifier>）を採用し、
ローワーキャメルケース（lowerCamelCase）を推奨。  
ただし、blockにmodifierが付く場合、  
.block--modifier__element  
のようにはせず、  
.block--modifier .block__element  
のように、1つのmodifierでコントロールすることを基本とする（class名が煩雑になるのを避けるため）。  

elementが入れ子になり、  
.block__element__element...  
のようになっていく場合、  
.block__elementElement...  
としてelementを一塊にするパターンや、親のelement以下でclass名が被らないと判断できる場合には、  
class名を継承しないパターン（例：.block__element .element）も可とする。  
入れ子が深くなる場合、moduleあるいはcomponentとして切り出せる可能性もあるので、  
適宜判断すること。  
classはあくまでblockやelementに対する関係性を示すものとして扱い、例えばinner的なdivが必要になった場合も、親が.block__element__innerだからといって、子要素のclassを.block__element__inner__...として継承する必要はない（通常innerとの関係性は持たないはずなので）。

また、jsによって状態を変化させる場合は、状態を示す「.is-」プレフィックスのclass名の使用を推奨する（例：.block__element.is-active）。

### CSS設計
[FLOCSS](https://github.com/hiloki/flocss)をベースとするが、  
Component→Module  
Project→Component  
とし、それぞれプレフィックスを「.m-」「.c-」とする。  
そしてPageレイヤーを追加し、こちらのプレフィックスを「.p-」とする（基本的にbodyに付与する想定）。  
Pageレイヤーの使いどころ・利点は、ページ固有のパーツをコンポーネント化せずに作れること。  
これによって、コンポーネントが必要以上に増えることを避け、classの命名やその管理の負荷を軽減する狙いがある。  
テンプレートレベルの共通パーツをこのレイヤーで定義することもできる（例は後述）が、  
基本的にはコンポーネント化すべきと考える。

例）
NEWS一覧とNEWS詳細で使うパーツがある場合に、共通のPageレイヤーclassを  
.p-news  
として  
.p-news .sidebar  
のようなパーツを定義し、一覧・詳細をそれぞれ  
.p-news.p-newsList  
.p-news.p-newsDetail  
のようなマルチclassにして利用するなど。

### CSSプロパティ記述順
表示に対する影響が大きい（と思われる）順  
1. 表示系（display、opacity、visibilityなど）  
1. 配置系（float、position、topなど）  
1. ボックスモデル系（margin、padding、widthなど）  
1. 背景・ボックス装飾系（background、box-shadowなど）  
1. フォント系（font-size、line-heightなど）  
1. その他（animation、transformなど）  

とする。
それぞれの系統内ではアルファベット順を基本とするが、例外として、  
ボックスモデル系は外側から  
margin、border、padding、width、heightの順で指定し、  
フォント系は配置に関係する  
text-align、vertical-alignなどを先に記述する。
