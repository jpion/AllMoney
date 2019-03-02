$(document).ready(function(){
    // 수집하는 정보에 관하여 버튼
    $('#btn-collect').click(function () {
        $('#menu_list, #btn-collect').hide();
        $('#collect-info, #btn-calculator').show();
    });
    // 계산기 선택 버튼
    $('#btn-calculator').click(function () {
        $('#menu_list, #btn-collect').show();
        $('#collect-info, #btn-calculator').hide();
    });
});