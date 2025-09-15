# language: es
@askomdch @registro
Funcionalidad: Registro de usuario en AskOmDch
  Como visitante
  Quiero registrarme con credenciales válidas
  Para poder crear una nueva cuenta

  Antecedentes:
    Dado que el usuario navega a la página de login

  @exitoso
  Escenario: Registro simple de usuario
    Dado que genero credenciales únicas de registro
    Cuando completo el formulario de registro con username, email y password válidos
    Y envío el formulario de registro
    Entonces debería ver el panel de Mi Cuenta con el saludo del nuevo usuario
    Cuando cierra sesión desde Mi Cuenta
    Y vuelve a iniciar sesión con el nuevo email y password
    Entonces debería ver el panel de Mi Cuenta

  @fallo @formato-email
  Escenario: Registro falla por formato inválido de correo electrónico
    Dado que genero credenciales únicas de registro
    Cuando completo el formulario de registro con un email inválido
    Y envío el formulario de registro
    Entonces debería ver un error indicando que el email debe ser válido

  @fallo @caracteres-especiales-username
  Escenario: Registro falla por caracteres especiales en el username
    Dado que genero credenciales únicas de registro
    Cuando completo el formulario de registro con un username con caracteres no permitidos
    Y envío el formulario de registro
    Entonces debería ver un error indicando username inválido

  @fallo @vacío-username
  Escenario: Registro falla por campo vacío de username
    Dado que genero credenciales únicas de registro
    Cuando dejo vacío el username y completo email y password válidos
    Y envío el formulario de registro
    Entonces debería ver un error indicando que el username es requerido

  @fallo @vacío-email
  Escenario: Registro falla por campo vacío de email
    Dado que genero credenciales únicas de registro
    Cuando dejo vacío el email y completo username y password válidos
    Y envío el formulario de registro
    Entonces debería ver un error indicando que el email es requerido o válido

  @fallo @vacío-password
  Escenario: Registro falla por campo vacío de password
    Dado que genero credenciales únicas de registro
    Cuando dejo vacío el password y completo username y email válidos
    Y envío el formulario de registro
    Entonces debería ver un error indicando que el password es requerido
