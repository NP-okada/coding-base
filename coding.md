# class命名規則
MindBEMding（参考：<http://blog.ruedap.com/2013/10/29/block-element-modifier>）を採用し、
ローワーキャメルケース（lowerCamelCase）を推奨。  
ただし、blockにmodifierが付く場合、  
.block--modifier__element  
のようにはせず、  
.block--modifier .block__element  
のように、1つのmodifierでコントロールすることを基本とする（class名が煩雑になるのを避けるため）。  

elementが入れ子になり、  
.block__element__element...  
のようになっていく場合、  
.block__elementElement...  
としてelementを一塊にするパターンや、親のelement以下でclass名が被らないと判断できる場合には、  
class名を継承しないパターン（例：.block__element .element）も可とする。  
入れ子が深くなる場合、moduleあるいはcomponentとして切り出せる可能性もあるので、  
適宜判断すること。  
classはあくまでblockやelementに対する関係性を示すものとして扱い、例えばinner的なdivが必要になった場合も、親が.block__element__innerだからといって、子要素のclassを.block__element__inner__...として継承する必要はない（通常innerとの関係性は持たないはずなので）。

また、jsによって状態を変化させる場合は、状態を示す「.is-」プレフィックスのclass名の使用を推奨する（例：.block__element.is-active）。

# CSS設計
[FLOCSS](https://github.com/hiloki/flocss)をベースとするが、  
Component→Module  
Project→Component  
とし、それぞれプレフィックスを「.m-」「.c-」とする。  
そしてPageレイヤーを追加し、こちらのプレフィックスを「.p-」とする（基本的にbodyに付与する想定）。  
Pageレイヤーの使いどころ・利点は、ページ固有のパーツをコンポーネント化せずに作れること。  
これによって、コンポーネントが必要以上に増えることを避け、classの命名やその管理の負荷を軽減する狙いがある。  
テンプレートレベルの共通パーツをこのレイヤーで定義することもできる（例は後述）が、  
基本的にはコンポーネント化すべきと考える。

例）
NEWS一覧とNEWS詳細で使うパーツがある場合に、共通のPageレイヤーclassを  
.p-news  
として  
.p-news .sidebar  
のようなパーツを定義し、一覧・詳細をそれぞれ  
.p-news.p-newsList  
.p-news.p-newsDetail  
のようなマルチclassにして利用するなど。

# CSSプロパティ記述順
表示に対する影響が大きい（と思われる）順  
1. 表示系（display、opacity、visibilityなど）  
1. 配置系（float、position、topなど）  
1. ボックスモデル系（margin、padding、widthなど）  
1. 背景・ボックス装飾系（background、box-shadowなど）  
1. フォント系（font-size、line-heightなど）  
1. その他（animation、transformなど）  

とする。
それぞれの系統内ではアルファベット順を基本とするが、例外として、  
ボックスモデル系は外側から  
margin、border、padding、width、heightの順で指定し、  
フォント系は配置に関係する  
text-align、vertical-alignなどを先に記述する。