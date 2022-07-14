$(function() {

    //validation
    //管理者追加時
    $('#registerForm').validate({
        rules: {
            username: {
                required: true,
                email: true,
                maxlength: 60
            },
            pwd: {
                required: true,
                rangelength: [8, 16]
            }
        },
        messages: {
            username: {
                required: '正しく入力してください',
                email: 'メールアドレス形式で入力してください',
                maxlength: '60文字以下で入力してください'
            },
            pwd: {
                required: 'パスワードを入力してください',
                rangelength: '8文字以上16文字以下で入力してください'
            }
        }
    });
});