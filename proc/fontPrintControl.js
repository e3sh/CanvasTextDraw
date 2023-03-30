// FontPrintControl
// Utf16 String Draw Text

function fontPrintControl( screen, asciiPtn, aw, ah, KanjiPtn, kw, kh ) {
 
    const buffer_ = screen.buffer;
    
    //var p_ch_ptn = fontParam.pattern;

    const pica = new Image();
    pica.src = asciiPtn;


    const pick = new Image();
    pick.src = KanjiPtn;

    function charCodeToLoc(code){

        let kanjif = false;
        let x, y, w, h;

        w = 4;
        h = 12;

        if (code < 128){
            x = Math.floor(code%16)*aw;
            y = Math.floor(code/16)*ah;
            w = aw;
            h = ah;
            //ascii
        }

        if (code >= parseInt("FF60",16) 
            && code <= parseInt("FF9F",16)){

            let wn = code - parseInt("FF60",16);    

            x = Math.floor(wn%16)*aw;
            y = Math.floor(wn/16)*ah + (ah*10);
            w = aw;
            h = ah;
            //半角カナ
        } 

        if (UTFconv[code] !== void 0){
        //    ws += "(" + UTFconv[n].x + "." + UTFconv[n].y + ")" ;
        //}
        //for (let j in utfkuten ){
        //    let u = utfkuten[j];
        //    if (code == u.U){
                //ws += "(" + u.K + "." + u.T + " " + u.R + ")" ;
                x = UTFconv[code].x * kw;
                y = UTFconv[code].y * kh;
                w = kw;
                h = kh;
    
                kanjif = true;
        //    }
        }
   
        //graphicsPatten to hankaku zennkaku 
        //cursor x,y
        // 
        let r = {};
        r.img = kanjif? pick: pica; 
        r.x = x;
        r.y = y;
        r.w = w;
        r.h = h;

        return r;

    }

    this.testprint_a = function(x, y){
        buffer_.fillRect(x, y, 100, 100, "blue");
        //buffer_.drawImgXY(asciiPtn,x, y);
        buffer_.drawImgXY(pick,x, y);
    }

    this.testprint_k = function(x, y){
        buffer_.fillRect(x, y, 100, 100, "yellow");
        //buffer_.drawImgXY(KanjiPtn,x, y);
        buffer_.drawImgXY(pica,x, y);
        
    }

    this.mput = function(str, x, y){
        let sa = str.split("");


        for (let i = 0, loopend = str.length; i < loopend; i++) {
            let n = str.charCodeAt(i);
            
            let d = charCodeToLoc(n);

            //buffer_.fillRect(x, y, 3, 3, "green")

            //buffer_.fillText(d.x, x, y +100);
            //buffer_.fillText(d.y, x, y +116);
            //buffer_.fillText(d.w, x, y +132);

            buffer_.drawImgXYWHXYWH(
                d.img,
                d.x, d.y, d.w, d.h,
                x  , y  , d.w, d.h
            );
            x = x + d.w;
        }
        //buffer_.drawImgXY(d.img,x, y);
    }

    this.putchr = function (str, x, y, z) {
        //    dummy = function (str, x, y, z) {

        var zflag = false;

        if (!Boolean(z)) {
            z = 1.0;

        } else {
            if (z != 1.0) zflag = true;
        }

        for (var i = 0, loopend = str.length; i < loopend; i++) {
            var n = str.charCodeAt(i);

            if ((n >= 32) && (n < 128)) { // space ～ "~" まで
                var d = sp_ch_ptn[n - 32];

                var wx = x + i * (d.w * z);
                var wy = y;
                if (zflag) {
                    wx += (-d.w / 2) * z;
                    wy += (-d.h / 2) * z;
                }

                buffer_.drawImgXYWHXYWH(
                    tex_c,
                    d.x, d.y, d.w, d.h,
                    wx, wy,
                    d.w * z, d.h * z
                );
            }
        }
        //
    }

}

