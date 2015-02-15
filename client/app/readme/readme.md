# R2TW: Unit Viewer


> Total War: Rome II のユニット一覧ビューアー

## はじめに

* 公式のエンサイクロペディアがビューアーとして不便すぎる
* [Royal Military Academy](http://www.honga.net/totalwar/rome2/)は素晴らしいが、それでも思ったように一覧比較しづらい
* のでビューアーを書いた

## 使い方

* ファクション別ユニット表示
 * 上メニューの`勢力別ユニット`＞右メニューの`ファクション一覧`からファクションを選択
 * ファクションの一覧は軍隊グループ毎にまとめている
 * 軍隊グループ毎に使用可能なユニットが決められているので、同じ行のファクションは基本的に同じユニットになる
 * そこにファクション固有のユニットやファクション固有の傭兵がいくつか加わる
* 全てのユニット表示
 * 上メニューの`全ユニット`を選択
 * たくさん出てくるので見づらい
* ユニットリスト
 * 項目ソートとカラム幅を任意に変更できる
 * デフォルトでは 兵科＞兵種＞雇用費 の順でソートしている。リセットボタンで戻せる
 * shift押しながら項目名をクリックすることで複数項目でのソートができる
 * グラフ表示幅の数値を変えることでグラフ表示されている項目の幅を一律変更できる
* その他説明
 * プレイアブルなファクションは大きめに表示している
 * 装備品アイコンは`audio_material`というプロパティでなんとなく分類して表示
 * 装備品アイコンにマウスを載せると詳細プロパティをtooltip表示
 * 海上ユニットと攻城兵器は今のところ表示していない（理由：陸上ユニットほど大差無い、リストが見づらくなる、単純に面倒）

## 動作環境

* Mac Chromeで確認
* だいたいモダンなブラウザなら大丈夫では
* 画面領域的にスマホは厳しい

## 既知の問題点や対応するかもしれないこと

* ファクション固有の傭兵表示
* 雇用条件の建物レベル表示
* 騎兵のプロパティを表示
* 傭兵一覧表示
* ユニットタイプ毎の表示フィルタリング
* ユニット個別情報ページ
* ユニットの属性と使用可能スキルの表示
* 任意のユニットの比較
* Attila対応（データ構造が大差無ければ…）
* ローマの補助兵周りが煩雑なのでなにかしら専用ビューを設けたい
* 表示言語切り替え

## 参考：DBスキーマ

* ユニット周りのデータ表示するだけならそんなに手間でもないだろうと思ったらいろいろ参照関係があって大変だった
* だいたいこんな風になってると把握したので、mod作りとかで参考になればと載せておきます

#### ユニット情報

* `main_units`
 * ユニットの基本情報を格納
 * Rome2では各ユニットが陸・海のユニットを持つので、実体は参照先の`land_units`, `naval_units`
 * ここでのプロパティとしては部隊人数、コストなどを格納
* `land_units`
 * 地上戦でのユニットデータ
 * 攻撃値、防御値、突撃値、追加ヒットポイント、士気、所有弾数などがここで設定されている
 * 肉体情報である`battle_entities`や、武器防具の`unit_armour_types`, `unit_shield_types`, `missile_weapons`, `melee_weapons`などへの参照を持つ
* `naval_units`
 * 海上戦のユニットデータ
 * 現状では本ビューアで取り扱ってない
 * 勢力ごとの違いもあまり無さそうだし海戦はオートで飛ばしてしまうのでちゃんと調べてない
* `battle_entities`
 * 人間や馬や動物の実体データ
 * 移動速度やヒットポイントの基本値などがここで設定されている
 * 騎兵は人体と馬のヒットポイント両方持つことになるので体力高い

#### ユニットの装備品

* `unit_armour_types`
 * 鎧のデータ
 * 装甲値と対射撃ボーナスが設定されている
* `unit_shield_types`
 * 盾のデータ
 * 装甲値と、防御スキル値、射撃ブロック率が設定されている
* `melee_weapons`
 * 白兵武器のデータ
 * AP/通常ダメージ値と、対（歩兵、騎馬、象）ボーナス、武器の長さが設定されている
* `missile_weapons`
 * 射撃武器のデータ
 * どの弾が装填されているかというだけ
* `projectiles`
 * 投射物のデータ
 * 白兵武器と同様なダメージ性能データと、その他物理情報がいろいろ設定されている


#### ファクション情報

* `factions`
 * ファクション情報
 * 所属文化と、軍隊グループの参照を持つ
* `start_pos_factions`
 * キャンペーンに使用されるファクション
* `campaigns`
 * キャンペーンの一覧

#### ユニットの雇用設定

* `units_to_groupings_military_permissions`
 * どの軍隊グループがどのユニットを雇えるかの設定
* `units_to_exclusive_faction_permissions`
 * ファクション固有で扱えるユニット設定
 * 主にルシタニ周りがちょこっとあるだけ
* `commander_unit_permissions`
 * 指揮官がどのユニットを扱えるかの設定


## 仕様

* Angular-fullstackでのMEAN構成
* 公式ツールのRome 2 Assembly kitから生データとスキーマ設定を参照してmongoDBに入れてRestAPIを作った
* リスト表示モジュールは現在開発まっただ中でunstableなAngular UI Gridを使ってるので、いろいろ不具合あるかも


----

## 使用素材

* [有志による日本語訳データ](http://www53.atwiki.jp/r2tw/pages/191.html)
* [420 Icons for RPG](http://www.pixeljoint.com/pixelart/44976.htm)
* Rome 2 Assembly kitのraw data


## 制作

* [@miyaoka](https://twitter.com/miyaoka)