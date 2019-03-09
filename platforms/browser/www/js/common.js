// 디바이스 정보 확인
var device = '';
if (navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
    device = 'mobile';
} else {
    device = 'PC';
}
// IP 주소 확인
var ip = ip();
// 위도, 경도 확인
var latitude = "";
var longitude = "";
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    });
}
// API
var realtor = 'https://allmoney.co.kr/php/realtor_insert.php'; // 부동산 중개수수료
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