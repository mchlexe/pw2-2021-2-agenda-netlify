<script>
    import {createEventDispatcher} from 'svelte';

    export let nome;
    export let telefone;
    export let id;
    export let idx;

    const dispatch = createEventDispatcher();

    const editarContato = (e) => {
        if (id.trim() === '' || nome.trim() === '' || telefone.trim() === '') {
            return;
        }

        dispatch('edit-contato', {
            id,
            nome,
            telefone
        });

           
        let editElem = document.getElementById(`editInput${idx}`);
        let infoElem = document.getElementById(`contatoInfo${idx}`);
        editElem.style.display = 'none';
        infoElem.style.display = 'block';
    };

</script>
<main>
    <div class="form-contato form-group">
        <p>
            <input placeholder="Id" type="text" name="id" class="form-control id"
                   bind:value={id} disabled/>
        </p>
        <p>
            <input placeholder="Nome" type="text" name="nome" class="form-control"
                   bind:value={nome} />
        </p>
        <p>
            <input placeholder="Telefone" name="telefone" class="form-control"
                   bind:value={telefone} />
        </p>
        <button on:click={editarContato} type="submit" class="btn btn-success">
            Salvar
        </button>
    </div>
</main>

<style>
</style>
