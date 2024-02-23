function bye(){
    let id = $('#idForDelete').val();
    if(!$('#agree').is(':checked')){
        alert('약관에 동의해주세요.')
        return;
    }
    fetch('/member/'+id, {method:'delete'})
        .then(rs => rs.text())
        .then(text =>{
            if(text == 'success'){
                alert('정상적으로 탈퇴되었습니다.');
                location.href='/';
            }else{
                alert('error');
                return;
            }
        })
}