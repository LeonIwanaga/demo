$(function() {

    //モーダルウインドウ制御
    $('.js-modal-open').on('click',function(){
        $('.js-modal').fadeIn();
        return false;
    });
    
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    });

//----------------------------------------------------------

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

//----------------------------------------------------------

    //input="date"のmax値を今日に設定
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datefield").setAttribute("max", today);

//----------------------------------------------------------

    //画像preview
	imgInp.onchange = evt => {
        const [file] = imgInp.files
            if (file) {
            blah.src = URL.createObjectURL(file)
        }   
    }
    
//----------------------------------------------------------

    //独自のvalidationを作成
    //電話番号の正規判断
    jQuery.validator.addMethod("isTel", function(value, element) {
        var tel = /^0[0-9]{10,10}$/; 
        return this.optional(element) || (tel.test(value));
    }, "電話番号を正しく入力してください");

    //全角文字正規判断
    // jQuery.validator.addMethod("isAdd", function(value, element) {
    //     var address1 = /^[^\x01-\x7E\xA1-\xDF]+$/; 
    //     return this.optional(element) || (address1.test(value));
    // }, "住所を全角文字を入力してください");

//----------------------------------------------------------   

    //メールアドレス重複登録判断
	jQuery.validator.addMethod("isMailDuplicate", function(value, element) {

        var flag = false;
        
        $.ajax({
                "async": false,
                "url":" /CheckEmail",
                "data": {"email": value},
                "type": "POST",
                "dataType": "json",

                //バックエンドでmail既に登録してかいないか判断、JSON DATA（String、boolean）を取得
                "success": function(data) {

                    //data.isExist==falseならば、このメアドを使うユーザーがない、return true(!flag) validator制限を飛ばす
                    flag = data.isExist;
                }
            });
            
            return !flag;
    }, "");

//----------------------------------------------------------   

	//メールアドレス重複登録判断(編集時)
	jQuery.validator.addMethod("isMailDuplicateInUpdate", function(value, element) {
		
    //変更していないメールアドレスを重複登録ではないと認識する
    var flag = false;
    var Eid= $("#hiddenId").val();
    $.ajax({
            "async": false,
            "url": "/CheckEmailByUpdate",
            "data": {"email": value, "id": Eid},
            "type": "POST",
            "dataType": "json",

            //バックエンドでmail既に登録してかいないか判断、JSON　DATA（String、boolean）を取得
            "success":function(data) {
                //data.isExist==falseならば、このメアドを使うユーザーがない、return true(!flag) validator制限を飛ばす
                flag = data.isExist;
            }
        });
        
        return !flag;
    }, "");

//----------------------------------------------------------   

    //validation
    //追加時
    $('#insertForm').validate({
        rules: {
            //ログイン画面
            username: {
                required: true,
                email: true 
            },
            pwd: {
                required: true,
                rangelength: [8, 16]
            },
            //追加画面
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
                email: true, 
                isMailDuplicate: true
            },
            tel: {
                required: true,
                digits: true,
                isTel: true
            },
            address: {
                required: true,
                // isAdd: true
            },
        },
        messages: {
            //ログイン画面
            username: {
                required: '正しく入力してください',
                email: 'メールアドレス形式で入力してください'
            },
            pwd: {
                required: 'パスワードを入力してください',
                rangelength: '8文字以上16文字以下で入力してください'
            },
            //追加画面
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
                email: 'メールアドレスを正しく入力してください',
                isMailDuplicate: 'このメールアドレスは既に使用されています'
            },
            tel: {
                required: '電話番号を入力してください',
                digits: '電話番号を正しく入力してください',
                isTel: '11桁の整数で入力してください'
            },
            address: {
                required: '住所を入力してください',
                // isAdd: '住所は全角文字で入力してください'
            },
        },
    });

//----------------------------------------------------------   

    //validation
    //編集時
    $('#editForm').validate({
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
                email: true, 
                isMailDuplicateInUpdate: true
            },
            tel: {
                required: true,
                digits: true,
                isTel: true
            },
            address: {
                required: true,
                // isAdd: true
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
                email: 'メールアドレスを正しく入力してください',
                isMailDuplicateInUpdate: 'このメールアドレスは既に使用されています'
            },
            tel: {
                required: '電話番号を入力してください',
                digits: '電話番号を正しく入力してください',
                isTel: '11桁の整数で入力してください'
            },
            address: {
                required: '住所を入力してください',
                // isAdd: '住所は全角文字で入力してください'
            },
        },
    });
});