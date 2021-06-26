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
