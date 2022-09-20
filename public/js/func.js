exports.renderFunc = function getCheckboxValue(event)  {
    console.log("getcheckbox 실행");
    let result = '';
    if(event.target.checked)  {
      result = event.target.value;
    }else {
      result = '';
    }
  }