$(function () {

    //郵便番号の入力時に実行
    $('#zip').change(function () {

        //WEB API取得
        $.getJSON('http://zipcloud.ibsnet.co.jp/api/search?callback=?',
            {
                zipcode:$('#zip').val()
            }
        )
        //結果を取得してからの処理
        .done(function (data) {
            //中身が空でなければその値を住所欄に反映
            if (data.results) {
                var result = data.results[0];
                $('#address').val(result.address1 + result.address2 + result.address3);
            } 
            // else {
            //     $('#address').val('該当する住所が存在しません。')
            // }
        })
    });
});