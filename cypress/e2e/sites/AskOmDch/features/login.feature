# language: es
@askomdch @login
Funcionalidad: Inicio de sesión en AskOmDch
  Como usuario
  Quiero iniciar sesión con mis credenciales
  Para poder acceder a mi cuenta

  Antecedentes:
    Dado que el usuario navega a la página de login

  @exitoso @correo
  Escenario: Login exitoso con correo
    Cuando ingresa el correo y la contraseña correctos
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver el panel de Mi Cuenta

  @exitoso @username
  Escenario: Login exitoso con nombre de usuario
    Cuando ingresa el nombre de usuario y la contraseña correctos
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver el panel de Mi Cuenta

  @exitoso @rememberme
  Escenario: Login exitoso con Remember Me
    Cuando ingresa el usuario válido y la contraseña válida
    Y marca la opción Remember Me
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver el panel de Mi Cuenta
    Y la sesión debería persistir al recargar o volver a /account

  @fallo @sqlinjection
  Escenario: Login falla por SQL Injection en contraseña
    Cuando ingresa un usuario válido
    Y escribe una inyección SQL en el campo contraseña
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver un error de credenciales

  @fallo @formato-email
  Escenario: Login falla por formato inválido de correo electrónico
    Cuando ingresa un correo con formato inválido
    Y escribe la contraseña válida
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver un error de credenciales o formato

  @fallo @password-incorrecta
  Escenario: Login falla por contraseña incorrecta
    Cuando ingresa el usuario válido
    Y escribe una contraseña incorrecta
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver un error indicando contraseña incorrecta

  @fallo @vacío-usuario
  Escenario: Login falla por campo vacío de username/email
    Cuando deja vacío el campo username/email
    Y escribe la contraseña válida
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver un error indicando que el username es requerido

  @fallo @vacío-password
  Escenario: Login falla por campo vacío de contraseña
    Cuando ingresa el usuario válido
    Y deja vacío el campo contraseña
    Y hace clic en el botón de iniciar sesión
    Entonces debería ver un error indicando que la contraseña es requerida
