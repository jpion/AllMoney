$(function () {
    $.ajax({
        url: realtor_select,
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            $('html').load(data['address']);
        },
        error: function () {
            console.log('페이지 로드 실패');
        }
    });
});