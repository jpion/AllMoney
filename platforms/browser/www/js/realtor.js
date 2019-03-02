var choice_1_section = ""; // 계산기 항목 구분 (forever_매매/year_전세/month_월세)
// 계산기 항목 선택
$(document).ready(function () {
    // 매매 계산기 선택
    $('#forever').click(function () {
        choice_1_section = "forever";
        $('#year, #month, #information').css('display', 'none');
        $('#choice_2_section').css('display', 'block');
    });
    // 전세 계산기 선택
    $('#year').click(function () {
        choice_1_section = "year";
        $('#forever, #month, #information').css('display', 'none');
        $('#choice_2_section').css('display', 'block');
    });
    // 월세 계산기 선택
    $('#month').click(function () {
        choice_1_section = "month";
        $('#year, #forever, #information').css('display', 'none');
        $('#choice_2_section').css('display', 'block');
    });
});
// 계산기 유형 선택
$(document).ready(function () {
    // 주택/아파트/빌라 계산기 유형
    $('#house').click(function () {
        $('#work, #officetel, #officetel_comment').css('display', 'none');
        if (choice_1_section === "forever") {
            $('#house_forever_calcuator').css('display', 'block');
            $('#house_forever_info_btn').click(function () {
                $('#house_forever_info').toggle();
            });
        } else if (choice_1_section === "year") {
            $('#house_year_calcuator').css('display', 'block');
            $('#house_year_info_btn').click(function () {
                $('#house_year_info').toggle();
            });
        } else if (choice_1_section === "month") {
            $('#house_month_calcuator').css('display', 'block');
            $('#house_month_info_btn').click(function () {
                $('#house_month_info').toggle();
            });
        } else {
            alert("오류인 것 같습니다. 관리자에게 메일을 보내주시면 후딱 고칠께요.");
        }
    });
    // 토지/상가/업무용오피스텔 계산기 유형
    $('#work').click(function () {
        $('#house, #officetel, #officetel_comment').css('display', 'none');
        if (choice_1_section === "forever") {
            $('#work_forever_calcuator').css('display', 'block');
            $('#work_forever_info_btn').click(function () {
                $('#work_forever_info').toggle();
            });
        } else if (choice_1_section === "year") {
            $('#work_year_calcuator').css('display', 'block');
            $('#work_year_info_btn').click(function () {
                $('#work_year_info').toggle();
            });
        } else if (choice_1_section === "month") {
            $('#work_month_calcuator').css('display', 'block');
            $('#work_month_info_btn').click(function () {
                $('#work_month_info').toggle();
            });
        } else {
            alert("오류인 것 같습니다. 관리자에게 메일을 보내주시면 후딱 고칠께요.");
        }
    });
    // 주거용오피스텔 계산기 유형
    $('#officetel').click(function () {
        $('#work, #house').css('display', 'none');
        if (choice_1_section === "forever") {
            $('#officetel_forever_calcuator').css('display', 'block');
            $('#officetel_forever_info_btn').click(function () {
                $('#officetel_forever_info').toggle();
            });
        } else if (choice_1_section === "year") {
            $('#officetel_year_calcuator').css('display', 'block');
            $('#officetel_year_info_btn').click(function () {
                $('#officetel_year_info').toggle();
            });
        } else if (choice_1_section === "month") {
            $('#officetel_month_calcuator').css('display', 'block');
            $('#officetel_month_info_btn').click(function () {
                $('#officetel_month_info').toggle();
            });
        } else {
            alert("오류인 것 같습니다. 관리자에게 메일을 보내주시면 후딱 고칠께요.");
        }
    });
});
// 선택한 계산기로 계산
$(document).ready(function () {
    // 1. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#house_forever_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#house_forever_money').blur(function(){
        $('#bottom_section').show();
    });
    // 1. 엔터키 이벤트
    $('#house_forever_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#house_forever_process').click();
        }
    });
    // 1. 주거 매매 계산기
    $('#house_forever_process').click(function () {
        var money = $('#house_forever_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '매매',
                'type': '주택/아파트/빌라',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('1. 주거 매매 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('1. 주거 매매 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money < 5000 && money > 0) {
            // 5천만원 미만 0.6% - 한도액 25만원
            result_fee = money * 0.006;
            if (result_fee <= 25) {
                // 수수료가 만원 미만이면 원 단위로 표시
                if (result_fee < 1) {
                    result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_forever_result_fee').text(Math.round(result_fee) + '원');
                    $('#house_forever_result_vat').text(Math.round(result_vat) + '원');
                    $('#house_forever_result_total').text(Math.round(result_total) + '원');
                } else {
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_forever_result_fee').text(Math.round(result_fee) + '만원');
                    $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
                    $('#house_forever_result_total').text(Math.round(result_total) + '만원');
                }
            } else {
                // 한도액 제한
                result_fee = 25;
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_forever_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_forever_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 5000 && money < 20000) {
            // 5천만원~2억원 미만 0.5% - 한도액 80만원
            result_fee = money * 0.005;
            if (result_fee <= 80) {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_forever_result_fee').text(Math.round(result_fee) + '만원');
                $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_forever_result_total').text(Math.round(result_total) + '만원');
            } else {
                // 한도액 제한
                result_fee = 80; // 만원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_forever_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_forever_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 20000 && money < 60000) {
            // 2억원~6억원 미만 0.4% - 한도액 없음
            result_fee = money * 0.004;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_forever_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_forever_result_total').text(Math.round(result_total) + '만원');
        } else if (money >= 60000 && money < 90000) {
            // 6억원~9억원 미만 0.5% - 한도액 없음
            result_fee = money * 0.005;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_forever_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_forever_result_total').text(Math.round(result_total) + '만원');
        } else if (money >= 90000) {
            // 9억원 이상 0.9% - 한도액 없음
            result_fee = money * 0.009;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_forever_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_forever_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_forever_result_total').text(Math.round(result_total) + '만원');
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 2. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#house_year_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#house_year_money').blur(function(){
        $('#bottom_section').show();
    });
    // 2. 엔터키 이벤트
    $('#house_year_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#house_year_process').click();
        }
    });
    // 2. 주거 전세 계산기
    $('#house_year_process').click(function () {
        var money = $('#house_year_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '전세',
                'type': '주택/아파트/빌라',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('2. 주거 전세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('2. 주거 전세 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money < 5000 && money > 0) {
            // 5천만원 미만 0.5% - 한도액 20만원
            result_fee = money * 0.005;
            if (result_fee <= 20) {
                // 수수료가 만원 미만이면 원 단위로 표시
                if (result_fee < 1) {
                    result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_year_result_fee').text(Math.round(result_fee) + '원');
                    $('#house_year_result_vat').text(Math.round(result_vat) + '원');
                    $('#house_year_result_total').text(Math.round(result_total) + '원');
                } else {
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_year_result_fee').text(Math.round(result_fee) + '만원');
                    $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
                    $('#house_year_result_total').text(Math.round(result_total) + '만원');
                }
            } else {
                // 한도액 제한
                result_fee = 20;
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_year_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_year_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 5000 && money < 10000) {
            // 5천만원~1억원 미만 0.4% - 한도액 30만원
            result_fee = money * 0.004;
            if (result_fee <= 30) {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_year_result_fee').text(Math.round(result_fee) + '만원');
                $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_year_result_total').text(Math.round(result_total) + '만원');
            } else {
                // 한도액 제한
                result_fee = 30;
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_year_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_year_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 10000 && money < 30000) {
            // 1억원~3억원 미만 0.3% - 한도액 없음
            result_fee = money * 0.003; // 소수점 반올림
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_year_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_year_result_total').text(Math.round(result_total) + '만원');
        } else if (money >= 30000) {
            // 3억원 이상 0.8% - 한도액 없음
            result_fee = money * 0.008; // 소수점 반올림
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_year_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_year_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_year_result_total').text(Math.round(result_total) + '만원');
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 3. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#house_month_money, #house_month_rent_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#house_month_money, #house_month_rent_money').blur(function(){
        $('#bottom_section').show();
    });
    // 3. 엔터키 이벤트
    $('#house_month_money, #house_month_rent_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#house_month_process').click();
        }
    });
    // 3. 주거 월세 계산기
    // 거래금이 5천만원 미만일 때와 이상일 때의 계산 식이 다름
    $('#house_month_process').click(function () {
        var money = ""; // 최종 거래금이 담길 변수
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        var deposit = $('#house_month_money').val(); // 보증금 입력 값
        var rent = $('#house_month_rent_money').val(); // 월세 입력 값
        var rent_money_high = rent * 100; // 월세 입력 추가 = 월세 * 100
        var rent_money_low = rent * 70; // 월세 입력 추가 = 월세 * 70
        var temp = Number(deposit) + Number(rent_money_high); // 거래금이 5천만원 미만인지 확인하기 위한 임시 변수
        if (temp < 5000) {
            money = Number(deposit) + Number(rent_money_low); // 거래금이 5천만원 미만이면 최종 거래금에 rent_money_low(월세 * 70) 적용
        } else {
            money = temp; // 거래금이 5천만원 이상이면 최종 거래금에 rent_money_high(월세 * 100) 적용
        }
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '월세',
                'type': '주택/아파트/빌라',
                'money': deposit,
                'rent': rent,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('3. 주거 월세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('3. 주거 월세 계산기 DB 전송 실패');
            }            
        });
        // 최종 거래금 확인 후 계산 시작
        if (money < 5000 && money > 0 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가
            // 5천만원 미만 0.5% - 한도액 20만원
            result_fee = money * 0.005;
            if (result_fee <= 20) {
                // 수수료가 만원 미만이면 원 단위로 표시
                if (result_fee < 1) {
                    result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_month_result_fee').text(Math.round(result_fee) + '원');
                    $('#house_month_result_vat').text(Math.round(result_vat) + '원');
                    $('#house_month_result_total').text(Math.round(result_total) + '원');
                } else {
                    result_vat = result_fee / 10;
                    result_total = result_fee + result_vat;
                    $('#house_month_result_fee').text(Math.round(result_fee) + '만원');
                    $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
                    $('#house_month_result_total').text(Math.round(result_total) + '만원');
                }
            } else {
                // 한도액 제한
                result_fee = 20; // 만원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_month_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_month_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 5000 && money < 10000 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가
            // 5천만원~1억원 미만 0.4% - 한도액 30만원
            result_fee = money * 0.004;
            if (result_fee <= 30) {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_month_result_fee').text(Math.round(result_fee) + '만원');
                $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_month_result_total').text(Math.round(result_total) + '만원');
            } else {
                // 한도액 제한
                result_fee = 30;
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#house_month_result_fee').text('한도액 ' + Math.round(result_fee) + '만원');
                $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
                $('#house_month_result_total').text(Math.round(result_total) + '만원');
            }
        } else if (money >= 10000 && money < 30000 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가
            // 1억원~3억원 미만 0.3% - 한도액 없음
            result_fee = money * 0.003;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_month_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_month_result_total').text(Math.round(result_total) + '만원');
        } else if (money >= 30000 && money < 60000 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가
            // 3억원~6억원 미만 0.4% - 한도액 없음
            result_fee = money * 0.004;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_month_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_month_result_total').text(Math.round(result_total) + '만원');
        } else if (money >= 60000 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가
            // 6억원 이상 0.8% - 한도액 없음
            result_fee = money * 0.008;
            result_vat = result_fee / 10;
            result_total = result_fee + result_vat;
            $('#house_month_result_fee').text(Math.round(result_fee) + '만원');
            $('#house_month_result_vat').text(Math.round(result_vat) + '만원');
            $('#house_month_result_total').text(Math.round(result_total) + '만원');
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 4. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#work_forever_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#work_forever_money').blur(function(){
        $('#bottom_section').show();
    });
    // 4. 엔터키 이벤트
    $('#work_forever_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#work_forever_process').click();
        }
    });
    // 4. 상가 매매 계산기
    // 매매 거래금의 0.9%
    $('#work_forever_process').click(function () {
        var money = $('#work_forever_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '매매',
                'type': '토지/상가/업무용오피스텔',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('4. 상가 매매 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('4. 상가 매매 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money > 0) {
            result_fee = money * 0.009; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_forever_result_fee').text(Math.round(result_fee) + '원');
                $('#work_forever_result_vat').text(Math.round(result_vat) + '원');
                $('#work_forever_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_forever_result_fee').text(Math.round(result_fee) + '만원');
                $('#work_forever_result_vat').text(Math.round(result_vat) + '만원');
                $('#work_forever_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 5. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#work_year_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#work_year_money').blur(function(){
        $('#bottom_section').show();
    });
    // 5. 엔터키 이벤트
    $('#work_year_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#work_year_process').click();
        }
    });
    // 5. 상가 전세 계산기
    // 전세 보증금의 0.9%
    $('#work_year_process').click(function () {
        var money = $('#work_year_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '전세',
                'type': '토지/상가/업무용오피스텔',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('5. 상가 전세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('5. 상가 전세 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money > 0) {
            result_fee = money * 0.009; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_year_result_fee').text(Math.round(result_fee) + '원');
                $('#work_year_result_vat').text(Math.round(result_vat) + '원');
                $('#work_year_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_year_result_fee').text(Math.round(result_fee) + '만원');
                $('#work_year_result_vat').text(Math.round(result_vat) + '만원');
                $('#work_year_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 6. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#work_month_money, #work_month_rent_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#work_month_money, #work_month_rent_money').blur(function(){
        $('#bottom_section').show();
    });
    // 6. 엔터키 이벤트
    $('#work_month_money, #work_month_rent_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#work_month_process').click();
        }
    });
    // 6. 상가 월세 계산기
    // 거래금의 0.9%
    // 거래금이 5천만원 미만일 때와 이상일 때의 계산 식이 다름
    $('#work_month_process').click(function () {
        var money = ""; // 최종 거래금이 담길 변수
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        var deposit = $('#work_month_money').val(); // 보증금 입력 값
        var rent = $('#work_month_rent_money').val();
        var rent_money_high = rent * 100; // 월세 입력 추가 = 월세 * 100
        var rent_money_low = rent * 70; // 월세 입력 추가 = 월세 * 70
        var temp = Number(deposit) + Number(rent_money_high); // 거래금이 5천만원 미만인지 확인하기 위한 임시 변수
        if (temp < 5000) {
            money = Number(deposit) + Number(rent_money_low); // 거래금이 5천만원 미만이면 최종 거래금에 rent_money_low(월세 * 70) 적용
        } else {
            money = temp; // 거래금이 5천만원 이상이면 최종 거래금에 rent_money_high(월세 * 100) 적용
        }
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '월세',
                'type': '토지/상가/업무용오피스텔',
                'money': deposit,
                'rent': rent,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('6. 상가 월세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('6. 상가 월세 계산기 DB 전송 실패');
            }            
        });
        // 최종 거래금 확인 후 계산 시작
        if (money > 0 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가) {
            result_fee = money * 0.009; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_month_result_fee').text(Math.round(result_fee) + '원');
                $('#work_month_result_vat').text(Math.round(result_vat) + '원');
                $('#work_month_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#work_month_result_fee').text(Math.round(result_fee) + '만원');
                $('#work_month_result_vat').text(Math.round(result_vat) + '만원');
                $('#work_month_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 7. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#officetel_forever_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#officetel_forever_money').blur(function(){
        $('#bottom_section').show();
    });
    // 7. 엔터키 이벤트
    $('#officetel_forever_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#officetel_forever_process').click();
        }
    });
    // 7. 주거용오피스텔 매매 계산기
    // 매매 거래금의 0.5%
    $('#officetel_forever_process').click(function () {
        var money = $('#officetel_forever_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '매매',
                'type': '주거용오피스텔',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('7. 주거용오피스텔 매매 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('7. 주거용오피스텔 매매 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money > 0) {
            result_fee = money * 0.005; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_forever_result_fee').text(Math.round(result_fee) + '원');
                $('#officetel_forever_result_vat').text(Math.round(result_vat) + '원');
                $('#officetel_forever_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_forever_result_fee').text(Math.round(result_fee) + '만원');
                $('#officetel_forever_result_vat').text(Math.round(result_vat) + '만원');
                $('#officetel_forever_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 8. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#officetel_year_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#officetel_year_money').blur(function(){
        $('#bottom_section').show();
    });
    // 8. 엔터키 이벤트
    $('#officetel_year_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#officetel_year_process').click();
        }
    });
    // 8. 주거용오피스텔 전세 계산기
    // 전세 보증금의 0.4%
    $('#officetel_year_process').click(function () {
        var money = $('#officetel_year_money').val();
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '전세',
                'type': '주거용오피스텔',
                'money': money,
                'rent': 0,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('8. 주거용오피스텔 전세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('8. 주거용오피스텔 전세 계산기 DB 전송 실패');
            }            
        });
        // 계산 시작
        if (money > 0) {
            result_fee = money * 0.004; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_year_result_fee').text(Math.round(result_fee) + '원');
                $('#officetel_year_result_vat').text(Math.round(result_vat) + '원');
                $('#officetel_year_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_year_result_fee').text(Math.round(result_fee) + '만원');
                $('#officetel_year_result_vat').text(Math.round(result_vat) + '만원');
                $('#officetel_year_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
    // 9. input 포커스 이벤트 : 다시 시작 버튼 hide/show
    $('#officetel_month_money, #officetel_month_rent_money').focus(function(){
        $('#bottom_section').hide();
    });
    $('#officetel_month_money, #officetel_month_rent_money').blur(function(){
        $('#bottom_section').show();
    });
    // 9. 엔터키 이벤트
    $('#officetel_month_money, #officetel_month_rent_money').keydown(function(key){
        if(key.keyCode == 13){
            $('#officetel_month_process').click();
        }
    });
    // 9. 주거용오피스텔 월세 계산기
    // 거래금의 0.4%
    // 거래금이 5천만원 미만일 때와 이상일 때의 계산 식이 다름
    $('#officetel_month_process').click(function () {
        var money = ""; // 최종 거래금이 담길 변수
        var result_fee = ""; // 수수료
        var result_vat = ""; // 부가세
        var result_total = ""; // 총합
        var deposit = $('#officetel_month_money').val(); // 보증금 입력 값
        var rent = $('#officetel_month_rent_money').val();
        var rent_money_high = rent * 100; // 월세 입력 추가 = 월세 * 100
        var rent_money_low = rent * 70; // 월세 입력 추가 = 월세 * 70
        var temp = Number(deposit) + Number(rent_money_high); // 거래금이 5천만원 미만인지 확인하기 위한 임시 변수
        if (temp < 5000) {
            money = Number(deposit) + Number(rent_money_low); // 거래금이 5천만원 미만이면 최종 거래금에 rent_money_low(월세 * 70) 적용
        } else {
            money = temp; // 거래금이 5천만원 이상이면 최종 거래금에 rent_money_high(월세 * 100) 적용
        }
        // 입력된 값 DB 전송
        $.ajax({            
            url: 'https://allmoney.co.kr/php/realtor_insert.php',
            type: 'POST',
            data: {
                'item': '월세',
                'type': '주거용오피스텔',
                'money': deposit,
                'rent': rent,
                'device': device,
                'ip': ip,
                'latitude': latitude,
                'longitude': longitude
            }, 
            success: function(){
                console.log('9. 주거용오피스텔 월세 계산기 DB 전송 성공');
            },
            error: function(){
                console.log('9. 주거용오피스텔 월세 계산기 DB 전송 실패');
            }            
        });
        // 최종 거래금 확인 후 계산 시작
        if (money > 0 && deposit > 0 && rent_money_high > 0) { // 월세/보증금 입력 확인 추가) {
            result_fee = money * 0.004; // 수수료
            if (result_fee < 1) {
                result_fee = result_fee * 10000; // 만원 단위를 원 단위로 변경
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_month_result_fee').text(Math.round(result_fee) + '원');
                $('#officetel_month_result_vat').text(Math.round(result_vat) + '원');
                $('#officetel_month_result_total').text(Math.round(result_total) + '원');
            } else {
                result_vat = result_fee / 10;
                result_total = result_fee + result_vat;
                $('#officetel_month_result_fee').text(Math.round(result_fee) + '만원');
                $('#officetel_month_result_vat').text(Math.round(result_vat) + '만원');
                $('#officetel_month_result_total').text(Math.round(result_total) + '만원');
            }
        } else {
            alert('금액을 확인하세요');
        }
    });
});