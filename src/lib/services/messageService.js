import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toastr from 'toastr';

const MySwal = withReactContent(Swal);

export const sucessMessage = (titulo, mensagem) => {
    return MySwal.fire({
        title: titulo,
        text: mensagem,
        type: 'success',
        allowOutsideClick: false
    });
}

export const errorMessage = (titulo, mensagem) => {
    return MySwal.fire({
        title: titulo,
        text: mensagem,
        type: 'error',
        allowOutsideClick: false
    });
}

export const sucessToastr = (mensagem) => {
    toastr.success(mensagem).show();
}

export const errorToastr = (mensagem) => {
    toastr.error(mensagem, null, {
        progressBar: true,
        closeDuration: 15
    }).show();
}