function ConfirmSend() {
    Swal.fire({
        title: 'Enviar Respostas?',
        text: "Essa ação não pode ser desfeita!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não, vou revisar!',
        confirmButtonText: 'Sim, Enviar!'
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('form').submit();
        } else {
            Swal.fire(
                'Cancelado',
                'Revise suas resposta e envie ao terminar',
                'success'
            );
        }
    });
};