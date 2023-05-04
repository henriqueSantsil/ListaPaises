//definir a url da api
const url = "https://restcountries.com/v2/all"


// const listaPaises = document.querySelector('#listaPaises')


const listaPaises = $('#listaPaises')

const cardsPorPagina = 12
let paginaAtual = 1
//Faz uma solicitação GET para URL da API usando a função fetch()
//fetch() retorna uma promessa (Promise) que será resolvida com a resposta da solicição
fetch(url)
    //Quando a promessa for resolvida, converte a resposta em
    //formato JSON usando o método .json()
    .then(response => response.json())
    //Quando a promessa for resolvida, percorre os itens do array e os dados
    //retornados serão inseridos dentro de uma <li>
    .then(data => {

        //math.cell arredonda o resultado da divisão para cima
        let totalPaginas = Math.ceil(data.length / cardsPorPagina) 

        function mostrarPagina(pagina){
            let inicio = (pagina - 1) * cardsPorPagina
            let fim = inicio + cardsPorPagina
            listaPaises.empty()

            for(let i = inicio; i < fim && i < data.length; i++){
                const pais = data[i]
                    
                    const div = document.createElement('div') 
                    div.classList = "flex"
                    div.innerHTML = `
                    <div class="card" style="width: 18rem; height: 25rem;">
                        <img src="${pais.flag}" class="card-img-top h-50">
                            <div class="card-body">
                                <h5 class="card-title pais">${pais.name}</h5>
                                <p class="card-text capital">${pais.capital}</p>
                                <p class="card-text regiao">${pais.region}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${i}">
                                    ver mais
                                </button>
                            </div>
                        
                            <div class="modal fade" id="modal-${i}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">${pais.name}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                                <div class="modal-body">
                                <img src="${pais.flag}" width="150">
                                <p>Capital: ${pais.capital}</p>
                                <p>AlfaCode: ${pais.alpha2Code}</p>
                                <p>Código telefonico: ${pais.callingCodes}</p>
                                <p>Região: ${pais.region}</p>
                                <p>Sub: ${pais.subregion}</p>
                                <p>População: ${pais.population}</p>
                                <p>Denominação: ${pais.demonym}</p>
                                    </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                    `
                    listaPaises.append(div)
            }
        }
        //essa função é responsavel por exibir os paises na pagina e aualizar
        function atualizarPagina(){
            $('#contador-pagina').text(`Página ${paginaAtual} de ${totalPaginas}`)
            $('#anterior').prop('disable', paginaAtual === 1)
            $('#proximo').prop('disable', paginaAtual === totalPaginas)
            mostrarPagina(paginaAtual)
        }
        atualizarPagina()

        //eventos para os botões anterior e proximo
        $('#anterior').click(() =>{
            if(paginaAtual > 1){
                paginaAtual--
                atualizarPagina()
            }
        })

        $('#proximo').click(() =>{
            if(paginaAtual < totalPaginas){
                paginaAtual++
                atualizarPagina()
            }
        })
    })
    //Se ocorrer um erro durante a solicitação fetch(), ele será
    //capturado por .catch() e o erro será impresso no console
    .catch(error => console.error(error))

    
    


