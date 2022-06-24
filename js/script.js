$(function() {
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });

        //削除時の警告文制御
	// .js-deleteをクリックしたら
    $('.js-delete').click(function () {

        // home.htmlのname1 idから氏名欄の文字列を取得
        var name = $("#name").text();

        if (confirm(name + 'の情報を本当に削除してもよろしいですか？')) {
            // 「OK」をクリックした際の処理を記述
            return true;
        } else {
            //キャンセルした場合
            //何も起きない
            return false;
        }
    });

    //validation
    $('#insertForm').validate({
        rules: {
            img: {
                extension: 'jpg|png' 
            },
            name: {
                required: true
            },
            gender: {
                required: true
            },
            dept: {
                required: true
            },
            birth: {
                required: true,
                date: true 
            },
            email: {
                required: true,
                email: true 
            },
            tel: {
                required: true,
                digits: true
            },
            address: {
                required: true
            },
        },
        messages: {
            img: {
                extension: 'jpg/pngの画像をアップロードしてください'
            },
            name: {
                required: 'お名前を入力してください'
            },
            gender: {
                required: '選択してください'
            },
            dept: {
                required: '選択してください'
            },
            birth: {
                required: '生年月日を入力してください',
                date: '生年月日を正しく入力してください'
            },
            email: {
                required: 'メールアドレスを入力してください',
                email: 'メールアドレスを正しく入力してください'
            },
            tel: {
                required: '電話番号を入力してください',
                digits: '電話番号を正しく入力してください'
            },
            address: {
                required: '住所を入力してください'
            },
        },
    });
});