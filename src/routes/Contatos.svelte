<script>
    import { onMount } from 'svelte';
    import FormContatoAdd from './components/FormContatoAdd.svelte';
    import FormContatoEdit from './components/FormContatoEdit.svelte';

    let contatos = [];
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJpYXQiOjE2NDczNzg1MzV9.KQCWkILathWF4u207YgEz2nSLcQOJtM0AoAV3cAa3Os';

    let reqHeaders = new Headers({
        'Auth-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    $: numContatos = contatos.length;

    export const num = numContatos;
    
    const getContatos = async () => {
        await fetch(`https://secure-sierra-28532.herokuapp.com/contato`)
        .then(r => r.json())
        .then(data => {
            contatos = data.contatos;
        });
        
        console.log(contatos);
    };

    const salvarContato = async (event) => {
        
        let reqBody = JSON.stringify(event.detail);

        console.log(reqHeaders);

        await fetch(`https://secure-sierra-28532.herokuapp.com/contato`, {
            method: 'POST',
            body: reqBody,
            headers: reqHeaders,
        }).then(r => r.json())
        .then(data => {          
            getContatos();
        });

        
    };

    const excluirContato = async (idx, id) => {

        await fetch(`https://secure-sierra-28532.herokuapp.com/contato/${id}`, {
            method: 'DELETE',
            headers: reqHeaders
        }).then(() => {
            getContatos();
        });
    };

    const editarContato = async (e) => {
        
        let id = e.detail.id;

        
        let reqBody = {
            "nome": e.detail.nome,
            "telefone": e.detail.telefone
        }
        console.log(JSON.stringify(reqBody));        

        await fetch(`https://secure-sierra-28532.herokuapp.com/contato/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(reqBody),
            headers: reqHeaders,
        }).then(() => {            
            getContatos();
        });
    };

    const showEditar = (idx) => {
        let editElem = document.getElementById(`editInput${idx}`);
        let infoElem = document.getElementById(`contatoInfo${idx}`);
        editElem.style.display = 'block';
        infoElem.style.display = 'none';
    };
  
    onMount(async () => {
        getContatos();
    });
</script>

<main>
    <hr>

    <FormContatoAdd on:novo-contato={salvarContato} />

    <div class="list-group">
        {#if numContatos <= 0}
            <p>Adicione um contato na agenda...</p>
        {:else}
            <p>Há {numContatos} contatos na agenda.</p>
        {/if}

        {#if numContatos > 0}
            {#each contatos as contato, index}
                <div class="list-group-item" id="listaContatos">
                    <span id="contatoInfo{index}">
                        <p>
                            <span class="nome_class">Nome: <strong>{contato.nome}</strong></span>
                        
                        <p>
                            <span class="telefone_class">Telefone: <strong>{contato.telefone}</strong>
                            </span>
                        </p>
                        
                        <div id="botoes">
                            <button class="btn btn-warning" title="Editar"
                                    on:click={() => showEditar(index)}>
                                Editar
                            </button>
                            <button class="btn btn-danger" title="Excluir"
                                    on:click={() => excluirContato(index, contato.id)}>
                                Excluir
                            </button>
                        </div>
                    </span>                                            
                    <p id='editInput{index}' class='editInput'>
                        <FormContatoEdit id={contato.id} nome={contato.nome} telefone={contato.telefone} idx={index} on:edit-contato={editarContato}/>
                    </p>
                </div>
            {/each}
        {:else}  
            <p>Loading...</p>
        {/if}
     </div>

     <hr />
</main>

<style>
    .nome_class {
        margin-top: 3px;
    }

    .editInput {
        display: none;
    }

    #botoes {
        display: flex !important;
        justify-content: space-between;
    }

    #listaContatos {
        width: 50%;
        flex-flow: row nowrap;
        margin-bottom: 10px;
    }

</style>
