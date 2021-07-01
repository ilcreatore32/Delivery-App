import { body, validationResult } from 'express-validator'

//Vehicle camps rules
export const vehicleValidationRules = () => {
  return [
    body('tipo_vehiculos')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('modelo')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('').bail()
      .isAlphanumeric('es-ES', {ignore: ' -'}).withMessage('Ingrese solo letras o números (El guión es válido)').bail(),

    body('year')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isInt({ min:1900, max: 2021}).withMessage('Ingrese un año entre 1900 y 2021').bail(),

    body('cantidad_pasajeros')
      .notEmpty().withMessage('El campo no puede estar vacío').bail()
      .isInt({ min:1, max: 10}).withMessage('Ingrese una cantidad entre 1 y 10').bail(),

    body('capacidad_carga')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isInt().withMessage('Ingrese un número').bail(),

    body('kilometros')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isInt().withMessage('Ingrese un número').bail(),
  ]
}

//Area camps rules
export const areaValidationRules = () => {
  return [
    body('estado')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('municipio')
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail()
      .optional({ nullable: true }),

    body('ciudad')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('parroquia')
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail()
      .optional({ nullable: true }),
  ]
}

//Service camps rules
export const serviceValidationRules = () => {
  return [
    body('medio_de_transporte')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('inicio_de_horario')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora invalida.').bail(),

    body('fin_de_horario')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora invalida.').bail(),

    body('coste_por_kilometros')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isFloat({
        min: 0,
        locale: 'en-US'}
        ).withMessage('Coste invalido').bail(),

    body('disponibilidad')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isBoolean().withMessage('Valor invalido').bail(),
  ]
}

//Requests camps rules
export const shippingRequestsValidationRules = () => {
  return [
    body('descripcion')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isLength({ max: 500 }).withMessage('Descripción corta de máximo 500 caracteres.').bail(),

    body('fecha')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isDate().withMessage('Fecha invalida').bail(),

    body('status')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('estado')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('municipio')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('ciudad')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('parroquia')
      .notEmpty().withMessage('El campo no puede estar vacío.').bail()
      .isString().withMessage('Formato invalido').bail()
      .isAlpha('es-ES', {ignore: ' '}).withMessage('Ingrese solo letras.').bail(),

    body('avenida')
      .isString().withMessage('Formato invalido').bail()
      .optional({ nullable: true }),

    body('calle')
      .isString().withMessage('Formato invalido').bail()
      .optional({ nullable: true }),

    body('edificio')
      .isString().withMessage('Formato invalido').bail()
      .optional({ nullable: true }),

    body('piso')
      .isString().withMessage('Formato invalido').bail()
      .optional({ nullable: true }),

    body('referencia_extra')
      .isString().withMessage('Formato invalido').bail()
      .optional({ nullable: true }),
  ]
}
//function to check the rules

export const validate = (req, res, next) => {
  //get errors
  const errors = validationResult(req)
  //if there no error, return
  if (errors.isEmpty()) {
    return next()
  }
  //get all errors and save in an array
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  //response
  return res.status(422).json({
    errorsValidation: extractedErrors,
  })
}
