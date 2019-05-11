//Inicio de sesion

var login = Backbone.Model.extend({
    defaults: {
        ID: "",
        PASS: ""
    },
    idAttribute: "ID",
    // Lets create function which will return the custom URL based on the method type
    getCustomUrl: function (method) {

        switch (method) {
            case 'read':
                console.log(this.id);
                return 'http://localhost:38158/loginWeb/webresources/web.login/' + this.id;
                break;
        }
    },

    // Now lets override the sync function to use our custom URLs
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method.toLowerCase());

        // Lets notify backbone to use our URLs and do follow default course
        return Backbone.sync.apply(this, arguments);
    }
});



function testReadEx() {
    // Now let us try to retrieve a book [READ]
    var usuario = "";
    var pass = "";
    var bandera = true;
    if (document.getElementById('user').value == "" || document.getElementById('pass').value == "") {
        bandera = false;
        Swal.fire({
            title: 'ingrese usuario y contraseña',
            animation: false,
            customClass: {
                popup: 'animated tada'
            }
        })
    } else {
        usuario = document.getElementById('user').value;
        pass = document.getElementById('pass').value;
    }

    var log = new login({
        ID: usuario
    });
    log.fetch({
        success: function (Response) {
            if (bandera == true) {
                if (usuario == Response.get("usuario") && pass == Response.get("pass")) {
                    notie.alert({
                        type: 'success',
                        text: 'Bienvenido ' + usuario,
                        time: 3
                    })
                } else {
                    notie.alert({
                        type: 'error',
                        text: 'Usuario y/o contraseña incorrectos',
                        time: 3
                    })
                }
            }
        }
    });
}

function insert() {
    const userAction = async () => {
            const response = await fetch('http://localhost:38158/loginWeb/webresources/web.login', {
                method: 'POST',
                body: {
                    "correo": "CRIS@ucentral.ed",
                    "pass": "CRS",
                    "usuario": "CRIST"
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const myJson = await response.json(); //extract JSON from the http response
            // do something with myJson
        }
}

//Registro
var registro = Backbone.Model.extend();

var reg = new registro({
    usuario: '',
    pass: '',
    email: ''
})
var user = '';
var pass = '';
var email = '';

var Formulario = Backbone.View.extend({
    el: '.vista',
    events: {
        'click .cambiarColor': 'cambiarColor'
    },

    cambiarColor: function () {
        this.$el.css('color', 'red');
        user = document.getElementById('userReg').value;
        if (document.getElementById('passReg').value != document.getElementById('repeatPass').value) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden!',
                footer: '<a href>Revisa de nuevo </a>'
            })
        } else {
            pass = document.getElementById('passReg').value;
        }
        if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(document.getElementById('email').value)) {
            Swal.fire({
                type: 'success',
                title: 'Buen trabajo...',
                text: 'La direccion de correo electronico es correcta!',
                footer: '<a class="fas fa-thumbs-up" href> Se gano el 5 </a>'
            })
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'La direccion de correo electronico es incorrecta!',
                footer: '<a href>Revisa de nuevo </a>'
            })
        }
        console.log(user, pass, email);
    },
});
reg.set({
    usuario: user,
    pass: pass,
    email: email
});

var lib = new Formulario();
