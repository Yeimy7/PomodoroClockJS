'use strict'
window.addEventListener('load', function () {

    const time = document.getElementById('time');
    const boton_start_pause = document.getElementById('start_pause');
    const boton_reset = document.getElementById('reset');

    const session_up = document.getElementById('session-up');
    const session_length = document.getElementById('session-length');
    const session_down = document.getElementById('session-down');

    const break_up = document.getElementById('break-up');
    const break_length = document.getElementById('break-length');
    const break_down = document.getElementById('break-down');

    const title = document.getElementById('title');

    let sesion = 25, breik = 5;
    let intervalo;

    let fSessionUp = function () {
        if (sesion < 60) {
            sesion = parseInt(session_length.innerHTML) + 1;
            session_length.innerHTML = sesion;
            time.innerHTML = sesion + ':00';
        }
    }
    session_up.addEventListener('click', fSessionUp);
    let fSessionDown = function () {
        if (sesion > 1) {
            sesion = parseInt(session_length.innerHTML) - 1;
            session_length.innerHTML = sesion;
            time.innerHTML = sesion + ':00';
        }
    }
    session_down.addEventListener('click', fSessionDown);
    let fBreakUp = function () {
        if (breik < 60)
            breik = parseInt(break_length.innerHTML) + 1;
        break_length.innerHTML = breik;
    }
    break_up.addEventListener('click', fBreakUp);
    let fBreakDown = function () {
        if (breik > 1)
            breik = parseInt(break_length.innerHTML) - 1;
        break_length.innerHTML = breik;
    }
    break_down.addEventListener('click', fBreakDown);

    let pauseOff = true;
    let cont_s;
    let cont_m;
    boton_start_pause.addEventListener('click', function () {
        let cont_mm = parseInt(session_length.innerHTML) - 1;
        let m = parseInt(break_length.innerHTML) - 1;

        break_up.removeEventListener('click', fBreakUp);
        break_down.removeEventListener('click', fBreakDown);
        session_up.removeEventListener('click', fSessionUp);
        session_down.removeEventListener('click', fSessionDown);


        let s = 59;
        if (!intervalo) {
            cont_s = 59;
            cont_m = parseInt(session_length.innerHTML) - 1;
        }

        if (pauseOff) {
            intervalo = setInterval(tempo, 1000);
            this.innerHTML = 'Pause';
            pauseOff = false;
        } else {
            clearInterval(intervalo);
            this.innerHTML = 'Start';
            pauseOff = true;
        }

        let sw = true;
        function tempo() {
            if (cont_s < 0) {
                cont_m--;
                if (cont_m < 0 && sw) {
                    cont_m = m;
                    title.innerHTML = 'Break'
                    sw = false;
                }
                if (cont_m < 0 && !sw) {
                    cont_m = cont_mm;
                    title.innerHTML = 'Session'
                    sw = true;
                }
                cont_s = s;
            }
            time.innerHTML = cont_m + ':' + cont_s;
            cont_s--;
        }
    })
    boton_reset.addEventListener('click', function () {
        time.innerHTML = '25:00';
        if (intervalo) {
            clearInterval(intervalo);
        }
        intervalo = 0;
        session_length.innerHTML = 25;
        break_length.innerHTML = 5;
        pauseOff = true;
        boton_start_pause.innerHTML = 'Start';
        break_up.addEventListener('click', fBreakUp);
        break_down.addEventListener('click', fBreakDown);
        session_up.addEventListener('click', fSessionUp);
        session_down.addEventListener('click', fSessionDown);
    })


})