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
入れ子が深くなる場合、moduleあるいはcomponentとして切り出せる可能性もあるので、適宜判断すること。  

ちなみに、classはあくまでblockやelementに対する関係性を示すものとして扱う。  
例えばレイアウトの都合でinner的なdivが必要になった場合も、親が  
.block__element__inner  
だからといって、子要素のclassを  
.block__element__inner__...  
として継承する必要はない（通常innerとの関係性は持たないはずなので）。  

また、jsによるclass制御で状態を変化させる場合は、ハイフン始まりのclass名の使用を推奨する（例：.block__element.-active など）。  

# CSS設計
[FLOCSS](https://github.com/hiloki/flocss)をベースとするが、  
新たにPageレイヤーを追加し、こちらのプレフィックスを「.pg-」とする（基本的にbodyに付与する想定）。  
Pageレイヤーの使いどころ・利点は、ページ固有のパーツをコンポーネント化せずに作れること。  
これによって、コンポーネントが必要以上に増えることを避け、classの命名やその管理の負荷を軽減する狙いがある。  
テンプレートレベルの共通パーツをこのレイヤーで定義することもできる（例は後述）が、  
基本的にはコンポーネント化すべきと考える。  

例）  
NEWS一覧とNEWS詳細で使うパーツがある場合に、共通のPageレイヤーclassを  
.pg-news  
として  
.pg-news .sidebar  
のようなパーツを定義し、一覧・詳細をそれぞれ  
.pg-news.pg-newsList  
.pg-news.pg-newsDetail  
のようなマルチclassにして利用するなど。  
（この例でコンポーネント化する場合、.c-newsSidebarとなる）  

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
また、beforeおよびafter疑似要素ではcontentは必須プロパティなので、忘れないよう最初に記述することとする。  
