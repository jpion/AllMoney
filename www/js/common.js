// API
var realtor_insert = 'http://allmoney.co.kr/php/realtor_insert.php'; // 부동산 중개수수료
var realtor_select = 'http://allmoney.co.kr/php/realtor_select.php'; // 부동산 중개수수료
// 메뉴 버튼 제어
$(document).ready(function () {
    // 헤더 부분 연결
    $('#header').load('header.html');
    // 푸터 부분 연결
    $('#footer').load('footer.html');
    // 메인 메뉴 열기 버튼
    $('#btn_menu_open').click(function () {
        $('#menu').css('display', 'block');
        $(this).css('display', 'none');
        $('#btn_menu_close').css('display', 'block');
    });
    // 메인 메뉴 닫기 버튼
    $('#btn_menu_close').click(function () {
        $('#menu').css('display', 'none');
        $(this).css('display', 'none');
        $('#btn_menu_open').css('display', 'block');
        $('#menu_list, #btn-collect').show();
        $('#collect-info, #btn-calculator').hide();
    });
});