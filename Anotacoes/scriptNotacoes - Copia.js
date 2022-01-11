// Aqui você vai colocar a URL de endereço para os get e set
const url = 'https://61c9f60a20ac1c0017ed8f30.mockapi.io/api/v1/anotacoes'

class Notacao{
	constructor(tituloNotacao, nivelNotacao, dataNotacao, horaNotacao, descricaoNotacao){
		this.tituloNotacao = tituloNotacao
		this.nivelNotacao = nivelNotacao
		this.dataNotacao = dataNotacao
		this.horaNotacao = horaNotacao
		this.descricaoNotacao = descricaoNotacao
	}
}

function cadastrarNotacao(){

	let tituloNotacao = $('#txtTitulo').val()
	let nivelNotacao = $('#txtNivel').val()
	let dataNotacao = $('#txtData').val()
	let horaNotacao = $('#txtHora').val()
	let descricaoNotacao = $('#txtDescricao').val()

	if(tituloNotacao == '' || nivelNotacao == '' || dataNotacao == '' || horaNotacao == '' || descricaoNotacao == ''){
		$('#validarModal').modal('show')
		document.getElementById('titulo_modal').innerHTML = 'Erro!'
		document.getElementById('btnModal').innerHTML = 'Corrigir'
		document.getElementById('corpoModal').innerHTML = 'Verifique os campos'
	}else{
		$('#validarModal').modal('show')
		document.getElementById('titulo_modal').innerHTML = 'Sucesso!'
		document.getElementById('btnModal').innerHTML = 'Ok!'
		document.getElementById('corpoModal').innerHTML = 'Anotação Inserida com sucesso!'
		let notacao = new Notacao(tituloNotacao, nivelNotacao, dataNotacao, horaNotacao, descricaoNotacao)

		$.post(url, notacao)
	}
}

function limparNotacao(){
	$('#txtTitulo').val('')
	$('#txtNivel').val('Baixo')
	$('#txtData').val('')
	$('#txtHora').val('')
	$('#txtDescricao').val('')
}

function mostrarAnotacoes(){
	$.get(url, function (dados){

		for(var i = 0; i <= dados.length; i++){
			
			if(dados[i].nivelNotacao == 'Baixo'){
				$('#conteudo').append(`
				<div onclick="mostrarModalAnotacao(${i})" class="card col-md-3 col-sm-11 mt-sm-5 bg-success border">
				<h4 class = 'text-center'>${dados[i].tituloNotacao}</h4>
				<p>${dados[i].nivelNotacao}
				</div>`)
			}
			if(dados[i].nivelNotacao == 'Médio'){
				$('#conteudo').append(`
				<div onclick="mostrarModalAnotacao(${i})" class="card col-md-3 col-sm-11 mt-sm-5 bg-warning border">
				<h4 class = 'text-center'>${dados[i].tituloNotacao}</h4>
				<p>${dados[i].nivelNotacao}
				</div>`)
			}

			if(dados[i].nivelNotacao == 'Alto'){
				$('#conteudo').append(`
				<div onclick="mostrarModalAnotacao(${i})" class="card col-md-3 col-sm-11 mt-sm-5 bg-danger border">
				<h4 class = 'text-center'>${dados[i].tituloNotacao}</h4>
				<p>${dados[i].nivelNotacao}
				</div>`)
			}
			
		}
	})
}

function mostrarModalAnotacao(d){

	$.get(url, function(dados){
		$('#modalAnotacoes').modal('show')
		$('#titulo_modal').html(`Titulo: ${dados[d].tituloNotacao}`)
		$('#corpoModal').html(`Descrição: ${dados[d].descricaoNotacao} <hr>
							<br> Data: ${dados[d].dataNotacao}
							<br> Hora: ${dados[d].horaNotacao}
							<br> Nivel: ${dados[d].nivelNotacao}`)
		$('#btnModal').html('Ok')
	})
}