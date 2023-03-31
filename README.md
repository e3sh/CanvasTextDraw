# CanvasTextDraw

HTML5のcanvas要素にimageとして(日本語)テキストを描画する。<br>
https://e3sh.github.io/CanvasTextDraw/draw.htm
　　　
## プロジェクトの概要

CanvasTextDrawは、ビットマップの日本語フォントで<br>
canvas上にテキストを描画するために作成しました。

## プロジェクトの使い方

内容としては、<br>
フォントのimageから目的の文字を切り抜いてdrawImageで表示します。<br><br>

使用方法ですが、作成中で自分用なので制限多いです。<br>
### 宣言

```Javascript
    fprint = new fontPrintControl(
        使用するDisplayControl,
        半角文字用の画像ファイル名,半角の横幅, 縦幅,
        全角文字用の画像ファイル名,全角の横幅, 縦幅
    );
```

### 呼び出し方

```Javascript
    //str:文字列, x,y:表示座標
    fprint.mput(str, x, y);
    
    //str:文字列, x,y:表示座標　z:倍率
    fprint.putchr(str, x, y, z);
```
て感じです。

##

こちらの12ｘ8dotのフォントを利用しています。<br>
https://littlelimit.net/font.htm

8bitパソコンっぽい画面を表示できて良い感じです。<br>

2023/03/31# CanvasTextDraw
 
