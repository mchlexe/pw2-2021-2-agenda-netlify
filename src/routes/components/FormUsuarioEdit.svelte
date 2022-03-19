<script>
    import {createEventDispatcher} from 'svelte';

    export let username;
    export let email;
    export let id;
    export let idx;

    const dispatch = createEventDispatcher();

    const editarUsuario = (e) => {
        if (id.trim() === '' || username.trim() === '' || email.trim() === '') {
            return;
        }

        dispatch('edit-usuario', {
            id,
            username,
            email
        });

                
      let editElem = document.getElementById(`editInput${idx}`);
      let infoElem = document.getElementById(`usuarioInfo${idx}`);
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
            <input placeholder="Username" type="text" name="username" class="form-control"
                   bind:value={username} />
        </p>
        <p>
            <input placeholder="Email" name="email" class="form-control"
                   bind:value={email} />
        </p>
        <button on:click={editarUsuario} type="submit" class="btn btn-success">
            Salvar
        </button>
    </div>
</main>

<style>
</style>
