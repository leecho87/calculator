(function(){
    'use strict';
    /**
     * 버튼을 누른다 (누를때 데이터를 갱신해주며, view에 반영하기). (controller ? )
     * 보이는 인풋창에 보여준다. (view ? )
     * 값은 저장하고 보여주며 기록한다. (model ?)
     */

     // 값, 액션이 있을 때 마다 갱신해주기
    var dataModel = {
        display : '0',
        operator : ''
    };

    // 누르는버튼과 값을 보여주는 창
    var viewModel = {
        calculatorWindow : document.querySelector('[data-monitor]'),
        calculatorButton : document.querySelectorAll('[data-value]')
    };

    // 버튼 누를때 마다 호출 (dataModel 갱신 후 paint 호출하기)
    function calculator(e){
        var text = e.target.innerText;
        var value = e.target.dataset.value;

        // value가 EQUAL같은 string이라 eval이 안되는 걸 할려고 했네 멍충돋았음
        switch(value) {
            case "AC" :
                dataModel.display = '0'
                dataModel.operator = '';
                break;
            case "CE" :
                dataModel.display = dataModel.display.length > 1 ? dataModel.display.substring(0, dataModel.display.length -1) : '0' ;
                dataModel.operator = dataModel.operator.length > 1 ? dataModel.operator.substring(0, dataModel.operator.length -1) : '';
                break;
            case "PERCENT" :
                dataModel.display = eval(dataModel.display / 100);
                dataModel.operator = dataModel.display;
                break;
            case "EQUAL" :
                dataModel.display = eval(dataModel.operator)
                dataModel.operator = dataModel.display;
                break;
            default :
                if(dataModel.operator === ''){
                    dataModel.display = ''
                };
                dataModel.display = dataModel.display + text;
                dataModel.operator = dataModel.operator + value;
        }
        return paint();
    }

    // 버튼 다 누르고 얘 실행해서 윈도우에 값 넣기
    function paint(){
        viewModel.calculatorWindow.value = dataModel.display;
    }

    // 버튼마다 클릭함수 붙이기
    function init(){
        for(var i=0; i<viewModel.calculatorButton.length; i++){
            viewModel.calculatorButton[i].addEventListener('click', calculator)
        }
        return paint();
    }
    // init을 실행하여 버튼마다 이벤트부여하고, paint를 실행시켜서 초기값(dataModel.display의 0 값을 보여주기)
    init();
})()