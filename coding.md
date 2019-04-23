# class命名規則
MindBEMding（参考：<http://blog.ruedap.com/2013/10/29/block-element-modifier>）を採用し、  
ローワーキャメルケース（lowerCamelCase）を推奨。  

ただし、blockにmodifierが付く場合、  
.block--modifier__element  
のようにはせず、  
.block--modifier .block__element  
のように、1つのmodifierでコントロールすることを基本とする（class名が煩雑になるのを避けるため）。  

class上でelementを続けること（例：.block__element__element...）は極力避ける。  
スコープさえ切れていれば、内部のclassは汎用的・シンプルなもの（例：.block__element .text等）で問題ないはず。  
同スコープ内で重複するclassが存在する／しうる場合、classやセレクタを工夫するか、あるいはcomponentとして切り出したほうがよい可能性もあるので、適宜判断すること。  

また、jsで制御する状態変化のclassは、ハイフン始まりのclass名の使用を推奨する（例：.block__element.-active など）。  

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
