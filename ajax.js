$('document').ready(function(){
	$('#button').click(function(){
		$("#resultDiv").html('');
		var namein = $("#name").val();
		var yearin = $("#year").val();
		var docin = $("#doc").val();
		var telin = $("#tel").val();
		var adresin = $("#adres").val();
		if(namein.length < 5 || adresin.length < 5){
			$("#resultDiv").html("Заполните все поля.И картинку тоже");
		}else{
			// элемент, с помощью которого пользователь выбирает файл
        	var file = $('#file');
			/*var file_data = $('#file').prop('files')[0];*/
			var formData = new FormData();
			formData.append("name",namein);
			formData.append("year",yearin);
			formData.append("doc",docin);
			formData.append("tel",telin);
			formData.append("adres",adresin);
			
			// добавляем в объект FormData файл 
			formData.append('file', file.prop('files')[0]);
			/*formData.append('file', file_data);*/

			$.ajax({
				url: 'server.php',
				type: 'POST',
				data: formData,
				dataType: 'html',
	            processData: false,//обязательно при отправки с formData
	            contentType: false,//обязательно при отправки с formData
	         beforeSend : function (){
	         	$("#resultDiv").append('<img width="50px" height="50px" class="reload_circle" src="uploads/reload_circle.gif">');
	         },
				success: function(data){
					/*var res = $.parseJSON(data);*/
					if(data == "Произошла обшибка при загрузке файла на сервер"){
						$(".reload_circle").remove();
				   	$("#resultDiv").html("Произошла обшибка при загрузке файла на сервер.Заполните все поля.И картинку тоже");
					}else{
						$(".reload_circle").remove();
				   	$("#resultDiv").html("Успешно отправлено на сервер!");
				   	$("#users_tbody").append(data);
					}
				},
				error: function(data){
				    $("#resultDiv").html(data);
				}
			});
		}
		
	});
});