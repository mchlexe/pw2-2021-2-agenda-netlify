<script>
  import { onMount } from 'svelte';
  import FormUsuarioAdd from './components/FormUsuarioAdd.svelte';
  import FormUsuarioEdit from './components/FormUsuarioEdit.svelte';

  let usuarios = [];
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgiLCJpYXQiOjE2NDczNzg1MzV9.KQCWkILathWF4u207YgEz2nSLcQOJtM0AoAV3cAa3Os';

  let reqHeaders = new Headers({
      'Auth-Token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  });

  $: numUsuarios = usuarios.length;

  const getUsuarios = async () => {
      await fetch(`http://localhost:3000/users`)
      .then(r => r.json())
      .then(data => {
          usuarios = data.users;
      });
      
    //   console.log(usuarios);
  };

  const salvarUsuario = async (event) => {      
      let reqBody = JSON.stringify(event.detail);
  
      console.log(reqBody);
  0
      await fetch(`http://localhost:3000/users`, {
          method: 'POST',
          body: reqBody,
          headers: reqHeaders,
      }).then(r => r.json())
      .then(data => {          
          getUsuarios();
      });      
  };

  const excluirUsuario = async (idx, id) => {

  await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      headers: reqHeaders
  }).then(() => {
      getUsuarios();
  });
  };

 const editarUsuario = async (e) => {    
    let id = e.detail.id;

    let reqBody = {
        "username": e.detail.username,
        "email": e.detail.email
    }
    console.log(JSON.stringify(reqBody));        

    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: reqHeaders,
    }).then(() => {            
        getUsuarios();
    });
  };


  const showEditar = (idx) => {
      let editElem = document.getElementById(`editInput${idx}`);
      let infoElem = document.getElementById(`usuarioInfo${idx}`);
      editElem.style.display = 'block';
      infoElem.style.display = 'none';
  };

  onMount(async () => {
      getUsuarios();
  });
</script>

<main>
  <hr>

  <FormUsuarioAdd on:novo-usuario={salvarUsuario} />

  <div class="list-group">
      {#if numUsuarios <= 0}
          <p>Adicione um usuário na agenda...</p>
      {:else}
          <p>Há {numUsuarios} usuários na agenda.</p>
      {/if}

      {#if numUsuarios > 0}
            {#each usuarios as usuario, index}
                
            <div class="list-group-item" id="listaUsuarios">
                <span id="usuarioInfo{index}">
                  <p>
                      <span class="nome_class">Nome: <strong>{usuario.username}</strong></span>
                  
                  <p>
                      <span class="telefone_class">Email: <strong>{usuario.email}</strong>
                      </span>
                  </p>                  
                  <p>
                      <span class="status_class">Verificado: <strong>{#if usuario.verified == true} Sim {:else} Não {/if}</strong>
                      </span>
                  </p>                    
                <div id="botoes">
                    <button class="btn btn-danger"  title="Editar"
                            on:click={() => showEditar(index)}>
                        Editar
                </button>
                <button class="btn btn-warning" title="Excluir"
                        on:click={() => excluirUsuario(index, usuario.id)}>
                    Excluir
                </button>
                </div>

                </span>  
                <p id='editInput{index}' class='editInput'>
                    <FormUsuarioEdit id={usuario.id} username={usuario.username} email={usuario.email} idx={index} on:edit-usuario={editarUsuario}/>
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


    #listaUsuarios {
        width: 50%;
        flex-flow: row nowrap;
        margin-bottom: 10px;
    }
</style>
