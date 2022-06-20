
var select;
select = document.getElementsByTagName('select')[0];

let cargarDatos =() => 
{
	//alert("cargarndo datos...")
fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    
	let escritores = xml.getElementsByTagName('escritor')

	for(let escritor of escritores){
		
		let id = escritor.querySelector('id').textContent;
		let nombre = escritor.querySelector('nombre').textContent;
		let plantilla = `<option value="${id}">${nombre}</option>`;
		

		document.querySelector("select").innerHTML += plantilla;
	}
  })
  .catch(console.error);
}



const cargarFrases = async (id, nombre) => 
{
	var frasesDiv = document.getElementById('frases');
	frasesDiv.innerHTML = '';
	let response = await fetch("https://dataserverdaw.herokuapp.com/escritores/frases");
	let data = await response.json();

	let frases = data.frases.filter(frase => frase.id_autor == id);

	for(let frase of frases) {

		let plantilla = `<div class="col-lg-3">
							<div class="test-inner ">
								<div class="test-author-thumb d-flex">
									<div class="test-author-info">
										<h4>${nombre}</h4>                                            
									</div>
								</div>
								<span>${frase.texto}</span>
								<i class="fa fa-quote-right"></i>
							</div>
						</div>`


		frasesDiv.innerHTML += plantilla;
	}

	response.catch(console.error);
}

window.addEventListener('DOMContentLoaded', (e) => 
{
	cargarDatos();
});


select.addEventListener('change', (e) => 
{
	let nombre = e.target.options[e.target.selectedIndex].text;
    let id = e.target.value;
    
    cargarFrases(id, nombre);
});