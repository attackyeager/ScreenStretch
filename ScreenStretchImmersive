(function() {
    'use strict';

    /* =========================================================
       CONFIGURACIÓN
    ========================================================= */

    const BUTTON_SIZE = 54;

    const EDGE_MARGIN = 8;

    const HIDE_DELAY = 2500;

    // Cuánto queda visible cuando se oculta
    const VISIBLE_WHEN_HIDDEN = 16;

    let button;

    let hideTimer = null;

    let dragging = false;

    let moved = false;

    let isHidden = false;

    let buttonSide = 'right';

    let buttonTop = null;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;


    /* =========================================================
       CREAR BOTÓN
    ========================================================= */

    button = document.createElement('button');

    button.id = 'combined-fullscreen-button';

    button.innerHTML = '⛶';

    Object.assign(button.style, {

        position: 'fixed',

        width: BUTTON_SIZE + 'px',
        height: BUTTON_SIZE + 'px',

        padding: '0',
        margin: '0',

        border: '2px solid rgba(255,255,255,0.85)',

        borderRadius: '50%',

        background: 'rgba(0,0,0,0.75)',

        color: 'white',

        fontSize: '24px',

        lineHeight: BUTTON_SIZE + 'px',

        textAlign: 'center',

        zIndex: '2147483647',

        cursor: 'pointer',

        touchAction: 'none',

        userSelect: 'none',
        WebkitUserSelect: 'none',

        boxSizing: 'border-box',

        transition:
            'left 0.25s ease, ' +
            'right 0.25s ease, ' +
            'top 0.15s ease, ' +
            'opacity 0.2s ease'
    });


    document.body.appendChild(button);


    /* =========================================================
       POSICIÓN INICIAL
    ========================================================= */

    function setInitialPosition() {

        buttonSide = 'right';

        buttonTop =
            window.innerHeight -
            BUTTON_SIZE -
            20;

        button.style.top =
            buttonTop + 'px';

        button.style.right =
            EDGE_MARGIN + 'px';

        button.style.left = '';

        button.style.bottom = '';
    }


    /* =========================================================
       APLICAR POSICIÓN NORMAL
    ========================================================= */

    function applyButtonPosition() {

        if (buttonTop === null) {

            buttonTop =
                window.innerHeight -
                BUTTON_SIZE -
                20;
        }


        const maxTop =
            window.innerHeight -
            BUTTON_SIZE;


        buttonTop =
            Math.max(
                0,
                Math.min(
                    buttonTop,
                    maxTop
                )
            );


        button.style.top =
            buttonTop + 'px';

        button.style.bottom = '';


        if (buttonSide === 'left') {

            button.style.left =
                EDGE_MARGIN + 'px';

            button.style.right = '';

        } else {

            button.style.right =
                EDGE_MARGIN + 'px';

            button.style.left = '';
        }
    }


    /* =========================================================
       MOSTRAR COMPLETAMENTE
    ========================================================= */

    function showButton() {

        isHidden = false;

        button.style.opacity = '1';

        button.style.pointerEvents = 'auto';

        applyButtonPosition();

        restartHideTimer();
    }


    /* =========================================================
       OCULTAR PARCIALMENTE
    ========================================================= */

    function hideButton() {

        if (dragging) {
            return;
        }


        isHidden = true;

        button.style.opacity = '0.35';


        if (buttonSide === 'left') {

            /*
             * Sale parcialmente por la izquierda.
             */

            button.style.left =
                (-BUTTON_SIZE +
                 VISIBLE_WHEN_HIDDEN) + 'px';

            button.style.right = '';

        } else {

            /*
             * Sale parcialmente por la derecha.
             */

            button.style.right =
                (-BUTTON_SIZE +
                 VISIBLE_WHEN_HIDDEN) + 'px';

            button.style.left = '';
        }
    }


    /* =========================================================
       REINICIAR TEMPORIZADOR
    ========================================================= */

    function restartHideTimer() {

        clearTimeout(hideTimer);

        hideTimer =
            setTimeout(
                hideButton,
                HIDE_DELAY
            );
    }


    /* =========================================================
       DESPERTAR BOTÓN
    ========================================================= */

    function wakeButton() {

        isHidden = false;

        button.style.opacity = '1';

        button.style.pointerEvents = 'auto';

        applyButtonPosition();

        restartHideTimer();
    }


    /* =========================================================
       ESTILOS IMMERSIVE DEL ORIGINAL
    ========================================================= */

    function applyImmersiveStyles() {

        document.body.style.height =
            '100dvh';

        document.body.style.width =
            '100dvw';

        document.body.style.margin =
            '0';

        document.body.style.padding =
            '0';

        document.body.style.overflow =
            'auto';

        document.body.style.overscrollBehavior =
            'none';


        document.documentElement.style.height =
            '100dvh';

        document.documentElement.style.width =
            '100dvw';

        document.documentElement.style.margin =
            '0';

        document.documentElement.style.padding =
            '0';

        document.documentElement.style.overflow =
            'hidden';


        document.documentElement.style.position =
            'fixed';

        document.documentElement.style.top =
            '0';

        document.documentElement.style.left =
            '0';

        document.documentElement.style.right =
            '0';

        document.documentElement.style.bottom =
            '0';


        /* =====================================================
           VIEWPORT
        ===================================================== */

        let viewportMeta =
            document.querySelector(
                'meta[name="viewport"]'
            );


        if (!viewportMeta) {

            viewportMeta =
                document.createElement('meta');

            viewportMeta.name =
                'viewport';

            document.head.appendChild(
                viewportMeta
            );
        }


        viewportMeta.content =
            'width=device-width, ' +
            'initial-scale=1.0, ' +
            'maximum-scale=1.0, ' +
            'user-scalable=no, ' +
            'viewport-fit=cover';


        /* =====================================================
           SCREENSTRETCH
        ===================================================== */

        let style =
            document.getElementById(
                'combined-screen-stretch-style'
            );


        if (!style) {

            style =
                document.createElement(
                    'style'
                );

            style.id =
                'combined-screen-stretch-style';

            document.head.appendChild(
                style
            );
        }


        style.textContent = `

            html,
            body,
            #root,
            #app,
            .deviceControl-page {

                margin: 0 !important;
                padding: 0 !important;

                width: 100vw !important;
                height: 100vh !important;

                background: black !important;

                overflow: hidden !important;
            }


            #device {

                position: fixed !important;

                top: 0 !important;
                left: 0 !important;

                width: 100vw !important;
                height: 100vh !important;

                display: flex !important;

                justify-content: center !important;
                align-items: center !important;

                z-index: 1 !important;
            }


            #phoneVideo {

                width: 100vw !important;
                height: 100vh !important;

                object-fit: fill !important;

                transform: none !important;

                margin: 0 !important;

                z-index: 1 !important;
            }


            .touch-box {

                position: fixed !important;

                top: 0 !important;
                left: 0 !important;

                width: 100vw !important;
                height: 100vh !important;

                z-index: 2 !important;
            }


            .vdr-container {

                position: absolute !important;

                z-index: 3 !important;
            }
        `;
    }


    /* =========================================================
       RESTAURAR ESTILOS
    ========================================================= */

    function resetStyles() {

        document.body.style.height = '';
        document.body.style.width = '';

        document.body.style.margin = '';
        document.body.style.padding = '';

        document.body.style.overflow = '';
        document.body.style.overscrollBehavior = '';


        document.documentElement.style.height = '';
        document.documentElement.style.width = '';

        document.documentElement.style.margin = '';
        document.documentElement.style.padding = '';

        document.documentElement.style.overflow = '';

        document.documentElement.style.position = '';

        document.documentElement.style.top = '';
        document.documentElement.style.left = '';

        document.documentElement.style.right = '';
        document.documentElement.style.bottom = '';


        const style =
            document.getElementById(
                'combined-screen-stretch-style'
            );


        if (style) {
            style.remove();
        }
    }


    /* =========================================================
       COMPROBAR FULLSCREEN
    ========================================================= */

    function isFullscreen() {

        return !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
    }


    /* =========================================================
       ENTRAR FULLSCREEN
    ========================================================= */

    async function enterFullscreen() {

        const elem =
            document.documentElement;


        try {

            if (elem.requestFullscreen) {

                await elem.requestFullscreen();

            } else if (
                elem.webkitRequestFullscreen
            ) {

                await elem.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );

            } else if (
                elem.mozRequestFullScreen
            ) {

                await elem.mozRequestFullScreen();

            } else if (
                elem.msRequestFullscreen
            ) {

                await elem.msRequestFullscreen();
            }


        } catch (error) {

            console.log(
                'Fullscreen no disponible:',
                error
            );
        }


        applyImmersiveStyles();

        wakeButton();
    }


    /* =========================================================
       SALIR FULLSCREEN
    ========================================================= */

    async function exitFullscreen() {

        try {

            if (document.exitFullscreen) {

                await document.exitFullscreen();

            } else if (
                document.webkitExitFullscreen
            ) {

                await document.webkitExitFullscreen();

            } else if (
                document.mozCancelFullScreen
            ) {

                await document.mozCancelFullScreen();

            } else if (
                document.msExitFullscreen
            ) {

                await document.msExitFullscreen();
            }


        } catch (error) {

            console.log(
                'No se pudo salir de fullscreen:',
                error
            );
        }
    }


    /* =========================================================
       TOQUE NORMAL = ENTRAR / SALIR
    ========================================================= */

    async function toggleFullscreen() {

        if (isFullscreen()) {

            await exitFullscreen();

        } else {

            await enterFullscreen();
        }
    }


    /* =========================================================
       CAMBIO DE FULLSCREEN
    ========================================================= */

    function fullscreenChangeHandler() {

        if (isFullscreen()) {

            applyImmersiveStyles();

        } else {

            resetStyles();
        }


        wakeButton();
    }


    /* =========================================================
       INICIO DE ARRASTRE
    ========================================================= */

    function pointerDown(event) {

        event.preventDefault();


        /*
         * Si estaba oculto, primero vuelve a aparecer.
         */

        if (isHidden) {

            wakeButton();
        }


        dragging = true;

        moved = false;


        const rect =
            button.getBoundingClientRect();


        startX =
            event.clientX;

        startY =
            event.clientY;


        startLeft =
            rect.left;

        startTop =
            rect.top;


        button.style.transition =
            'none';


        if (button.setPointerCapture) {

            try {

                button.setPointerCapture(
                    event.pointerId
                );

            } catch (e) {}
        }
    }


    /* =========================================================
       MOVER BOTÓN
    ========================================================= */

    function pointerMove(event) {

        if (!dragging) {
            return;
        }


        event.preventDefault();


        const dx =
            event.clientX -
            startX;


        const dy =
            event.clientY -
            startY;


        /*
         * Determinamos si realmente hubo movimiento.
         */

        if (
            Math.abs(dx) > 6 ||
            Math.abs(dy) > 6
        ) {

            moved = true;
        }


        let newLeft =
            startLeft + dx;


        let newTop =
            startTop + dy;


        /*
         * Mantener dentro de la pantalla
         * mientras se arrastra.
         */

        const maxLeft =
            window.innerWidth -
            BUTTON_SIZE;


        const maxTop =
            window.innerHeight -
            BUTTON_SIZE;


        newLeft =
            Math.max(
                0,
                Math.min(
                    newLeft,
                    maxLeft
                )
            );


        newTop =
            Math.max(
                0,
                Math.min(
                    newTop,
                    maxTop
                )
            );


        button.style.left =
            newLeft + 'px';

        button.style.top =
            newTop + 'px';


        button.style.right =
            '';

        button.style.bottom =
            '';
    }


    /* =========================================================
       TERMINAR ARRASTRE
    ========================================================= */

    function pointerUp(event) {

        if (!dragging) {
            return;
        }


        dragging = false;


        if (button.releasePointerCapture) {

            try {

                button.releasePointerCapture(
                    event.pointerId
                );

            } catch (e) {}
        }


        button.style.transition =
            'left 0.25s ease, ' +
            'right 0.25s ease, ' +
            'top 0.15s ease, ' +
            'opacity 0.2s ease';


        const rect =
            button.getBoundingClientRect();


        /*
         * Guardamos la posición vertical.
         */

        buttonTop =
            rect.top;


        /*
         * Decidir izquierda o derecha
         * según dónde terminó.
         */

        const centerX =
            rect.left +
            BUTTON_SIZE / 2;


        if (
            centerX <
            window.innerWidth / 2
        ) {

            buttonSide = 'left';

        } else {

            buttonSide = 'right';
        }


        /*
         * Encajar al borde.
         */

        applyButtonPosition();


        /*
         * Si NO hubo arrastre,
         * fue simplemente un toque.
         */

        if (!moved) {

            toggleFullscreen();

        }


        /*
         * Volver a iniciar el temporizador.
         */

        restartHideTimer();
    }


    /* =========================================================
       EVENTOS DEL BOTÓN
    ========================================================= */

    button.addEventListener(
        'pointerdown',
        pointerDown,
        { passive: false }
    );


    button.addEventListener(
        'pointermove',
        pointerMove,
        { passive: false }
    );


    button.addEventListener(
        'pointerup',
        pointerUp,
        { passive: false }
    );


    button.addEventListener(
        'pointercancel',
        pointerUp,
        { passive: false }
    );


    /* =========================================================
       FULLSCREEN EVENTS
    ========================================================= */

    document.addEventListener(
        'fullscreenchange',
        fullscreenChangeHandler
    );


    document.addEventListener(
        'webkitfullscreenchange',
        fullscreenChangeHandler
    );


    document.addEventListener(
        'mozfullscreenchange',
        fullscreenChangeHandler
    );


    document.addEventListener(
        'MSFullscreenChange',
        fullscreenChangeHandler
    );


    /* =========================================================
       ROTACIÓN
    ========================================================= */

    window.addEventListener(
        'orientationchange',
        function() {

            if (isFullscreen()) {

                setTimeout(
                    function() {

                        applyImmersiveStyles();

                        applyButtonPosition();

                    },
                    300
                );
            }
        }
    );


    /* =========================================================
       CAMBIO DE TAMAÑO
    ========================================================= */

    window.addEventListener(
        'resize',
        function() {

            if (isFullscreen()) {

                setTimeout(
                    function() {

                        applyImmersiveStyles();

                        applyButtonPosition();

                    },
                    100
                );
            }
        }
    );


    /* =========================================================
       INICIALIZAR
    ========================================================= */

    setInitialPosition();

    showButton();


    /* =========================================================
       SI YA ESTÁ EN FULLSCRE
